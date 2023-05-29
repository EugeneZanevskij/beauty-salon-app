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
const registerRouter = require('./routes/registerRouter');
const loginRouter = require('./routes/loginRouter');
const clientsRouter = require('./routes/clientsRouter');
const appointmentsRouter = require('./routes/appointmentsRouter');


// Middleware
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/api/login', loginRouter);
app.use('/api/register', registerRouter);
app.use('/api/clients', clientsRouter);
app.use('/api/masters', mastersRouter);
app.use('/api/categories', categoriesRouter);
app.use('/api/services', servicesRouter);
app.use('/api/master_services', masterServicesRouter);
app.use('/api/appointments', appointmentsRouter);
app.use('/api/bookings', bookingsRouter);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Internal Server Error' });
});

// Start the server
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
