const express = require('express');
const router = express.Router();
const db = require('../config/db');

router.get('/', (req, res) => {
  const query = `
    SELECT a.id, c.email, c.firstName, c.lastName, a.date_signup, a.time_signup, m.firstName as masterFirstName, m.lastName as masterLastName, s.name as serviceName, s.price * m.coefficient as price
    FROM client_master_services a
    INNER JOIN client c ON a.client_id = c.id
    INNER JOIN master_services ms ON a.master_service_id = ms.id
    INNER JOIN master m ON ms.master_id = m.id
    INNER JOIN services s ON ms.service_id = s.id
    ORDER BY a.date_signup DESC, a.time_signup ASC;
  `;

  db.query(query, (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: 'Error retrieving appointments' });
    }

    res.json(results);
  });
});

module.exports = router;