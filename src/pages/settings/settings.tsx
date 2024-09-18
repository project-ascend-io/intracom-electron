// import React from "react";
import "./settings.css";
import LeftsideBar from "../../Components/leftside-bar/leftside-bar";
import Navbar from "../../Components/nav-bar/nav-bar";

const Settings = () => {
  return (
    <div>
      <div>
        <Navbar />
        <div className="flex-grow">
          <LeftsideBar />
        </div>
      </div>
    </div>
  );
};

export default Settings;
