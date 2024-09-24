import React from "react";
import "./nav-bar.css";
import { FaUser, FaFlag } from "react-icons/fa";
import { Link } from "react-router-dom";

const Navbar: React.FC = () => {
  return (
    <header className="navbar">
      <div className="navbar-left">
        <Link to="/" className="logo-link">
          <FaFlag className="logo-icon" />
          Intracom
        </Link>
      </div>
      <div className="navbar-right">
        <button className="new-chat-button">New Chat</button>
        {/* TODO: replace with Link elem below after New Chat is implemented */}
        {/* <Link to="/new-chat" className="new-chat-button">
          New Chat
        </Link> */}

        {/* We are using user-avatar for now until image handling configuration in electron app is done. */}
        {/* @todo: replace the image with user profile picture once image handling is done. */}
        {/* <Link to="/profile"> */}
        <FaUser className="user-avatar" />
        {/* </Link> */}
      </div>
    </header>
  );
};

export default Navbar;
