// File: src/layouts/AppLayout.jsx
import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import "../layouts/AppLayout.css";
import { useUI } from "../context/UIContext";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";

const AppLayout = () => {
  const { isSidebarOpen, dispatch } = useUI();

  const toggleSidebar = () => dispatch({ type: "TOGGLE_SIDEBAR" });

  return (
    <main className="layout">
      <div>
        <Sidebar isOpen={isSidebarOpen} />
      </div>
      <div className="main">
        <Topbar onToggleSidebar={toggleSidebar} />

        <div className="content">
          <Outlet isSidebarOpen={isSidebarOpen} />
        </div>
      </div>
    </main>
  );
};

export default AppLayout;
