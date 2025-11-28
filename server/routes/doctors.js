const express = require('express');
const pool = require('../db');
const router = express.Router();

// Add doctor
router.post('/', async (req, res) => {
  const { name, specialization, phone } = req.body;
  try {
    const [result] = await pool.query(
      'INSERT INTO doctors (name, specialization, phone) VALUES (?, ?, ?)',
      [name, specialization, phone]
    );
    res.json({ id: result.insertId, name, specialization, phone });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'DB error' });
  }
});

// Get all doctors
router.get('/', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM doctors');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: 'DB error' });
  }
});

module.exports = router;
