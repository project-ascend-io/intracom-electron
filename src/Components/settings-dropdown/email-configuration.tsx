import React, { useState } from "react";
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
import Navbar from "../nav-bar/nav-bar";
import LeftsideBar from "../leftside-bar/leftside-bar";

const EmailConfiguration: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const organizationId = user.organization._id;

  const [errorMessage, setErrorMessage] = useState<string>("");
  const [successMessage, setSuccessMessage] = useState<string>("");

  // Use React Hook Form with Zod resolver
  const {
    register,
    handleSubmit,
    formState: { errors },
    clearErrors,
  } = useForm<EmailSettingsFormValues>({
    resolver: zodResolver(emailSettingsSchema),
  });

  const onSubmit = async (data: EmailSettingsFormValues) => {
    try {
      const saveData = await saveEmailSettings(
        data.server,
        data.senderEmail,
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
        data.senderEmail,
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
  const handleGoBack = () => {
    navigate("/settings");
  };

  return (
    <>
      <Navbar />

      <div className="w-[400px] mx-auto p-5 text-left">
        <h1 className="text-2xl mb-2.5">Email Settings</h1>
        <p className="text-sm mb-5">Configure your email settings.</p>
        {errorMessage && (
          <div className=" mt-5 p-2.5 border border-red-500 rounded-md bg-red-100">
            <p className="font-bold">Error</p>
            <p>{errorMessage}</p>
          </div>
        )}
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label className="block font-bold mb-2.5 text-sm">
              SMTP Configurations
            </label>
            <label className="block font-bold mb-2.5 text-sm">Server</label>
            <input
              type="text"
              {...register("server")}
              className="w-[90%] p-2 border border-gray-300 rounded-md"
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
              {...register("senderEmail")}
              className="w-[90%] p-2 border border-gray-300 rounded-md"
            />
            {errors.senderEmail && (
              <p className="text-red-500">{errors.senderEmail.message}</p>
            )}
          </div>
          <div className="mb-4">
            <label className="block font-bold mb-2.5 text-sm">Port</label>
            <input
              type="text"
              {...register("port")}
              className="w-[90%] p-2 border border-gray-300 rounded-md"
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
              {...register("testEmail")}
              placeholder="test@acme.com"
              className="w-[90%] p-2 border border-gray-300 rounded-md"
            />
            {errors.testEmail && (
              <p className="text-red-500">{errors.testEmail.message}</p>
            )}
            <button
              type="button"
              onClick={handleSubmit(handleSendTestEmail)}
              className="mt-2.5 px-3 py-2 bg-blue-200 text-black font-bold rounded-md hover:bg-blue-300"
            >
              Send Test Email
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
              className="px-5 py-2 bg-blue-600 text-white font-bold rounded-lg hover:opacity-90"
            >
              Save
            </button>
          </div>
        </form>
        {successMessage && (
          <div className="success-message mt-5 p-2.5 border border-green-500 rounded-md bg-green-100">
            <p className="font-bold">Success</p>
            <p>{successMessage}</p>
          </div>
        )}
      </div>
    </>
  );
};

export default EmailConfiguration;
