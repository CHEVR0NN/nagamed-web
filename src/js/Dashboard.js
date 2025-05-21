import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../css/Dashboard.css";
import { AddCircleOutlineOutlined, Circle } from "@mui/icons-material";
import axios from "axios";
import Swal from "sweetalert2";
import storage from "./store/authStore";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Legend,
  Title,
  Tooltip,
} from "chart.js";

ChartJS.register(LineElement, PointElement, CategoryScale, LinearScale, Legend, Title, Tooltip);

// Sample Dailychart component
const Dailychart = () => {
  const [chartData, setChartData] = useState({
    labels: [], // Dates
    datasets: [
      {
        label: "Approved",
        data: [],
        borderColor: "#82C45C",
        pointRadius: 0,
        tension: 0.3,
      },
      {
        label: "Declined",
        data: [],
        borderColor: "#28B6F6",
        pointRadius: 0,
        tension: 0.3,
      },
    ],
  });

  useEffect(() => {
    const fetchDailyAppointments = async () => {
      try {
        const authData = storage.load("auth");
        if (!authData || !authData.doctorId) return;

        const { doctorId, token } = authData;
        const headers = { "Content-Type": "application/json" };
        if (token) headers.Authorization = `Bearer ${token}`;

        const response = await axios.get(
          `https://nagamedserver.onrender.com/api/appointment?doctor_id=${doctorId}`,
          { headers }
        );

        const appointments = response.data;
        const last7Days = Array.from({ length: 7 }, (_, i) => {
          const date = new Date();
          date.setDate(date.getDate() - i);
          return date.toLocaleDateString();
        }).reverse();

        const approvedCounts = new Array(7).fill(0);
        const declinedCounts = new Array(7).fill(0);

        appointments.forEach((appt) => {
          const apptDate = new Date(appt.appointment_date_time).toLocaleDateString();
          const index = last7Days.indexOf(apptDate);
          if (index !== -1) {
            if (appt.status === "Approved") approvedCounts[index]++;
            if (appt.status === "Declined") declinedCounts[index]++;
          }
        });

        setChartData({
          labels: last7Days,
          datasets: [
            {
              label: "Approved",
              data: approvedCounts,
              borderColor: "#82C45C",
              pointRadius: 0,
              tension: 0.3,
            },
            {
              label: "Declined",
              data: declinedCounts,
              borderColor: "#28B6F6",
              pointRadius: 0,
              tension: 0.3,
            },
          ],
        });
      } catch (err) {
        console.error("Error fetching daily appointments:", err);
      }
    };

    fetchDailyAppointments();
  }, []);

  return (
    <div style={{ width: "100%", height: "200px" }}>
      <Line
        data={chartData}
        options={{
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            y: { beginAtZero: true },
          },
          plugins: {
            legend: { display: false }, // Legends are shown below chart
            title: { display: false },
          },
        }}
      />
    </div>
  );
};

// Placeholder for Activitychart and Patientchart
const Activitychart = () => <div className="empty">No activities yet.</div>;
const Patientchart = () => <div className="empty">No data found.</div>;

const Dashboard = () => {
  const [name, setName] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const authData = storage.load("auth");
    console.log("Auth data in Dashboard:", authData); // Debug log
    if (!authData || !authData.doctorId) {
      navigate("/");
      return;
    }
    setName(authData.userName || "Doctor");
  }, [navigate]);

  return (
    <div className="dashboard">
      <div className="part2">
        <div className="hellodoc">
          <span className="whitetxt">
            Hello, <span className="blacktxt">Dr. {name}</span>
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
            onClick={() => navigate("/Appointments")}
          >
            View Appointments
            <AddCircleOutlineOutlined style={{ fontSize: 18 }} />
          </button>
          <button
            className="dashboardbtn2"
            style={{ fontFamily: "Poppins" }}
            onClick={() => navigate("/Patients")}
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
                <Circle style={{ fontSize: 14, color: "#962DFF" }} /> Patients
              </span>
              <span className="legend2">
                <Circle style={{ fontSize: 14, color: "#FCB5C3" }} /> Consultation
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
              <Circle style={{ fontSize: 14, color: "#82C45C" }} /> Approved
            </span>
            <span className="legend1">
              <Circle style={{ fontSize: 14, color: "#28B6F6" }} /> Declined
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
                <Circle style={{ fontSize: 14, color: "#C084FC" }} /> Patient Count
              </span>
              <span className="legend2">
                <Circle style={{ fontSize: 14, color: "#FB923C" }} /> Appointment Pending
              </span>
            </span>
            <span className="chartlegends">
              <span className="legend1">
                <Circle style={{ fontSize: 14, color: "#2563EB" }} /> Appointment Decline
              </span>
              <span className="legend2">
                <Circle style={{ fontSize: 14, color: "#22C55E" }} /> Appointment Finished
              </span>
            </span>
          </span>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;