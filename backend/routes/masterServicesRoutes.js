const express = require('express');
const router = express.Router();
const masterServicesController = require('../controllers/masterServicesController');

router.get('/', masterServicesController.getAllMasterServices);
router.post('/', masterServicesController.createMasterService);
router.delete('/:id', masterServicesController.deleteMasterService);


module.exports = router;