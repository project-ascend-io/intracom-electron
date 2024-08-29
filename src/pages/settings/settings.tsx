import React from "react";
import "./settings.css";
import LeftsideBar from "../../Components/leftside-bar/leftside-bar";
import Navbar from "../../Components/nav-bar/nav-bar";

const Settings = () => {
  return (
    <div className="main-section flex flex-col md:flex-row">
      <Navbar />
      <div className="settings-section md:w-9/12 w-11/12 mx-auto">
        <LeftsideBar />
      </div>
    </div>
  );
};

export default Settings;
