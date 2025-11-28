const express = require('express');
const pool = require('../db');
const router = express.Router();

// Check available slots for doctor on a date
router.get('/available', async (req, res) => {
  const { doctorId, date } = req.query;
  try {
    // Pull schedule ranges for this doctor and date-of-week
    const [schedules] = await pool.query('SELECT * FROM schedules WHERE doctor_id = ?', [doctorId]);

    // Filter schedules by day of week
    const dayOfWeek = new Date(date + 'T00:00:00').toLocaleDateString('en-US', { weekday: 'long' });
    const activeSchedules = schedules.filter(s => s.day_of_week === dayOfWeek);
    // Pull booked times
    const [booked] = await pool.query('SELECT time FROM appointments WHERE doctor_id = ? AND date = ?', [doctorId, date]);

    // simplest approach: generate time slots from schedules (example: hourly slots)
    const bookedSet = new Set(booked.map(b => b.time));
    const slots = [];

    for (const s of activeSchedules) {
      // generate hourly slots between start_time and end_time
      let cur = s.start_time; // stored as 'HH:MM:SS' string
      const end = s.end_time;
      // parse times
      const toSeconds = t => {
        const [h, m] = t.split(':'); return parseInt(h) * 3600 + parseInt(m) * 60;
      }
      let curSec = toSeconds(cur.slice(0, 5) + ':00');
      const endSec = toSeconds(end.slice(0, 5) + ':00');
      while (curSec < endSec) {
        const hh = String(Math.floor(curSec / 3600)).padStart(2, '0');
        const mm = String(Math.floor((curSec % 3600) / 60)).padStart(2, '0');
        const slotTime = `${hh}:${mm}:00`;
        const free = !bookedSet.has(slotTime);
        slots.push({ time: slotTime, free });
        curSec += 60 * 30; // 30 minute slots; adjust as needed
      }
    }

    res.json({ slots });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// Book appointment
router.post('/', async (req, res) => {
  const { patient_id, doctor_id, date, time } = req.body;
  try {
    // Insert appointment. Unique constraint prevents double booking.
    const [result] = await pool.query(
      'INSERT INTO appointments (patient_id, doctor_id, date, time) VALUES (?,?,?,?)',
      [patient_id, doctor_id, date, time]
    );
    res.json({ id: result.insertId, message: 'Appointment booked' });
  } catch (err) {
    console.error(err);
    // If unique constraint fails, code is ER_DUP_ENTRY
    if (err.code === 'ER_DUP_ENTRY') {
      return res.status(409).json({ error: 'Slot already booked' });
    }
    res.status(500).json({ error: 'DB error' });
  }
});

// List appointments
router.get('/', async (req, res) => {
  try {
    const [rows] = await pool.query(`
      SELECT a.*, p.name as patient_name, d.name as doctor_name
      FROM appointments a
      JOIN patients p ON a.patient_id = p.id
      JOIN doctors d ON a.doctor_id = d.id
      ORDER BY a.date, a.time
    `);
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: 'DB error' });
  }
});

module.exports = router;
