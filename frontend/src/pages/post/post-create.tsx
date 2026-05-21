import { fileToBase64, uploadImage } from "@/api/images";
import { createPost } from "@/api/post";
import {
    creationStateType,
    ImageContract,
    type Content,
    type PostCreateRequest,
} from "@my-app/shared";
import React, { useState } from "react";

export default function page() {
    const [createType, setCreateType] = useState<creationStateType>(
        creationStateType.Basic,
    );

    return (
        <div>
            <select
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

            {createType === creationStateType.Basic ? <BasicForm /> : <></>}
            {createType === creationStateType.Poll ? <PollForm /> : <></>}
        </div>
    );
}

const FormField = ({
    type,
    onChange,
}: {
    type: string;
    onChange: React.ChangeEventHandler<HTMLInputElement, HTMLInputElement>;
}) => {
    return (
        <input
            type={type}
            onChange={onChange}
            className="border-4 border-black bg-white"
        ></input>
    );
};

const BasicForm = () => {
    const [text, setText] = useState("");
    const [imageFIle, setImageFile] = useState<File | null>(null);

    return (
        <form onSubmit={handleSubmitBasic}>
            <FormField type="text" onChange={(e) => setText(e.target.value)} />
            <input
                type="file"
                onChange={(event) => handleFileChange(event, setImageFile)}
                className="bg-white"
            ></input>
            <input type="submit"></input>
        </form>
    );

    async function handleSubmitBasic(e: React.SubmitEvent<HTMLFormElement>) {
        e.preventDefault();
        console.log("\n \n \n");
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
        <form onSubmit={handleSubmitPoll}>
            <FormField
                type="text"
                onChange={(e) => setQuestion(e.target.value)}
            />
            <FormField
                type="text"
                onChange={(e) => setOption1(e.target.value)}
            />
            <FormField
                type="text"
                onChange={(e) => setOption2(e.target.value)}
            />
            <FormField
                type="text"
                onChange={(e) => setOption3(e.target.value)}
            />
            <FormField
                type="text"
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
