import * as React from "react";
import "../css/Reports.css";
import Dailychart from "./Dailychart";
import Patientchart from "./Patientchart";
import { AddCircleOutlineOutlined, Circle } from '@mui/icons-material';

const Reports = () => {
    return (
        <div className="report-screen">
            <div className="Reports-container">
                <div className="reports-container-left">
                   <span className="container-left-title">Report List</span>

                    <div className="container-left-btns">
                        <button className="container-left-btn1" href='#'>Daily Appointments</button>
                        <button className="container-left-btn2" href="#">Monthly Patient Stats</button>
                        <button className="container-left-btn3" href="#">Doctor Performance</button>
                    </div>
                </div>

                <div className="reports-container-right">
                    <span className="container-right-title">Date From</span>
                    <input type="date" className="date-picker"/>
                    <span className="container-right-title">Date End</span>
                    <input type="date" className="date-picker"/>

                    <div className="container-right-btns">
                        <button className="container-right-btn1" href="#">Cancel</button>
                        <button className="container-right-btn2" href="#">Generate Report</button>
                    </div>
                </div>
            </div>

            <div className="report-screen-bottom">
                
                <div className="report-screen-bottom-container1">
                    <span className="part4title1">Daily Appointments</span>
                    
                    <span className="part4chart1"> <Dailychart/> </span>
                   
                    <span className="part4chart1label">
                        <span className="legend1"><Circle style = { {fontSize: 14, color: '82C45C' } }/> Approved</span>
                        <span className="legend1"><Circle style = { {fontSize: 14, color: '28B6F6' } }/> Declined</span>
                   </span>
                </div>
                
                <span className="report-screen-bottom-container2">
                    <span className="part4titles">
                        <span className="part4title1">Patient Graph</span>
                    </span>
                    
                    <span className="part4chart2">
                        <Patientchart/>
                    </span>

                    <span className="part4container2chartlabels">
                        <span className="chartlegends">
                            <span className="legend1"><Circle style = { {fontSize: 14, color: 'C084FC' } }/> Patient Count</span>
                            <span className="legend2"><Circle style = { {fontSize: 14, color: 'FB923C' } }/> Appointment Pending</span>
                        </span>

                        <span className="chartlegends">
                            <span className="legend1"><Circle style = { {fontSize: 14, color: '2563EB' } }/> Appointment Decline</span>
                            <span className="legend2"><Circle style = { {fontSize: 14, color: '22C55E' } }/> Appointment Finished</span>
                        </span>
                    </span>
                </span>

            </div>

        </div>
    )
  };
  
  export default Reports;
  