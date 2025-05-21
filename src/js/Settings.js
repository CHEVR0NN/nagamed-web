import * as React from "react";
import { useNavigate } from "react-router-dom";
import { SettingsOutlined, NotificationsOutlined, SecurityOutlined, LogoutOutlined } from "@mui/icons-material";
import "../css/Settings.css";

const clearLoginData = () => {
    localStorage.clear(); // Clear all local storage data
    sessionStorage.clear(); // Clear all session storage data
};

const Settings = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        clearLoginData(); // Erase login data
        navigate("/");
    };

    return (
        <div className="settings-container">
            <div className="settings-options">
                <div className="settings-item">
                    <SettingsOutlined className="settings-icon" />
                    <span>Account Settings</span>
                </div>
                <div className="settings-item">
                    <NotificationsOutlined className="settings-icon" />
                    <span>Notifications</span>
                </div>
                <div className="settings-item">
                    <SecurityOutlined className="settings-icon" />
                    <span>Privacy & Security</span>
                </div>
            </div>
            <div className="settings-footer">
                <button className="logout-button" onClick={handleLogout}>
                    <LogoutOutlined className="logout-icon" /> Logout
                </button>
            </div>
        </div>
    );
};

export default Settings;
