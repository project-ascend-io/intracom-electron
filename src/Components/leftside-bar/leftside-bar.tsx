import React, { useState } from "react";
import "./leftside-bar.css";
import SettingIndex from "../settings-dropdown/setting-index";
import { FaMessage } from "react-icons/fa6";
import { IoSettingsOutline } from "react-icons/io5";
import { FiLogOut } from "react-icons/fi";
import { MdNumbers, MdOutlineEmail } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { logoutUser } from "../../services/auth";
const LeftsideBar: React.FC = () => {
  const [activeItem, setActiveItem] = useState<string>("settings");
  const [showSettingIndex, setShowSettingIndex] = useState<boolean>(false);
  const [showSettingsList, setShowSettingsList] = useState<boolean>(false); // New state to control visibility of the settings list
  const Navigate = useNavigate();

  const handleCurrentConfigClick = (): void => {
    setActiveItem("settings");
    Navigate("/setting-index");
  };

  const handleSettingsClick = (): void => {
    setActiveItem("settings");
    setShowSettingsList(!showSettingsList); // Toggle visibility of the settings list
  };
  const handleMessagesClick = (): void => {
    setActiveItem("messages");
    Navigate("/");
  };
  const handleChannelsClick = (): void => {
    setActiveItem("channels");
    Navigate("/");
  };

  const handleLogoutClick = async (): Promise<void> => {
    setActiveItem("logout");
    await logoutUser();
    Navigate("/login");
  };

  return (
    <div className="sidebar-container flex">
      <div className="left-sidebar p-2.5 ml-4 bg-white h-screen min-w-[200px] max-w-[400px]">
        <ul>
          {/* TODO: Add Message and Channels once these are implemented */}
          {/* <li */}
          {/* onClick={handleMessagesClick}
            className={`cursor-pointer rounded-lg ${activeItem === "messages" ? "bg-gray-300" : ""}`}
          > */}
          {/* We are using react-icons for now until image handling configuration in electron app is done. */}
          {/* @todo: replace the image with provided Ui-design image once image handling is done. */}
          {/* <FaMessage className="icons ml-2" />
            Messages */}
          {/* </li> */}
          {/* <li
            onClick={handleChannelsClick}
            className={`cursor-pointer rounded-lg ${activeItem === "channels" ? "bg-gray-300" : ""}`}
          > */}
          {/* We are using react-icons for now until image handling configuration in electron app is done. */}
          {/* @todo: replace the image with provided Ui-design image once image handling is done. */}
          {/* <MdNumbers className="icons ml-2" />
            Channels
          </li> */}

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
    </div>
  );
};

export default LeftsideBar;
