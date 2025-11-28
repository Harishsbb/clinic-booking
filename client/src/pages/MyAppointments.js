import React from 'react';

export default function MyAppointments() {
  // Later you can hook this to a real user or patient id
  return (
    <div className="page">
      <header className="page-header">
        <h1>My appointments</h1>
        <p>Review your upcoming and past visits.</p>
      </header>

      <section className="card">
        <div className="card-header">
          <h2>Upcoming</h2>
        </div>
        <p className="muted">No appointments yet. Book one from the doctors list.</p>
      </section>

      <section className="card">
        <div className="card-header">
          <h2>History</h2>
        </div>
        <p className="muted">Your past appointments will appear here.</p>
      </section>
    </div>
  );
}








