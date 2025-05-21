import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import Login from "./js/Login";
import Signup from "./js/Signup";
import Navbar from "./js/Navbar";
import Dashboard from "./js/Dashboard";
import Appointments from "./js/Appointments";
import Patients from "./js/Patients";
import Messages from "./js/Messages";
import Reports from "./js/Reports";
import Settings from "./js/Settings";
import Header from "./js/Header";
import storage from "./js/store/authStore";

const ProtectedRoute = ({ children }) => {
  const authData = storage.load("auth");
  return authData && authData.doctorId ? children : <Navigate to="/" />;
};

const App = () => {
  const location = useLocation();
  const showNavbar = location.pathname !== "/" && location.pathname !== "/Signup";
  const showHeader = location.pathname !== "/" && location.pathname !== "/Signup";

  return (
    <div style={{ display: "flex" }}>
      {showNavbar && <Navbar />}
      <div
        style={{
          marginLeft: showNavbar ? "17%" : "0",
          width: "100%",
          height: "100vh",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {showHeader && <Header />}
        <div style={{ overflowY: "auto" }}>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/Signup" element={<Signup />} />
            <Route
              path="/Dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/Appointments"
              element={
                <ProtectedRoute>
                  <Appointments />
                </ProtectedRoute>
              }
            />
            <Route
              path="/Patients"
              element={
                <ProtectedRoute>
                  <Patients />
                </ProtectedRoute>
              }
            />
            <Route
              path="/Messages"
              element={
                <ProtectedRoute>
                  <Messages />
                </ProtectedRoute>
              }
            />
            <Route
              path="/Reports"
              element={
                <ProtectedRoute>
                  <Reports />
                </ProtectedRoute>
              }
            />
            <Route
              path="/Settings"
              element={
                <ProtectedRoute>
                  <Settings />
                </ProtectedRoute>
              }
            />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default App;