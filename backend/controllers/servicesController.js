const db = require('../config/db');

function getAllServices(req, res) {
  const servicesQuery = `SELECT * FROM services`;
  db.query(servicesQuery, (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: 'Error retrieving services' });
    }
    res.json(results);
  });
}

// Controller function to create a new service
function createService(req, res) {
  const { name, category_id, price, duration_minutes } = req.body;

  const insertServiceQuery = 'INSERT INTO services (name, category_id, price, duration_minutes) VALUES (?, ?, ?, ?)';
  const values = [name, category_id, price, duration_minutes];

  db.query(insertServiceQuery, values, (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: 'Error creating service' });
    }
    return res.status(201).json({ message: 'Service added successfully' });
  });
}

// Controller function to delete a service
function deleteService(req, res) {
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
}

// Controller function to update a service
function updateService(req, res) {
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
}

// Controller function to get services with category details
function getServicesWithCategory(req, res) {
  const servicesQuery = `
    SELECT s.id, s.name, s.category_id, c.category, s.price, s.duration_minutes 
    FROM services s
    INNER JOIN category c ON s.category_id = c.id`;
  
  db.query(servicesQuery, (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: 'Error retrieving services' });
    }
    res.json(results);
  });
}

module.exports = {
  getAllServices,
  createService,
  deleteService,
  updateService,
  getServicesWithCategory
}