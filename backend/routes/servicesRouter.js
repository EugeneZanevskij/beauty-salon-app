const express = require('express');
const router = express.Router();
const db = require('../database/db');

router.get('/', (req, res) => {
  const categoriesData = `SELECT * FROM services`;
  db.query(categoriesData, (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: 'Error retrieving services' });
    }
    res.json(results);
  });
});

router.post('/', (req, res) => {
  const { name, category_id, price, duration_minutes } = req.body;

  const insertServiceQuery = 'INSERT INTO services (name, category_id, price, duration_minutes) VALUES (?, ?, ?, ?)';
  const values = [name, category_id, price, duration_minutes];

  db.query(insertServiceQuery, values, (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: 'Error creating service' });
    }
    return res.status(201).json({ message: 'Category added successfully' });
  });
});

router.delete('/:id', (req, res) => {
  const id = req.params.id;

  const deleteServiceQuery = 'DELETE FROM services WHERE id=?';
  const values = [id];

  db.query(deleteServiceQuery, values, (err) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: 'Error deleting service' });
    }

    res.status(200).json({ message: `Service with ID ${id} deleted successfully` });
  });
});

router.put('/:id', (req, res) => {
  const id = req.params.id;
  const { name, category_id, price, duration_minutes } = req.body;

  const updateServiceQuery = 'UPDATE services SET name=?, category_id=?, price=?, duration_minutes=? WHERE id=?';
  const values = [name, category_id, price, duration_minutes, id];

  db.query(updateServiceQuery, values, (err) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: 'Error updating service' });
    }
    res.status(200).json({ message: 'Service updated successfully' });
  });
});

router.get('/service_category', (req, res) => {
  const servicesData = `SELECT s.id, s.name, s.category_id, c.category, s.price, s.duration_minutes 
  FROM services s
  INNER JOIN category c ON s.category_id = c.id`;
  db.query(servicesData, (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: 'Error retrieving services' });
    }
    res.json(results);
  });
});

module.exports = router;