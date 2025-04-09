import { Routes, Route, useLocation } from 'react-router-dom';
import Login from './js/Login';
import Signup from './js/Signup';
import Navbar from './js/Navbar';
import Dashboard from './js/Dashboard';
import Appointments from './js/Appointments';
import Doctors from './js/Doctors';
import Patients from './js/Patients';
import Message from './js/Message';
import Reports from './js/Reports';
import Settings from './js/Settings';
import Header from './js/Header';

const App = () => {
  const location = useLocation();
  const showNavbar = location.pathname !== '/' && location.pathname !== '/Signup';
  const showHeader = location.pathname !== '/' && location.pathname !== '/Signup';

  return (
    <div style={{ display: 'flex' }}>
      {showNavbar && <Navbar />}

      <div style={{ marginLeft: showNavbar ? '17%' : '0', width: '100%', height: '100vh', display: 'flex', flexDirection: 'column' }}>
      {showHeader && <Header />}


        <div style={{ overflowY: 'auto' }}>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/Signup" element={<Signup />} />
            <Route path="/Dashboard" element={<Dashboard />} />
            <Route path="/Appointments" element={<Appointments />} />
            <Route path="/Doctors" element={<Doctors />} />
            <Route path="/Patients" element={<Patients />} />
            <Route path="/Message" element={<Message />} />
            <Route path="/Reports" element={<Reports />} />
            <Route path="/Settings" element={<Settings />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default App;