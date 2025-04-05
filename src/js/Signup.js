import * as React from "react";
import "../css/Signup.css";
import { Link, useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';

const Signup = () => {

const navigate = useNavigate();
  const handleSignup = () => {
    Swal.fire({
      title: 'Register Success',
      icon: 'success',
      customClass: {
        popup: 'swal-popup'
      }
    }).then(() => navigate('/'));
  };

    return (
        <div>
        <div className="leftside"></div>

        <div className="rightside">
        <p className="appname"><span className="n">Naga</span>
        <span className="m">Med</span></p>
  
        <p className="desc">Seamless Access to your<br/> Healthcare - Anytime, Anywhere</p>
  
        <div className="signupbox">
        <p className="signuptitle">Sign Up</p>
  
          <div className="signupinputs">
            <p className="signupinputname">Email</p>
            <input className="signupinputfield" type="text" placeholder="Enter your email" />
  
            <p className="signupinputname2">Password</p>
            <input className="signupinputfield" type="text" placeholder="Enter your password" />

            <p className="signupinputname2">Confirm Password</p>
            <input className="signupinputfield" type="text" placeholder="Re-enter your password" />
          </div>

            <button className="signupbtn" onClick={handleSignup}>Signup</button>
            <p className="alr">Already have an account? <Link to="/" className="signinlink">Sign in</Link></p>
  
            <div className="socs">
              <img src={require('../images/google.png')} alt="google"/>
              <img src={require('../images/fb.png')} alt="facebook"/>
            </div>
        </div>
  
        </div>
  
  
      </div>
    )
  };
  
  export default Signup;
  