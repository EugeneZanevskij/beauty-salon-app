const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const db = require('./database/db');
// const routes = require('./routes');

// Middleware
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// app.get("/", (req, res) => {
//   res.send("API is currently running");
// });

app.get('/api/categories', (req, res) => {
  const categoriesData = `SELECT id, category FROM category`;
  db.query(categoriesData, (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: 'Error retrieving services' });
    }
    res.json(results);
    // res.send(results);
  });
});
app.get('/api/services', (req, res) => {
  const servicesData = `SELECT s.id, s.name, s.category_id, c.category, s.price, s.duration_minutes 
  FROM services s
  INNER JOIN category c ON s.category_id = c.id`;
  db.query(servicesData, (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: 'Error retrieving services' });
    }
    res.json(results);
    // res.send(results);
  });
});

app.get('/api/masters', (req, res) => {
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
    // res.send(results);
  });
});

app.get('/api/appointments', (req, res) => {
  const query = `
    SELECT a.id, c.firstName, c.lastName, a.date_signup, a.time_signup, m.firstName as masterFirstName, m.lastName as masterLastName, s.name as serviceName
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

// Routes
// app.use('/api', routes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Internal Server Error' });
});

// Start the server
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
