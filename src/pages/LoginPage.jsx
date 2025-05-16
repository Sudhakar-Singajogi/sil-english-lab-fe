// src/pages/LoginPage.jsx
import React, {useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../store/authSlice";
import { useNavigate } from "react-router-dom";

import "./LoginPage.css";
import Loader from "../components/Loader";

const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, error, isAuthenticated, role } = useSelector(
    (state) => state.auth
  );

  const [form, setForm] = useState({ loginid: "", password: "" });
   const [loginId, setLoginId] = useState('');
  const [password, setPassword] = useState('');
  
  useEffect(() => {
    if (isAuthenticated) {
      if (role === 'system-admin') {
        navigate('/admin/dashboard');
      } else if (role === 'super-admin') {
        navigate('/school/dashboard');
      }
    }
  }, [isAuthenticated, role, navigate]);

  const handleLogin = (e) => {
    e.preventDefault();
    dispatch(loginUser({ loginId, password }));
  };

  return (
    <div className="login-container">
      <div className="glow-overlay"></div>

      <div className="background-icons">
        <img src="/assets/icons/login-background/mic.png" alt="mic" />
        <img
          src="/assets/icons/login-background/headphone.png"
          alt="headphone"
        />
        <img src="/assets/icons/login-background/open-book.png" alt="book" />
        <img src="/assets/icons/login-background/students.png" alt="students" />
        <img src="/assets/icons/login-background/mobile.png" alt="mobile" />
        <img src="/assets/icons/login-background/tablet.png" alt="tablet" />
        <img src="/assets/icons/login-background/desktop.png" alt="desktop" />
      </div>
      <div className="login-box">
        <div className="logo-area">
          <img
            src="/assets/icons/login-background/open-book.png"
            alt="Open Book Logo"
            className="logo-icon"
          />
          <h1 className="logo-text">Sonet</h1>
          <p className="sub-logo">ENGLISH LAB</p>
        </div>
        {
            loading ? <Loader /> : null
        }

        <form onSubmit={handleLogin}>
          <input
            type="text"
            name="loginid"
            placeholder="Login Id"
            value={loginId}
            onChange={(e) => setLoginId(e.target.value)}
            
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            
          />
          <button type="submit" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>
          {error && <p style={{ color: 'red', marginTop: '0.5rem' }}>{error}</p>}
        </form>

        <p className="forgot">Forgot password?</p>
        
      </div>
    </div>
  );
};

export default LoginPage;
