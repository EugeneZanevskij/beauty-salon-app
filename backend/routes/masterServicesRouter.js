const express = require('express');
const router = express.Router();
const db = require('../database/db');

router.get('/', (req, res) => {
  const query = 'SELECT * FROM master_services';
  db.query(query, (error, results) => {
    if (error) {
      console.error('Error retrieving master services:', error);
      res.status(500).json({ error: 'Failed to retrieve master services' });
    } else {
      res.status(200).json(results);
    }
  });
});

router.post('/', (req, res) => {
  const { master_id, service_id } = req.body;
  const query = 'INSERT INTO master_services (master_id, service_id) VALUES (?, ?)';
  db.query(query, [master_id, service_id], (error, results) => {
    if (error) {
      console.error('Error creating master service:', error);
      res.status(500).json({ error: 'Failed to create master service' });
    } else {
      res.json({ id: results.insertId });
    }
  });
});

router.delete('/:id', (req, res) => {
  const id = req.params.id;
  const query = 'DELETE FROM master_services WHERE master_id = ?';
  db.query(query, id, (error) => {
    if (error) {
      console.error('Error deleting master service:', error);
      res.status(500).json({ error: 'Failed to delete master service' });
    } else {
      res.sendStatus(200);
    }
  });
});

module.exports = router;
