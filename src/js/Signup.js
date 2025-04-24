import * as React from "react";
import "../css/Signup.css";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";

const Signup = () => {
  const navigate = useNavigate();
  const [fullname, setFullname] = React.useState(""); // Added Fullname state
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");

  const handleSignup = async () => {
    if (!fullname || !email || !password || !confirmPassword) {
      Swal.fire({
        title: "Validation Error",
        text: "Please fill in all fields.",
        icon: "warning",
        customClass: {
          popup: "swal-popup",
        },
      });
      return;
    }

    if (password !== confirmPassword) {
      Swal.fire({
        title: "Password Mismatch",
        text: "Passwords do not match. Please try again.",
        icon: "error",
        customClass: {
          popup: "swal-popup",
        },
      });
      return;
    }

    try {
      const response = await axios.post(
        "https://nagamedserver.onrender.com/api/auth/signup",
        { fullname, email, password }, // Include fullname in the request payload
        { headers: { "Content-Type": "application/json" } }
      );

      if (response.status === 201) {
        Swal.fire({
          title: "Registration Successful",
          text: "You can now log in with your credentials.",
          icon: "success",
          customClass: {
            popup: "swal-popup",
          },
        }).then(() => navigate("/"));
      }
    } catch (error) {
      console.error("Signup Error:", error);

      Swal.fire({
        title: "Signup Failed",
        text: error.response?.data?.message || "Something went wrong. Please try again later.",
        icon: "error",
        customClass: {
          popup: "swal-popup",
        },
      });
    }
  };

  return (
    <div>
      <div className="leftside"></div>

      <div className="rightside">
        <p className="appname">
          <span className="n">Naga</span>
          <span className="m">Med</span>
        </p>

        <p className="desc">
          Seamless Access to your
          <br /> Healthcare - Anytime, Anywhere
        </p>

        <div className="signupbox">
          <p className="signuptitle">Sign Up</p>

          <div className="signupinputs">
            <p className="signupinputname">Fullname</p>
            <input
              className="signupinputfield"
              type="text"
              placeholder="Enter your fullname"
              value={fullname}
              onChange={(e) => setFullname(e.target.value)}
            />

            <p className="signupinputname">Email</p>
            <input
              className="signupinputfield"
              type="text"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <p className="signupinputname2">Password</p>
            <input
              className="signupinputfield"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <p className="signupinputname2">Confirm Password</p>
            <input
              className="signupinputfield"
              type="password"
              placeholder="Re-enter your password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>

          <button className="signupbtn" onClick={handleSignup}>
            Signup
          </button>
          <p className="alr">
            Already have an account?{" "}
            <Link to="/" className="signinlink">
              Sign in
            </Link>
          </p>

          <div className="socs">
            <img src={require("../images/google.png")} alt="google" />
            <img src={require("../images/fb.png")} alt="facebook" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;