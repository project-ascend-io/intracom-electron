import React from "react";
import "./Header.css";
import { FaFlag } from "react-icons/fa";
import { Link } from "react-router-dom";
import { Avatar } from "../avatar/Avatar";

export const Header: React.FC = () => {
  return (
    <header className="flex h-1/8 justify-between items-center p-5 bg-[#89A5B3]  [box-shadow:0px_2px_10px_0px_rgba(0,_0,_0,_0.10)]">
      <Link
        to="/"
        className="text-2xl flex text-white justify-between items-center"
      >
        <FaFlag className="mr-3 text-black" />
        Intracom
      </Link>
      {/* @todo: replace the image with user profile picture once image handling is done. */}
      {/* <Link to="/profile"> */}
      <Avatar style={"w-12 h-12 rounded-[50%]"} user={null} />
      {/* </Link> */}
    </header>
  );
};
