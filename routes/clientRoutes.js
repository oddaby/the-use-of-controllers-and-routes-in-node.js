const express = require('express');
const router = express.Router();

// Import the client controller functions
const clientController = require('../controllers/clientController');

// Routes for clients
router.get('/', clientController.getAllClients);
router.get('/:id', clientController.getClientById);
router.post('/', clientController.createClient);
router.put('/:id', clientController.updateClient);
router.delete('/:id', clientController.deleteClient);

module.exports = router;
