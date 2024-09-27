import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/auth-context";
import { useNavigate } from "react-router-dom";
import Navbar from "../nav-bar/nav-bar";
import LeftsideBar from "../leftside-bar/leftside-bar";
import { getEmailSettings } from "../../services/email-settings-service";
import "./settings.css";

const SettingsIndex: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth(); // Access the user from auth context
  const [emailSettings, setEmailSettings] = useState<any>({});
  const [organizationName, setOrganizationName] = useState<string>("");

  // Redirect to login if user is not authenticated
  useEffect(() => {
    if (!user) {
      navigate("/login");
    } else {
      // Set the organization name
      setOrganizationName(user.organization.name);

      // If user is an admin, fetch email settings
      if (user.role === "Admin") {
        const fetchEmailSettings = async () => {
          try {
            const data = await getEmailSettings(user.organization._id);
            setEmailSettings(data.responseObject);
          } catch (error: any) {
            console.error("Error fetching email settings:", error);
          }
        };
        fetchEmailSettings();
      }
    }
  }, [user, navigate]);

  const handleEdit = () => {
    navigate("/email-configuration");
    console.log("Editing configuration...");
  };

  return (
    <>
      <Navbar />
      <div className="flex flex-row">
        <LeftsideBar />
        <div className="flex-grow mx-auto align-middle text-left p-4 pr-8">
          <h2 className="text-2xl font-bold mb-2.5">Organization Settings</h2>
          <p className="text-gray-600 text-sm">View your current settings.</p>

          {/* Show Organization Name */}
          <div className="flex flex-col mt-5">
            <h3 className="text-lg font-semibold">General</h3>
            <div className="flex flex-col gap-2.5 border-b py-2.5 border-gray-300 text-base">
              <span className="text-[#96ACC1]">Organization Name:</span>
              <span className="text-gray-700">{organizationName}</span>
            </div>
          </div>

          {/* Show additional settings if the user is an admin */}
          {user?.role === "Admin" && (
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
                    <span className="text-gray-700">
                      {emailSettings?.server}
                    </span>
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
                    <span className="text-gray-700">
                      {emailSettings?.username}
                    </span>
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
      </div>
    </>
  );
};

export default SettingsIndex;
