import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../store/authSlice";
import { useNavigate } from "react-router-dom";
import { useUI } from "../../context/UIContext";
import "./Topbar.css";


const Topbar = ({ onToggleSidebar }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isSidebarOpen, dispatch:UIDispatch } = useUI();

  const { fullName: userName } = useSelector((state) => state.auth.user);
  const role = useSelector((state) => state.auth.role);
  const token = useSelector((state) => state.auth.token);
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const { licenseTierId: licenseTier, licenseDisplay: license } =
    role === "system-admin"
      ? { licenseTierId: "pro", licenseDisplay: "Pro License" }
      : useSelector((state) => state.auth.schoolInfo);

  const handleLogout = () => {
    console.log("logout");
    dispatch(logout());
    navigate("/login");
  };

  useEffect(() => {
    console.log("Will call to login if token already got cleard");
    if (!token) {
      console.log("Token cleared, navigating to login...");
      navigate("/login");
    }
  }, [token, navigate]);

  const handleToggleSidebar = () => {
    console.log("hey clicked on the hamburger");
    UIDispatch({ type: "TOGGLE_SIDEBAR" });
  };

  useEffect(() => {
    console.log("isSidebarOpen", isSidebarOpen);
  }, [isSidebarOpen]);

  const getmedalIcon = () => {
    // let licenseTier = "level2";
    if (licenseTier === "basic") {
      return "/assets/icons/basic-license-medal.png";
    } else if (licenseTier === "level2") {
      return "/assets/icons/intermediate-licence-medal.png";
    } else if (licenseTier === "pro") {
      return "/assets/icons/advanced-license-medal.png";
    } else {
      return "/assets/icons/basic-license-medal.png";
    }
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light ">
        <div className="topbar-container d-flex align-items-center justify-content-between w-100">
          <div className="d-flex align-items-center">
            <button
              className="hamburger d-lg-none"
              onClick={handleToggleSidebar}
            >
              ☰
            </button>
            <div className="welcome-text">
              <div className="welcome-text">
                {" "}
                Welcome back{","}
                {userName.charAt(0).toUpperCase() + userName.slice(1)}
              </div>
            </div>
          </div>
          <div className="teacher-topbar-actions">
            <header className="header teacher-school-info">
              <div className="teacher-topbar-actions">
                <div className="teacher-profile">
                  <i
                    className="bi-person-fill-down"
                    onClick={() => setShowProfileMenu((prev) => !prev)}
                  ></i>
                  {showProfileMenu && (
                    <div className="teacher-profile-menu">
                      <ul>
                        <li>
                          <span className="teacher-topbar-icon user-logout">
                            <a className="logout-link">
                              <i className="bi bi-pencil-square"></i> Profile
                            </a>
                          </span>
                        </li>
                        <li>
                          <span className="teacher-topbar-icon user-logout">
                            <a className="logout-link" onClick={handleLogout}>
                              <i className="bi bi-box-arrow-in-right"></i>{" "}
                              Logout
                            </a>
                          </span>
                        </li>
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            </header>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Topbar;
