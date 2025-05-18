import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import "./Sidebar.css";

const Sidebar = ({ isOpen }) => {
  const role = useSelector((state) => state.auth.role);
  const { fullName: userName } = useSelector((state) => state.auth.user);

  const { name: schoolName, address } =
    role === "system-admin"
      ? { name: "System Admin", address: "No Address for system admin" }
      : useSelector((state) => state.auth.schoolInfo);

  const lacInfo = useSelector((state) => state.auth.lacInfo);
  const allMenuItems = useSelector((state) => state.auth.allMenuItems);

  // Filter menu items for non-system-admin roles
  const visibleMenus =
    role === "system-admin"
      ? allMenuItems
      : allMenuItems.filter((item) =>
          lacInfo?.allowedModules?.includes(item.module)
        );
  let pathprefix = "/admin";
  if (role === "super-admin") {
    pathprefix = "/school";
  }

  return (
    <>
      {/* <div className="sidebar-logo">
        <img src="/assets/logos/sil-logo-v3.png" alt="Logo" />
      </div>
      <div className="sidebar-user-info">
        <p className="school-title">
          {schoolName ? schoolName : "System Admin"}
        </p>
        <p className="school-address">{address}</p>
        <div className="user-profile">
          <p className="user-name">{userName} </p>
          <p className="user-icon">
            {" "}
            <img
              src="/assets/icons/user-edit-v2.png"
              width={"20px"}
              height={"20px"}
            />{" "}
          </p>
        </div>
      </div>
      <nav className="sidebar-menu">
        <NavLink to="/dashboard" className="sidebar-link active">
          Dashboard
        </NavLink>

        {visibleMenus.map((item) => (
          <NavLink
            key={item.path}
            to={pathprefix + item.path}
            className={({ isActive }) =>
              isActive ? "sidebar-link active" : "sidebar-link"
            }
          >
            {item.label}
          </NavLink>
        ))}
      </nav> */}

      <div
        className={`sidebar-wrapper ${
          isOpen ? "open" : ""
        } d-flex flex-column bg-dark text-white p-1 vh-100`} 
      >
        {/* Logo Section */}
        {/* <div className="text-center mb-3 sidebar-logo">
          <img
            src="/assets/logos/sil-logo-v3.png"
            alt="Sonet Logo"
            className="img-fluid"
          />
        </div> */}
        <div className="text-center small mb-4 text-secondary sidebar-user-info">
          <p className="school-title text-white fw-bold">
            <strong>{schoolName ? schoolName : "System Admin"}</strong>
          </p>
          <p className="school-address">{address}</p>
          <div className="user-profile">
            <p className="user-name">{userName} </p>
            <p className="user-icon">
              {" "}
              <img
                src="/assets/icons/user-edit-v2.png"
                width={"20px"}
                height={"20px"}
              />{" "}
            </p>
          </div>
        </div>
        {/* Menu */}
        <nav className="nav flex-column sidebar-menu">
          <NavLink to="/dashboard" className="sidebar-link nav-link active text-white fw-bold">
            Dashboard
          </NavLink>
          {visibleMenus.map((item) => (
            <NavLink
              key={item.path}
              to={pathprefix + item.path}
              className={({ isActive }) =>
                `nav-link sidebar-link ${
                  isActive ? "active text-white fw-bold" : "text-secondary"
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
      </div>
    </>
  );
};

export default Sidebar;
