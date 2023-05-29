const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const db = require('./database/db');
const masterServicesRouter = require('./routes/masterServicesRouter');
const bookingsRouter = require('./routes/bookingsRouter');
const servicesRouter = require('./routes/servicesRouter');

// Middleware
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


app.post('/api/register', (req, res) => {
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

app.post('/api/login', (req, res) => {
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


app.get('/api/categories', (req, res) => {
  const categoriesData = `SELECT id, category FROM category`;
  db.query(categoriesData, (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: 'Error retrieving services' });
    }
    res.json(results);
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
  });
});

app.get('/api/appointments', (req, res) => {
  const query = `
    SELECT a.id, c.email, c.firstName, c.lastName, a.date_signup, a.time_signup, m.firstName as masterFirstName, m.lastName as masterLastName, s.name as serviceName
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

app.get('/api/user/:email', (req, res) => {
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
});




app.get('/api/admin/clients', (req, res) => {
  const clientsData = `SELECT * FROM client`;
  db.query(clientsData, (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: 'Error retrieving services' });
    }
    res.json(results);
    // res.send(results);
  });
});

app.post('/api/admin/clients', (req, res) => {
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
});

app.put('/api/admin/clients/:id', (req, res) => {
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
});

app.delete('/api/admin/clients/:clientId', (req, res) => {
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
});

app.get('/api/admin/masters', (req, res) => {
  const mastersData = `SELECT * FROM master`;
  db.query(mastersData, (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: 'Error retrieving services' });
    }
    res.json(results);
  });
});

app.post('/api/admin/masters', (req, res) => {
  const {firstName, lastName, coefficient} = req.body;
  const mastersData = `INSERT INTO master (firstName, lastName, coefficient) VALUES (?, ?, ?)`;
  const values = [firstName, lastName, coefficient];
  db.query(mastersData, values, (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: 'Error adding master' });
    }
    res.status(201).json({ id: result.insertId, message: 'Master added successfully' });
  })
});

app.delete('/api/admin/masters/:id', (req, res) => {
  const id = req.params.id;
  const deleteMasterQuery = 'DELETE FROM master WHERE id=?';
  const values = [id];
  db.query(deleteMasterQuery, values, (err) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: 'Error deleting master' });
    }
    res.status(200).json({ message: `Master deleted successfully` });
  })
});

app.put('/api/admin/masters/:id', (req, res) => {
  const id = req.params.id;
  const { firstName, lastName, coefficient } = req.body;
  const updateMasterQuery = 'UPDATE master SET firstName=?, lastName=?, coefficient=? WHERE id=?';
  const values = [firstName, lastName, coefficient, id];
  db.query(updateMasterQuery, values, (err) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: 'Error updating master' });
    }
    res.status(200).json({ message: 'Master updated successfully' });
  })
})

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

// Handle the POST request to the /api/bookings endpoint
app.post('/api/bookings', (req, res) => {
  const { date, time, masterName, serviceName } = req.body;
  const { userId } = req.headers; // Assuming you set the user ID in the headers

  const getMasterIdQuery = 'SELECT id FROM master WHERE name = ?';
  db.query(getMasterIdQuery, [masterName], (err, masterResult) => {
    if (err) {
      console.error('Error fetching master ID:', err);
      res.status(500).send({ error: 'An error occurred while fetching master ID' });
    } else {
      const masterId = masterResult[0].id;
      const getServiceIdQuery = 'SELECT id FROM services WHERE name = ?';
      db.query(getServiceIdQuery, [serviceName], (err, serviceResult) => {
        if (err) {
          console.error('Error fetching service ID:', err);
          res.status(500).send({ error: 'An error occurred while fetching service ID' });
        } else {
          const insertBookingQuery = 'INSERT INTO client_master_services (client_id, master_service_id, date_signup, time_signup) VALUES (?, ?, ?, ?)';
          const values = [userId, masterId, date, time];
          
          db.query(insertBookingQuery, values, (err, result) => {
            if (err) {
              console.error('Error creating booking:', err);
              res.status(500).send({ error: 'An error occurred while creating the booking' });
            } else {
              res.status(200).send({ message: 'Booking created successfully' });
            }
          });
        }
      });
    }
  });
});

app.use('/api/bookings', bookingsRouter);
app.use('/api/services', servicesRouter);
app.use('/api/admin/master_services', masterServicesRouter);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Internal Server Error' });
});

// Start the server
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
