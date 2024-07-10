import React, { useState } from "react";
import "./LeftsideBar.css";
import RightsideBar from "../Rightside-bar/RightsideBar"; // Adjust the import path as necessary

const LeftsideBar: React.FC = () => {
  const [showEmailConfig, setShowEmailConfig] = useState(false);
  const [showRightsideBar, setShowRightsideBar] = useState(false);

  const toggleEmailConfigVisibility = () => {
    const newVisibility = !showEmailConfig;
    setShowEmailConfig(newVisibility);
    setShowRightsideBar(newVisibility); // Show RightsideBar only when Email Config is visible
  };

  const handleOtherComponentClick = () => {
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
