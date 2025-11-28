const express = require('express');
const pool = require('../db');
const router = express.Router();

// Add patient (or you can add auth later)
router.post('/', async (req, res) => {
  const { name, age, phone } = req.body;
  try {
    const [result] = await pool.query('INSERT INTO patients (name, age, phone) VALUES (?,?,?)', [name, age, phone]);
    res.json({ id: result.insertId, name, age, phone });
  } catch (err) {
    res.status(500).json({ error: 'DB error' });
  }
});

router.get('/', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM patients');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: 'DB error' });
  }
});

module.exports = router;
