import * as React from "react";
import "../css/Dashboard.css";
import { AddCircleOutlineOutlined, Circle, ArrowDropDownOutlined } from '@mui/icons-material';
import LineChart from './Linechart';
const Dashboard = () => {
    return (
        <div className="dashboard">
        
            <div className="part2">
                <div className="hellodoc">
                {/* pafetch doctor name */}
                <span className="whitetxt">Hello, <span className="blacktxt">doctor_name</span></span> 
                <span className="hellodocdescription">Here are your important tasks and reports.<br/>Please check your next appointment.</span>
                </div>

                <div className="dashboardbtns">
                    <button className="dashboardbtn1">View Appointments<AddCircleOutlineOutlined style={ { fontSize:18 } }/></button>
                    <button className="dashboardbtn2">View Patients</button>
                </div>
            </div>

            <div className="part3">
                <div className="part3container">
                    <div className="part3title">
                        <span className="charttitle">Activity</span>
                        <span className="chartlegends">
                            <span className="legend1"><Circle style = { {fontSize: 14, color: '962DFF' } }/> Patients</span>
                            <span className="legend2"><Circle style = { {fontSize: 14, color: 'FCB5C3' } }/> Consultation</span>
                        </span>
                    </div>
                    
                    <hr className="part3hr"/>

                    <div className="part3chart">
                    <LineChart/>
                    </div>
                </div>
            </div>

            <div className="part4">
                <span className="part4container1">
                    <span className="part4titles">
                        <span className="part4title1">Appointment Requests</span>
                        <span className="part4title2">View All</span>
                    </span>
                    
                    {/* appointment requests ( name, date, time, status ) */}
                    <table className="part4table">
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
                
                <span className="part4container1">
                    <span className="part4titles">
                        <span className="part4title1">Appointments</span>
                        <span className="part4title2">Today <ArrowDropDownOutlined/></span>
                    </span>
                    
                    {/* appointments ( name, status ) */}
                    <table className="part4table">
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
    );
};

  
  export default Dashboard;
