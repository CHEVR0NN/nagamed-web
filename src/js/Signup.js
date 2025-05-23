import * as React from "react";
import "../css/Signup.css";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";

const Signup = () => {
  const navigate = useNavigate();
  const [fullname, setFullname] = React.useState("");
  const [username, setUsername] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [specialization, setSpecialization] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");
  const [address, setAddress] = React.useState("");
  const [availability, setAvailability] = React.useState([{ day: "", time: "" }]);
  const [contact, setContact] = React.useState("");
  const [clinicId, setClinicId] = React.useState("");
  const [clinics, setClinics] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [clinicLoading, setClinicLoading] = React.useState(true);

  // Fetch clinics when component mounts
  React.useEffect(() => {
    const fetchClinics = async () => {
      try {
        const response = await axios.get("https://nagamedserver.onrender.com/api/clinic", {
          headers: { "Content-Type": "application/json" },
        });
        if (Array.isArray(response.data)) {
          setClinics(response.data);
        } else {
          console.warn("Unexpected clinic data format:", response.data);
          setClinics([]);
        }
      } catch (error) {
        console.error("Error fetching clinics:", error);
        Swal.fire({
          title: "Error",
          text: "Failed to load clinics. Please try again later.",
          icon: "error",
          customClass: { popup: "swal-popup" },
        });
        setClinics([]);
      } finally {
        setClinicLoading(false);
      }
    };
    fetchClinics();
  }, []);

  const handleAddAvailability = () => {
    setAvailability([...availability, { day: "", time: "" }]);
  };

  const handleRemoveAvailability = (index) => {
    const newAvailability = availability.filter((_, i) => i !== index);
    setAvailability(newAvailability.length ? newAvailability : [{ day: "", time: "" }]);
  };

  const handleAvailabilityChange = (index, field, value) => {
    const newAvailability = [...availability];
    newAvailability[index][field] = value;
    setAvailability(newAvailability);
  };

  const handleSignup = async () => {
    if (
      !fullname ||
      !username ||
      !email ||
      !specialization ||
      !password ||
      !confirmPassword ||
      !clinicId ||
      !address ||
      !contact ||
      availability.some((a) => !a.day || !a.time)
    ) {
      Swal.fire({
        title: "Validation Error",
        text: "Please fill in all fields.",
        icon: "warning",
        customClass: { popup: "swal-popup" },
      });
      return;
    }

    if (password !== confirmPassword) {
      Swal.fire({
        title: "Password Mismatch",
        text: "Passwords do not match. Please try again.",
        icon: "error",
        customClass: { popup: "swal-popup" },
      });
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post(
        "https://nagamedserver.onrender.com/api/doctorauth/signup",
        {
          fullname,
          username,
          email,
          specialization,
          password,
          clinic_id: clinicId,
          address,
          availability,
          contact,
        },
        { headers: { "Content-Type": "application/json" } }
      );

      if (response.status === 201) {
        Swal.fire({
          title: "Registration Successful",
          text: "You can now log in with your credentials.",
          icon: "success",
          customClass: { popup: "swal-popup" },
        }).then(() => navigate("/"));
      }
    } catch (error) {
      console.error("Signup Error:", error);
      let errorMessage = "Something went wrong. Please try again later.";
      if (error.response) {
        errorMessage = error.response.data?.message || errorMessage;
      } else if (error.request) {
        errorMessage = "Network error. Please check your connection.";
      }
      Swal.fire({
        title: "Signup Failed",
        text: errorMessage,
        icon: "error",
        customClass: { popup: "swal-popup" },
      });
    } finally {
      setLoading(false);
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
          Seamless Access to your Healthcare - Anytime, Anywhere
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
              disabled={loading}
            />

            <p className="signupinputname">Username</p>
            <input
              className="signupinputfield"
              type="text"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              disabled={loading}
            />

            <p className="signupinputname">Email</p>
            <input
              className="signupinputfield"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={loading}
            />

            <p className="signupinputname">Specialization</p>
            <input
              className="signupinputfield"
              type="text"
              placeholder="Enter your specialization (e.g., Psychologist)"
              value={specialization}
              onChange={(e) => setSpecialization(e.target.value)}
              disabled={loading}
            />

            <p className="signupinputname">Clinic</p>
            {clinicLoading ? (
              <input
                className="signupinputfield"
                type="text"
                value="Loading clinics..."
                disabled
              />
            ) : (
              <select
                className="signupinputfield"
                value={clinicId}
                onChange={(e) => setClinicId(e.target.value)}
                disabled={loading || clinicLoading}
              >
                <option value="">Select Clinic</option>
                {clinics.map((clinic) => (
                  <option key={clinic._id} value={clinic._id}>
                    {clinic.clinic_name || "Unknown Clinic"}
                  </option>
                ))}
              </select>
            )}

            <p className="signupinputname">Address</p>
            <input
              className="signupinputfield"
              type="text"
              placeholder="Enter your address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              disabled={loading}
            />

            <p className="signupinputname">Contact</p>
            <input
              className="signupinputfield"
              type="text"
              placeholder="Enter your contact number"
              value={contact}
              onChange={(e) => setContact(e.target.value)}
              disabled={loading}
            />

            <p className="signupinputname">Availability</p>
            {availability.map((avail, index) => (
              <div
                key={index}
                style={{ display: "flex", gap: "10px", marginBottom: "10px" }}
              >
                <select
                  className="signupinputfield"
                  value={avail.day}
                  onChange={(e) =>
                    handleAvailabilityChange(index, "day", e.target.value)
                  }
                  disabled={loading}
                  style={{ flex: 1 }}
                >
                  <option value="">Select Day</option>
                  <option value="Monday">Monday</option>
                  <option value="Tuesday">Tuesday</option>
                  <option value="Wednesday">Wednesday</option>
                  <option value="Thursday">Thursday</option>
                  <option value="Friday">Friday</option>
                  <option value="Saturday">Saturday</option>
                  <option value="Sunday">Sunday</option>
                </select>
                <input
                  className="signupinputfield"
                  type="text"
                  placeholder="e.g., 09:00 AM - 12:00 PM"
                  value={avail.time}
                  onChange={(e) =>
                    handleAvailabilityChange(index, "time", e.target.value)
                  }
                  disabled={loading}
                  style={{ flex: 2 }}
                />
                {index > 0 && (
                  <button
                    type="button"
                    onClick={() => handleRemoveAvailability(index)}
                    disabled={loading}
                    style={{
                      background: "none",
                      border: "none",
                      color: "red",
                      cursor: "pointer",
                    }}
                  >
                    Remove
                  </button>
                )}
              </div>
            ))}
            <button
              type="button"
              onClick={handleAddAvailability}
              disabled={loading}
              style={{ marginTop: "5px", padding: "5px 10px" }}
            >
              Add Availability
            </button>

            <p className="signupinputname2">Password</p>
            <input
              className="signupinputfield"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={loading}
            />

            <p className="signupinputname2">Confirm Password</p>
            <input
              className="signupinputfield"
              type="password"
              placeholder="Re-enter your password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              disabled={loading}
            />
          </div>

          <button
            className="signupbtn"
            onClick={handleSignup}
            disabled={loading}
          >
            {loading ? "Signing Up..." : "Signup"}
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