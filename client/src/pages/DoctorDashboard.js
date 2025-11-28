import React from 'react';

export default function DoctorDashboard() {
  return (
    <div className="page">
      <header className="page-header">
        <h1>Doctor dashboard</h1>
        <p>Quick overview of today&apos;s schedule and patients.</p>
      </header>

      <section className="card">
        <div className="card-header">
          <h2>Today&apos;s appointments</h2>
        </div>
        <p className="muted">
          No appointments loaded. Later you can connect this to the appointments API filtered
          by doctor.
        </p>
      </section>

      <section className="card">
        <div className="card-header">
          <h2>Notifications</h2>
        </div>
        <p className="muted">Important updates for this doctor will appear here.</p>
      </section>
    </div>
  );
}








