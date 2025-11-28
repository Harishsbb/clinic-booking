import React, { useEffect, useState } from 'react';
import api from '../services/api';
import { useParams, Link } from 'react-router-dom';

export default function Doctor() {
  const { doctorId } = useParams();
  const [doctor, setDoctor] = useState(null);
  const [schedule, setSchedule] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [doctorRes, scheduleRes] = await Promise.all([
          api.get('/doctors'),
          api.get(`/schedules/${doctorId}`),
        ]);
        const found = doctorRes.data.find((d) => String(d.id) === String(doctorId));
        setDoctor(found || null);
        setSchedule(scheduleRes.data || []);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [doctorId]);

  const dayName = (d) => {
    const map = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    return map[d] ?? d;
  };

  if (loading) {
    return (
      <div className="page">
        <p className="muted">Loading doctor…</p>
      </div>
    );
  }

  if (!doctor) {
    return (
      <div className="page">
        <p>Doctor not found.</p>
        <Link className="btn ghost" to="/doctors">
          Back to list
        </Link>
      </div>
    );
  }

  return (
    <div className="page">
      <header className="page-header">
        <h1>{doctor.name}</h1>
        <p>{doctor.specialization}</p>
      </header>

      <div className="layout-two-col">
        <section className="card">
          <div className="card-header">
            <h2>Profile</h2>
          </div>
          {doctor.phone && <p className="doctor-meta">Phone: {doctor.phone}</p>}
          <p className="muted">
            Use the booking page to see precise available time slots and confirm an appointment.
          </p>
          <div className="actions-row">
            <Link className="btn primary" to={`/book/${doctor.id}`}>
              Book this doctor
            </Link>
          </div>
        </section>

        <section className="card">
          <div className="card-header">
            <h2>Schedule</h2>
          </div>
          {schedule.length === 0 && <p className="muted">No schedule defined.</p>}
          <ul>
            {schedule.map((s) => (
              <li key={s.id} className="doctor-meta">
                {dayName(s.day_of_week)}: {s.start_time?.slice(0, 5)} – {s.end_time?.slice(0, 5)}
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
}


