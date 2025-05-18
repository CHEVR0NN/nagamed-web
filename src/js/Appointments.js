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
  const [editPopupVisible, setEditPopupVisible] = useState(false);
  const [editFormData, setEditFormData] = useState({
    doctor_id: "",
    clinic_id: "",
    appointment_date_time: "",
    status: "",
  });
  const [viewPopupVisible, setViewPopupVisible] = useState(false);
  const [viewData, setViewData] = useState(null);

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        const [appointmentsRes, doctorsRes, clinicsRes, patientsRes] = await Promise.all([
          axios.get("https://nagamedserver.onrender.com/api/appointment"),
          axios.get("https://nagamedserver.onrender.com/api/doctor"),
          axios.get("https://nagamedserver.onrender.com/api/clinic"),
          axios.get("https://nagamedserver.onrender.com/api/user"),
        ]);

        const doctors = doctorsRes.data;
        const clinics = clinicsRes.data;
        const patients = patientsRes.data;

        const doctorsById = {};
        doctors.forEach((doc) => {
          doctorsById[doc._id] = doc;
        });

        const clinicsById = {};
        clinics.forEach((clinic) => {
          clinicsById[clinic._id] = clinic;
        });

        const patientsById = {};
        patients.forEach((patient) => {
          patientsById[patient._id] = patient;
        });

        const mergedAppointments = appointmentsRes.data.map((appt) => {
          return {
            ...appt,
            doctor: doctorsById[appt.doctor_id] || null,
            clinic: clinicsById[appt.clinic_id] || null,
            patient: patientsById[appt.patient_id] || null,
          };
        });

        setDoctorsMap(doctorsById);
        setClinicsMap(clinicsById);
        setAppointmentsTableData(mergedAppointments);
      } catch (err) {
        console.error("Error fetching data:", err);
        setError("Failed to fetch appointment, doctor, clinic, or patient data.");
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

  const openEditPopup = (appointment) => {
    setEditFormData({
      doctor_id: appointment.doctor_id || "",
      clinic_id: appointment.clinic_id || "",
      appointment_date_time: appointment.appointment_date_time || "",
      status: appointment.status || "",
    });
    setEditPopupVisible(true);
  };

  const closeEditPopup = () => {
    setEditPopupVisible(false);
  };

  const handleEditInputChange = (e) => {
    const { name, value } = e.target;
    setEditFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    setSubmitError("");

    if (!editFormData.doctor_id || !editFormData.clinic_id || !editFormData.appointment_date_time) {
      setSubmitError("Please fill in all fields.");
      return;
    }

    setSubmitting(true);
    try {
      const response = await axios.put(
        `https://nagamedserver.onrender.com/api/appointment/${editFormData.id}`,
        editFormData
      );
      const updatedAppointment = response.data;
      setAppointmentsTableData((prev) =>
        prev.map((appt) =>
          appt._id === updatedAppointment._id
            ? {
                ...updatedAppointment,
                doctor: doctorsMap[updatedAppointment.doctor_id] || null,
                clinic: clinicsMap[updatedAppointment.clinic_id] || null,
              }
            : appt
        )
      );
      setEditPopupVisible(false);
    } catch (error) {
      const errorMessage = error.response?.data?.message || "Something went wrong.";
      setSubmitError(errorMessage);

      console.error("Error updating appointment:", error);
      setSubmitError("Failed to update appointment. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const openViewPopup = (appointment) => {
    setViewData(appointment);
    setViewPopupVisible(true);
  };

  const closeViewPopup = () => {
    setViewPopupVisible(false);
    setViewData(null);
  };

  return (
    <div className="S2-screen">
      <div className="S2-title">
        <span className="S2-title-main">Appointments</span>
        <div className="S2-title-btns">
          <button className="S2-title-btn1" onClick={openPopup}>
            Add Appointment <AddCircleOutlineOutlined style={{ fontSize: 15 }} />
          </button>
          <button
            className="S2-title-btn2"
            onClick={() => setEditPopupVisible(true)}
          >
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
                  <th>Patient Name</th>
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
                    <td>{item.patient?.fullname || "Unknown Patient"}</td>
                    <td>{item.doctor?.doctor_name || "Unknown Doctor"}</td>
                    <td>{item.clinic?.clinic_name || "Unknown Clinic"}</td>
                    <td>{new Date(item.appointment_date_time).toLocaleString()}</td>
                    <td>{item.status}</td>
                    <td className="actionbtns">
                      <button
                        className="actionbtn1"
                        onClick={() => openViewPopup(item)}
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
                    <th>Patient Name</th>
                    <th>Date</th>
                    <th>Time</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {appointmentsTableData.map((item) => (
                    <tr key={item._id}>
                      <td>{item.patient?.fullname || "Unknown Patient"}</td>
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
                    <th>Patient Name</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {appointmentsTableData.map((item) => (
                    <tr key={item._id}>
                      <td>{item.patient?.fullname || "Unknown Patient"}</td>
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

      {editPopupVisible && (
        <div className="popup-overlay">
          <div className="popup-content">
            <h2>Edit Appointment</h2>
            <form onSubmit={handleEditSubmit}>
              <label>
                Doctor:
                <select
                  name="doctor_id"
                  value={editFormData.doctor_id}
                  onChange={handleEditInputChange}
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
                  value={editFormData.clinic_id}
                  onChange={handleEditInputChange}
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
                  value={editFormData.appointment_date_time}
                  onChange={handleEditInputChange}
                  required
                />
              </label>
              <label>
                Status:
                <input
                  type="text"
                  name="status"
                  value={editFormData.status}
                  onChange={handleEditInputChange}
                  required
                />
              </label>
              <div className="popup-buttons">
                <button type="submit">Save Changes</button>
                <button type="button" onClick={closeEditPopup}>
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {viewPopupVisible && viewData && (
        <div className="popup-overlay">
          <div className="popup-content">
            <h2>Appointment Details</h2>
            <form>
              <label>
                Patient Name:
                <input
                  type="text"
                  value={viewData.patient?.fullname || "Unknown"}
                  readOnly
                />
              </label>
              <label>
                Doctor Name:
                <input
                  type="text"
                  value={viewData.doctor?.doctor_name || "Unknown"}
                  readOnly
                />
              </label>
              <label>
                Clinic Name:
                <input
                  type="text"
                  value={viewData.clinic?.clinic_name || "Unknown"}
                  readOnly
                />
              </label>
              <label>
                Date & Time:
                <input
                  type="text"
                  value={new Date(viewData.appointment_date_time).toLocaleString()}
                  readOnly
                />
              </label>
              <label>
                Status:
                <input
                  type="text"
                  value={viewData.status}
                  readOnly
                />
              </label>
              <div className="popup-buttons">
                <button type="button" onClick={closeViewPopup}>
                  Close
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
