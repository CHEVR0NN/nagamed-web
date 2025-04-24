import React, { useState, useEffect } from "react";
import "../css/Dashboard.css";
import { AddCircleOutlineOutlined, Circle } from "@mui/icons-material";
import Activitychart from "./Activitychart";
import Dailychart from "./Dailychart";
import Patientchart from "./Patientchart";
import storage from "./store/authStore"; // Import the storage utility
import { useNavigate } from "react-router-dom"; // Import useNavigate

const Dashboard = () => {
  const [name, setName] = useState("");
  const navigate = useNavigate(); // Initialize useNavigate

  useEffect(() => {
    // Load the name using the storage utility
    const storedName = storage.load("name"); // Use the key "name" as saved during login
    if (storedName) {
      setName(storedName);
    } else {
      console.error("No name found in localStorage");
    }
  }, []);

  return (
    <div className="dashboard">
      <div className="part2">
        <div className="hellodoc">
          <span className="whitetxt">
            Hello, <span className="blacktxt">Dr.{name}</span>
          </span>
          <span className="hellodocdescription">
            Here are your important tasks and reports.
            <br />
            Please check your next appointment.
          </span>
        </div>

        <div className="dashboardbtns">
          <button
            className="dashboardbtn1"
            style={{ fontFamily: "Poppins" }}
            onClick={() => navigate("/Appointments")} // Redirect to Appointment.js
          >
            View Appointments
            <AddCircleOutlineOutlined style={{ fontSize: 18 }} />
          </button>
          <button
            className="dashboardbtn2"
            style={{ fontFamily: "Poppins" }}
            onClick={() => navigate("/Patients")} // Redirect to Patient.js
          >
            View Patients
          </button>
        </div>
      </div>

      <div className="part3">
        <div className="part3container">
          <div className="part3title">
            <span className="charttitle">Activity</span>
            <span className="chartlegends">
              <span className="legend1">
                <Circle style={{ fontSize: 14, color: "962DFF" }} /> Patients
              </span>
              <span className="legend2">
                <Circle style={{ fontSize: 14, color: "FCB5C3" }} /> Consultation
              </span>
            </span>
          </div>

          <hr className="part3hr" />

          <div className="part3chart">
            <Activitychart />
          </div>
        </div>
      </div>

      <div className="part4">
        <div className="part4container1">
          <span className="part4title1">Daily Appointments</span>

          <span className="part4chart1">
            <Dailychart />
          </span>

          <span className="part4chart1label">
            <span className="legend1">
              <Circle style={{ fontSize: 14, color: "82C45C" }} /> Approved
            </span>
            <span className="legend1">
              <Circle style={{ fontSize: 14, color: "28B6F6" }} /> Declined
            </span>
          </span>
        </div>

        <div className="part4container2">
          <span className="part4titles">
            <span className="part4title1">Patient Graph</span>
          </span>

          <span className="part4chart2">
            <Patientchart />
          </span>

          <span className="part4container2chartlabels">
            <span className="chartlegends">
              <span className="legend1">
                <Circle style={{ fontSize: 14, color: "C084FC" }} /> Patient Count
              </span>
              <span className="legend2">
                <Circle style={{ fontSize: 14, color: "FB923C" }} /> Appointment Pending
              </span>
            </span>

            <span className="chartlegends">
              <span className="legend1">
                <Circle style={{ fontSize: 14, color: "2563EB" }} /> Appointment Decline
              </span>
              <span className="legend2">
                <Circle style={{ fontSize: 14, color: "22C55E" }} /> Appointment Finished
              </span>
            </span>
          </span>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;