const express = require('express');
const router = express.Router();

// Import the payment controller functions
const paymentController = require('../controllers/paymentController');

// Routes for payments
router.get('/', paymentController.getAllPayments);
router.get('/:id', paymentController.getPaymentById);
router.post('/', paymentController.createPayment);
router.put('/:id', paymentController.updatePayment);
router.delete('/:id', paymentController.deletePayment);

module.exports = router;
