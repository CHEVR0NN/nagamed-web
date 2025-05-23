import React from 'react';
import "../css/ResetPass.css";

const ResetPassword = () => {
  return (
    <div className="reset-container">
        <div className='reset-header'>

        </div>
        
        <div className='reset-title'>
        <p className="nagamed">
          <span className="naga">Naga</span>
          <span className="med">Med</span>
          <span className='reset'> : Reset Password</span>
        </p>
        </div>

        <div className="inputs">
            <p className="inputname3">Email</p>
            <input
              className="inputfield"
              type="email"
              placeholder="Enter your email"
            />
        </div>

        <button className="reset-button">
            <p className="reset-text">Send Reset Link</p>
        </button>
        {/* <div class="custom-shape-divider-bottom-1748009522">
            <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
                <path d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z" class="shape-fill"></path>
            </svg>
        </div> */}
    </div>

  );
};

export default ResetPassword;
