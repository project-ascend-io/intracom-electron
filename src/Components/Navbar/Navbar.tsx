import React from "react";
import "./navbar.css";
import { FaUser } from "react-icons/fa";
import { Link } from "react-router-dom";

const Navbar: React.FC = () => {
  return (
    <header className="navbar">
      <div className="navbar-left">
        <Link to="/" className="logo-link">
          <span role="img" aria-label="logo">
            🏴
          </span>{" "}
          Intracom
        </Link>
      </div>
      <div className="navbar-right">
        <Link to="/new-chat" className="new-chat-button">
          New Chat
        </Link>
        <Link to="/profile">
          {/* <img src="../../images/newchat.png" alt="" className="user-avatar" /> */}
          <FaUser className="user-avatar" />
        </Link>
      </div>
    </header>
  );
};

export default Navbar;
