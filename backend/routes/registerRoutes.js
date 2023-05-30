const express = require('express');
const router = express.Router();
const db = require('../config/db');

router.post('/api/register', (req, res) => {
  const { firstName, lastName, phone_number, email, birthday, password } = req.body;

  const insertClientQuery = 'INSERT INTO client (firstName, lastName, phone_number, email, birthday, password) VALUES (?, ?, ?, ?, ?, ?)';
  db.query(
    insertClientQuery,
    [firstName, lastName, phone_number, email, birthday, password],
    (err, result) => {
      if (err) {
        console.log(err);
        res.status(500).send({ message: 'Error registering client' });
        return;
      }
      res.status(200).send({ message: 'Registration successful' });
    }
  );
});

module.exports = router;