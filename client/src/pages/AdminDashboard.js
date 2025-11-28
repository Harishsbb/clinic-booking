import React from 'react';
import { Link } from 'react-router-dom';

export default function AdminDashboard() {
  return (
    <div className="page">
      <header className="page-header">
        <h1>Admin dashboard</h1>
        <p>Manage the clinic: doctors, appointments and notifications.</p>
      </header>

      <section className="card">
        <div className="card-header">
          <h2>Quick links</h2>
        </div>
        <div className="doctor-grid">
          <div className="doctor-card">
            <h3>Manage doctors</h3>
            <p className="muted">Add, edit or remove doctors from the system.</p>
            <div className="doctor-actions">
              <Link className="btn primary" to="/admin/doctors">
                Go to manage doctors
              </Link>
            </div>
          </div>
          <div className="doctor-card">
            <h3>Appointments</h3>
            <p className="muted">Later you can add an overview of all bookings here.</p>
          </div>
          <div className="doctor-card">
            <h3>Notifications</h3>
            <p className="muted">Configure how patients and doctors are notified.</p>
          </div>
        </div>
      </section>
    </div>
  );
}








