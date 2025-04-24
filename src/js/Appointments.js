import React, { useState, useEffect } from "react";
import "../css/Appointments.css";
import {
  AddCircleOutlineOutlined,
  EditNoteOutlined,
  ArrowDropDownOutlined,
} from "@mui/icons-material";
import axios from "axios";

const Appointments = () => {
  const [appointmentsTableData, setAppointmentsTableData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await axios.get(
          "https://nagamedserver.onrender.com/api/appointment"
        );
        setAppointmentsTableData(response.data);

        if (response.data.length === 0) {
          console.warn("No appointments found in the response data.");
        }
      } catch (err) {
        console.error("Error fetching appointments:", err);
        setError("Failed to fetch appointments. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, []);

  return (
    <div className="S2-screen">
      <div className="S2-title">
        <span className="S2-title-main">Appointments</span>

        <div className="S2-title-btns">
          <button className="S2-title-btn1">
            Add Appointment
            <AddCircleOutlineOutlined style={{ fontSize: 15 }} />
          </button>
          <button className="S2-title-btn2">
            Edit Appointment
            <EditNoteOutlined style={{ fontSize: 18 }} />
          </button>
        </div>
      </div>

      {loading ? (
        <p>Loading appointments...</p>
      ) : error ? (
        <p className="error">{error}</p>
      ) : appointmentsTableData.length === 0 ? (
        <p>No appointments found.</p>
      ) : (
        <>
          <div className="S2-table">
            <table className="S2-table1">
              <thead className="S2-table1-header">
                <tr>
                  <th>Appointment ID</th>
                  <th>Doctor ID</th>
                  <th>Clinic ID</th>
                  <th>Date & Time</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {appointmentsTableData.map((item) => (
                  <tr key={item._id}>
                    <td>{item._id}</td>
                    <td>{item.doctor_id}</td>
                    <td>{item.clinic_id}</td>
                    <td>
                      {new Date(item.appointment_date_time).toLocaleString()}
                    </td>
                    <td>{item.status}</td>
                    <td className="actionbtns">
                      <button
                        className="actionbtn1"
                        onClick={(e) => e.preventDefault()}
                      >
                        View
                      </button>
                      <button className="actionbtn2">Approve</button>
                      <button className="actionbtn3">Decline</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="S2-bottom-part">
            <span className="S2-bottom-partcontainer1">
              <span className="S2-bottom-parttitles">
                <span className="S2-bottom-parttitle1">
                  Appointment Requests
                </span>
                <span className="S2-bottom-parttitle2">View All</span>
              </span>

              <table className="S2-bottom-parttable">
                <thead>
                  <tr>
                    <th>Appointment ID</th>
                    <th>Date</th>
                    <th>Time</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {appointmentsTableData.map((item) => (
                    <tr key={item._id}>
                      <td>{item._id}</td>
                      <td>
                        {new Date(item.appointment_date_time).toLocaleDateString()}
                      </td>
                      <td>
                        {new Date(item.appointment_date_time).toLocaleTimeString()}
                      </td>
                      <td>{item.status}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </span>

            <span className="S2-bottom-partcontainer1">
              <span className="S2-bottom-parttitles">
                <span className="S2-bottom-parttitle1">Appointments</span>
                <span className="S2-bottom-parttitle2">
                  Today <ArrowDropDownOutlined />
                </span>
              </span>

              <table className="S2-bottom-parttable">
                <thead>
                  <tr>
                    <th>Appointment ID</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {appointmentsTableData.map((item) => (
                    <tr key={item._id}>
                      <td>{item._id}</td>
                      <td>{item.status}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </span>
          </div>
        </>
      )}
    </div>
  );
};

export default Appointments;
