import React from "react";
import "./nav-bar.css";
import { FaUser } from "react-icons/fa";
import { Link } from "react-router-dom";
import { FaFlag } from "react-icons/fa";

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
        <Link to="/new-chat" className="new-chat-button">
          New Chat
        </Link>
        <Link to="/profile">
          {/* We are using user-avatar for now until image handling configuration in electron app is done. */}
          {/* @todo: replace the image with user profile picture once image handling is done. */}
          <FaUser className="user-avatar" />
        </Link>
      </div>
    </header>
  );
};

export default Navbar;
