const express = require('express');
const router = express.Router();
const bookingsController = require('../controllers/bookingsController');

router.post('/correspondingMasters', bookingsController.getCorrespondingMasters);
router.post('/find_ms', bookingsController.findMasterService);
router.post('/find_client', bookingsController.findClientByEmail);
router.post('/bookings', bookingsController.submitBooking);

module.exports = router;