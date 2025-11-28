const express = require('express');
const router = express.Router();

router.post('/appointment', async (req, res) => {
  const { appointmentId } = req.body;
  // In a real app: fetch appointment details and call an SMS/email service.
  res.json({ success: true, message: 'Appointment booked successfully!', appointmentId });
});

module.exports = router;
