const express = require('express');
const router = express.Router();
const db = require('../database/db');

router.get('/', (req, res) => {
  const mastersData = `SELECT * FROM master`;
  db.query(mastersData, (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: 'Error retrieving services' });
    }
    res.json(results);
  });
});

router.post('/', (req, res) => {
  const {firstName, lastName, coefficient} = req.body;
  const mastersData = `INSERT INTO master (firstName, lastName, coefficient) VALUES (?, ?, ?)`;
  const values = [firstName, lastName, coefficient];
  db.query(mastersData, values, (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: 'Error adding master' });
    }
    res.status(201).json({ id: result.insertId, message: 'Master added successfully' });
  });
});

router.delete('/:id', (req, res) => {
  const id = req.params.id;
  const deleteMasterServicesQuery = 'DELETE FROM master_services WHERE master_id = ?';
  const deleteMasterQuery = 'DELETE FROM master WHERE id = ?';

  db.query(deleteMasterServicesQuery, [id], (err) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: 'Error deleting associated master services' });
    }

    db.query(deleteMasterQuery, [id], (err) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ message: 'Error deleting master' });
      }

      res.status(200).json({ message: 'Master deleted successfully' });
    });
  });
});

router.put('/:id', (req, res) => {
  const id = req.params.id;
  const { firstName, lastName, coefficient } = req.body;
  const updateMasterQuery = 'UPDATE master SET firstName=?, lastName=?, coefficient=? WHERE id=?';
  const values = [firstName, lastName, coefficient, id];
  db.query(updateMasterQuery, values, (err) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: 'Error updating master' });
    }
    res.status(200).json({ message: 'Master updated successfully' });
  });
});

router.get('/masters_data', (req, res) => {
  const mastersData = `
  SELECT m.id, m.firstName, m.lastName, m.coefficient, 
  JSON_ARRAYAGG(JSON_OBJECT('name', s.name, 'category', c.category)) AS services
  FROM master_services ms
  INNER JOIN master m ON ms.master_id = m.id
  INNER JOIN services s ON ms.service_id = s.id
  INNER JOIN category c ON s.category_id = c.id
  GROUP BY m.id;
    `;
  db.query(mastersData, (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: 'Error retrieving masters' });
    }
    res.json(results);
  });
});

module.exports = router;