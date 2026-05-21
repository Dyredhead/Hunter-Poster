import { login } from "@/api/auth/login";
import hide from "@/assets/icons/hide.svg";
import show from "@/assets/icons/show.svg";
import BigButton from "@/components/BigButton";
import Screen from "@/components/Screen";
import { BigTitle } from "@/components/Title";
import { loginContract } from "@my-app/shared";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./auth.css";

export default function LoginPage() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    return (
        <Screen>
            <BigTitle>Login</BigTitle>
            <form className="auth-form" onSubmit={handleSubmit}>
                <div className="auth-form-field">
                    <label className="auth-form-field-label" htmlFor="email">
                        Email
                    </label>
                    <div className="auth-form-field-input-wrapper">
                        <input
                            id="email"
                            className="auth-form-field-input"
                            type="email"
                            placeholder="john.doe@example.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            autoComplete="email"
                        />
                    </div>
                </div>

                <div className="auth-form-field">
                    <label className="auth-form-field-label" htmlFor="password">
                        Password
                    </label>
                    <div className="auth-form-field-input-wrapper">
                        <input
                            id="password"
                            className="auth-form-field-input"
                            type={showPassword ? "text" : "password"}
                            placeholder="MyStrongPasword123!"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            autoComplete="new-password"
                        />
                        <button
                            type="button"
                            className="auth-form-password-toggle"
                            onClick={() => setShowPassword((v) => !v)}
                            aria-label={
                                showPassword ? "Hide password" : "Show password"
                            }
                        >
                            {showPassword ? (
                                <img src={show} alt="show" />
                            ) : (
                                <img src={hide} alt="hide" />
                            )}
                        </button>
                    </div>
                </div>

                {error && <p className="auth-form-error">{error}</p>}

                <BigButton
                    type="submit"
                    className="auth-form-submit-btn"
                    disabled={loading}
                >
                    {loading ? "Loging in..." : "Login"}
                </BigButton>
            </form>
        </Screen>
    );

    async function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
        e.preventDefault();
        setError("");
        setLoading(true);

        const result = await login({
            email: email,
            password: password,
        });

        await new Promise((f) => setTimeout(f, 500));

        if (result.ok) {
            const parsed_body =
                loginContract.routes.login.responses[200].body.parse(
                    await result.json(),
                );
            localStorage.setItem("token", parsed_body.token);
            navigate("/home/for-you");
        } else {
            if (result.status === 401) {
                setError("Incorrect email or password");
            }
        }
        setLoading(false);
    }
}
