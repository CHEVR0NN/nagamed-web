import * as React from "react";
import "../css/Patients.css";

const Patients = () => {
    return (
        <div className="patientscontainer">
            <div><p className="patientstitle">Patient Information</p></div>
            <br/>
            <div className="patientsinfoheader">
                <div className="searchingpatients">
                <p className="searchtitle">Patient Name</p>
                <p className="searchtitle">Patient ID</p>
                <p className="searchtitle">Email Address</p>
                <p className="searchtitle">Contact Number</p>
                {/* <input type="text" className="searchbar" placeholder="Enter Patient Name"/> */}
                </div>
            </div>
        </div>
    )
  };
  
  export default Patients;
  