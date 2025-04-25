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
  const [doctorsMap, setDoctorsMap] = useState({});
  const [clinicsMap, setClinicsMap] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [formData, setFormData] = useState({
    doctor_id: "",
    clinic_id: "",
    appointment_date_time: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        const [appointmentsRes, doctorsRes, clinicsRes] = await Promise.all([
          axios.get("https://nagamedserver.onrender.com/api/appointment"),
          axios.get("https://nagamedserver.onrender.com/api/doctor"),
          axios.get("https://nagamedserver.onrender.com/api/clinic"),
        ]);

        const doctors = doctorsRes.data;
        const clinics = clinicsRes.data;

        const doctorsById = {};
        doctors.forEach((doc) => {
          doctorsById[doc._id] = doc;
        });

        const clinicsById = {};
        clinics.forEach((clinic) => {
          clinicsById[clinic._id] = clinic;
        });

        const mergedAppointments = appointmentsRes.data.map((appt) => {
          return {
            ...appt,
            doctor: doctorsById[appt.doctor_id] || null,
            clinic: clinicsById[appt.clinic_id] || null,
          };
        });

        setDoctorsMap(doctorsById);
        setClinicsMap(clinicsById);
        setAppointmentsTableData(mergedAppointments);
      } catch (err) {
        console.error("Error fetching data:", err);
        setError("Failed to fetch appointment, doctor, or clinic data.");
      } finally {
        setLoading(false);
      }
    };

    fetchAllData();
  }, []);

  const openPopup = () => {
    setFormData({
      doctor_id: "",
      clinic_id: "",
      appointment_date_time: "",
    });
    setSubmitError("");
    setShowPopup(true);
  };

  const closePopup = () => {
    setShowPopup(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitError("");

    if (!formData.doctor_id || !formData.clinic_id || !formData.appointment_date_time) {
      setSubmitError("Please fill in all fields.");
      return;
    }

    setSubmitting(true);
    try {
      const response = await axios.post(
        "https://nagamedserver.onrender.com/api/appointment",
        formData
      );
      // Refresh appointments list after successful creation
      const newAppointment = response.data;
      setAppointmentsTableData((prev) => [
        ...prev,
        {
          ...newAppointment,
          doctor: doctorsMap[newAppointment.doctor_id] || null,
          clinic: clinicsMap[newAppointment.clinic_id] || null,
        },
      ]);
      setShowPopup(false);
    } catch (error) {
      // Handle full error response
      const errorMessage = error.response?.data?.message || "Something went wrong.";
      setSubmitError(errorMessage);
        
      console.error("Error creating appointment:", error);
      setSubmitError("Failed to create appointment. Please try again.");

    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="S2-screen">
      <div className="S2-title">
        <span className="S2-title-main">Appointments</span>
        <div className="S2-title-btns">
          <button className="S2-title-btn1" onClick={openPopup}>
            Add Appointment <AddCircleOutlineOutlined style={{ fontSize: 15 }} />
          </button>
          <button className="S2-title-btn2">
            Edit Appointment <EditNoteOutlined style={{ fontSize: 18 }} />
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
                  <th>Doctor Name</th>
                  <th>Clinic Name</th>
                  <th>Date & Time</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {appointmentsTableData.map((item) => (
                  <tr key={item._id}>
                    <td>{item._id}</td>
                    <td>{item.doctor?.doctor_name || "Unknown Doctor"}</td>
                    <td>{item.clinic?.clinic_name || "Unknown Clinic"}</td>
                    <td>{new Date(item.appointment_date_time).toLocaleString()}</td>
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
                <span className="S2-bottom-parttitle1">Appointment Requests</span>
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
                      <td>{new Date(item.appointment_date_time).toLocaleDateString()}</td>
                      <td>{new Date(item.appointment_date_time).toLocaleTimeString()}</td>
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

      {showPopup && (
        <div className="popup-overlay">
          <div className="popup-content">
            <h2>Create Appointment</h2>
            <form onSubmit={handleSubmit}>
              <label>
                Doctor:
                <select
                  name="doctor_id"
                  value={formData.doctor_id}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Select a doctor</option>
                  {Object.values(doctorsMap).map((doc) => (
                    <option key={doc._id} value={doc._id}>
                      {doc.doctor_name}
                    </option>
                  ))}
                </select>
              </label>
              <label>
                Clinic:
                <select
                  name="clinic_id"
                  value={formData.clinic_id}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Select a clinic</option>
                  {Object.values(clinicsMap).map((clinic) => (
                    <option key={clinic._id} value={clinic._id}>
                      {clinic.clinic_name}
                    </option>
                  ))}
                </select>
              </label>
              <label>
                Appointment Date & Time:
                <input
                  type="datetime-local"
                  name="appointment_date_time"
                  value={formData.appointment_date_time}
                  onChange={handleInputChange}
                  required
                />
              </label>
              {submitError && <p className="error">{submitError}</p>}
              <div className="popup-buttons">
                <button type="submit" disabled={submitting}>
                  {submitting ? "Submitting..." : "Create"}
                </button>
                <button type="button" onClick={closePopup} disabled={submitting}>
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Appointments;
