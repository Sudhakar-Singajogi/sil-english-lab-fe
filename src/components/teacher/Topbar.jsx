import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../store/authSlice";
import { useNavigate } from "react-router-dom";
import "./Topbar.css";
import { Button } from "react-bootstrap";

const Topbar = ({ onToggleSidebar }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { fullName: userName } = useSelector((state) => state.auth.user);
  const role = useSelector((state) => state.auth.role);
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const { licenseTierId: licenseTier, licenseDisplay: license } =
    role === "system-admin"
      ? { licenseTierId: "pro", licenseDisplay: "Pro License" }
      : useSelector((state) => state.auth.schoolInfo);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  const handleToggleSidebar = () => {
    onToggleSidebar();
  };

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
        <header className="header teacher-school-info">
          
          <div className="welcome-text">
            {" "}
            Welcome back{","}
            {userName.charAt(0).toUpperCase() + userName.slice(1)}
          </div>
          <div className="teacher-topbar-actions">
            <div className="teacher-profile">
              <i
                class="bi-person-fill-down"
                onClick={() => setShowProfileMenu((prev) => !prev)}
              ></i>
              {showProfileMenu && (
                <div className="teacher-profile-menu">
                  <ul>
                    <li>
                      <span className="teacher-topbar-icon user-logout">
                        <a className="logout-link">
                          <i class="bi bi-pencil-square"></i> Profile
                        </a>
                      </span>
                    </li>
                    <li>
                      <span className="teacher-topbar-icon user-logout">
                        <a className="logout-link" onClick={handleLogout}>
                          <i class="bi bi-box-arrow-in-right"></i> Logout
                        </a>
                      </span>
                    </li>
                  </ul>
                </div>
              )}
            </div>
          </div>
        </header>
        
      </nav>

      {/* <button className="hamburger" onClick={() => handleToggleSidebar()}>
        ☰
      </button> */}
    </>
  );
};

export default Topbar;
