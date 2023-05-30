const express = require('express');
const router = express.Router();
const clientController = require('../controllers/clientsController');

router.get('/', clientController.getAllClients);
router.get('/:email', clientController.getClientByEmail);
router.post('/', clientController.createClient);
router.put('/:id', clientController.updateClient);
router.delete('/:clientId', clientController.deleteClient);

module.exports = router;