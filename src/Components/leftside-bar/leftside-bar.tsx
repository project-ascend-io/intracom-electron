import React, { useState } from "react";
import "./leftside-bar.css";
import RightsideBar from "../rightside-bar/rightside-bar"; // Adjust the import path as necessary

const LeftsideBar: React.FC = () => {
  const [showEmailConfig, setShowEmailConfig] = useState<boolean>(false);
  const [showRightsideBar, setShowRightsideBar] = useState<boolean>(false);

  const toggleEmailConfigVisibility = (): void => {
    const newVisibility = !showEmailConfig;
    setShowEmailConfig(newVisibility);
    setShowRightsideBar(newVisibility); // Show RightsideBar only when Email Config is visible
  };

  const handleOtherComponentClick = (): void => {
    setShowRightsideBar(false); // Hide RightsideBar when other components are selected
  };

  return (
    <div className="sidebar-container">
      <div className="left-sidebar">
        <ul>
          <li onClick={handleOtherComponentClick}>
            <span role="img" aria-label="messages">
              💬
            </span>{" "}
            Messages
          </li>
          <li onClick={handleOtherComponentClick}>
            <span role="img" aria-label="channels">
              #️⃣
            </span>{" "}
            Channels
          </li>
          <li onClick={toggleEmailConfigVisibility}>
            <span role="img" aria-label="settings">
              ⚙️
            </span>{" "}
            Settings
          </li>
          {/* Conditionally render Email Configuration based on showEmailConfig */}
          {showEmailConfig && (
            <li className="nested">
              <span role="img" aria-label="email">
                📧
              </span>{" "}
              Email Configuration
            </li>
          )}
          <li onClick={handleOtherComponentClick}>
            <span role="img" aria-label="logout">
              🔓
            </span>{" "}
            Logout
          </li>
        </ul>
      </div>
      {showRightsideBar && <RightsideBar />}
    </div>
  );
};

export default LeftsideBar;
