import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/auth-context";
import { organizationSchema } from "../../types/email-configuration";

import "./settings.css";
import { useNavigate } from "react-router-dom";

const SettingsIndex: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const userId = user._id;
  const organizationId = user.organization._id;
  const [emailSettings, setEmailSettings] = useState<any>({});
  const [organizationName, setOrganizationName] = useState<string>("");
  const [adminEmail, setAdminEmail] = useState<string>("");

  useEffect(() => {
    const fetchEmailSettings = async () => {
      try {
        const response = await fetch(
          `${process.env.API_URL}/organizations/${organizationId}/email-settings`,
          { credentials: "include" },
        );
        const data = await response.json();

        if (data.success) {
          console.log("Valid email settings:", data.responseObject);
          setEmailSettings(data.responseObject);

          // Fetch organization details using user ID
          const fetchOrganizationDetails = async () => {
            try {
              const orgResponse = await fetch(
                `${process.env.API_URL}/users/${userId}`,
                {
                  credentials: "include",
                },
              );
              const orgData = await orgResponse.json();

              if (orgData.success) {
                const parsedOrganizationData = organizationSchema.safeParse(
                  orgData.responseObject,
                );
                if (parsedOrganizationData.success) {
                  console.log(
                    "Organization details:",
                    parsedOrganizationData.data,
                  );
                  setOrganizationName(
                    parsedOrganizationData.data.organization.name,
                  );
                  setAdminEmail(parsedOrganizationData.data.email);
                } else {
                  console.error(
                    "Invalid organization data:",
                    parsedOrganizationData.error.errors,
                  );
                }
              }
            } catch (error) {
              console.error("Error fetching organization details:", error);
            }
          };

          fetchOrganizationDetails();
        } else {
          throw Error(data.message);
        }
      } catch (error) {
        console.error("Error fetching email settings:", error);
      }
    };

    fetchEmailSettings();
  }, [organizationId, userId]);

  const handleEdit = () => {
    // navigate to the email configuration page
    navigate("/email-configuration");

    console.log("Editing configuration...");
  };

  return (
    <div className="w-[600px] mx-auto p-5 text-left md:p-4 md:w-[95%]">
      <h2 className="text-2xl font-bold mb-2.5 md:md:text-base">
        Organization Settings
      </h2>
      <p className="text-sm text-gray-600 md:text-xs">
        View your current settings.
      </p>
      <div className="flex flex-col mt-5 w-[90%] md:p-4 md:w-[95%]">
        <h3 className="text-lg font-semibold">General</h3>
        <div className=" text-xs flex gap-2.5 border-b border-gray-300 md:text-base py-2.5 text-center">
          <span className="text-sm font-bold">Organization Name:</span>
          <span className=" text-gray-800">{organizationName}</span>
        </div>
        <div className=" text-xs flex gap-2.5  border-b border-gray-300 md:text-base py-2.5 text-center">
          <span className="text-sm font-bold">Admin:</span>
          <span className=" text-gray-800">{adminEmail}</span>
        </div>
      </div>

      <div className="lg:w-[600px] md:w-[400px] w-[300px] mb-5 p-3">
        <div className="theTwo flex justify-between">
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
        <div className=" mt-5">
          <div className=" border-b border-gray-300 flex justify-between mb-2.5">
            <div className=" text-xs flex gap-2.5   md:text-base py-2.5 text-center">
              <span className="text-sm font-bold">Server:</span>
              <span className=" text-gray-800">{emailSettings.server}</span>
            </div>
            <div className=" text-xs flex gap-2.5   md:text-base py-2.5 text-center">
              <span className="text-sm font-bold">Verified Sender Email:</span>
              <span className=" text-gray-800">
                {emailSettings.senderEmail}
              </span>
            </div>
          </div>
          <div className="theTwo border-b border-gray-300 flex justify-between mb-2.5">
            <div className=" text-xs flex gap-2.5  md:text-base py-2.5 text-center">
              <span className="text-sm font-bold">Username:</span>
              <span className=" text-gray-800">{emailSettings.username}</span>
            </div>
            <div className=" text-xs flex gap-2.5   md:text-base py-2.5 text-center">
              <span className="text-sm font-bold">Password:</span>
              <span className=" text-gray-800">{emailSettings.password}</span>
            </div>
          </div>

          <div className="theTwo border-b border-gray-300 flex justify-between mb-2.5">
            <div className=" text-xs flex gap-2.5   md:text-base py-2.5 text-center">
              <span className="text-sm font-bold">Security Type:</span>
              <span className=" text-gray-800">
                {emailSettings.securityType}
              </span>
            </div>
            <div className=" text-xs flex gap-2.5   md:text-base py-2.5 text-center">
              <span className="text-sm font-bold">Port:</span>
              <span className=" text-gray-800">{emailSettings.port}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsIndex;
