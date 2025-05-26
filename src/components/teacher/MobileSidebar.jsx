import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useUI } from "../../context/UIContext";
import "./Sidebar.css";

const MobileSidebar = ({ isSidebarOpen }) => {
  const {dispatch:UIDispatch} = useUI();

   let pathprefix = "/teacher";
  const toggleSidebar = () => UIDispatch({ type: "TOGGLE_SIDEBAR" });

  useEffect(() => { 
    console.log("isSidebarOpen", isSidebarOpen);
  }, [isSidebarOpen]);
  return (
    <>
      <div className={`open d-flex flex-column text-white p-1 vh-100`}>
        <div
          className={`sidebar-menu mobile-sidebar ${
            isSidebarOpen ? "open-side-bar" : "close-side-bar"
          }`}
        >
          <nav>
            <ul className="mobile-nav-list">
              <li className="nav-item">
                {/* 

              <span>Dashboard</span> */}
                <NavLink
                  to={pathprefix + "/dashboard"}
                  key={pathprefix + "/dashboard"}
                  className="sidebar-link nav-link text-white "
                  onClick={toggleSidebar}
                >
                  <i className="bi bi-speedometer"></i> <span>Dashboard</span>
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  to={pathprefix + "/assign-students"}
                  key={pathprefix + "assign-students"}
                  className="sidebar-link nav-link text-white "
                  onClick={toggleSidebar}
                >
                  <i className="bi bi-people-fill"></i>{" "}
                  <span>Assign Students</span>
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  to={pathprefix + "/assign-lessons-chapters"}
                  key={pathprefix + "assign-lessons-chapters"}
                  className="sidebar-link nav-link text-white "
                  onClick={toggleSidebar}
                >
                  <i className="bi bi-book"></i> <span>Assign Lessons</span>
                </NavLink>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </>
  );
};

export default MobileSidebar;
