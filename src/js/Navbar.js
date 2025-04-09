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
                <GridView style={ { marginRight: 10 } }/> Dashboard
                </Link>
                <Link to="/Appointments" className="navbarelement">
                <AssignmentTurnedInOutlined style={ { marginRight: 10 } }/> Appointments
                </Link>
                <Link to="/Doctors" className="navbarelement">
                <FreeCancellationOutlined style={ { marginRight: 10 } }/> Doctors
                </Link>
                <Link to="/Patients" className="navbarelement">
                <MedicalServicesOutlined style={ { marginRight: 10 } }/> Patients
                </Link>
                <Link to="/Messages" className="navbarelement">
                <MailOutlineRounded style={ { marginRight: 10 } }/> Messages
                </Link>
                <Link to="/Reports" className="navbarelement">
                <AccountBalanceWalletOutlined style={ { marginRight: 10 } }/> Reports
                </Link>
                <Link to="/Settings" className="navbarelement">
                <SettingsOutlined style={ { marginRight: 10 } }/> Settings
                </Link>
            </div>
        </div>
    );
};

export default Navbar;
