import * as React from "react";
import "../css/Dashboard.css";
import { SearchOutlined, NotificationsOutlined, AddCircleOutlineOutlined, Circle } from '@mui/icons-material';
import LineChart from './Linechart';
const Dashboard = () => {
    return (
        <div className="dashboard">
        
            <div className="part1">
                <div className="searchbar">
                    <SearchOutlined style={ { marginLeft: 10 } }/>
                    <input type="text" placeholder="Search" />
                </div>
                
                <div className="rightpart1">
                    <div className="notification">
                        <NotificationsOutlined />
                    </div>
                    <div className="userpfp" />
                </div>
            </div>

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
                
            </div>
        </div>
    );
};

  
  export default Dashboard;
  