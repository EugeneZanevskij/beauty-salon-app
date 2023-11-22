const express = require('express');
const router = express.Router();
const db = require('../config/db');

router.post("/", (req, res) => {
  const {login, password} = req.body;
  const query =  `SELECT * FROM administrator WHERE login = ? AND password = ?`;
  db.query(query, [login, password], (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: 'Error retrieving admin' });
    }
    if (results.length > 0) {
      return res.json(results[0]);
    } else {
      return res.status(404).json({ message: 'Admin not found' });
    }
  })
});

module.exports = router;