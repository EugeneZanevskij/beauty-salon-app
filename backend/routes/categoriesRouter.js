const express = require('express');
const router = express.Router();
const db = require('../database/db');

router.get('/', (req, res) => {
  const categoriesData = `SELECT * FROM category`;
  db.query(categoriesData, (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: 'Error retrieving services' });
    }
    res.json(results);
  });
});

router.post('/', (req, res) => {
  const { category } = req.body;
  const categoriesData = `INSERT INTO category (category) VALUES (?)`;
  db.query(categoriesData, [category], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: 'Error adding category' });
    }
    return res.status(201).json({ message: 'Category added successfully' });
  })
});

router.delete('/:id', (req, res) => {
  const { id } = req.params;
  const deleteCategory = `DELETE FROM category WHERE id = ?`;
  db.query(deleteCategory, [id], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: 'Error deleting category' });
    }
    return res.status(200).json({ message: 'Category deleted successfully' });
  })
});

router.put('/:id', (req, res) => {
  const { id } = req.params;
  const category = req.body.category;
  const updateCategory = `UPDATE category SET category = ? WHERE id = ?`;
  db.query(updateCategory, [category, id], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: 'Error updating category' });
    }
    return res.status(200).json({ message: 'Category updated successfully' });
  })
})

module.exports = router;