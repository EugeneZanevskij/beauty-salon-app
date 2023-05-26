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





app.get('/api/admin/categories', (req, res) => {
  const categoriesData = `SELECT * FROM category`;
  db.query(categoriesData, (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: 'Error retrieving services' });
    }
    res.json(results);
    // res.send(results);
  });
});

app.post('/api/admin/categories', (req, res) => {
  const { category } = req.body;
  const categoriesData = `INSERT INTO category (category) VALUES (?)`;
  // const values = ['test'];
  db.query(categoriesData, [category], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: 'Error adding category' });
    }
    return res.status(201).json({ message: 'Category added successfully' });
  })
});

app.delete('/api/admin/categories/:id', (req, res) => {
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

app.put('/api/admin/categories/:id', (req, res) => {
  const { id } = req.params;
  const values = [req.body.category];
  const updateCategory = `UPDATE category SET category = ? WHERE id = ?`;
  db.query(updateCategory, [...values, id], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: 'Error updating category' });
    }
    return res.status(200).json({ message: 'Category updated successfully' });
  })
})

app.get('/api/admin/services', (req, res) => {
  const categoriesData = `SELECT * FROM services`;
  db.query(categoriesData, (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: 'Error retrieving services' });
    }
    res.json(results);
    // res.send(results);
  });
});

app.post('/api/admin/services', (req, res) => {
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

app.put('/api/admin/services/:id', (req, res) => {
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

app.delete('/api/admin/services/:id', (req, res) => {
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
