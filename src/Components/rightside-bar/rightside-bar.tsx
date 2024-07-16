import React, { useState } from "react";
import "./rightside-bar.css";
import {
  testEmailSettings,
  saveEmailSettings,
  getEmailSettings,
  updateEmailSettings,
} from "../../services/email-settings-service";

const RightsideBar: React.FC = () => {
  // const api_url = process.env.REACT_APP_API_URL || "";
  const [server, setServer] = useState<string>("");
  const [port, setPort] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [securityType, setSecurityType] = useState<string>("");
  const [testEmail, setTestEmail] = useState<string>("");
  const [organizationId, setOrganizationId] = useState<string>("1");
  const [organization, setOrganization] = useState<string>("Organization 1");
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

  const handleSave = async (): Promise<void> => {
    if (!validateEmailSettings()) return;

    try {
      const data = await saveEmailSettings(
        server,
        Number(port),
        username,
        password,
        securityType,
        organizationId,
        organization
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
  //
  // const handleGetEmailSettings = async (): Promise<void> => {
  //   if (!validateEmailSettings()) return;
  //   try {
  //     const data = await getEmailSettings(organizationId);
  //     if (data.success && data.data) {
  //       setServer(data.data.server);
  //       setPort(data.data.port.toString());
  //       setUsername(data.data.username);
  //       setPassword(data.data.password);
  //       setSecurityType(data.data.securityType);
  //       setOrganizationId(data.data.organization);
  //       setOrganization(data.data.organization);
  //       setSuccessMessage("Email settings fetched successfully.");
  //       setErrorMessage("");
  //     } else {
  //       setErrorMessage(
  //         data.message || "An error occurred while getting the email settings."
  //       );
  //     }
  //   } catch (error: any) {
  //     setErrorMessage(
  //       error.message || "An error occurred while getting the email settings."
  //     );
  //   }
  // };
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
          organization: data.data.organization,
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
  const handleUpdateEmailSettings = async (): Promise<void> => {
    if (!validateEmailSettings()) return;
    try {
      const data = await updateEmailSettings(
        emailSettingsResponse._id,
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
          placeholder="test@example.com"
        />
        <button onClick={handleSendTestEmail}>Send Test Email</button>
      </div>
      {/* >>>>>>>newly added organization field */}
      <div className="form-group">
        <label>Organization</label>
        <select
          value={organizationId}
          onChange={(e) => setOrganization(e.target.value)}
        >
          <option value="1">Organization 1</option>
          <option value="2">Organization 2</option>
          <option value="3">Organization 3</option>
        </select>
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
