import React, { useState } from "react";
import "./leftside-bar.css";
import EmailConfiguration from "../settings-dropdown/email-configuration"; // Adjust the import path as necessary
import SettingIndex from "../settings-dropdown/setting-index";
import { FaMessage } from "react-icons/fa6";
import { IoSettingsOutline } from "react-icons/io5";
import { FiLogOut } from "react-icons/fi";
import { LuBringToFront } from "react-icons/lu";
import { MdNumbers, MdOutlineEmail } from "react-icons/md";
import { set } from "@dotenvx/dotenvx";

const LeftsideBar: React.FC = () => {
  // const [showRightsideBar, setShowRightsideBar] = useState<boolean>(false);
  const [activeItem, setActiveItem] = useState<string | null>(null);
  const [showSettingIndex, setShowSettingIndex] = useState<boolean>(false);
  const [showSettingsList, setShowSettingsList] = useState<boolean>(false); // New state to control visibility of the settings list

  const handleCurrentConfigClick = (): void => {
    setShowSettingIndex(true);
    // setShowRightsideBar(false);
  };

  const handleSettingsClick = (): void => {
    setShowSettingIndex(true);
    setActiveItem("settings");
    setShowSettingsList(!showSettingsList); // Toggle visibility of the settings list
  };
  const handleMessagesClick = (): void => {
    setActiveItem("messages");
    setShowSettingIndex(false);
  };
  const handleChannelsClick = (): void => {
    setActiveItem("channels");
    setShowSettingIndex(false);
  };

  const handleLogoutClick = (): void => {
    setActiveItem("logout");
    setShowSettingIndex(false);
  };

  return (
    <div className="sidebar-container flex">
      <div className="left-sidebar flex-grow p-2.5 ml-4 bg-white h-screen min-w-[200px] max-w-[400px]">
        <ul>
          <li
            onClick={handleMessagesClick}
            className={`cursor-pointer rounded-lg ${activeItem === "messages" ? "bg-gray-300" : ""}`}
          >
            {/* We are using react-icons for now until image handling configuration in electron app is done. */}
            {/* @todo: replace the image with provided Ui-design image once image handling is done. */}
            <FaMessage className="icons ml-2" />
            Messages
          </li>
          <li
            onClick={handleChannelsClick}
            className={`cursor-pointer rounded-lg ${activeItem === "channels" ? "bg-gray-300" : ""}`}
          >
            {/* We are using react-icons for now until image handling configuration in electron app is done. */}
            {/* @todo: replace the image with provided Ui-design image once image handling is done. */}
            <MdNumbers className="icons ml-2" />
            Channels
          </li>

          <div
            onClick={handleSettingsClick}
            className={`cursor-pointer rounded-lg ${activeItem === "settings" ? "bg-gray-300" : ""}`}
          >
            <li>
              {/* We are using react-icons for now until image handling configuration in electron app is done. */}
              {/* @todo: replace the image with provided Ui-design image once image handling is done. */}
              <IoSettingsOutline className="icons ml-2" />
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
                <MdOutlineEmail className="icons" />
                Email Configuration
              </li>
              {/* <li className="nested" onClick={handleEmailConfigClick}>
                <MdOutlineEmail className="icons" />
                Email Configuration
              </li> */}
              {/* The email-configuration page linked to edit button */}
            </ul>
          </div>

          <li
            onClick={handleLogoutClick}
            className={`cursor-pointer rounded-lg ${activeItem === "logout" ? "bg-gray-300" : ""}`}
          >
            {/* We are using react-icons for now until image handling configuration in electron app is done. */}
            {/* @todo: replace the image with provided Ui-design image once image handling is done. */}
            <FiLogOut className="icons ml-2" />
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
