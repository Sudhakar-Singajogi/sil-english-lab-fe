// File: src/pages/SessionExpired.jsx
import React from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { clearUsersList } from "../store/userManagementSlice";
import { logout } from "../store/authSlice";
import { useDispatch, useSelector } from "react-redux";
import "./SessionExpired.css";

const SessionExpired = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  dispatch(logout());   
  dispatch(clearUsersList());
  const handleRedirect = () => {
    navigate("/login"); // adjust route as needed
  };

  return (
    <div className="session-expired-wrapper text-center">
      <div className="session-box p-4 shadow-sm rounded bg-white">
        <h2 className="text-danger mb-3">Session Expired</h2>
        <p className="text-muted">
          Your session has ended. Please log in again to continue.
        </p>
        <Button variant="primary" onClick={handleRedirect}>
          Go to Login
        </Button>
      </div>
    </div>
  );
};

export default SessionExpired;
