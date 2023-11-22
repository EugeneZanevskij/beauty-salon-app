const express = require('express');
const router = express.Router();
const db = require('../config/db');

router.post('/', (req, res) => {
  const { email, password } = req.body;

  const selectClientQuery = 'SELECT * FROM client WHERE email = ?';
  db.query(selectClientQuery, [email], (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).send({ message: 'Error fetching client' });
      return;
    }

    if (result.length === 0) {
      res.status(401).send({ message: 'User doesn\'t exist' });
      return;
    }

    const client = result[0];
    if (client.password !== password) {
      res.status(401).send({ message: 'Wrong email/password combination' });
      return;
    }

    res.status(200).send({email: client.email, password: client.password});
  });
});

module.exports = router;