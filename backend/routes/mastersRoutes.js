const express = require('express');
const router = express.Router();
const mastersController = require('../controllers/mastersController');

router.get('/', mastersController.getAllMasters);
router.post('/', mastersController.createMaster);
router.delete('/:id', mastersController.deleteMaster);
router.put('/:id', mastersController.updateMaster);
router.get('/masters_data', mastersController.getMastersData);

module.exports = router;