import React from "react";

import "./EmailConfiguration.css";
import LeftsideBar from "../../components/Leftside-bar/LeftsideBar";
import Navbar from "../../components/Navbar/Navbar";

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
