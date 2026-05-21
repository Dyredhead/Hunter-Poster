import { fileToBase64, uploadImage } from "@/api/images";
import { updateSettingsAccount, updateSettingsProfile } from "@/api/settings";
import { userGetCurrent } from "@/api/users";
import BigButton from "@/components/BigButton";
import Screen from "@/components/Screen";
import { BigTitle, MediumTitle } from "@/components/Title";
import { ImageContract, usersContract, type User } from "@my-app/shared";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./settings.css";

export default function SettingsPage() {
    const navigate = useNavigate();

    const [banner, setBanner] = useState<File | null>(null);
    const [pfp, setPfp] = useState<File | null>(null);
    const [description, setDescription] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const [user, setUser] = useState<User>();
    const [loading, setLoading] = useState(false);
    const [loadingProfile, setLoadingProfile] = useState(false);
    const [loadingAccount, setLoadingAccount] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            await new Promise((f) => setTimeout(f, 500));
            try {
                const user =
                    usersContract.routes.getById.responses[200].body.parse(
                        await (await userGetCurrent()).json(),
                    );
                setUser(user);
            } catch (error) {
                console.error("Error fetching data:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (user == undefined) {
        console.log("something went wrong with fetching user");
        return;
    }

    return (
        <Screen>
            <BigTitle>Settings</BigTitle>
            <div className="py-10">
                <div className="settings rounded-2xl border-4 p-10">
                    <form
                        onSubmit={handleSubmitProfile}
                        id="profile-form"
                        className="flex flex-col gap-10"
                    >
                        <div className="flex flex-row">
                            <div className="flex w-3/5">
                                <MediumTitle>Profile Settings:</MediumTitle>
                            </div>
                            <div className="flex w-2/5">
                                <BigButton
                                    type="submit"
                                    disabled={loadingProfile}
                                >
                                    {loadingProfile ? "Updating..." : "Update"}
                                </BigButton>
                            </div>
                        </div>

                        <div className="flex w-full flex-col gap-5">
                            <div className="label-input">
                                <label htmlFor="banner-input">
                                    Select an image to use for a rectangular
                                    banner picture
                                </label>
                                <input
                                    type="file"
                                    name="banner-input"
                                    id="banner-input"
                                    className="file-input"
                                    accept="image/png, image/jpeg"
                                    onChange={(event) =>
                                        handleFileChange(event, setBanner)
                                    }
                                />
                            </div>
                            <div className="label-input">
                                <label htmlFor="pfp-input">
                                    Select an image to use for a circular
                                    profile picture
                                </label>
                                <input
                                    type="file"
                                    name="pfp-input"
                                    id="pfp-input"
                                    className="file-input"
                                    accept="image/png, image/jpeg"
                                    onChange={(event) =>
                                        handleFileChange(event, setPfp)
                                    }
                                />
                            </div>
                            <div className="label-input">
                                <label htmlFor="description-input">
                                    Write up a description
                                </label>
                                <div className="text-input-wrapper">
                                    <input
                                        type="text"
                                        name="description-input"
                                        id="description-input"
                                        placeholder="Welcome to my profile!"
                                        className="text-input"
                                        value={description}
                                        onChange={(e) =>
                                            setDescription(e.target.value)
                                        }
                                    />
                                </div>
                            </div>
                        </div>
                    </form>

                    <div className="divider"></div>

                    <form
                        onSubmit={handleSubmitAccount}
                        id="account-form"
                        className="flex flex-col gap-10"
                    >
                        <div className="flex flex-row">
                            <div className="flex w-3/5">
                                <MediumTitle>Account Settings:</MediumTitle>
                            </div>
                            <div className="flex w-2/5">
                                <BigButton
                                    type="submit"
                                    disabled={loadingAccount}
                                >
                                    {loadingAccount ? "Updating..." : "Update"}
                                </BigButton>
                            </div>
                        </div>

                        <div className="flex w-full flex-col gap-5">
                            <div className="label-input">
                                <label htmlFor="username-input">
                                    Choose a new username
                                </label>
                                <div className="text-input-wrapper">
                                    <input
                                        type="text"
                                        name="username-input"
                                        id="username-input"
                                        className="text-input"
                                        placeholder="JohnDoe"
                                        value={username}
                                        onChange={(e) =>
                                            setUsername(e.target.value)
                                        }
                                    />
                                </div>
                            </div>
                            <div className="label-input">
                                <label htmlFor="password-input">
                                    Choose a new password
                                </label>
                                <div className="text-input-wrapper">
                                    <input
                                        type="password"
                                        name="password-input"
                                        id="password-input"
                                        className="text-input"
                                        placeholder="SuperSecurePassword123!"
                                        value={password}
                                        onChange={(e) =>
                                            setPassword(e.target.value)
                                        }
                                    />
                                </div>
                            </div>
                        </div>
                    </form>

                    <div className="divider"></div>

                    <BigButton
                        type="button"
                        onClick={() => navigate("/profile")}
                        disabled={loading}
                    >
                        Go Back to Profile
                    </BigButton>
                    <BigButton
                        type="button"
                        onClick={() => navigate("/auth/logout")}
                        disabled={loading}
                    >
                        Logout
                    </BigButton>
                </div>
            </div>
        </Screen>
    );

    async function handleSubmitProfile(e: React.SubmitEvent<HTMLFormElement>) {
        e.preventDefault();
        // setError("");
        setLoadingProfile(true);
        await new Promise((f) => setTimeout(f, 200));

        console.log("pfp: ", pfp);
        console.log("banner: ", banner);

        const pfp_id =
            pfp == null
                ? null
                : ImageContract.routes.upload.responses[200].body.parse(
                      await (
                          await uploadImage({
                              image_type: "pfp",
                              image_mime: pfp.type,
                              image_data: await fileToBase64(pfp),
                          })
                      ).json(),
                  ).id;

        const banner_id =
            banner == null
                ? null
                : ImageContract.routes.upload.responses[200].body.parse(
                      await (
                          await uploadImage({
                              image_type: "banner",
                              image_mime: banner!.type,
                              image_data: await fileToBase64(banner),
                          })
                      ).json(),
                  ).id;

        await updateSettingsProfile({
            pfp_id: pfp_id,
            banner_id: banner_id,
            description: description,
        });

        setLoadingProfile(false);
    }

    async function handleSubmitAccount(e: React.SubmitEvent<HTMLFormElement>) {
        e.preventDefault();
        setLoadingAccount(true);
        await new Promise((f) => setTimeout(f, 200));

        const result = await updateSettingsAccount({
            username: username == "" ? null : username,
            password: password == "" ? null : password,
        });

        console.log(result);

        setLoadingAccount(false);
    }

    function handleFileChange(
        event: React.ChangeEvent<HTMLInputElement>,
        setFile: React.Dispatch<React.SetStateAction<File | null>>,
    ) {
        const formData = new FormData();
        formData.append("my-image-file", event.target.files![0]);
        const selectedFile = event.target.files?.[0];

        if (!selectedFile) {
            setFile(null);
            return;
        }

        setFile(selectedFile);
    }
}
