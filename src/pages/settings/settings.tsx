import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/auth-context";
import "./Settings.css";
import { useNavigate } from "react-router-dom";
import { getEmailSettings } from "../../services/email-settings-service";

const Settings: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const userId = user._id;
  const organizationId = user.organization._id;
  const [emailSettings, setEmailSettings] = useState<any>({});
  const [organizationName, setOrganizationName] = useState<string>("");

  useEffect(() => {
    console.log(user);
    setOrganizationName(user.organization.name);

    const fetchEmailSettings = async () => {
      try {
        const data = await getEmailSettings(organizationId);
        setEmailSettings(data.responseObject);
      } catch (error: any) {
        console.error("Error fetching email settings:", error);
      }
    };

    fetchEmailSettings();
  }, [organizationId, userId]);

  const handleEdit = () => {
    navigate("/email-configuration");
    console.log("Editing configuration...");
  };

  return (
    <div className="flex-grow mx-auto align-middle text-left p-4 pr-8">
      <h2 className="text-2xl font-bold mb-2.5">Organization Settings</h2>
      <p className="text-gray-600 text-sm">View your current settings.</p>
      <div className="flex flex-col mt-5">
        <h3 className="text-lg font-semibold">General</h3>
        <div className="flex flex-col gap-2.5 border-b py-2.5 border-gray-300 text-base">
          <span className="text-[#96ACC1]">Organization Name:</span>
          <span className="text-gray-700">{organizationName}</span>
        </div>
      </div>

      {user.role === "Admin" && (
        <div className="mt-8">
          <div className="flex justify-between">
            <h3 className="text-lg font-semibold">Email Settings</h3>
            <div className="actionButtons">
              <button
                onClick={handleEdit}
                className="bg-gray-600 text-white px-4 py-1 rounded-md hover:bg-blue-600"
              >
                Edit
              </button>
            </div>
          </div>
          <div className="mt-5">
            <div className="border-b border-gray-300 grid grid-cols-2 mb-2.5">
              <div className="text-base">
                <p className="text-[#96ACC1]">Server:</p>
                <span className="text-gray-700">{emailSettings?.server}</span>
              </div>
              <div className="text-base">
                <p className="text-[#96ACC1]">Verified Sender Email:</p>
                <span className="text-gray-700">
                  {emailSettings?.verified_sender_email}
                </span>
              </div>
            </div>
            <div className="border-b py-2.5 border-gray-300 grid grid-cols-2 mb-2.5">
              <div className="text-base">
                <p className="text-[#96ACC1]">Username:</p>
                <span className="text-gray-700">{emailSettings?.username}</span>
              </div>
              <div className="text-base">
                <p className="text-[#96ACC1]">Password:</p>
                <span className="text-gray-700">
                  {emailSettings?.password ? "***********" : ""}
                </span>
              </div>
            </div>
            <div className="border-b py-2.5 border-gray-300 grid grid-cols-2 mb-2.5">
              <div className="text-base">
                <p className="text-[#96ACC1]">Security Type:</p>
                <span className="text-gray-700">
                  {emailSettings?.securityType}
                </span>
              </div>
              <div className="text-base">
                <p className="text-[#96ACC1]">Port:</p>
                <span className="text-gray-700">{emailSettings?.port}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Settings;
