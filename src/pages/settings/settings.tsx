import React from "react";
import "./settings.css";
import LeftsideBar from "../../Components/leftside-bar/leftside-bar";
import Navbar from "../../Components/nav-bar/nav-bar";

const Settings = () => {
  return (
    <div className="main-section">
      <Navbar />
      <div className="settings-section">
        <LeftsideBar />
      </div>
    </div>
  );
};

export default Settings;
