import React from "react";
import { Link } from 'react-router-dom';
import "../css/Navbar.css";
import { GridView, AssignmentTurnedInOutlined, FreeCancellationOutlined, MedicalServicesOutlined, MailOutlineRounded, AccountBalanceWalletOutlined, SettingsOutlined } from '@mui/icons-material';
const Navbar = () => {
    return (
        <div className="navbar">
            <p className="navbarheading">
                <span className="title1">Naga</span>
                <span className="title2">Med</span>
            </p>

            <div className="routes">
                <Link to="/Dashboard" className="navbarelement">
                <GridView/> Dashboard
                </Link>
                <Link to="/Appointments" className="navbarelement">
                <AssignmentTurnedInOutlined/> Appointments
                </Link>
                <Link to="/Doctors" className="navbarelement">
                <FreeCancellationOutlined/> Doctors
                </Link>
                <Link to="/Patients" className="navbarelement">
                <MedicalServicesOutlined/> Patients
                </Link>
                <Link to="/Messages" className="navbarelement">
                <MailOutlineRounded/> Messages
                </Link>
                <Link to="/Reports" className="navbarelement">
                <AccountBalanceWalletOutlined/> Reports
                </Link>
                <Link to="/Settings" className="navbarelement">
                <SettingsOutlined/> Settings
                </Link>
            </div>
        </div>
    );
};

export default Navbar;
