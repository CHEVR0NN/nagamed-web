import React, { useState } from 'react';
import "../css/ResetPass.css";
import { Link, useNavigate } from "react-router-dom";
import LockResetOutlinedIcon from '@mui/icons-material/LockResetOutlined';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ResetPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [showCodeInput, setShowCodeInput] = useState(false);
  const [showPasswordInput, setShowPasswordInput] = useState(false);
  const [code, setCode] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [token, setToken] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  
  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const handleSendLink = async (e) => {
    e.preventDefault();
    setError("");
    
    // Validate email
    if (!email) {
      setError("Email is required");
      return;
    }
    
    if (!validateEmail(email)) {
      setError("Please enter a valid email address");
      return;
    }
    
    setLoading(true);
    
    try {
      const response = await axios.post(`http://localhost:10000/api/doctorauth/request-reset`, { email });
      
      if (response.data.success) {
        toast.success("Verification code has been sent to your email");
        setToken(response.data.token);
        setShowCodeInput(true);
      }
    } catch (error) {
      console.error("Error sending reset code:", error);
      if (error.response && error.response.data && error.response.data.message) {
        setError(error.response.data.message);
      } else {
        setError("Failed to send verification code. Please try again later.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyCode = async (e) => {
    e.preventDefault();
    setError("");
    
    if (!code) {
      setError("Please enter the verification code");
      return;
    }
    
    setLoading(true);
    
    try {
      const response = await axios.post(`http://localhost:10000/api/doctorauth/verify-reset-code`, { 
        token, 
        code 
      });
      
      if (response.data.success) {
        toast.success("Code verified successfully");
        setShowCodeInput(false);
        setShowPasswordInput(true);
      }
    } catch (error) {
      console.error("Error verifying code:", error);
      if (error.response && error.response.data && error.response.data.message) {
        setError(error.response.data.message);
      } else {
        setError("Failed to verify code. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setError("");
    
    if (!password) {
      setError("Please enter a new password");
      return;
    }
    
    if (password.length < 6) {
      setError("Password must be at least 6 characters long");
      return;
    }
    
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    
    setLoading(true);
    
    try {
      const response = await axios.post(`http://localhost:10000/api/doctorauth/reset-password`, {
        token,
        password
      });
      
      if (response.data.success) {
        toast.success("Password reset successfully!");
        setTimeout(() => {
          navigate('/');
        }, 2000);
      }
    } catch (error) {
      console.error("Error resetting password:", error);
      if (error.response && error.response.data && error.response.data.message) {
        setError(error.response.data.message);
      } else {
        setError("Failed to reset password. Please try again later.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="reset-bg">
      <ToastContainer position="top-right" autoClose={3000} />
      <div className="reset-card">
        <div className="reset-header">
          <LockResetOutlinedIcon className="reset-icon" />
          <div className="nagamed-r">
            <span className="naga-r">Naga</span>
            <span className="med-r">Med</span>
          </div>
          <h2 className="reset-title">Reset Password</h2>
          <p className="reset-subtitle">
            {!showCodeInput && !showPasswordInput ? 
              "Enter your email address and we'll send you a verification code to reset your password." :
              showCodeInput ? 
                "Enter the verification code sent to your email." :
                "Create a new password for your account."
            }
          </p>
        </div>

        {error && <div className="reset-error">{error}</div>}

        {!showCodeInput && !showPasswordInput && (
          <form onSubmit={handleSendLink} className="reset-inputs">
            <input
              className="inputfield-r"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              disabled={loading}
            />
            <button 
              className="reset-button" 
              type="submit"
              disabled={loading}
            >
              {loading ? "Sending..." : "Send Verification Code"}
            </button>
          </form>
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
              disabled={loading}
            />
            <div className="reset-modal-actions">
              <button 
                className="reset-button" 
                type="submit"
                disabled={loading}
              >
                {loading ? "Verifying..." : "Verify Code"}
              </button>
              <button
                className="reset-modal-cancel"
                type="button"
                onClick={() => {
                  setShowCodeInput(false);
                  setCode("");
                  setError("");
                }}
                disabled={loading}
              >
                Cancel
              </button>
            </div>
          </form>
        )}

        {showPasswordInput && (
          <form onSubmit={handleResetPassword} className="password-input-section">
            <hr className='reset-hr'/>
            <h3 className="reset-modal-title">Create New Password</h3>
            <div className="reset-inputs">
              <input
                className="resetinputfield"
                type="password"
                placeholder="New password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                disabled={loading}
              />
              <input
                className="resetinputfield"
                type="password"
                placeholder="Confirm new password"
                value={confirmPassword}
                onChange={e => setConfirmPassword(e.target.value)}
                disabled={loading}
              />
            </div>
            <div className="reset-modal-actions">
              <button 
                className="reset-button" 
                type="submit"
                disabled={loading}
              >
                {loading ? "Resetting..." : "Reset Password"}
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