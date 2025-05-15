import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../store/authSlice";
import { useNavigate } from "react-router-dom";
import "./Topbar.css";

const Topbar = ({onToggleSidebar}) => {
    console.log('onToggleSidebar is', onToggleSidebar);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);
  const role = useSelector((state) => state.auth.role);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  const handleToggleSidebar = () => {
    onToggleSidebar();
  };

  return (
    <header className="topbar">
      <button className="hamburger" onClick={() => handleToggleSidebar()}>
        ☰
      </button>
      <div className="topbar-title">Welcome, {user?.name || role}</div>

      <div className="topbar-actions">
        <span className="topbar-icon">🔔</span>
        <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </header>
  );
};

export default Topbar;
