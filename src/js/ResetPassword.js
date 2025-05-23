import React, { useState } from 'react';
import "../css/ResetPass.css";
import { Link } from "react-router-dom";
import LockResetOutlinedIcon from '@mui/icons-material/LockResetOutlined';

const ResetPassword = () => {
  const [email, setEmail] = useState("");
  const [showCodeInput, setShowCodeInput] = useState(false);
  const [code, setCode] = useState("");

  const handleSendLink = (e) => {
    e.preventDefault();
    // send the reset link to the email
    setShowCodeInput(true);
  };

  const handleVerifyCode = (e) => {
    e.preventDefault();
    // verify the code
    setShowCodeInput(false);
    // or redirect to new password screen
  };

  return (
    <div className="reset-bg">
      <div className="reset-card">
        <div className="reset-header">
          <LockResetOutlinedIcon className="reset-icon" />
          <div className="nagamed-r">
            <span className="naga-r">Naga</span>
            <span className="med-r">Med</span>
          </div>
          <h2 className="reset-title">Reset Password</h2>
          <p className="reset-subtitle">
            Enter your email address and we’ll send you a link to reset your password.
          </p>
        </div>

        <div className="reset-inputs">
          <input
            className="inputfield-r"
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            disabled={showCodeInput}
          />
        </div>

        {!showCodeInput && (
          <button className="reset-button" onClick={handleSendLink}>
            <span className="reset-text">Send Reset Link</span>
          </button>
        )}

        {showCodeInput && (
          <form onSubmit={handleVerifyCode} className="code-input-section">
            <hr className='reset-hr'/>
            <h3 className="reset-modal-title">Enter Verification Code</h3>
            <p className="reset-modal-desc">Please enter the code sent to your email.</p>
            <input
              className="resetinputfield"
              type="text"
              placeholder="Enter code"
              value={code}
              onChange={e => setCode(e.target.value)}
              maxLength={6}
            />
            <div className="reset-modal-actions">
              <button className="reset-button" type="submit">
                Verify Code
              </button>
              <button
                className="reset-modal-cancel"
                type="button"
                onClick={() => setShowCodeInput(false)}
              >
                Cancel
              </button>
            </div>
          </form>
        )}

        <div className="reset-footer">
          <Link to="/" className="back-login-link">Back to Login</Link>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;