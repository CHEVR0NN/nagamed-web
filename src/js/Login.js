import * as React from "react";
import { useState } from "react";
import "../css/Login.css";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";
import storage from "./store/authStore"; // Import storage module

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate(); // For navigation

  const handleLogin = async () => {
    try {
      const response = await axios.post(
        "https://nagamedserver.onrender.com/api/auth/signin",
        {
          email,
          password,
        }
      );
  
      if (response.status === 200) {
        const token = response.data.token;
        const userName = response.data.user?.name || response.data.user?.fullname || "Doctor";
  
        // Save token and name
        storage.save("token", token);
        storage.save("name", userName);
  
        Swal.fire({
          title: "Login Success",
          icon: "success",
          customClass: {
            popup: "swal-popup",
          },
        }).then(() => navigate("/dashboard"));
      }
    } catch (error) {
      console.error("Error during login:", error);
      Swal.fire({
        title: "Login Failed",
        text: error.response?.data?.message || "Something went wrong.",
        icon: "error",
        customClass: {
          popup: "swal-popup",
        },
      });
    }
  };

  return (
    <div className="dashboardcont">
      <div className="split left">
        <p className="nagamed">
          <span className="naga">Naga</span>
          <span className="med">Med</span>
        </p>

        <p className="description">
          Seamless Access to your
          <br /> Healthcare - Anytime, Anywhere
        </p>

        <div className="loginbox">
          <p className="weba">Welcome Back</p>

          <div className="inputs">
            <p className="inputname">Email</p>
            <input
              className="inputfield"
              type="text"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <p className="inputname2">Password</p>
            <input
              className="inputfield"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="checks">
            <input type="checkbox" className="checkbox" id="remember" />
            <label htmlFor="remember" className="remember-label">
              Remember me
            </label>
            <Link to="#" className="forgot-password">
              Forgot Password?
            </Link>
          </div>

          <button className="btn" onClick={handleLogin}>
            Login
          </button>
          <p className="question">
            Don't have an account?
            <Link to="/Signup" className="signuplink">
              Sign up
            </Link>
          </p>

          <div className="socials">
            <img src={require("../images/google.png")} alt="google" />
            <img src={require("../images/fb.png")} alt="facebook" />
          </div>
        </div>
      </div>

      <div className="split right"></div>
    </div>
  );
};

export default Login;
