import * as React from "react";
import { Link } from 'react-router-dom';
import "../css/Navbar.css";

const Navbar = () => {
    return (
        <div className="navbar">
            
        <p className="navbarheading">
            <span className="title1">Naga</span>
            <span className="title2">Med</span>
        </p>

        <Link to="/Dashboard">Dashboard</Link>
        <Link to="/Appointments">Appointments</Link>
        <Link to="/doctors">Doctors</Link>
        <Link to="/patients">Patients</Link>
        <Link to="/messages">Messages</Link>
        <Link to="/reports">Reports</Link>
        <Link to="/settings">Settings</Link>
      </div>
    );
  };
  
  export default Navbar;