import * as React from "react";
import "../css/Appointments.css";
import { AddCircleOutlineOutlined, EditNoteOutlined, ArrowDropDownOutlined } from '@mui/icons-material';

const Appointments = () => {
    
    // sample data realness xori
    const appointmentsTableData = [
        { patientName: 'Kylie Clemente', contact: '09999999999', medicalHistory: 'adhd', doctorAssigned: 'Dr. Kwak Kwak', dateTime: 'Apr 13, 2025 04:13 AM', actions: ' ' },
        { patientName: 'Faye Webster', contact: '09123456789', medicalHistory: 'manipulator', doctorAssigned: 'Dr. Stone', dateTime: 'Apr 21, 2025 10:23 AM', actions: ' ' },

    ]

      
    return (
        <div className="S2-screen">
            <div className="S2-title">
                <span className="S2-title-main">Appointments</span>

                <div className="S2-title-btns">
                    <button className="S2-title-btn1">Add Appointment<AddCircleOutlineOutlined style={ { fontSize:15} }/></button>
                    <button className="S2-title-btn2">Edit Appointment<EditNoteOutlined style={ { fontSize:18 } }/> </button>
                </div>
            </div>

                <div className="S2-table">
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
                        {appointmentsTableData.map((item, index) => (
                            <tr key={index}>
                            <td>{item.patientName}</td>
                            <td>{item.contact}</td>
                            <td>{item.medicalHistory}</td>
                            <td>{item.doctorAssigned}</td>
                            <td>{item.dateTime}</td>
                            <td className="actionbtns">
                            <a className="actionbtn1" href="#">View</a>
                            <button className="actionbtn2" href="#">Approve</button>
                            <button className="actionbtn3" href="#">Decline</button>
                            </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>

                <div className="S2-bottom-part">
                <span className="S2-bottom-partcontainer1 ">
                    <span className="S2-bottom-parttitles ">
                        <span className="S2-bottom-parttitle1 ">Appointment Requests</span>
                        <span className="S2-bottom-parttitle2">View All</span>
                    </span>
                    
                    {/* appointment requests ( name, date, time, status ) */}
                    <table className="S2-bottom-parttable">
                        <tr>
                            <td>Row 1, Col 1</td>
                            <td>Row 1, Col 2</td>
                            <td>Row 1, Col 3</td>
                            <td>Row 1, Col 4</td>
                        </tr>
                        <tr>
                            <td>Row 2, Col 1</td>
                            <td>Row 2, Col 2</td>
                            <td>Row 2, Col 3</td>
                            <td>Row 2, Col 4</td>
                        </tr>
                        <tr>
                            <td>Row 3, Col 1</td>
                            <td>Row 3, Col 2</td>
                            <td>Row 3, Col 3</td>
                            <td>Row 3, Col 4</td>
                        </tr>
                    </table>
                </span>
                
                <span className="S2-bottom-partcontainer1">
                    <span className="S2-bottom-parttitles">
                        <span className="S2-bottom-parttitle1">Appointments</span>
                        <span className="S2-bottom-parttitle2">Today <ArrowDropDownOutlined/></span>
                    </span>
                    
                    {/* appointments ( name, status ) */}
                    <table className="S2-bottom-parttable">
                        <tr>
                            <td>Row 1, Col 1</td>
                            <td>Row 1, Col 2</td>
                        </tr>
                        <tr>
                            <td>Row 2, Col 1</td>
                            <td>Row 2, Col 2</td>
                        </tr>
                        <tr>
                            <td>Row 3, Col 1</td>
                            <td>Row 3, Col 2</td>
                        </tr>
                    </table>
                </span>
                
            </div>

        </div>
    )
  };
  
  export default Appointments;
  