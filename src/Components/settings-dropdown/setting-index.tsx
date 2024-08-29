import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/auth-context";
import { z } from "zod";
import "./settings.css";

// Define Zod schema for validation
const emailSettingsSchema = z.object({
  server: z.string().optional(),
  senderEmail: z.string().optional(),
  port: z.string().optional(),
  username: z.string().optional(),
  password: z.string().optional(),
  securityType: z.enum(["SSL", "TLS"]).optional(),
});

const organizationSchema = z.object({
  organization: z.object({
    name: z.string().min(1, { message: "Organization name is required." }),
  }),
  email: z.string().email({ message: "Invalid email format." }),
});

const SettingsIndex: React.FC = () => {
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
          const parsedEmailSettings = emailSettingsSchema.safeParse(
            data.responseObject,
          );

          if (parsedEmailSettings.success) {
            console.log("Valid email settings:", parsedEmailSettings.data);
            setEmailSettings(parsedEmailSettings.data);
          } else {
            console.error(
              "Invalid email settings data:",
              parsedEmailSettings.error.errors,
            );
          }

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
        }
      } catch (error) {
        console.error("Error fetching email settings:", error);
      }
    };

    fetchEmailSettings();
  }, [organizationId, userId]);

  const handleEdit = () => {
    // Logic to edit the configuration will go here
    console.log("Editing configuration...");
  };

  return (
    <div className="email-settings">
      <h2 className="heading">Organization Settings</h2>
      <p className="subHeading">View your current settings.</p>
      <div className="section">
        <h3>General</h3>
        <div className="infoRow">
          <span className="label">Organization Name:</span>
          <span className="value">{organizationName}</span>
        </div>
        <div className="infoRow">
          <span className="label">Admin:</span>
          <span className="value">{adminEmail}</span>
        </div>
      </div>

      <div className="section-2">
        <div className="theTwo">
          <h3>Email Settings</h3>
          <div className="actionButtons">
            <button onClick={handleEdit}>Edit</button>
          </div>
        </div>
        <div className="emailSettings">
          <div className="theTwo">
            <div className="infoRow">
              <span className="label">Server:</span>
              <span className="value">{emailSettings.server}</span>
            </div>
            <div className="infoRow">
              <span className="label">Verified Sender Email:</span>
              <span className="value">{emailSettings.senderEmail}</span>
            </div>
          </div>
          <div className="theTwo">
            <div className="infoRow">
              <span className="label">Username:</span>
              <span className="value">{emailSettings.username}</span>
            </div>
            <div className="infoRow">
              <span className="label">Password:</span>
              <span className="value">{emailSettings.password}</span>
            </div>
          </div>

          <div className="theTwo">
            <div className="infoRow">
              <span className="label">Security Type:</span>
              <span className="value">{emailSettings.securityType}</span>
            </div>
            <div className="infoRow">
              <span className="label">Port:</span>
              <span className="value">{emailSettings.port}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsIndex;
