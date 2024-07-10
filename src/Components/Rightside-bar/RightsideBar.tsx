import React, { useState } from "react";
import "./RightsideBar.css";

const RightsideBar: React.FC = () => {
  const api_url =
    typeof process !== "undefined" ? process.env.REACT_APP_API_URL : "";
  const [server, setServer] = useState("");
  const [port, setPort] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [securityType, setSecurityType] = useState("");
  const [testEmail, setTestEmail] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const validateEmailSettings = () => {
    if (!server || !port || !username || !password || !securityType) {
      setErrorMessage("All fields must be filled out.");
      return false;
    }
    if (!/^\S+@\S+\.\S+$/.test(testEmail)) {
      setErrorMessage("Invalid email format.");
      return false;
    }
    return true;
  };

  const handleSendTestEmail = async () => {
    if (!validateEmailSettings()) return;

    try {
      const response = await fetch(`${api_url}/email-settings/test`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          server,
          port,
          username,
          password,
          securityType,
          testEmail,
        }),
      });
      if (!response.ok) {
        throw new Error("Failed to send test email");
      }

      const data = await response.json();
      setSuccessMessage(
        data.message || `Test email sent successfully to ${testEmail}.`
      );
      setErrorMessage("");
    } catch (error) {
      setErrorMessage(
        error.message || "An error occurred while sending the test email."
      );
    }
  };

  const handleSave = async () => {
    if (!validateEmailSettings()) return;

    try {
      const response = await fetch(`${api_url}/email-settings`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          server,
          port,
          username,
          password,
          securityType,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to save email settings");
      }

      const data = await response.json();
      setSuccessMessage(data.message || "Email settings saved successfully.");
      setErrorMessage("");
    } catch (error) {
      setErrorMessage(
        error.message || "An error occurred while saving the email settings."
      );
    }
  };

  return (
    <div className="email-settings">
      <h1>Email Settings</h1>
      <p>Configure your email settings.</p>
      {/* newly added error handling */}
      {errorMessage && (
        <div className="error-message">
          <p>Error</p>
          <p>{errorMessage}</p>
        </div>
      )}
      <div className="form-group">
        <label>SMTP server</label>
        <input
          type="text"
          value={server}
          onChange={(e) => setServer(e.target.value)}
          placeholder="Server"
        />
      </div>
      <div className="form-group">
        <label>Port</label>
        <input
          type="text"
          value={port}
          onChange={(e) => setPort(e.target.value)}
          placeholder="Port"
        />
      </div>
      <div className="form-group">
        <label>Username</label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
        />
      </div>
      <div className="form-group">
        <label>Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
      </div>
      <div className="form-group">
        <label>Security type</label>
        <select
          value={securityType}
          onChange={(e) => setSecurityType(e.target.value)}
        >
          <option value="">Select security type</option>
          <option value="SSL">SSL</option>
          <option value="TLS">TLS</option>
        </select>
      </div>
      <div className="form-group">
        <label>Send test email</label>
        <input
          type="email"
          value={testEmail}
          onChange={(e) => setTestEmail(e.target.value)}
          placeholder="test@acme.com"
        />
        <button onClick={handleSendTestEmail}>Send Test Email</button>
      </div>
      {successMessage && (
        <div className="success-message">
          <p>Success</p>
          <p>{successMessage}</p>
        </div>
      )}
      <div className="buttons">
        <button onClick={handleSave}>Save</button>
        <button onClick={() => window.close()}>Cancel</button>
      </div>
    </div>
  );
};

export default RightsideBar;
