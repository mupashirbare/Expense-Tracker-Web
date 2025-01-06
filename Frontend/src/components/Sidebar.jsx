import { Link } from "react-router-dom";
import { FiMenu, FiHome, FiList, FiBarChart2, FiLogOut } from "react-icons/fi"; // Using React Icons

const Sidebar = ({ isCollapsed, toggleSidebar }) => {
  return (
    <div
      className={`fixed top-0 left-0 h-screen bg-gray-800 text-white flex flex-col justify-between transition-all duration-300 ${
        isCollapsed ? "w-20" : "w-64"
      } z-50`}
    >
      {/* Top Section */}
      <div className="flex flex-col justify-between h-full">
        <div>
          {/* Logo and Toggle Button */}
          <div className="flex items-center justify-between p-4">
            {/* Logo */}
            <h2
              className={`text-2xl font-bold transition-all duration-300 whitespace-nowrap ${
                isCollapsed ? "hidden" : "block"
              }`}
              style={{
                maxWidth: isCollapsed ? "0" : "calc(100% - 4rem)", // Handle max width when collapsed
              }}
            >
              Expense Tracker
            </h2>
            {/* Toggle Button */}
            <button
              onClick={toggleSidebar}
              className="text-white text-xl focus:outline-none"
            >
              <FiMenu />
            </button>
          </div>

          {/* Navigation Menu */}
          <nav className="flex flex-col gap-4 p-4">
            {/* Dashboard Link */}
            <Link
              to="/dashboard"
              className="flex items-center gap-4 hover:bg-gray-700 p-2 rounded transition duration-200"
            >
              <FiHome className="text-xl" />
              {!isCollapsed && <span>Dashboard</span>}
            </Link>

            {/* Transactions Link */}
            <Link
              to="transactions"
              className="flex items-center gap-4 hover:bg-gray-700 p-2 rounded transition duration-200"
            >
              <FiList className="text-xl" />
              {!isCollapsed && <span>Transactions</span>}
            </Link>

            {/* Reports Link */}
            <Link
              to="reports"
              className="flex items-center gap-4 hover:bg-gray-700 p-2 rounded transition duration-200"
            >
              <FiBarChart2 className="text-xl" />
              {!isCollapsed && <span>Reports</span>}
            </Link>
          </nav>
        </div>

        {/* Logout Section */}
        <div className="p-4 bg-gray-800">
          <Link
            to="logout" // Link to the logout route
            className="w-full bg-red-600 py-2 rounded hover:bg-red-700 flex items-center justify-center gap-4 transition duration-200"
            title="Logout"
          >
            <FiLogOut className="text-xl" />
            {!isCollapsed && <span>Logout</span>}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
