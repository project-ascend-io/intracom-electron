const ORG_URL = "http://localhost:8080/organizations";
const USR_URL = "http://localhost:8080/users";
const Base_URL = "http://localhost:8080";
//  const Base_URL = process.env.REACT_APP_API_URL;

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./settings.css";

const SettingsIndex: React.FC = () => {
  const { id } = useParams<{ id: string }>(); // Get the organization ID from the route params
  const [emailSettings, setEmailSettings] = useState<any>({});
  const [organizationName, setOrganizationName] = useState<string>("");
  const [adminEmail, setAdminEmail] = useState<string>("");

  useEffect(() => {
    // Fetch email settings from the API
    const fetchEmailSettings = async () => {
      try {
        const response = await fetch(
          `${Base_URL}/organizations/${id}/email-settings`,
          // `${Base_URL}/organizations/669f03102a97b116272c2085/email-settings`, // Hardcoded organization id because we're wrapping up the auth process. For testing purposes: replace value with you org id.
          // @todo Replace hardcoded orgId during/after auth integration.
        );
        const data = await response.json();
        if (data.success) {
          console.log("Email settings:", data.responseObject);
          setEmailSettings(data.responseObject);

          // Fetch organization details using user ID
          const fetchOrganizationDetails = async () => {
            try {
              const orgResponse = await fetch(
                // ${Base_URL}/users/${id}`
                `${Base_URL}/users/669f03102a97b116272c2087`, // Hardcoded User id because we're wrapping up the auth process. For testing purposes: replace value with you User id.
                // @todo Replace hardcoded userId during/after auth integration.
              );
              const orgData = await orgResponse.json();
              if (orgData.success) {
                console.log("Organization details:", orgData.responseObject);
                setOrganizationName(orgData.responseObject.organization.name);
                setAdminEmail(orgData.responseObject.email);
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
  }, [id]); // Depend on the organization ID

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
              <span className="label">Port:</span>
              <span className="value">{emailSettings.port}</span>
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
