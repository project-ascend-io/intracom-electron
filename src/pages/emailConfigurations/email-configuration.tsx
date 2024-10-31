import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {
  emailSettingsSchema,
  EmailSettingsFormValues,
} from "../../types/email-configuration";
import { zodResolver } from "@hookform/resolvers/zod";
import "./settings.css";
import {
  testEmailSettings,
  saveEmailSettings,
} from "../../services/email-settings-service";
import { useAuth } from "../../context/auth-context";
import { useNavigate } from "react-router-dom";
import { useEmailSettings } from "../../utils/custom-hooks/useEmailSettings"; // Import the custom hook

const EmailConfiguration: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const organizationId = user.organization._id;

  const { emailSettings, loading, error } = useEmailSettings(organizationId); // Use the custom hook
  const [isLoading, setIsLoading] = useState(false);
  const [isTested, setIsTested] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [successMessage, setSuccessMessage] = useState<string>("");
  const [isTesting, setIsTesting] = useState(false); // State to track if testing email

  // Use React Hook Form with Zod resolver
  const {
    register,
    handleSubmit,
    formState: { errors },
    clearErrors,
    reset, // Add reset function
  } = useForm<EmailSettingsFormValues>({
    resolver: zodResolver(emailSettingsSchema),
    defaultValues: {}, // Set default values to an empty object initially
  });

  // Prepopulate the form when emailSettings are fetched
  useEffect(() => {
    if (emailSettings) {
      reset(emailSettings); // Reset the form with fetched data
    } else {
      reset({}); // Reset the form to empty if no emailSettings
    }
  }, [emailSettings, reset]);

  const onSubmit = async (data: EmailSettingsFormValues) => {
    setIsLoading(true);
    try {
      const saveData = await saveEmailSettings(
        data.server,
        data.verified_sender_email,
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
    setIsLoading(false);
  };

  const handleSendTestEmail = async (data: EmailSettingsFormValues) => {
    if (isTested) {
      alert("This email has already been successfully tested.");
      return;
    }

    setIsLoading(true);
    setIsTesting(true);
    try {
      const testData = await testEmailSettings(
        organizationId,
        data.server,
        data.verified_sender_email,
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
        setIsTested(true);
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
    setIsLoading(false);
    setIsTesting(false);
  };

  const handleGoBack = () => {
    navigate("/settings");
  };

  return (
    <article className="w-full h-full overflow-y-auto">
      <div className="w-[60%] mx-auto p-5 text-left">
        <h1 className="text-2xl mb-2.5">Email Settings</h1>
        <p className="text-sm mb-5">Configure your email settings.</p>
        {errorMessage && (
          <div className=" mt-5 p-2.5 border border-red-500 rounded-md bg-red-100">
            <p className="font-bold">Error</p>
            <p>{errorMessage}</p>
          </div>
        )}
        {!loading ? ( // Wait until settings are loaded
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-4">
              <label className="block font-bold mb-2.5 text-sm">
                SMTP Configurations
              </label>
              <label className="block font-bold mb-2.5 text-sm">server</label>
              <input
                type="text"
                {...register("server")}
                className="w-[90%] p-2 border border-gray-300 rounded-md"
                defaultValue={emailSettings?.server}
              />
              {errors.server && (
                <p className="text-red-500">{errors.server.message}</p>
              )}
            </div>
            <div className="mb-4">
              <label className="block font-bold mb-2.5 text-sm">
                Verified Sender Email
              </label>
              <input
                type="text"
                {...register("verified_sender_email")}
                className="w-[90%] p-2 border border-gray-300 rounded-md"
                defaultValue={emailSettings?.verified_sender_email}
              />
              {errors.verified_sender_email && (
                <p className="text-red-500">
                  {errors.verified_sender_email.message}
                </p>
              )}
            </div>
            <div className="mb-4">
              <label className="block font-bold mb-2.5 text-sm">Port</label>
              <input
                type="number"
                {...register("port", { valueAsNumber: true })} // Use valueAsNumber to ensure the value is treated as a number
                className="w-[90%] p-2 border border-gray-300 rounded-md"
                defaultValue={emailSettings?.port}
              />
              {errors.port && (
                <p className="text-red-500">{errors.port.message}</p>
              )}
            </div>
            <div className="mb-4">
              <label className="block font-bold mb-2.5 text-sm">Username</label>
              <input
                type="text"
                {...register("username")}
                className="w-[90%] p-2 border border-gray-300 rounded-md"
                defaultValue={emailSettings?.username}
              />
              {errors.username && (
                <p className="text-red-500">{errors.username.message}</p>
              )}
            </div>
            <div className="mb-4">
              <label className="block font-bold mb-2.5 text-sm">Password</label>
              <input
                type="password"
                {...register("password")}
                className="w-[90%] p-2 border border-gray-300 rounded-md"
                defaultValue={emailSettings?.password}
              />
              {errors.password && (
                <p className="text-red-500">{errors.password.message}</p>
              )}
            </div>
            <div className="mb-4">
              <label className="block font-bold mb-2.5 text-sm">
                Security type
              </label>
              <select
                className="w-[90%] p-2 border border-gray-300 rounded-md"
                {...register("securityType")}
                defaultValue={emailSettings?.securityType}
              >
                <option value=""></option>
                <option value="SSL">SSL</option>
                <option value="TLS">TLS</option>
              </select>
              {errors.securityType && (
                <p className="text-red-500">{errors.securityType.message}</p>
              )}
            </div>
            <div className="mb-4">
              <label className="block font-bold mb-2.5 text-sm">
                Send test email
              </label>
              <input
                type="email"
                {...register("testEmail", { required: isTesting })} // Conditionally required
                placeholder="test@acme.com"
                className="w-[90%] p-2 border border-gray-300 rounded-md"
              />
              {errors.testEmail && (
                <p className="text-red-500">{errors.testEmail.message}</p>
              )}
              <button
                type="button"
                onClick={handleSubmit(handleSendTestEmail)}
                className={`mt-2.5 px-3 py-2 bg-blue-200 text-black font-bold rounded-md hover:bg-blue-300 ${isLoading || isTested ? "opacity-50 cursor-not-allowed" : ""}`}
                disabled={isLoading || isTested}
              >
                {isLoading ? "Sending..." : "Send Test Email"}
              </button>
            </div>

            <div className="buttons flex justify-end mt-5 gap-2.5">
              <button
                type="button"
                onClick={handleGoBack}
                className="px-5 py-2 bg-gray-100 text-black font-bold border border-gray-300 rounded-lg hover:opacity-90"
              >
                Cancel
              </button>
              <button
                type="submit"
                className={`px-5 py-2 bg-blue-600 text-white font-bold rounded-lg hover:opacity-90 ${isLoading ? "opacity-50 cursor-not-allowed" : ""}`}
                disabled={isLoading}
              >
                {isLoading ? "Save" : "Save"}
              </button>
            </div>
          </form>
        ) : (
          <p>Loading email settings...</p> // Loading indicator
        )}
        {successMessage && (
          <div className="success-message mt-5 p-2.5 border border-green-500 rounded-md bg-green-100">
            <p className="font-bold">Success</p>
            <p>{successMessage}</p>
          </div>
        )}
      </div>
    </article>
  );
};

export default EmailConfiguration;
