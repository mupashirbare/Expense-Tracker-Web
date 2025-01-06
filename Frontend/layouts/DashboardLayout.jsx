import React, { useState } from "react";
import Sidebar from "../src/components/Sidebar";
import Header from "../src/components/Header";
import TransactionsList from "../src/pages/TransactionsList";

const DashboardLayout = ({ children }) => {
  const [isCollapsed, setIsCollapsed] = useState(false); // Sidebar state

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed); // Toggle sidebar state
  };

  return (
    <div className="flex h-screen">
      {/* Pass the state and toggle function to Sidebar */}
      <Sidebar isCollapsed={isCollapsed} toggleSidebar={toggleSidebar} />
      
      <div className="flex-1 flex flex-col w-full">
        {/* Pass the state to Header */}
        <Header isCollapsed={isCollapsed} />
        
        <main className="flex-1 p-11">
          {/* Conditionally render the page content */}
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
