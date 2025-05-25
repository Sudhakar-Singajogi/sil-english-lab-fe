import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import "./Sidebar.css";
import { useUI } from "../../context/UIContext";

const Sidebar = ({ isOpen }) => {
  const role = useSelector((state) => state.auth.role);
  const { fullName: userName } = useSelector((state) => state.auth.user);
  const { isSidebarOpen, dispatch } = useUI();

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
  let pathprefix = "/teacher";

  const toggleSidebar = () => dispatch({ type: "TOGGLE_SIDEBAR" });

  return (
    <>
      <div className={`open d-flex flex-column text-white p-1 vh-100`}>
        <div className="logo">
          <img src="/assets/logos/sil-logo-v2.png" alt="Logo" />
        </div>
        <nav>
          <ul>
            <li >
              {/* 

              <span>Dashboard</span> */}
              <NavLink
                to={pathprefix + "/dashboard"}
                key={pathprefix + "/dashboard"}
                className="sidebar-link nav-link active text-white "
                onClick={toggleSidebar}
              >
                <i className="bi bi-speedometer"></i> <span>Dashboard</span>
              </NavLink>
            </li>
            <li className="active-item">
              <NavLink
                to={pathprefix + "/assign-students"}
                key={pathprefix + "assign-students"}
                className="sidebar-link nav-link active text-white "
                onClick={toggleSidebar}
              >
                <i className="bi bi-chevron-bar-contract"></i>{" "}
                <span>Assign Students</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to={pathprefix + "/assign-lessons-chapters"}
                key={pathprefix + "assign-lessons-chapters"}
                className="sidebar-link nav-link active text-white "
                onClick={toggleSidebar}
              >
                <i className="bi bi-chevron-bar-contract"></i>{" "}
                <span>Assign Lessons</span>
              </NavLink>
            </li>
          </ul>
        </nav>

        <div className="sidebar-footer">
          <div>
            <div className="user-section">
              <i className="bi bi-person-circle"></i>
            </div>
            <div className="user-details">
              <p className="teacher-name">
                {userName.charAt(0).toUpperCase() + userName.slice(1)}
              </p>
              <div className="school-details">
                <p>{schoolName}</p>
                <p>{address}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
