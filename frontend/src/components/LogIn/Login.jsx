import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./login.css";
import { csrfFetch } from "../../csrf/csrf";

const Login = () => {
    const navigate = useNavigate()
    const [errorMessage, setErrorMessage] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const credentials = Object.fromEntries(formData)


        try {
            const response = await csrfFetch("/api/session", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(credentials)
            });

            if (!response.ok) {
                const errorData = await response.json();
                setErrorMessage(errorData.message || "An error occurred.");
            } else {

                navigate("/");
            }
        } catch (error) {
            console.log(error)
            setErrorMessage("Network error. Please try again later.");
        }
    };

    return (
        <div className="login-container">
            <div className="login-form-container">
                <div className="logo-container">
                    <img src="public/th-logo.png" alt="company-logo" />
                </div>

                {errorMessage && <div id="error-message" className="error">{errorMessage}</div>}
                <form id="login-form" onSubmit={handleSubmit}>
                    <div className="input-group">
                        <label htmlFor="username">Username:</label>
                        <input type="text" id="username" name="username" required />
                    </div>
                    <div className="input-group">
                        <label htmlFor="password">Password:</label>
                        <input type="password" id="password" name="password" required />
                    </div>
                    <button type="submit">Login</button>
                </form>
            </div>
        </div>
    );
};

export default Login;
