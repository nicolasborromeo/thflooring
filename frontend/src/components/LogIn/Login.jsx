import React, { useState } from "react";
import "../assets/css/login.css";

const Login = () => {
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);

    try {
      const response = await fetch("/api/session", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        setErrorMessage(errorData.message || "An error occurred.");
      } else {
        // Handle successful login (e.g., redirect to dashboard)
        window.location.href = "/dashboard";
      }
    } catch (error) {
      setErrorMessage("Network error. Please try again later.");
    }
  };

  return (
    <div className="login-container">
      <div className="logo-container">
        <img src="../assets/images/th-logo.png" alt="company-logo" />
      </div>
      <h2>Login</h2>
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
  );
};

export default Login;
