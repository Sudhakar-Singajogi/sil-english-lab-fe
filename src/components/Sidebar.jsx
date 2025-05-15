import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import "./Sidebar.css";

const Sidebar = ({ isOpen }) => {
  const role = useSelector((state) => state.auth.role);
  console.log('isOpen is', isOpen);

  const menuItems = {
    "system-admin": [
      { label: "Dashboard", to: "/admin/dashboard" },
      { label: "Manage Schools", to: "/admin/schools" },
      { label: "Users", to: "/admin/users" },
    ],
    "super-admin": [
      { label: "Dashboard", to: "/school/dashboard" },
      { label: "Teachers", to: "/school/teachers" },
      { label: "Reports", to: "/school/reports" },
    ],
  };

  return (
    <div className={`sidebar-wrapper ${isOpen ? "open" : ""}`}>
      <div className="sidebar-logo">
        <img src="/assets/logos/sil-logo-v3.png" alt="Logo" />
      </div>
      <nav className="sidebar-menu">
        {menuItems[role]?.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              isActive ? "sidebar-link active" : "sidebar-link"
            }
          >
            {item.label}
          </NavLink>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;
