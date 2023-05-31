const express = require('express');
const router = express.Router();
const masterServicesRoutes = require('./masterServicesRoutes');
const bookingsRoutes = require('./bookingsRoutes');
const servicesRoutes = require('./servicesRoutes');
const categoriesRoutes = require('./categoriesRoutes');
const mastersRoutes = require('./mastersRoutes');
const registerRoutes = require('./registerRoutes');
const loginRoutes = require('./loginRoutes');
const clientsRoutes = require('./clientsRoutes');
const appointmentsRoutes = require('./appointmentsRoutes');
const adminRoutes = require('./adminRoutes');


router.use('/admin', adminRoutes);
router.use('/login', loginRoutes);
router.use('/register', registerRoutes);
router.use('/clients', clientsRoutes);
router.use('/masters', mastersRoutes);
router.use('/categories', categoriesRoutes);
router.use('/services', servicesRoutes);
router.use('/master_services', masterServicesRoutes);
router.use('/appointments', appointmentsRoutes);
router.use('/bookings', bookingsRoutes);

module.exports = router;