// "http://localhost:8080/organizations/668f0c2ce629e80c6fa7ec7d/email-settings"
// Replace with a valid ObjectId

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./settings.css";

const SettingsIndex: React.FC = () => {
  const { id } = useParams<{ id: string }>(); // Get the organization ID from the route params
  const [emailSettings, setEmailSettings] = useState<any>({});
  const [organizationName, setOrganizationName] = useState<string>("");
  const [adminEmail, setAdminEmail] = useState<string>("");

  useEffect(() => {
    // Validate the id before making the API call
    // if (!/^[0-9a-fA-F]{24}$/.test(id)) {
    //   console.error("Invalid ObjectId format");
    //   return;
    // }

    // Fetch email settings from the API
    const fetchEmailSettings = async () => {
      try {
        const response = await fetch(
          `http://localhost:8080/organizations/${id}/email-settings`
        );
        const data = await response.json();
        if (data.success) {
          setEmailSettings(data.responseObject);

          // Fetch organization details
          const organizationResponse = await fetch(
            `http://localhost:8080/organizations/${data.responseObject.organization}`
          );
          const organizationData = await organizationResponse.json();
          if (organizationData.success) {
            setOrganizationName(organizationData.responseObject.name); // Set organization name dynamically
            setAdminEmail(organizationData.responseObject.adminEmail); // Set admin email dynamically
          }
        }
      } catch (error) {
        console.error("Error fetching email settings:", error);
      }
    };

    fetchEmailSettings();
  }, [id]); // Depend on the organization ID

  const handleEdit = () => {
    // Logic to edit the configuration will go here
    console.log("Editing configuration...");
  };

  return (
    <div className="container">
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

      <div className="section">
        <div className="actionButtons">
          <button onClick={handleEdit}>Edit</button>
        </div>
        <h3>Email Settings</h3>
        <div className="emailSettings">
          <div className="infoRow">
            <span className="label">Server:</span>
            <span className="value">{emailSettings.server}</span>
          </div>
          <div className="infoRow">
            <span className="label">Port:</span>
            <span className="value">{emailSettings.port}</span>
          </div>
          <div className="infoRow">
            <span className="label">Username:</span>
            <span className="value">{emailSettings.username}</span>
          </div>
          <div className="infoRow">
            <span className="label">Password:</span>
            <span className="value">********</span>
          </div>
          <div className="infoRow">
            <span className="label">Security Type:</span>
            <span className="value">{emailSettings.securityType}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsIndex;
