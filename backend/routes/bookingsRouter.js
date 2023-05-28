const express = require('express');
const router = express.Router();
const db = require('../database/db');

router.get('/services', (req, res) => {
  const query = 'SELECT * FROM services';

  db.query(query, (err, result) => {
    if (err) {
      console.error('Error fetching masters:', err);
      res.status(500).json({ error: 'Failed to fetch masters' });
      return;
    }

    res.json(result);
  });
});

// Fetch Services
router.post('/correspondingMasters', (req, res) => {
  const { service_id } = req.body;

  const query = `SELECT m.id, m.firstName, m.lastName
  FROM master m
  INNER JOIN master_services ms ON m.id = ms.master_id
  WHERE ms.service_id = ?`;
  // 'SELECT * FROM master_services WHERE master_id = ?';

  db.query(query, service_id, (err, result) => {
    if (err) {
      console.error('Error fetching services:', err);
      res.status(500).json({ error: 'Failed to fetch services' });
      return;
    }

    res.json(result);
  });
});

router.post('/find_ms', (req, res) => {
  const { master_id, service_id } = req.body;

  const query = 'SELECT * FROM master_services WHERE master_id = ? AND service_id = ?';
  const values = [master_id, service_id];

  db.query(query, values, (error, results) => {
    if (error) {
      console.error('Error retrieving connection:', error);
      res.status(500).json({ error: 'Failed to retrieve connection' });
    } else {
      if (results.length > 0) {
        const connection = results[0];
        res.status(200).json(connection);
      } else {
        res.status(404).json({ message: 'Connection not found' });
      }
    }
  });
});
router.post('/find_client', (req, res) => {
  const { email } = req.body;

  const query = 'SELECT * FROM client WHERE email = ?';
  db.query(query, email, (error, results) => {
    if (error) {
      console.error('Error retrieving connection:', error);
      res.status(500).json({ error: 'Failed to retrieve connection' });
    } else {
      if (results.length > 0) {
        const connection = results[0];
        res.status(200).json(connection);
      } else {
        res.status(404).json({ message: 'Connection not found' });
      }
    }
  });
});

// Submit Booking
router.post('/bookings', (req, res) => {
  const { client_id, master_service_id, date_signup, time_signup } = req.body;

  const query =
    `INSERT INTO client_master_services (client_id, master_service_id, date_signup, time_signup)
    VALUES (?, ?, ?, ?)`;
  const values = [client_id, master_service_id, date_signup, time_signup];

  db.query(query, values, (err, result) => {
    if (err) {
      console.error('Error submitting booking:', err);
      res.status(500).json({ error: 'Failed to submit booking' });
      return;
    }

    res.json({ message: 'Booking submitted successfully', booking: result });
  });
});

module.exports = router;