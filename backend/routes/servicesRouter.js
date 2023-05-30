const express = require('express');
const router = express.Router();
const { getAllServices, createService, deleteService, updateService, getServicesWithCategory } = require('../controllers/servicesController');

router.get('/', getAllServices);
router.post('/', createService);
router.delete('/:id', deleteService);
router.put('/:id', updateService);
router.get('/service_category', getServicesWithCategory);

module.exports = router;