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
    <div className="w-[95%] mx-auto align-middle text-left md:p-4">
      <h2 className="text-2xl font-bold mb-2.5 md:text-base">
        Organization Settings
      </h2>
      <p className=" text-gray-600 text-base">View your current settings.</p>
      <div className="flex flex-col mt-5 w-[90%] md:p-4 md:w-[95%] ">
        <h3 className="text-lg font-semibold border-b border-gray-300">
          General
        </h3>
        <div className="  flex flex-col gap-2.5 border-b py-2.5 border-gray-300 text-base">
          <span className="text-[#96ACC1]">Organization Name:</span>
          <span className=" text-gray-700">{organizationName}</span>
        </div>
        <div className="  flex flex-col gap-2.5  border-b py-2.5 border-gray-300 text-base">
          <span className="text-[#96ACC1]">Admin:</span>
          <span className="text-gray-700">{adminEmail}</span>
        </div>
      </div>

      <div className="w-[95%] mt-8 p-3">
        <div className=" flex justify-between border-b border-gray-300 py-2.5">
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
          <div className=" border-b py-2.5 border-gray-300 grid grid-cols-2 mb-2.5">
            <div className=" text-base">
              <p className=" text-[#96ACC1]">Server:</p>
              <span className="text-gray-700">{emailSettings.server}</span>
            </div>
            <div className=" text-base">
              <p className=" text-[#96ACC1]">Verified Sender Email:</p>
              <span className=" text-gray-700">
                {emailSettings.verified_sender_email}
              </span>
            </div>
          </div>
          <div className=" border-b py-2.5 border-gray-300 grid grid-cols-2 mb-2.5">
            <div className=" text-base">
              <p className=" text-[#96ACC1]">Username:</p>
              <span className=" text-gray-700">{emailSettings.username}</span>
            </div>
            <div className="  text-base">
              <p className=" text-[#96ACC1]">Password:</p>
              <span className=" text-gray-700">
                {emailSettings.password ? "***********" : ""}
              </span>
            </div>
          </div>

          <div className=" border-b py-2.5 border-gray-300 grid grid-cols-2 mb-2.5">
            <div className=" text-base">
              <p className=" text-[#96ACC1]">Security Type:</p>
              <span className="text-gray-700">
                {emailSettings.securityType}
              </span>
            </div>
            <div className=" text-base ">
              <p className=" text-[#96ACC1]">Port:</p>
              <span className=" text-gray-700">{emailSettings.port}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsIndex;
