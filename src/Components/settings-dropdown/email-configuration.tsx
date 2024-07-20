import React, { useState } from "react";
import { BsQuestionCircle } from "react-icons/bs";
import "./settings.css";
import {
  testEmailSettings,
  saveEmailSettings,
  getEmailSettings,
  updateEmailSettings,
} from "../../services/email-settings-service";

const EmailConfiguration: React.FC = () => {
  // const api_url = process.env.REACT_APP_API_URL || "";
  const [server, setServer] = useState<string>("");
  const [port, setPort] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [securityType, setSecurityType] = useState<string>("");
  const [testEmail, setTestEmail] = useState<string>("");
  const [organizationId, setOrganizationId] = useState<string>("1");
  // const [organization, setOrganization] = useState<string>("Organization 1");
  const [successMessage, setSuccessMessage] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [emailSettingsResponse, setEmailSettingsResponse] = useState<any>({});

  const validateEmailSettings = (): boolean => {
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
  // TEST EMAIL SETTINGS>>>>>>>
  const handleSendTestEmail = async (): Promise<void> => {
    if (!validateEmailSettings()) return;

    try {
      const data = await testEmailSettings(
        server,
        Number(port),
        username,
        password,
        securityType,
        testEmail
      );

      if (data.success) {
        setSuccessMessage(data.message);
        setErrorMessage("");
      } else {
        setErrorMessage(
          data.message || "An error occurred while sending the test email."
        );
      }
    } catch (error: any) {
      setErrorMessage(
        error.message || "An error occurred while sending the test email."
      );
    }
  };

  // SAVE EMAIL SETTINGS AFTER SUCCESS>>>>>>>
  const handleSave = async (): Promise<void> => {
    if (!validateEmailSettings()) return;

    try {
      const data = await saveEmailSettings(
        server,
        Number(port),
        username,
        password,
        securityType,
        organizationId
        // organization
      );

      if (data.success) {
        setSuccessMessage(data.message || "Email settings saved successfully.");
        setErrorMessage("");
      } else {
        setErrorMessage(
          data.message || "An error occurred while saving the email settings."
        );
      }
    } catch (error: any) {
      setErrorMessage(
        error.message || "An error occurred while saving the email settings."
      );
    }
  };
  // FETCHING EMAIL SETTINGS>>>>>>>
  const handleGetEmailSettings = async (): Promise<void> => {
    if (!validateEmailSettings()) return;
    try {
      const data = await getEmailSettings(organizationId);
      if (data.success && data.data) {
        //setEmailSettingsResponse is a function to update the state with the desired response format
        setEmailSettingsResponse({
          _id: data.data._id, // Assuming _id is part of the response.
          server: data.data.server,
          port: data.data.port,
          username: data.data.username,
          password: data.data.password,
          securityType: data.data.securityType,
          // organization: data.data.organization,
        });
        setSuccessMessage("Email settings fetched successfully.");
        setErrorMessage("");
      } else {
        setErrorMessage(
          data.message || "An error occurred while getting the email settings."
        );
      }
    } catch (error: any) {
      setErrorMessage(
        error.message || "An error occurred while getting the email settings."
      );
    }
  };
  // UPDATE EMAIL SETTINGS>>>>>>>>
  const handleUpdateEmailSettings = async (): Promise<void> => {
    if (!validateEmailSettings()) return;
    try {
      const data = await updateEmailSettings(
        server,
        Number(port),
        username,
        password,
        securityType,
        organizationId
      );
      if (data.success) {
        setSuccessMessage(
          data.message || "Email settings updated successfully."
        );
        setErrorMessage("");
      } else {
        setErrorMessage(
          data.message || "An error occurred while updating the email settings."
        );
      }
    } catch (error: any) {
      setErrorMessage(
        error.message || "An error occurred while updating the email settings."
      );
    }
  };

  return (
    <div className="email-settings">
      <h1>Email Settings</h1>
      <p>Configure your email settings.</p>
      {errorMessage && (
        <div className="error-message">
          <p>Error</p>
          <p>{errorMessage}</p>
        </div>
      )}
      <form action="">
        <div className="form-group">
          <label>SMTP server</label>
          <label>server</label>
          <input
            type="text"
            value={server}
            onChange={(e) => setServer(e.target.value)}
          />

          {/* <div style={{ position: "relative", display: "inline-block" }}>
            <input
              type="text"
              value={server}
              onChange={(e) => setServer(e.target.value)}
              style={{ paddingRight: "30px" }} // Add padding to prevent text from being hidden by the icon
            />
            <BsQuestionCircle
              style={{
                position: "absolute",
                right: "10px",
                top: "50%",
                transform: "translateY(-50%)",
                pointerEvents: "none", // Makes the icon non-interactive
              }}
            />
          </div> */}
        </div>
        <div className="form-group">
          <label>Port</label>
          <input
            type="text"
            value={port}
            onChange={(e) => setPort(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Security type</label>
          <select
            className="security-type"
            value={securityType}
            onChange={(e) => setSecurityType(e.target.value)}
          >
            <option value=""></option>
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
        {/* >>>>>>>newly added organization field */}
        {/* <div className="form-group">
        <label>Organization</label>
        <select
          value={organizationId}
          onChange={(e) => setOrganization(e.target.value)}
        >
          <option value="1">Organization 1</option>
          <option value="2">Organization 2</option>
          <option value="3">Organization 3</option>
        </select>
      </div> */}
      </form>

      <div className="success-from">
        {successMessage && (
          <div className="success-message">
            <p>Success</p>
            <p>{successMessage}</p>
          </div>
        )}
        <div className="buttons">
          <button onClick={() => window.close()}>Cancel</button>
          <button onClick={handleSave}>Save</button>
        </div>
      </div>
    </div>
  );
};

export default EmailConfiguration;
