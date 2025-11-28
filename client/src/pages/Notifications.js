import React from 'react';

export default function Notifications() {
  return (
    <div className="page">
      <header className="page-header">
        <h1>Notifications</h1>
        <p>See how the system communicates with patients and doctors.</p>
      </header>

      <section className="card">
        <div className="card-header">
          <h2>Recent notifications</h2>
        </div>
        <p className="muted">
          In a real app this would list email/SMS notifications about bookings and
          cancellations.
        </p>
      </section>
    </div>
  );
}








