import { fileToBase64, uploadImage } from "@/api/images";
import { createPost } from "@/api/posts";
import {
    creationStateType,
    ImageContract,
    type Content,
    type PostCreateRequest,
} from "@my-app/shared";
import { default as React, useState } from "react";
import "./post-create.css";

export default function Page() {
    const [createType, setCreateType] = useState<creationStateType>(
        creationStateType.Basic,
    );

    return (
        <div
            id="post-create-container"
            className="mt-10 flex h-full flex-col justify-center gap-5"
        >
            <div className="flex flex-row justify-center">
                <select
                    className="flex flex-row justify-center"
                    onChange={(e) => {
                        setCreateType(e.target.value as creationStateType);
                    }}
                >
                    <option value={creationStateType.Basic}>
                        {creationStateType.Basic}
                    </option>
                    <option value={creationStateType.Poll}>
                        {creationStateType.Poll}
                    </option>
                </select>
            </div>
            <div className="flex flex-row justify-center">
                {createType === creationStateType.Basic ? <BasicForm /> : <></>}
                {createType === creationStateType.Poll ? <PollForm /> : <></>}
            </div>
        </div>
    );
}

const FormField = ({
    type,
    onChange,
    placeholder,
}: {
    type: string;
    onChange: React.ChangeEventHandler<HTMLInputElement, HTMLInputElement>;
    placeholder: string;
}) => {
    return (
        <div className="text-input-wrapper">
            <input
                type={type}
                placeholder={placeholder}
                onChange={onChange}
                className="text-neutral-darkest text-input border-4 border-black bg-white"
            ></input>
        </div>
    );
};

const BasicForm = () => {
    const [text, setText] = useState("");
    const [imageFIle, setImageFile] = useState<File | null>(null);

    return (
        <form
            className="flex w-100 max-w-full flex-col gap-2"
            onSubmit={handleSubmitBasic}
        >
            <AutoGrowTextArea
                value={text}
                onChange={(e) => setText(e.target.value)}
            />
            <input
                type="file"
                onChange={(event) => handleFileChange(event, setImageFile)}
                className="file-input bg-white"
            ></input>
            <input type="submit"></input>
        </form>
    );

    async function handleSubmitBasic(e: React.SubmitEvent<HTMLFormElement>) {
        e.preventDefault();
        let content: Content | undefined;

        if (imageFIle) {
            const image_id =
                ImageContract.routes.upload.responses[200].body.parse(
                    await (
                        await uploadImage({
                            image_type: "post",
                            image_mime: imageFIle.type,
                            image_data: await fileToBase64(imageFIle),
                        })
                    ).json(),
                ).id;

            if (text.trim()) {
                // text_image
                content = {
                    type: "text_image",
                    content: text,
                    image_id: image_id,
                };
            } else {
                // image
                content = {
                    type: "image",
                    image_id: image_id,
                };
            }
        } else if (text.trim()) {
            // text
            content = {
                type: "text",
                content: text,
            };
        }
        if (content) {
            await createPost(content);
        }
    }

    function handleFileChange(
        event: React.ChangeEvent<HTMLInputElement>,
        setFile: React.Dispatch<React.SetStateAction<File | null>>,
    ) {
        const selectedFile = event.target.files?.[0];

        if (!selectedFile) {
            setFile(null);
            return;
        }

        setFile(selectedFile);
    }
};

const PollForm = () => {
    const [question, setQuestion] = useState("");
    const [option1, setOption1] = useState("");
    const [option2, setOption2] = useState("");
    const [option3, setOption3] = useState("");
    const [option4, setOption4] = useState("");

    return (
        <form onSubmit={handleSubmitPoll} className="flex flex-col gap-2">
            <FormField
                type="text"
                placeholder="Question"
                onChange={(e) => setQuestion(e.target.value)}
            />
            <FormField
                type="text"
                placeholder="Choice 1"
                onChange={(e) => setOption1(e.target.value)}
            />
            <FormField
                type="text"
                placeholder="Choice 2"
                onChange={(e) => setOption2(e.target.value)}
            />
            <FormField
                type="text"
                placeholder="Choice 3"
                onChange={(e) => setOption3(e.target.value)}
            />
            <FormField
                type="text"
                placeholder="Choice 4"
                onChange={(e) => setOption4(e.target.value)}
            />
            <input type="submit"></input>
        </form>
    );

    async function handleSubmitPoll(e: React.SubmitEvent<HTMLFormElement>) {
        e.preventDefault();
        const options = [option1, option2, option3, option4];

        const temp = new Date();
        temp.setDate(temp.getDate() + 1);

        const content: PostCreateRequest = {
            type: "poll",
            question: question,
            closes_at: temp.toISOString(),
            options: options,
        };

        await createPost(content);
    }
};

const AutoGrowTextArea = ({
    value,
    onChange,
}: {
    value: string;
    onChange: React.ChangeEventHandler<HTMLTextAreaElement>;
}) => {
    return (
        <div className="text-input-wrapper">
            <div className="auto-grow-textarea" data-value={value || " "}>
                <textarea
                    value={value}
                    onChange={onChange}
                    className="text-input"
                    rows={1}
                    placeholder="What's on your mind?"
                />
            </div>
        </div>
    );
};
