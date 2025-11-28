import React, { useEffect, useState } from 'react';
import api from '../services/api';
import { Link } from 'react-router-dom';

export default function Home() {
  const [doctors, setDoctors] = useState([]);
  const [newDoctor, setNewDoctor] = useState({
    name: '',
    specialization: '',
    phone: '',
  });
  const [saving, setSaving] = useState(false);

  const loadDoctors = () => {
    api.get('/doctors').then((r) => setDoctors(r.data));
  };

  useEffect(() => {
    loadDoctors();
  }, []);

  const handleAddDoctor = async (e) => {
    e.preventDefault();
    if (!newDoctor.name || !newDoctor.specialization) {
      alert('Please enter name and specialization.');
      return;
    }
    try {
      setSaving(true);
      await api.post('/doctors', newDoctor);
      setNewDoctor({ name: '', specialization: '', phone: '' });
      loadDoctors();
    } catch (err) {
      alert('Error adding doctor.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="page page-home">
      <header className="page-header">
        <h1>Clinic Booking</h1>
        <p>Select a doctor and book an appointment in a few clicks.</p>
      </header>

      <section className="card" style={{ marginBottom: 18 }}>
        <div className="card-header">
          <h2>Add doctor</h2>
        </div>
        <form onSubmit={handleAddDoctor}>
          <div className="layout-two-col">
            <div className="form-group">
              <label htmlFor="doc-name">Name</label>
              <input
                id="doc-name"
                placeholder="Doctor name"
                value={newDoctor.name}
                onChange={(e) => setNewDoctor({ ...newDoctor, name: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label htmlFor="doc-spec">Specialization</label>
              <input
                id="doc-spec"
                placeholder="e.g. Cardiologist"
                value={newDoctor.specialization}
                onChange={(e) =>
                  setNewDoctor({ ...newDoctor, specialization: e.target.value })
                }
              />
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="doc-phone">Phone (optional)</label>
            <input
              id="doc-phone"
              placeholder="Contact number"
              value={newDoctor.phone}
              onChange={(e) => setNewDoctor({ ...newDoctor, phone: e.target.value })}
            />
          </div>
          <div className="actions-row">
            <button type="submit" className="btn primary" disabled={saving}>
              {saving ? 'Saving…' : 'Save doctor'}
            </button>
          </div>
        </form>
      </section>

      <section className="card">
        <div className="card-header">
          <h2>Available doctors</h2>
          <span className="pill">{doctors.length} doctors</span>
        </div>
        <div className="doctor-grid">
          {doctors.length === 0 && (
            <p className="muted">No doctors yet. Use the form above to add one.</p>
          )}
          {doctors.map((d) => (
            <div className="doctor-card" key={d.id}>
              <div className="doctor-main">
                <h3>{d.name}</h3>
                <p className="doctor-specialization">{d.specialization}</p>
              </div>
              {d.phone && <p className="doctor-meta">Phone: {d.phone}</p>}
              <div className="doctor-actions">
                <Link className="btn primary" to={`/book/${d.id}`}>
                  Book appointment
                </Link>
              </div>
            </div>
        ))}
        </div>
      </section>
    </div>
  );
}
