import React from 'react';
import './AdminHeader.css';
import { Link, useLocation } from 'react-router-dom';


const AdminHeader = () => {

    const location = useLocation();

    // Function to check if current path matches the nav item
    const isActive = (path) => {
        return location.pathname === path;
    };


    return (
        <header className="admin-header">
            <div className="header-container">
                {/* Logo Section */}
                <div className="logo-section">
                    <img
                        src="/arjun logo.PNG"
                        alt="Admin Logo"
                        className="logo-image"
                    />
                    <span className="logo-text">Admin Arjun</span>
                </div>

                {/* Navigation Section */}
                <nav className="nav-section">
                    <ul className="nav-list">
                        <li className="nav-item">
                            <Link
                                to="/authoradminhome"
                                className={`nav-link ${isActive('/authoradminhome') ? 'active' : ''}`}
                            >
                                Dashboard
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link
                                to="/authoradminevents"
                                className={`nav-link ${isActive('/authoradminevents') ? 'active' : ''}`}
                            >
                                Events
                            </Link>
                        </li>
                        {/* <li className="nav-item">
              <a href="/admin/users" className="nav-link">
                Users
              </a>
            </li>
            <li className="nav-item">
              <a href="/admin/settings" className="nav-link">
                Settings
              </a>
            </li> */}
                    </ul>
                </nav>

                {/* User Profile Section */}
                <div className="profile-section">
                    <div className="profile-dropdown">
                        <button className="profile-btn">
                            <img
                                src="/default-avatar.png"
                                alt="Profile"
                                className="profile-avatar"
                            />
                            <span className="profile-name">Admin</span>
                        </button>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default AdminHeader;