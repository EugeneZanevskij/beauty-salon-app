const db = require('../config/db');

const getAllClients = (req, res) => {
  const clientsData = 'SELECT * FROM client';
  db.query(clientsData, (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: 'Error retrieving clients' });
    }
    res.json(results);
  });
};

const createClient = (req, res) => {
  const { firstName, lastName, phone_number, email, birthday } = req.body;

  const insertClientQuery = 'INSERT INTO client (firstName, lastName, phone_number, email, birthday) VALUES (?, ?, ?, ?, ?)';
  const values = [firstName, lastName, phone_number, email, birthday];

  db.query(insertClientQuery, values, (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: 'Error creating client' });
    }
    res.status(201).json({ message: 'Client created successfully' });
  });
};

const updateClient = (req, res) => {
  const id = req.params.id;
  const { firstName, lastName, phone_number, email, birthday } = req.body;

  const updateClientQuery = 'UPDATE client SET firstName=?, lastName=?, phone_number=?, email=?, birthday=? WHERE id=?';
  const values = [firstName, lastName, phone_number, email, birthday, id];

  db.query(updateClientQuery, values, (err) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: 'Error updating client' });
    }
    res.status(200).json({ message: 'Client updated successfully' });
  });
};

const deleteClient = (req, res) => {
  const clientId = req.params.clientId;

  const deleteClientQuery = 'DELETE FROM client WHERE id=?';
  const values = [clientId];

  db.query(deleteClientQuery, values, (err) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: 'Error deleting client' });
    }

    res.json({ message: `Client with ID ${clientId} deleted successfully` });
  });
};

const getClientByEmail = (req, res) => {
  const email = req.params.email;

  db.query('SELECT * FROM client WHERE email = ?', email, (err, result) => {
    if (err) {
      console.error('Error retrieving user:', err);
      res.status(500).json({ error: 'Error retrieving user' });
    } else if (result.length === 0) {
      res.status(404).json({ message: 'User not found' });
    } else {
      const user = result[0]; // Assuming the email is unique and returns only one user
      res.json(user);
    }
  });
};

module.exports = {
  getAllClients,
  createClient,
  updateClient,
  deleteClient,
  getClientByEmail,
};
