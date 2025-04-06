import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import SearchBar from './SearchBar';
import './Navbar.css';

const Navbar = ({ isLoggedIn }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [modulesOpen, setModulesOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  return (
    <nav className="navbar">
      <div className="navbar-header">
        <Link to="/" className="navbar-logo">🌟Sonet English Lab</Link>

        <ul className={`navbar-menu ${menuOpen ? 'open' : ''}`}>
          <li><Link to="/home">Home</Link></li>
          <li className="dropdown">
            <button onClick={() => setModulesOpen(!modulesOpen)}>
              Modules <span className="dropdown-icon">▾</span>
            </button>
            {modulesOpen && (
              <ul className="dropdown-menu">
                <li><Link to="/basics">Basics</Link></li>
                <li><Link to="/listening">Listening</Link></li>
                <li><Link to="/grammar">Grammar</Link></li>
              </ul>
            )}
          </li>
          <li><Link to="/about">About</Link></li>
        </ul>

        <div className="navbar-actions">
          <SearchBar />
          <button className="navbar-toggle" onClick={() => setMenuOpen(!menuOpen)}>☰</button>
          <div className="profile-dropdown">
            <button
              className="navbar-profile-toggle"
              onClick={() => setProfileOpen(!profileOpen)}
              title="Your Profile"
            >
              <span className="navbar-profile">👤</span>
              <span className="dropdown-icon">▾</span>
            </button>

            {profileOpen && (
              <ul className="profile-menu">
                <li><Link to="/profile">My Profile</Link></li>
                <li><Link to="/settings">Settings</Link></li>
                <li><button onClick={() => alert('Logged out!')}>Logout</button></li>
              </ul>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
