import React, { useEffect, useState } from 'react';
import api from '../services/api';
import { Link } from 'react-router-dom';

export default function DoctorList() {
  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    api.get('/doctors').then((r) => setDoctors(r.data));
  }, []);

  return (
    <div className="page">
      <header className="page-header">
        <h1>All doctors</h1>
        <p>Browse doctors and open their profile or book directly.</p>
      </header>

      <section className="card">
        <div className="card-header">
          <h2>Doctors</h2>
          <span className="pill">{doctors.length} total</span>
        </div>
        <div className="doctor-grid">
          {doctors.length === 0 && <p className="muted">No doctors found.</p>}
          {doctors.map((d) => (
            <div className="doctor-card" key={d.id}>
              <div className="doctor-main">
                <h3>{d.name}</h3>
                <p className="doctor-specialization">{d.specialization}</p>
              </div>
              {d.phone && <p className="doctor-meta">Phone: {d.phone}</p>}
              <div className="doctor-actions">
                <Link className="btn ghost" to={`/doctor/${d.id}`}>
                  View profile
                </Link>
                <Link className="btn primary" to={`/book/${d.id}`}>
                  Book
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}


