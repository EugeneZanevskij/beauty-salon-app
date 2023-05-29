const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const db = require('./database/db');
const masterServicesRouter = require('./routes/masterServicesRouter');
const bookingsRouter = require('./routes/bookingsRouter');
const servicesRouter = require('./routes/servicesRouter');
const categoriesRouter = require('./routes/categoriesRouter');
const mastersRouter = require('./routes/mastersRouter');

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

app.use('/api/masters', mastersRouter);
app.use('/api/categories', categoriesRouter);
app.use('/api/bookings', bookingsRouter);
app.use('/api/services', servicesRouter);
app.use('/api/master_services', masterServicesRouter);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Internal Server Error' });
});

// Start the server
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
