import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

export default function Book(){
  const { doctorId } = useParams();
  const [date, setDate] = useState('');
  const [slots, setSlots] = useState([]);
  const [patient, setPatient] = useState({ name:'', age:'', phone:'' });
  const [selectedTime, setSelectedTime] = useState('');

  useEffect(()=> {
    if(date) {
      axios.get('http://localhost:5000/api/appointments/available', {
        params: { doctorId, date }
      }).then(res=> setSlots(res.data.slots || []));
    }
  }, [date, doctorId]);

  const handleCreatePatient = async () => {
    const res = await axios.post('http://localhost:5000/api/patients', patient);
    return res.data.id;
  };

  const handleBook = async () => {
    try {
      const patientId = await handleCreatePatient();
      const bookRes = await axios.post('http://localhost:5000/api/appointments', {
        patient_id: patientId,
        doctor_id: parseInt(doctorId),
        date,
        time: selectedTime
      });
      // call notify API
      await axios.post('http://localhost:5000/api/notify/appointment', { appointmentId: bookRes.data.id });
      alert('Booked!');
    } catch (err) {
      if (err.response && err.response.status === 409) {
        alert('Slot already booked — choose another');
      } else {
        alert('Error booking');
      }
    }
  };

  return (
    <div>
      <h2>Book for doctor {doctorId}</h2>
      <label>Select date: <input type="date" value={date} onChange={e=>setDate(e.target.value)} /></label>
      <div>
        <h3>Slots</h3>
        {slots.length === 0 ? <p>Select date to load slots</p> :
          slots.map(s => (
            <div key={s.time}>
              <input type="radio" name="slot" value={s.time} disabled={!s.free}
                onChange={() => setSelectedTime(s.time)} />
              {s.time} {s.free ? '' : '(booked)'}
            </div>
          ))
        }
      </div>

      <h3>Patient Info</h3>
      <input placeholder="Name" value={patient.name} onChange={e=>setPatient({...patient, name:e.target.value})} />
      <input placeholder="Age" value={patient.age} onChange={e=>setPatient({...patient, age:e.target.value})} />
      <input placeholder="Phone" value={patient.phone} onChange={e=>setPatient({...patient, phone:e.target.value})} />

      <button onClick={handleBook}>Confirm Booking</button>
    </div>
  );
}
