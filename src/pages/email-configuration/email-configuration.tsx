import React from "react";

import "./email-configuration.css";
import LeftsideBar from "../../components/leftside-bar/leftside-bar";
import Navbar from "../../components/navbar/navbar";

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
