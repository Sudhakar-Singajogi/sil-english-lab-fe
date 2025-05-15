// File: src/layouts/AppLayout.jsx
import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import "../layouts/AppLayout.css";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";

const AppLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => setIsSidebarOpen((prev) => !prev);

  return (
    <main className="layout">
      <div>
        <Sidebar isOpen={isSidebarOpen} />
      </div>
      <div className="main">
        <Topbar onToggleSidebar={toggleSidebar} />

        <div className="content">
          <Outlet />
        </div>
      </div>
    </main>
  );
};

export default AppLayout;
