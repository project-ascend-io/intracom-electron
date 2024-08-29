import React, { useState } from "react";
import "./leftside-bar.css";
import EmailConfiguration from "../settings-dropdown/email-configuration"; // Adjust the import path as necessary
import SettingIndex from "../settings-dropdown/setting-index";
import { FaMessage } from "react-icons/fa6";
import { IoSettingsOutline } from "react-icons/io5";
import { FiLogOut } from "react-icons/fi";
import { LuBringToFront } from "react-icons/lu";
import { MdNumbers, MdOutlineEmail } from "react-icons/md";

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
    // setShowSettingIndex(true);
    setShowSettingsList(!showSettingsList); // Toggle visibility of the settings list
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
            {/* We are using react-icons for now until image handling configuration in electron app is done. */}
            {/* @todo: replace the image with provided Ui-design image once image handling is done. */}
            <FaMessage className="icons" />
            Messages
          </li>
          <li onClick={handleOtherComponentClick}>
            {/* We are using react-icons for now until image handling configuration in electron app is done. */}
            {/* @todo: replace the image with provided Ui-design image once image handling is done. */}
            <MdNumbers className="icons" />
            Channels
          </li>

          <div onClick={handleSettingsClick} style={{ cursor: "pointer" }}>
            <li>
              {/* We are using react-icons for now until image handling configuration in electron app is done. */}
              {/* @todo: replace the image with provided Ui-design image once image handling is done. */}
              <IoSettingsOutline className="icons" />
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
                {/* We are using react-icons for now until image handling configuration in electron app is done. */}
                {/* @todo: replace the image with provided Ui-design image once image handling is done. */}
                <LuBringToFront />
                View Current Configuration
              </li>
              {/* <li className="nested" onClick={handleEmailConfigClick}>
                <MdOutlineEmail className="icons" />
                Email Configuration
              </li> */}
              {/* The email-configuration page linked to edit button */}
            </ul>
          </div>

          <li onClick={handleOtherComponentClick}>
            {/* We are using react-icons for now until image handling configuration in electron app is done. */}
            {/* @todo: replace the image with provided Ui-design image once image handling is done. */}
            <FiLogOut className="icons" />
            Logout
          </li>
        </ul>
      </div>
      {showSettingIndex && <SettingIndex />}
      {/* {showRightsideBar && <EmailConfiguration />} */}
    </div>
  );
};

export default LeftsideBar;
