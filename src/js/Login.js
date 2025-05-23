import * as React from "react";
import { useState } from "react";
import "../css/Login.css";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";
import storage from "./store/authStore";
import { VisibilityOutlined, VisibilityOffOutlined } from "@mui/icons-material";
import ResetPass from './ResetPassword.js';

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [message, setMessage] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      // Swal.fire({
      //   title: "Please fill in all fields.",
      //   icon: "error",
      //   customClass: { popup: "swal-popup" },
      // });
      setMessage('Please fill in all fields.');
      
      return;
    }

    try {
      const response = await axios.post(
        "https://nagamedserver.onrender.com/api/doctorauth/signin",
        { email, password },
        { headers: { "Content-Type": "application/json" } }
      );

      if (response.status === 200) {
        const { data } = response.data;
        const doctorId = data._id;
        const userName = data.fullname || data.username || "Doctor";
        const token = response.data.token || null; // Fallback to null if no token

        // Save auth data
        storage.save("auth", { doctorId, token, userName });

        console.log("Login API response:", response.data); // Debug log
        console.log("Saved auth data:", storage.load("auth")); // Debug log

        Swal.fire({
          title: "Login Success",
          icon: "success",
          customClass: { popup: "swal-popup" },
        }).then(() => navigate("/Dashboard"));
      }
    } catch (error) {
      console.error("Error during login:", error);
      // Swal.fire({
      //   title: "Login Failed",
      //   text: error.response?.data?.message || "Something went wrong.",
      //   icon: "error",
      //   customClass: { popup: "swal-popup" },
      // });
      setMessage(error.response?.data?.message || "Something went wrong.");
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
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <p className="inputname2">Password</p>
            <div className="login-password-container">
              <input
              className="inputfield"
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              />

              <span className="toggle-password"
                onClick={() => setShowPassword(!showPassword)}
                tabIndex={0}
                aria-label={showPassword ? "Hide password" : "Show password"}
                >
                {showPassword ? 
                <VisibilityOutlined /> 
                : <VisibilityOffOutlined/>}
              </span>

            </div>

            <div className="alertalert">
            {message && <p className="loginerrormsg">{message}</p>}
            </div>

          </div>

          <div className="checks">
            
            <input type="checkbox" className="checkbox" id="remember" />
            <label htmlFor="remember" className="remember-label">
              Remember me
            </label>
            <Link to="/ResetPass" className="forgot-password">
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