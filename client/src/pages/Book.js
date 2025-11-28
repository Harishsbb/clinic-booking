import React, { useEffect, useState } from 'react';
import api from '../services/api';
import { useParams, Link } from 'react-router-dom';

export default function Book() {
  const { doctorId } = useParams();
  const [date, setDate] = useState('');
  const [slots, setSlots] = useState([]);
  const [patient, setPatient] = useState({ name: '', age: '', phone: '' });
  const [selectedTime, setSelectedTime] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (date) {
      api
        .get('/appointments/available', {
          params: { doctorId, date },
        })
        .then((res) => setSlots(res.data.slots || []));
    } else {
      setSlots([]);
      setSelectedTime('');
    }
  }, [date, doctorId]);

  const handleCreatePatient = async () => {
    const res = await api.post('/patients', patient);
    return res.data.id;
  };

  const handleBook = async () => {
    if (!date || !selectedTime || !patient.name || !patient.phone) {
      alert('Please fill date, slot, name and phone.');
      return;
    }
    try {
      setIsSubmitting(true);
      const patientId = await handleCreatePatient();
      const bookRes = await api.post('/appointments', {
        patient_id: patientId,
        doctor_id: parseInt(doctorId, 10),
        date,
        time: selectedTime,
      });
      await api.post('/notify/appointment', {
        appointmentId: bookRes.data.id,
      });
      alert('Appointment booked successfully!');
    } catch (err) {
      if (err.response && err.response.status === 409) {
        alert('Slot already booked — choose another.');
      } else {
        alert('Error booking appointment. Please try again.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="page page-book">
      <header className="page-header">
        <h1>Book appointment</h1>
        <p>
          Doctor ID: <strong>{doctorId}</strong>
        </p>
      </header>

      <div className="layout-two-col">
        <section className="card">
          <div className="card-header">
            <h2>Choose date &amp; time</h2>
          </div>

          <div className="form-group">
            <label htmlFor="date">Date</label>
            <input
              id="date"
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>

          <div className="slots">
            <h3>Available slots</h3>
            {!date && <p className="muted">Select a date to load slots.</p>}
            {date && slots.length === 0 && (
              <p className="muted">No slots defined for this date.</p>
            )}
            <div className="slot-grid">
              {slots.map((s) => (
                <button
                  key={s.time}
                  type="button"
                  className={
                    'slot-btn' +
                    (s.time === selectedTime ? ' selected' : '') +
                    (!s.free ? ' disabled' : '')
                  }
                  disabled={!s.free}
                  onClick={() => setSelectedTime(s.time)}
                >
                  {s.time.slice(0, 5)} {s.free ? '' : '• booked'}
                </button>
              ))}
            </div>
          </div>
        </section>

        <section className="card">
          <div className="card-header">
            <h2>Patient details</h2>
          </div>

          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              id="name"
              placeholder="Full name"
              value={patient.name}
              onChange={(e) => setPatient({ ...patient, name: e.target.value })}
            />
          </div>

          <div className="form-group">
            <label htmlFor="age">Age</label>
            <input
              id="age"
              type="number"
              placeholder="Age"
              value={patient.age}
              onChange={(e) => setPatient({ ...patient, age: e.target.value })}
            />
          </div>

          <div className="form-group">
            <label htmlFor="phone">Phone</label>
            <input
              id="phone"
              placeholder="Mobile number"
              value={patient.phone}
              onChange={(e) => setPatient({ ...patient, phone: e.target.value })}
            />
          </div>

          <div className="actions-row">
            <button
              type="button"
              className="btn primary"
              onClick={handleBook}
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Booking…' : 'Confirm booking'}
            </button>
            <Link className="btn ghost" to="/">
              Back to doctors
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
