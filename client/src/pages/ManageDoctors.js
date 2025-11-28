import React from 'react';

export default function ManageDoctors() {
  return (
    <div className="page">
      <header className="page-header">
        <h1>Manage doctors</h1>
        <p>Add, edit or remove doctors from the clinic.</p>
      </header>

      <section className="card">
        <div className="card-header">
          <h2>Doctors</h2>
        </div>
        <p className="muted">
          For now, you can add doctors from the Home page. Later we can move that form here
          and show a full editable table.
        </p>
      </section>
    </div>
  );
}








