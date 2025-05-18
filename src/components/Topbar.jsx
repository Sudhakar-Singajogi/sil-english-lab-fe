import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../store/authSlice";
import { useNavigate } from "react-router-dom";
import "./Topbar.css";

const Topbar = ({ onToggleSidebar }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);
  const role = useSelector((state) => state.auth.role);

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
        <div className="topbar">
          <button
            className="navbar-toggler hamburger"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#topbarNav"
            aria-controls="topbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
            onClick={() => handleToggleSidebar()}
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="sidebar-logo">
            <img src="/assets/logos/silLogo.png" alt="Logo" />
          </div>

          {/* <div className="topbar-title">Welcome, {user?.name || role}</div> */}
          <div className="topbar-actions">
            <span className="license-badge">
              {licenseTier && (
                <img src={getmedalIcon()} alt="Logo" title={license} />
              )}
            </span>

            <span className="topbar-icon notification">
              <img
                src="/assets/icons/notification.png"
                alt="Logo"
                title={license}
              />
            </span>
            <span className="user-logout">
              <input
                type="image"
                src="/assets/icons/user-logout.png"
                alt="Logout"
                onClick={handleLogout}
              />
            </span>
          </div>
        </div>
      </nav>

      {/* <button className="hamburger" onClick={() => handleToggleSidebar()}>
        ☰
      </button> */}
    </>
  );
};

export default Topbar;
