import React from 'react';
import { BrowserRouter, Routes, Route, NavLink } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import DoctorList from './pages/DoctorList';
import Doctor from './pages/Doctor';
import Book from './pages/Book';
import MyAppointments from './pages/MyAppointments';
import DoctorDashboard from './pages/DoctorDashboard';
import AdminDashboard from './pages/AdminDashboard';
import ManageDoctors from './pages/ManageDoctors';
import Login from './pages/Login';
import Register from './pages/Register';
import Notifications from './pages/Notifications';
import NotFound from './pages/NotFound';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <div className="app-shell">
          <nav className="app-nav">
            <div className="app-logo">
              Clinic<span>booking</span>
            </div>
            <div className="app-links">
              <NavLink
                to="/"
                end
                className={({ isActive }) =>
                  'app-link' + (isActive ? ' app-link-active' : '')
                }
              >
                Home
              </NavLink>
              <NavLink
                to="/doctors"
                className={({ isActive }) =>
                  'app-link' + (isActive ? ' app-link-active' : '')
                }
              >
                Doctors
              </NavLink>
              <NavLink
                to="/appointments"
                className={({ isActive }) =>
                  'app-link' + (isActive ? ' app-link-active' : '')
                }
              >
                My appointments
              </NavLink>
              <NavLink
                to="/login"
                className={({ isActive }) =>
                  'app-link' + (isActive ? ' app-link-active' : '')
                }
              >
                Login
              </NavLink>
            </div>
          </nav>

          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/doctors" element={<DoctorList />} />
            <Route path="/doctor/:doctorId" element={<Doctor />} />
            <Route path="/book/:doctorId" element={<Book />} />
            <Route path="/appointments" element={<MyAppointments />} />
            <Route path="/doctor/dashboard" element={<DoctorDashboard />} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/admin/doctors" element={<ManageDoctors />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/notifications" element={<Notifications />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
