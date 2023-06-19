const express = require('express');
const router = express.Router();

// Import the guard controller functions
const guardController = require('../controllers/guardController');

// Routes for guards
router.get('/', guardController.getAllGuards);
router.get('/:id', guardController.getGuardById);
router.post('/', guardController.createGuard);
router.put('/:id', guardController.updateGuard);
router.delete('/:id', guardController.deleteGuard);

module.exports = router;
