import * as React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ReactDOM from "react-dom";
import { v4 as uuidv4 } from "uuid";
import "../css/Appointments.css";
import {
  AddCircleOutlineOutlined,
  EditNoteOutlined,
  ArrowDropDownOutlined,
  Close,
} from "@mui/icons-material";
import axios from "axios";
import Swal from "sweetalert2";
import storage from "./store/authStore";

const Appointments = () => {
  const navigate = useNavigate();
  const [appointmentsTableData, setAppointmentsTableData] = useState([]);
  const [appointmentRequests, setAppointmentRequests] = useState([]);
  const [todayAppointments, setTodayAppointments] = useState([]);
  const [patients, setPatients] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [clinics, setClinics] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showAddPopup, setShowAddPopup] = useState(false);
  const [showEditPopup, setShowEditPopup] = useState(false);
  const [formData, setFormData] = useState({
    appointment_id: "",
    patient_id: "",
    doctor_id: "",
    clinic_id: "",
    appointment_date_time: "",
  });
  const [editFormData, setEditFormData] = useState(null);
  const [clinicLoading, setClinicLoading] = useState(true);
  const [patientSearch, setPatientSearch] = useState("");
  const [filteredPatients, setFilteredPatients] = useState([]);
  const [showPatientResults, setShowPatientResults] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const authData = storage.load("auth");
        console.log("Auth data from storage:", authData);
        if (!authData || !authData.doctorId) {
          console.log("Navigating to '/' due to missing authData or doctorId");
          navigate("/");
          return;
        }

        const { doctorId, token } = authData;
        const headers = { "Content-Type": "application/json" };
        if (token) headers.Authorization = `Bearer ${token}`;

        const [appointmentsRes, patientsRes, doctorsRes, clinicsRes] = await Promise.all([
          axios.get(`http://localhost:10000/api/appointment/doctor/${doctorId}`, { headers }),
          axios.get(`https://nagamedserver.onrender.com/api/user`, { headers }),
          axios.get(`https://nagamedserver.onrender.com/api/doctorauth/`, { headers }),
          axios.get(`https://nagamedserver.onrender.com/api/clinic`, { headers }),
        ]);

        console.log("Appointments response:", appointmentsRes.data);
        console.log("Patients response:", patientsRes.data);
        console.log("Doctors response:", doctorsRes.data);
        console.log("Clinics response:", clinicsRes.data);

        const doctorsData = doctorsRes.data.data && Array.isArray(doctorsRes.data.data)
          ? doctorsRes.data.data
          : Array.isArray(doctorsRes.data)
            ? doctorsRes.data
            : [];
        if (doctorsData.length === 0) {
          console.warn("No doctors found in response");
        }
        setDoctors(doctorsData);

        const appointments = Array.isArray(appointmentsRes.data) ? appointmentsRes.data : [];
        console.log("Appointments:", appointments);

        setPatients(Array.isArray(patientsRes.data) ? patientsRes.data : []);
        setClinics(Array.isArray(clinicsRes.data) ? clinicsRes.data : []);
        setClinicLoading(false);

        const mainTableData = appointments.map((appt) => ({
          patientName: patients.find((p) => p._id === appt.patient_id)?.fullname || "Unknown",
          contact: patients.find((p) => p._id === appt.patient_id)?.contact || "N/A",
          medicalHistory: patients.find((p) => p._id === appt.patient_id)?.medicalHistory || "None",
          doctorAssigned: doctorsData.find((d) => d._id === appt.doctor_id)?.fullname || authData.userName || "Unknown",
          dateTime: new Date(appt.appointment_date_time).toLocaleString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
            hour: "numeric",
            minute: "numeric",
            hour12: true,
          }),
          appointment_id: appt.appointment_id || appt._id,
          status: appt.status || "Pending",
          patient_id: appt.patient_id,
          doctor_id: appt.doctor_id,
          clinic_id: appt.clinic_id,
        }));

        const requestsData = appointments
          .filter((appt) => appt.status === "Pending")
          .map((appt) => ({
            name: patients.find((p) => p._id === appt.patient_id)?.fullname || appt.patient?.name || "Unknown",
            date: new Date(appt.appointment_date_time).toLocaleDateString(),
            time: new Date(appt.appointment_date_time).toLocaleTimeString([], {
              hour: "numeric",
              minute: "numeric",
              hour12: true,
            }),
            status: appt.status || "Pending",
            appointment_id: appt.appointment_id || appt._id,
          }));

        const today = new Date().toDateString();
        const todayData = appointments
          .filter((appt) => new Date(appt.appointment_date_time).toDateString() === today)
          .map((appt) => ({
            name: patients.find((p) => p._id === appt.patient_id)?.fullname || appt.patient?.name || "Unknown",
            status: appt.status || "Pending",
            appointment_id: appt.appointment_id || appt._id,
          }));

        setAppointmentsTableData(mainTableData);
        setAppointmentRequests(requestsData);
        setTodayAppointments(todayData);
      } catch (err) {
        console.error("Error fetching data:", {
          message: err.message,
          response: err.response?.data,
          status: err.response?.status,
        });
        setError(err.response?.data?.message || "Failed to fetch data.");
        Swal.fire({
          title: "Error",
          text: err.response?.data?.message || "Failed to fetch data.",
          icon: "error",
          customClass: { popup: "swal-popup" },
        });
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [navigate]);

  useEffect(() => {
    if (patientSearch.trim() === "") {
      setFilteredPatients(patients);
    } else {
      const filtered = patients.filter(patient => 
        patient.fullname?.toLowerCase().includes(patientSearch.toLowerCase())
      );
      setFilteredPatients(filtered);
    }
  }, [patientSearch, patients]);

  const handleAddSubmit = async (e) => {
    e.preventDefault();
    if (
      !formData.patient_id ||
      !formData.doctor_id ||
      !formData.clinic_id ||
      !formData.appointment_date_time
    ) {
      Swal.fire({
        title: "Error",
        text: "Please fill in all fields.",
        icon: "error",
        customClass: { popup: "swal-popup" },
      });
      return;
    }

    try {
      const authData = storage.load("auth");
      const headers = { "Content-Type": "application/json" };
      if (authData?.token) headers.Authorization = `Bearer ${authData.token}`;

      const newAppointmentData = {
        ...formData,
        appointment_id: formData.appointment_id || uuidv4(),
      };

      const response = await axios.post(
        "https://nagamedserver.onrender.com/api/appointment",
        newAppointmentData,
        { headers }
      );

      const newAppointment = response.data.appointment || response.data;
      const newTableData = {
        patientName: patients.find((p) => p._id === newAppointment.patient_id)?.fullname || newAppointment.patient?.name || "Unknown",
        contact: patients.find((p) => p._id === newAppointment.patient_id)?.contact || newAppointment.patient?.contact || "N/A",
        medicalHistory:
          patients.find((p) => p._id === newAppointment.patient_id)?.medicalHistory || newAppointment.patient?.medicalHistory || "None",
        doctorAssigned: doctors.find((d) => d._id === newAppointment.doctor_id)?.fullname || authData.userName || "Unknown",
        dateTime: new Date(newAppointment.appointment_date_time).toLocaleString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
          hour: "numeric",
          minute: "numeric",
          hour12: true,
        }),
        appointment_id: newAppointment.appointment_id || newAppointment._id,
        status: newAppointment.status || "Pending",
        patient_id: newAppointment.patient_id,
        doctor_id: newAppointment.doctor_id,
        clinic_id: newAppointment.clinic_id,
      };

      setAppointmentsTableData((prev) => [...prev, newTableData]);
      if (newAppointment.status === "Pending") {
        setAppointmentRequests((prev) => [
          ...prev,
          {
            name: newTableData.patientName,
            date: new Date(newAppointment.appointment_date_time).toLocaleDateString(),
            time: new Date(newAppointment.appointment_date_time).toLocaleTimeString([], {
              hour: "numeric",
              minute: "numeric",
              hour12: true,
            }),
            status: newAppointment.status || "Pending",
            appointment_id: newAppointment.appointment_id || newAppointment._id,
          },
        ]);
      }
      if (
        new Date(newAppointment.appointment_date_time).toDateString() === new Date().toDateString()
      ) {
        setTodayAppointments((prev) => [
          ...prev,
          {
            name: newTableData.patientName,
            status: newAppointment.status || "Pending",
            appointment_id: newAppointment.appointment_id || newAppointment._id,
          },
        ]);
      }

      setShowAddPopup(false);
      setFormData({
        appointment_id: "",
        patient_id: "",
        doctor_id: "",
        clinic_id: "",
        appointment_date_time: "",
      });
      setPatientSearch("");
      setShowPatientResults(false);

      Swal.fire({
        title: "Success",
        text: "Appointment created successfully.",
        icon: "success",
        customClass: { popup: "swal-popup" },
      });
    } catch (error) {
      console.error("Error creating appointment:", error.response?.data || error.message);
      Swal.fire({
        title: "Error",
        text: error.response?.data?.message || "Failed to create appointment.",
        icon: "error",
        customClass: { popup: "swal-popup" },
      });
    }
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    if (
      !editFormData.patient_id ||
      !editFormData.doctor_id ||
      !editFormData.clinic_id ||
      !editFormData.appointment_date_time
    ) {
      Swal.fire({
        title: "Error",
        text: "Please fill in all fields.",
        icon: "error",
        customClass: { popup: "swal-popup" },
      });
      return;
    }

    try {
      const authData = storage.load("auth");
      const headers = { "Content-Type": "application/json" };
      if (authData?.token) headers.Authorization = `Bearer ${authData.token}`;

      const response = await axios.put(
        `https://nagamedserver.onrender.com/api/appointment/${editFormData.appointment_id}`,
        {
          patient_id: editFormData.patient_id,
          doctor_id: editFormData.doctor_id,
          clinic_id: editFormData.clinic_id,
          appointment_date_time: editFormData.appointment_date_time,
          status: editFormData.status,
        },
        { headers }
      );

      const updatedAppointment = response.data.appointment || response.data;
      const updatedTableData = {
        patientName: patients.find((p) => p._id === updatedAppointment.patient_id)?.fullname || updatedAppointment.patient?.name || "Unknown",
        contact: patients.find((p) => p._id === updatedAppointment.patient_id)?.contact || updatedAppointment.patient?.contact || "N/A",
        medicalHistory:
          patients.find((p) => p._id === updatedAppointment.patient_id)?.medicalHistory || updatedAppointment.patient?.medicalHistory || "None",
        doctorAssigned: doctors.find((d) => d._id === updatedAppointment.doctor_id)?.fullname || authData.userName || "Unknown",
        dateTime: new Date(updatedAppointment.appointment_date_time).toLocaleString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
          hour: "numeric",
          minute: "numeric",
          hour12: true,
        }),
        appointment_id: updatedAppointment.appointment_id || updatedAppointment._id,
        status: updatedAppointment.status || "Pending",
        patient_id: updatedAppointment.patient_id,
        doctor_id: updatedAppointment.doctor_id,
        clinic_id: updatedAppointment.clinic_id,
      };

      setAppointmentsTableData((prev) =>
        prev.map((appt) => (appt.appointment_id === updatedTableData.appointment_id ? updatedTableData : appt))
      );
      setAppointmentRequests((prev) =>
        updatedAppointment.status === "Pending"
          ? prev.map((req) =>
              req.appointment_id === updatedTableData.appointment_id
                ? {
                    name: updatedTableData.patientName,
                    date: new Date(updatedAppointment.appointment_date_time).toLocaleDateString(),
                    time: new Date(updatedAppointment.appointment_date_time).toLocaleTimeString([], {
                      hour: "numeric",
                      minute: "numeric",
                      hour12: true,
                    }),
                    status: updatedAppointment.status || "Pending",
                    appointment_id: updatedTableData.appointment_id,
                  }
                : req
            )
          : prev.filter((req) => req.appointment_id !== updatedTableData.appointment_id)
      );
      setTodayAppointments((prev) =>
        new Date(updatedAppointment.appointment_date_time).toDateString() === new Date().toDateString()
          ? prev.map((appt) =>
              appt.appointment_id === updatedTableData.appointment_id
                ? {
                    name: updatedTableData.patientName,
                    status: updatedAppointment.status || "Pending",
                    appointment_id: updatedTableData.appointment_id,
                  }
                : appt
            )
          : prev.filter((appt) => appt.appointment_id !== updatedTableData.appointment_id)
      );

      setShowEditPopup(false);
      setEditFormData(null);
      setPatientSearch("");
      setShowPatientResults(false);

      Swal.fire({
        title: "Success",
        text: "Appointment updated successfully.",
        icon: "success",
        customClass: { popup: "swal-popup" },
      });
    } catch (error) {
      console.error("Error updating appointment:", error.response?.data || error.message);
      Swal.fire({
        title: "Error",
        text: error.response?.data?.message || "Failed to update appointment.",
        icon: "error",
        customClass: { popup: "swal-popup" },
      });
    }
  };

  const handleApprove = async (appointmentId) => {
    try {
      const authData = storage.load("auth");
      const headers = { "Content-Type": "application/json" };
      if (authData?.token) headers.Authorization = `Bearer ${authData.token}`;

      const response = await axios.put(
        `https://nagamedserver.onrender.com/api/appointment/${appointmentId}`,
        { status: "Approved" },
        { headers }
      );

      const updatedAppointment = response.data.appointment || response.data;
      setAppointmentsTableData((prev) =>
        prev.map((appt) =>
          appt.appointment_id === appointmentId ? { ...appt, status: "Approved" } : appt
        )
      );
      setAppointmentRequests((prev) =>
        prev.filter((req) => req.appointment_id !== appointmentId)
      );
      setTodayAppointments((prev) =>
        prev.map((appt) =>
          appt.appointment_id === appointmentId ? { ...appt, status: "Approved" } : appt
        )
      );

      Swal.fire({
        title: "Success",
        text: "Appointment approved.",
        icon: "success",
        customClass: { popup: "swal-popup" },
      });
    } catch (error) {
      console.error("Error approving appointment:", error.response?.data || error.message);
      Swal.fire({
        title: "Error",
        text: error.response?.data?.message || "Failed to approve appointment.",
        icon: "error",
        customClass: { popup: "swal-popup" },
      });
    }
  };

  const handleDecline = async (appointmentId) => {
    try {
      const authData = storage.load("auth");
      const headers = { "Content-Type": "application/json" };
      if (authData?.token) headers.Authorization = `Bearer ${authData.token}`;

      const response = await axios.put(
        `https://nagamedserver.onrender.com/api/appointment/${appointmentId}`,
        { status: "Declined" },
        { headers }
      );

      const updatedAppointment = response.data.appointment || response.data;
      setAppointmentsTableData((prev) =>
        prev.map((appt) =>
          appt.appointment_id === appointmentId ? { ...appt, status: "Declined" } : appt
        )
      );
      setAppointmentRequests((prev) =>
        prev.filter((req) => req.appointment_id !== appointmentId)
      );
      setTodayAppointments((prev) =>
        prev.map((appt) =>
          appt.appointment_id === appointmentId ? { ...appt, status: "Declined" } : appt
        )
      );

      Swal.fire({
        title: "Success",
        text: "Appointment declined.",
        icon: "success",
        customClass: { popup: "swal-popup" },
      });
    } catch (error) {
      console.error("Error declining appointment:", error.response?.data || error.message);
      Swal.fire({
        title: "Error",
        text: error.response?.data?.message || "Failed to decline appointment.",
        icon: "error",
        customClass: { popup: "swal-popup" },
      });
    }
  };

  const openEditPopup = (appointment) => {
    console.log("Setting edit form data:", appointment);
    setEditFormData({
      appointment_id: appointment.appointment_id || appointment._id,
      patient_id: appointment.patient_id || "",
      doctor_id: appointment.doctor_id || "",
      clinic_id: appointment.clinic_id || "",
      appointment_date_time: new Date(appointment.appointment_date_time)
        .toISOString()
        .slice(0, 16),
      status: appointment.status || "Pending",
    });
    setPatientSearch(
      patients.find((p) => p._id === appointment.patient_id)?.fullname || "Unknown"
    );
    setShowEditPopup(true);
    console.log("showEditPopup set to true");
  };

  return (
    <div className="S2-screen">
      <div className="S2-title">
        <span className="S2-title-main">Appointments</span>
        <div className="S2-title-btns">
          {/* <button className="S2-title-btn1" onClick={() => { console.log("Opening add popup"); setShowAddPopup(true); }}>
            Add Appointment <AddCircleOutlineOutlined style={{ fontSize: 15 }} />
          </button> */}
          <button
            className="S2-title-btn2"
            onClick={() =>
              Swal.fire({
                title: "Select Appointment",
                text: "Please select an appointment to edit by clicking 'View'.",
                icon: "info",
                customClass: { popup: "swal-popup" },
              })
            }
          >
            Edit Appointment <EditNoteOutlined style={{ fontSize: 18 }} />
          </button>
        </div>
      </div>

      <div className="S2-table">
        {loading && <div>Loading...</div>}
        {error && <div>Error: {error}</div>}
        {!loading && !error && appointmentsTableData.length === 0 && (
          <div>No appointments found for this doctor. Try adding a new appointment.</div>
        )}
        {!loading && !error && appointmentsTableData.length > 0 && (
          <table className="S2-table1">
            <thead className="S2-table1-header">
              <tr>
                <th>Patient Name</th>
                <th>Contact</th>
                <th>Medical History</th>
                <th>Doctor Assigned</th>
                <th>Date & Time</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {appointmentsTableData.map((item) => (
                <tr key={item.appointment_id}>
                  <td>{item.patientName}</td>
                  <td>{item.contact}</td>
                  <td>{item.medicalHistory}</td>
                  <td>{item.doctorAssigned}</td>
                  <td>{item.dateTime}</td>
                  <td className="actionbtns">
                    <a className="actionbtn1" href="#" onClick={() => { console.log("Opening edit popup for", item); openEditPopup(item); }}>
                      View
                    </a>
                    <button
                      className="actionbtn2"
                      onClick={() => handleApprove(item.appointment_id)}
                      disabled={item.status !== "Pending"}
                    >
                      Approve
                    </button>
                    <button
                      className="actionbtn3"
                      onClick={() => handleDecline(item.appointment_id)}
                      disabled={item.status !== "Pending"}
                    >
                      Decline
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <div className="S2-bottom-part">
        <span className="S2-bottom-partcontainer1">
          <span className="S2-bottom-parttitles">
            <span className="S2-bottom-parttitle1">Appointment Requests</span>
            <span className="S2-bottom-parttitle2">View All</span>
          </span>
          {!loading && !error && appointmentRequests.length === 0 && (
            <div>No appointment requests found.</div>
          )}
          {!loading && !error && appointmentRequests.length > 0 && (
            <table className="S2-bottom-parttable">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Date</th>
                  <th>Time</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {appointmentRequests.map((req) => (
                  <tr key={req.appointment_id}>
                    <td>{req.name}</td>
                    <td>{req.date}</td>
                    <td>{req.time}</td>
                    <td>{req.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </span>

        <span className="S2-bottom-partcontainer1">
          <span className="S2-bottom-parttitles">
            <span className="S2-bottom-parttitle1">Appointments</span>
            <span className="S2-bottom-parttitle2">
              Today <ArrowDropDownOutlined />
            </span>
          </span>
          {!loading && !error && todayAppointments.length === 0 && (
            <div>No appointments today.</div>
          )}
          {!loading && !error && todayAppointments.length > 0 && (
            <table className="S2-bottom-parttable">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {todayAppointments.map((appt) => (
                  <tr key={appt.appointment_id}>
                    <td>{appt.name}</td>
                    <td>{appt.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </span>
      </div>

      {/* Add Appointment Popup with Portal */}
      {showAddPopup && ReactDOM.createPortal(
        <div className="popup-overlay">
          <div className="popup-content">
            <div className="modal-header">
              <Close
                className="modal-close"
                style={{ cursor: "pointer" }}
                onClick={() => setShowAddPopup(false)}
              />
              <h2>Add Appointment</h2>
            </div>
            <form onSubmit={handleAddSubmit}>
              <div className="modal-body">
                <label>
                  Patient:
                  <div className="searchable-input">
                    <input
                      type="text"
                      placeholder="Search patient by name"
                      value={patientSearch}
                      onChange={(e) => {
                        setPatientSearch(e.target.value);
                        setShowPatientResults(true);
                      }}
                      onFocus={() => setShowPatientResults(true)}
                    />
                    {showPatientResults && filteredPatients.length > 0 && (
                      <div className="search-results">
                        {filteredPatients.map((patient) => (
                          <div
                            key={patient._id}
                            className="search-result-item"
                            onClick={() => {
                              setFormData({ ...formData, patient_id: patient._id });
                              setPatientSearch(patient.fullname || "Unknown");
                              setShowPatientResults(false);
                            }}
                          >
                            {patient.fullname || "Unknown"}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </label>
                
                <label>
                  Doctor:
                  <select
                    value={formData.doctor_id}
                    onChange={(e) =>
                      setFormData({ ...formData, doctor_id: e.target.value })
                    }
                  >
                    <option value="">Select Doctor</option>
                    {doctors.map((doctor) => (
                      <option key={doctor._id} value={doctor._id}>
                        {doctor.fullname || "Unknown"}
                      </option>
                    ))}
                  </select>
                </label>
                
                <label>
                  Clinic:
                  {clinicLoading ? (
                    <input type="text" value="Loading clinics..." disabled />
                  ) : (
                    <select
                      value={formData.clinic_id}
                      onChange={(e) =>
                        setFormData({ ...formData, clinic_id: e.target.value })
                      }
                    >
                      <option value="">Select Clinic</option>
                      {clinics.map((clinic) => (
                        <option key={clinic._id} value={clinic._id}>
                          {clinic.clinic_name || "Unknown Clinic"}
                        </option>
                      ))}
                    </select>
                  )}
                </label>
                
                <label>
                  Date & Time:
                  <input
                    type="datetime-local"
                    value={formData.appointment_date_time}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        appointment_date_time: e.target.value,
                      })
                    }
                  />
                </label>
              </div>
              <div className="popup-buttons">
                <button type="submit">Save</button>
                <button type="button" onClick={() => setShowAddPopup(false)}>
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>,
        document.body
      )}

      {/* Edit Appointment Popup with Portal */}
      {showEditPopup && editFormData && ReactDOM.createPortal(
        <div className="popup-overlay">
          <div className="popup-content2-edit">
            <div className="modal-header">
              <Close
                className="modal-close"
                style={{ cursor: "pointer" }}
                onClick={() => setShowEditPopup(false)}
              />
              <h2>Edit Appointment</h2>
            </div>
            <form onSubmit={handleEditSubmit}>
              <div className="modal-body">
                <label>
                  Patient:
                  <div className="searchable-input">
                    <input
                      type="text"
                      placeholder="Search patient by name"
                      value={patientSearch}
                      onChange={(e) => {
                        setPatientSearch(e.target.value);
                        setShowPatientResults(true);
                      }}
                      onFocus={() => setShowPatientResults(true)}
                    />
                    {showPatientResults && filteredPatients.length > 0 && (
                      <div className="search-results">
                        {filteredPatients.map((patient) => (
                          <div
                            key={patient._id}
                            className="search-result-item"
                            onClick={() => {
                              setEditFormData({ ...editFormData, patient_id: patient._id });
                              setPatientSearch(patient.fullname || "Unknown");
                              setShowPatientResults(false);
                            }}
                          >
                            {patient.fullname || "Unknown"}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </label>
                
                <label>
                  Doctor:
                  <select
                    value={editFormData.doctor_id}
                    onChange={(e) =>
                      setEditFormData({ ...editFormData, doctor_id: e.target.value })
                    }
                  >
                    <option value="">Select Doctor</option>
                    {doctors.map((doctor) => (
                      <option key={doctor._id} value={doctor._id}>
                        {doctor.fullname || "Unknown"}
                      </option>
                    ))}
                  </select>
                </label>
                
                <label>
                  Clinic:
                  {clinicLoading ? (
                    <input type="text" value="Loading clinics..." disabled />
                  ) : (
                    <select
                      value={editFormData.clinic_id}
                      onChange={(e) =>
                        setEditFormData({ ...editFormData, clinic_id: e.target.value })
                      }
                    >
                      <option value="">Select Clinic</option>
                      {clinics.map((clinic) => (
                        <option key={clinic._id} value={clinic._id}>
                          {clinic.clinic_name || "Unknown Clinic"}
                        </option>
                      ))}
                    </select>
                  )}
                </label>
                
                <label>
                  Date & Time:
                  <input
                    type="datetime-local"
                    value={editFormData.appointment_date_time}
                    onChange={(e) =>
                      setEditFormData({
                        ...editFormData,
                        appointment_date_time: e.target.value,
                      })
                    }
                  />
                </label>
                
                <label>
                  Status:
                  <select
                    value={editFormData.status}
                    onChange={(e) =>
                      setEditFormData({ ...editFormData, status: e.target.value })
                    }
                  >
                    <option value="Pending">Pending</option>
                    <option value="Approved">Approved</option>
                    <option value="Declined">Declined</option>
                  </select>
                </label>
              </div>
              <div className="popup-buttons">
                <button type="submit">Save</button>
                <button type="button" onClick={() => setShowEditPopup(false)}>
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>,
        document.body
      )}
    </div>
  );
};

export default Appointments;