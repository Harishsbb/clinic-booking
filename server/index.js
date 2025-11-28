const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const pool = require('./db');

const doctorsRouter = require('./routes/doctors');
const appointmentsRouter = require('./routes/appointments');
const patientsRouter = require('./routes/patients');
const notifyRouter = require('./routes/notify');
const schedulesRouter = require('./routes/schedules');

dotenv.config();
const app = express();

app.use(cors({
  origin: process.env.FRONTEND_URL 
    ? process.env.FRONTEND_URL.split(',').map(url => url.trim())
    : ['http://localhost:3000', 'https://harish-ks-projects-091e87d3.vercel.app'],
  credentials: true
}));
app.use(express.json());

// Test DB connection on startup
(async () => {
  try {
    const conn = await pool.getConnection();
    console.log('MySQL pool connected');
    conn.release();
  } catch (err) {
    console.error('DB connection error:', err);
  }
})();

// API routes
app.use('/api/doctors', doctorsRouter);
app.use('/api/appointments', appointmentsRouter);
app.use('/api/patients', patientsRouter);
app.use('/api/notify', notifyRouter);
app.use('/api/schedules', schedulesRouter);

// Default route
app.get('/', (req, res) => {
  res.send('Clinic Booking API Running...');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
