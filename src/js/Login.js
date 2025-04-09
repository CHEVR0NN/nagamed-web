import * as React from "react";
import "../css/Login.css";
import { Link, useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';

const Login = () => {
  const navigate = useNavigate();
  const handleLogin = () => {
    Swal.fire({
      title: 'Login Success',
      icon: 'success',
      customClass: {
        popup: 'swal-popup'
      }
    }).then(() => navigate('/dashboard'));
  };

  return (
    <div className="dashboardcont">

      <div className="split left">
      <p className="nagamed"><span className="naga">Naga</span>
      <span className="med">Med</span></p>

      <p className="description">Seamless Access to your<br/> Healthcare - Anytime, Anywhere</p>

      <div className="loginbox">
      <p className="weba">Welcome Back</p>

        <div className="inputs">
          <p className="inputname">Email</p>
          <input className="inputfield" type="text" placeholder="Enter your email" />

          <p className="inputname2">Password</p>
          <input className="inputfield" type="text" placeholder="Enter your password" />
        </div>

        <div className="checks">
          <input type="checkbox" className="checkbox" id="remember" />
          <label htmlFor="remember" className="remember-label">Remember me</label>
          <Link to="#" className="forgot-password">Forgot Password?</Link>
          </div>

          <button className="btn" onClick={handleLogin}>Login</button>
          <p className="question">Don't have an account?<Link to="/Signup" className="signuplink">Sign up</Link></p>

          <div className="socials">
            <img src={require('../images/google.png')} alt="google"/>
            <img src={require('../images/fb.png')} alt="facebook"/>
          </div>
      </div>

      </div>
      <div className="split right">
      </div>


    </div>
  );
}

export default Login;