import { useState } from "react";
import { useNavigate } from "react-router-dom";
// import { userCreate } from '../../api/users.ts';
import "./auth.css";
import Screen from "@/components/Screen";
import BigTitle from "@/components/BigTitle";
import BigButton from "@/components/BigButton";
import show from "@/assets/icons/show.svg";
import hide from "@/assets/icons/hide.svg";

export default function RegisterPage() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    return (
        <Screen>
            <BigTitle>Register</BigTitle>
            <form onSubmit={handleSubmit}>
                <div className="form-field">
                    <label className="form-field-label" htmlFor="email">
                        Email
                    </label>
                    <div className="form-field-input-wrapper">
                        <input
                            id="email"
                            className="form-field-input"
                            type="email"
                            placeholder="john.doe@example.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            autoComplete="email"
                        />
                    </div>
                </div>

                <div className="form-field">
                    <label className="form-field-label" htmlFor="username">
                        Username
                    </label>
                    <div className="form-field-input-wrapper">
                        <input
                            id="username"
                            className="form-field-input"
                            type="text"
                            placeholder="JohnDoe"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            autoComplete="username"
                        />
                    </div>
                </div>

                <div className="form-field">
                    <label className="form-field-label" htmlFor="password">
                        Password
                    </label>
                    <div className="form-field-input-wrapper">
                        <input
                            id="password"
                            className="form-field-input"
                            type={showPassword ? "text" : "password"}
                            placeholder="MyStrongPasword123!"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            autoComplete="new-password"
                        />
                        <button
                            type="button"
                            className="form-password-toggle"
                            onClick={() => setShowPassword((v) => !v)}
                            aria-label={showPassword ? "Hide password" : "Show password"}
                        >
                            {showPassword ? (
                                <img src={show} alt="show" />
                            ) : (
                                <img src={hide} alt="hide" />
                            )}
                        </button>
                    </div>
                </div>

                {error && <p className="form-error">{error}</p>}

                <BigButton type="submit" className="form-submit-btn" disabled={loading}>
                    {loading ? "Registering..." : "Register"}
                </BigButton>
            </form>
        </Screen>
    );

    async function handleSubmit(e: React.SubmitEvent) {
        e.preventDefault();
        setError("");
        setLoading(true);
        try {
            // await userCreate({ email, password });
            await new Promise((f) => setTimeout(f, 500));
            throw Error;
            navigate("/auth/login");
        } catch {
            setError("Registration failed. Please try again.");
        } finally {
            setLoading(false);
        }
    }
}
