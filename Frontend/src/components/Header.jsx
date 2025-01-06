import React from "react";
import { Link } from "react-router-dom"; // Import Link from react-router-dom
import { FaUserCircle } from "react-icons/fa"; // Import User icon from react-icons

const Header = ({ isCollapsed }) => {
  return (
    <div
      className={`bg-gray-200 p-4 flex justify-between items-center shadow sticky top-0 z-10 ${
        isCollapsed ? "ml-20" : "ml-64"
      }`} // Adjust left margin based on the sidebar state
    >
      <h1 className="text-xl font-bold">Dashboard</h1>
      <div className="flex items-center gap-1">
        <Link to="profile">
          <div className="w-12 h-12 rounded-full bg-gray-400 flex items-center justify-center hover:bg-gray-500 cursor-pointer">
            <FaUserCircle className="text-white text-2xl" />
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Header;
