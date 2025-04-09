import React from "react";
import { SearchOutlined, NotificationsOutlined } from "@mui/icons-material";

const Header = () => {
  return (
    <>
      <style>
        {`
        .part1 {
        height: 10%;
        padding: 20px;
        box-sizing: border-box;
        background-color: #F9F8F9;
        }
        .searchbar {
        display: flex;
        justify-content: flex-start;
        background-color: #ffffff;
        padding: 5px;
        width: 100%;
        height: 100%;
        border: 1px solid #00000033;
        align-items: center;
        gap: 2px;
        }

        .searchbar input[type="text"] {
        padding: 5px 10px;
        font-size: 16px;
        border: none;
        font-family: Poppins;
        width: 100%;
        }

        .searchbar input[type="text"]:focus {
        outline: none;
        }


        .notification, .userpfp {
        background-color: #ffffff;
        width: 6%;
        height: 5%;
        padding: 10px;
        }

        .rightpart1 {
        display: flex;
        justify-content: flex-end;
        gap: 10px;
        }
        `}
      </style>

      <div className="part1">
        <div className="searchbar">
          <SearchOutlined style={{ marginLeft: 10 }} />
          <input type="text" placeholder="Search" />
        </div>

        <div className="rightpart1">
          <div className="notification">
            <NotificationsOutlined />
          </div>
          <div className="userpfp" />
        </div>
      </div>
    </>
  );
};

export default Header;
