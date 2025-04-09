import React, { useState } from 'react';
import "../css/Patients.css";

const Patients = () => {
    
    // sample data ulet
    const patientsList = [
        {
          id: '#ABCD12',
          registerDate: '2025-04-01',
          fullName: 'Sample Name',
          contactNo: '09123456789',
          email: 'hdsgfsdhf@example.com',
        },
        {
          id: '#EDFG34',
          registerDate: '2025-04-05',
          fullName: 'Lorem Ipsum',
          contactNo: '09999999999',
          email: 'zzz@example.com',
        },
      ];

    const handleEdit = (patient) => {
    alert(`Edit patient: ${patient.fullName}`);
    };

    const [patients, setPatients] = useState(patientsList);

    return (
        <div className="patientscontainer">
            <div><p className="patientstitle">Patient Information</p></div>
            <br/>

            <div className="patientsinfoheader">
                <div className="searchingpatients">
                <p className="searchtitle">Patient Name</p>
                <input type="text" className="patientsearchbar" placeholder="Enter Patient Name"/>
                </div>

                <div className="searchingpatients">
                <p className="searchtitle">Patient ID</p>
                <input type="text" className="patientsearchbar" placeholder="Enter Patient ID"/>
                </div>

                <div className="searchingpatients">
                <p className="searchtitle">Email Address</p>
                <input type="text" className="patientsearchbar" placeholder="Enter Patient Email"/>
                </div>

                <div className="searchingpatients">
                <p className="searchtitle">Contact number</p>
                <input type="text" className="patientsearchbar" placeholder="Enter Patient Number"/>
                </div>
            </div>


            <table className="patientstable">
            <thead>
                <tr>
                <th></th>
                <th>Patient ID</th>
                <th>Register Date</th>
                <th>Full Name</th>
                <th>Contact No.</th>
                <th>Email Address</th>
                <th>Action</th>
                </tr>
            </thead>
            <tbody>
                {patients.map((p) => (
                <tr key={p.id}>
                    <td><input type="checkbox" /></td>
                    <td className='patientidcolumn'>{p.id}</td>
                    <td>{p.registerDate}</td>
                    <td>{p.fullName}</td>
                    <td>{p.contactNo}</td>
                    <td>{p.email}</td>
                    <td><a onClick={() => handleEdit(p)}>Edit</a></td>
                </tr>
                ))}
            </tbody>
            </table>


        </div>
    )
  };
  
  export default Patients;
  