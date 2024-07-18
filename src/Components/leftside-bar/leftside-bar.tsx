import React, { useState } from "react";
import "./leftside-bar.css";
import RightsideBar from "../settings-dropdown/email-configuration"; // Adjust the import path as necessary
import SettingIndex from "../settings-dropdown/setting-index";

const LeftsideBar: React.FC = () => {
  const [showRightsideBar, setShowRightsideBar] = useState<boolean>(false);
  const [showSettingIndex, setShowSettingIndex] = useState<boolean>(false);
  const [showSettingsList, setShowSettingsList] = useState<boolean>(false); // New state to control visibility of the settings list

  const handleEmailConfigClick = (): void => {
    setShowSettingIndex(false);
    setShowRightsideBar(true);
  };
  const handleCurrentConfigClick = (): void => {
    setShowSettingIndex(true);
    setShowRightsideBar(false);
  };

  const handleSettingsClick = (): void => {
    setShowSettingsList(!showSettingsList); // Toggle visibility of the settings list
    // setShowSettingIndex(true);
    // setShowRightsideBar(false);
  };

  const handleOtherComponentClick = (): void => {
    setShowRightsideBar(false);
    setShowSettingIndex(false);
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

          <div onClick={handleSettingsClick} style={{ cursor: "pointer" }}>
            <li>
              <span role="img" aria-label="settings">
                ⚙️
              </span>{" "}
              Settings
            </li>
            <ul
              style={{
                display: showSettingsList ? "block" : "none",
                listStyleType: "none",
                paddingLeft: "10px",
              }}
            >
              <li className="nested" onClick={handleCurrentConfigClick}>
                <span role="img" aria-label="email">
                  📧
                </span>{" "}
                View Current Configuration
              </li>
              <li className="nested" onClick={handleEmailConfigClick}>
                <span role="img" aria-label="email">
                  📧
                </span>{" "}
                Email Configuration
              </li>
            </ul>
          </div>

          <li onClick={handleOtherComponentClick}>
            <span role="img" aria-label="logout">
              🔓
            </span>{" "}
            Logout
          </li>
        </ul>
      </div>
      {showSettingIndex && <SettingIndex />}
      {showRightsideBar && <RightsideBar />}
    </div>
  );
};

export default LeftsideBar;
