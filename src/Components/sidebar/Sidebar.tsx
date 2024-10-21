import React, { useState } from "react";
import "./Sidebar.css";
import { FaMessage } from "react-icons/fa6";
import { IoSettingsOutline } from "react-icons/io5";
import { FiLogOut } from "react-icons/fi";
import { MdNumbers, MdOutlineEmail } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { logoutUser } from "../../services/auth";
import { useAuth } from "../../context/auth-context";

const Sidebar: React.FC = () => {
  const [activeItem, setActiveItem] = useState<string>("messages");
  const [showSettingsList, setShowSettingsList] = useState<boolean>(false); // New state to control visibility of the settings list
  const Navigate = useNavigate();
  const { setUser } = useAuth();

  const handleCurrentConfigClick = (): void => {
    setActiveItem("settings");
    Navigate("/settings");
  };

  const handleSettingsClick = (): void => {
    setActiveItem("settings");
    setShowSettingsList(!showSettingsList); // Toggle visibility of the settings list
  };
  const handleMessagesClick = (): void => {
    setActiveItem("messages");
    Navigate("/messages");
  };
  const handleChannelsClick = (): void => {
    setActiveItem("channels");
    Navigate("/");
  };

  const handleLogoutClick = async (): Promise<void> => {
    setActiveItem("logout");
    const res = await logoutUser();
    if (res.success) setUser(null);
  };

  return (
    <aside className="bg-[#F7F4F2] w-1/6 min-w-52 h-full flex content-center border-solid border-r-2 border-[#DCDADA]">
      <nav className="p-2.5 w-full">
        <ul className="p-2.5">
          {/* TODO: Add Channels once these are implemented */}
          <li
            onClick={handleMessagesClick}
            className={`cursor-pointer rounded-lg flex flex-row items-center py-2.5 ${activeItem === "messages" ? "bg-[#D7E7EE]" : ""}`}
          >
            <FaMessage className="h-6 w-6 mr-2.5 ml-2" />
            Messages
          </li>
          {/* <li
            onClick={handleChannelsClick}
            className={`cursor-pointer rounded-lg flex flex-row items-center py-2.5 ${activeItem === "channels" ? "bg-gray-300" : ""}`}
          > */}
          {/* We are using react-icons for now until image handling configuration in electron app is done. */}
          {/* @todo: replace the image with provided Ui-design image once image handling is done. */}
          {/* <MdNumbers className="icons ml-2" />
            Channels
          </li> */}

          <ul
            onClick={handleSettingsClick}
            className={`cursor-pointer rounded-lg ${activeItem === "settings" ? "bg-[#D7E7EE]" : ""}`}
          >
            <li className="flex flex-row items-center py-2.5">
              {/* We are using react-icons for now until image handling configuration in electron app is done. */}
              {/* @todo: replace the image with provided Ui-design image once image handling is done. */}
              <IoSettingsOutline className="h-6 w-6 mr-2.5 ml-2" />
              Settings
            </li>
            <ul
              style={{
                display: showSettingsList ? "block" : "none",
                listStyleType: "none",
                paddingLeft: "10px",
              }}
            >
              <li
                className="flex flex-row items-center py-2.5"
                onClick={handleCurrentConfigClick}
              >
                {/* We are using react-icons for now until image handling configuration in electron app is done. */}
                {/* @todo: replace the image with provided Ui-design image once image handling is done. */}
                <MdOutlineEmail className="h-6 w-6 mr-2.5 ml-4" />
                Email Configuration
              </li>
            </ul>
          </ul>

          <li
            onClick={handleLogoutClick}
            className={`cursor-pointer rounded-lg flex flex-row items-center py-2.5 ${activeItem === "logout" ? "bg-[#D7E7EE]" : ""}`}
          >
            {/* We are using react-icons for now until image handling configuration in electron app is done. */}
            {/* @todo: replace the image with provided Ui-design image once image handling is done. */}
            <FiLogOut className="h-6 w-6 mr-2.5 ml-2" />
            Logout
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
