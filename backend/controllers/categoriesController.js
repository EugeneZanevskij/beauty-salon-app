const db = require('../config/db');

const getAllCategories = (req, res) => {
  const categoriesData = 'SELECT * FROM category';
  db.query(categoriesData, (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: 'Error retrieving categories' });
    }
    res.json(results);
  });
};

const createCategory = (req, res) => {
  const { category } = req.body;
  const insertCategoryQuery = 'INSERT INTO category (category) VALUES (?)';
  db.query(insertCategoryQuery, [category], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: 'Error adding category' });
    }
    res.status(201).json({ message: 'Category added successfully' });
  });
};

const deleteCategory = (req, res) => {
  const { id } = req.params;
  const deleteCategoryQuery = 'DELETE FROM category WHERE id = ?';
  db.query(deleteCategoryQuery, [id], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: 'Error deleting category' });
    }
    res.status(200).json({ message: 'Category deleted successfully' });
  });
};

const updateCategory = (req, res) => {
  const { id } = req.params;
  const category = req.body.category;
  const updateCategoryQuery = 'UPDATE category SET category = ? WHERE id = ?';
  db.query(updateCategoryQuery, [category, id], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: 'Error updating category' });
    }
    res.status(200).json({ message: 'Category updated successfully' });
  });
};

module.exports = {
  getAllCategories,
  createCategory,
  deleteCategory,
  updateCategory,
};
