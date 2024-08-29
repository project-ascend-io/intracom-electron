import React, { useState } from "react";
import { useForm } from "react-hook-form";
import {
  emailSettingsSchema,
  EmailSettingsFormValues,
} from "../../types/emal-configuration";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import "./settings.css";
import {
  testEmailSettings,
  saveEmailSettings,
} from "../../services/email-settings-service";
import { useAuth } from "../../context/auth-context";

const EmailConfiguration: React.FC = () => {
  const { user } = useAuth();
  const organizationId = user.organization._id;

  const [errorMessage, setErrorMessage] = useState<string>("");
  const [successMessage, setSuccessMessage] = useState<string>("");

  // Use React Hook Form with Zod resolver
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    clearErrors,
  } = useForm<EmailSettingsFormValues>({
    resolver: zodResolver(emailSettingsSchema),
  });

  const onSubmit = async (data: EmailSettingsFormValues) => {
    try {
      const saveData = await saveEmailSettings(
        data.server,
        Number(data.port),
        data.username,
        data.password,
        data.securityType,
        organizationId,
      );

      if (saveData.success) {
        setSuccessMessage(
          saveData.message || "Email settings saved successfully.",
        );
        setErrorMessage("");
        clearErrors();
      } else {
        setErrorMessage(
          saveData.message ||
            "An error occurred while saving the email settings.",
        );
        setSuccessMessage("");
      }
    } catch (error: any) {
      setErrorMessage(
        error.message || "An error occurred while saving the email settings.",
      );
      setSuccessMessage("");
    }
  };

  const handleSendTestEmail = async (data: EmailSettingsFormValues) => {
    try {
      const testData = await testEmailSettings(
        organizationId,
        data.server,
        Number(data.port),
        data.username,
        data.password,
        data.securityType,
        data.testEmail,
      );

      if (testData.success) {
        setSuccessMessage(testData.message);
        setErrorMessage("");
        clearErrors();
      } else {
        setErrorMessage(
          testData.message || "An error occurred while sending the test email.",
        );
        setSuccessMessage("");
      }
    } catch (error: any) {
      setErrorMessage(
        error.message || "An error occurred while sending the test email.",
      );
      setSuccessMessage("");
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
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-group">
          <label>SMTP Configurations</label>
          <label>Server</label>
          <input type="text" {...register("server")} />
          {errors.server && <p>{errors.server.message}</p>}
        </div>
        <div className="form-group">
          <label>Verified Sender Email</label>
          <input type="text" {...register("senderEmail")} />
          {errors.senderEmail && <p>{errors.senderEmail.message}</p>}
        </div>
        <div className="form-group">
          <label>Port</label>
          <input type="text" {...register("port")} />
          {errors.port && <p>{errors.port.message}</p>}
        </div>
        <div className="form-group">
          <label>Username</label>
          <input type="text" {...register("username")} />
          {errors.username && <p>{errors.username.message}</p>}
        </div>
        <div className="form-group">
          <label>Password</label>
          <input type="password" {...register("password")} />
          {errors.password && <p>{errors.password.message}</p>}
        </div>
        <div className="form-group">
          <label>Security type</label>
          <select className="security-type" {...register("securityType")}>
            <option value=""></option>
            <option value="SSL">SSL</option>
            <option value="TLS">TLS</option>
          </select>
          {errors.securityType && <p>{errors.securityType.message}</p>}
        </div>
        <div className="form-group">
          <label>Send test email</label>
          <input
            type="email"
            {...register("testEmail")}
            placeholder="test@acme.com"
          />
          {errors.testEmail && <p>{errors.testEmail.message}</p>}
          <button type="button" onClick={handleSubmit(handleSendTestEmail)}>
            Send Test Email
          </button>
        </div>
        <div className="buttons">
          <button type="button" onClick={() => window.close()}>
            Cancel
          </button>
          <button type="submit">Save</button>
        </div>
      </form>
      {successMessage && (
        <div className="success-message">
          <p>Success</p>
          <p>{successMessage}</p>
        </div>
      )}
    </div>
  );
};

export default EmailConfiguration;
