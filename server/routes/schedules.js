const express = require('express');
const pool = require('../db');
const router = express.Router();

// Add schedule slot for doctor
router.post('/', async (req, res) => {
  const { doctor_id, day_of_week, start_time, end_time } = req.body;
  try {
    const [result] = await pool.query(
      'INSERT INTO schedules (doctor_id, day_of_week, start_time, end_time) VALUES (?,?,?,?)',
      [doctor_id, day_of_week, start_time, end_time]
    );
    res.json({ id: result.insertId });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'DB error' });
  }
});

// Get schedule for a doctor
router.get('/:doctorId', async (req, res) => {
  const { doctorId } = req.params;
  try {
    const [rows] = await pool.query('SELECT * FROM schedules WHERE doctor_id = ?', [doctorId]);
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: 'DB error' });
  }
});

module.exports = router;
