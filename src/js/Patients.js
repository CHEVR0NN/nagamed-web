import React, { useState, useEffect } from 'react';
import "../css/Patients.css";
import axios from 'axios';

const Patients = () => {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Search filters
  const [searchName, setSearchName] = useState("");
  const [searchId, setSearchId] = useState("");
  const [searchEmail, setSearchEmail] = useState("");
  const [searchContact, setSearchContact] = useState("");

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const response = await axios.get('https://nagamedserver.onrender.com/api/user');

        const patientsData = response.data.map((p) => ({
          id: p._id || p.id, // fallback in case of `_id`
          fullName: p.fullname || p.name || "Unknown", // handle `fullname` and `name`
          email: p.email || "Unknown",
          contactNo: p.contactNo || "Unknown", // default to "Unknown" if not provided
          registerDate: p.createdAt || "Unknown", // use `createdAt` as register date
        }));

        setPatients(patientsData);
      } catch (err) {
        console.error('Error fetching patients:', err);
        setError('Failed to fetch patient data. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchPatients();
  }, []);

  const handleEdit = (patient) => {
    alert(`Edit patient: ${patient.fullName}`);
  };

  // Filter logic
  const filteredPatients = patients.filter((p) => {
    return (
      p.fullName?.toLowerCase().includes(searchName.toLowerCase()) &&
      p.email?.toLowerCase().includes(searchEmail.toLowerCase()) &&
      p.contactNo?.toLowerCase().includes(searchContact.toLowerCase())
    );
  });

  if (loading) {
    return <div>Loading patient data...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <div className="patientscontainer">
      <p className="patientstitle">Patient Information</p>
      <br />

      {/* Search Fields */}
      <div className="patientsinfoheader">
        <div className="searchingpatients">
          <p className="searchtitle">Patient Name</p>
          <input
            type="text"
            className="patientsearchbar"
            placeholder="Enter Patient Name"
            value={searchName}
            onChange={(e) => setSearchName(e.target.value)}
          />
        </div>

        <div className="searchingpatients">
          <p className="searchtitle">Patient ID</p>
          <input
            type="text"
            className="patientsearchbar"
            placeholder="Enter Patient ID"
            value={searchId}
            onChange={(e) => setSearchId(e.target.value)}
          />
        </div>

        <div className="searchingpatients">
          <p className="searchtitle">Email Address</p>
          <input
            type="text"
            className="patientsearchbar"
            placeholder="Enter Patient Email"
            value={searchEmail}
            onChange={(e) => setSearchEmail(e.target.value)}
          />
        </div>

        <div className="searchingpatients">
          <p className="searchtitle">Contact number</p>
          <input
            type="text"
            className="patientsearchbar"
            placeholder="Enter Patient Number"
            value={searchContact}
            onChange={(e) => setSearchContact(e.target.value)}
          />
        </div>
      </div>

      {/* Patient Table */}
      <table className="patientstable">
  <thead>
    <tr>
      <th></th>
      <th>Full Name</th>
      <th>Contact No.</th>
      <th>Email Address</th>
      <th>Action</th>
    </tr>
  </thead>
  <tbody>
    {filteredPatients.length > 0 ? (
      filteredPatients.map((p) => (
        <tr key={`${p.id}-${p.email}`}>
          <td>
            <input type="checkbox" />
          </td>
          <td>{p.fullName}</td>
          <td>{p.contactNo}</td>
          <td>{p.email}</td>
          <td>
            <button onClick={() => handleEdit(p)} className="editbtn">Edit</button>
          </td>
        </tr>
      ))
    ) : (
      <tr>
        <td colSpan="5" style={{ textAlign: "center", padding: "20px" }}>
          No matching patients found.
        </td>
      </tr>
    )}
  </tbody>
</table>
    </div>
  );
};

export default Patients;