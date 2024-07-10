import React from "react";
import LeftsideBar from "../Components/Leftside-bar/LeftsideBar";

import "./EmailConfiguration.css";
import Navbar from "../Components/Navbar/Navbar";

const EmailConfiguration = () => {
  return (
    <div className="main-section">
      <Navbar />
      <div className="settings-section">
        <LeftsideBar />
      </div>
    </div>
  );
};

export default EmailConfiguration;
