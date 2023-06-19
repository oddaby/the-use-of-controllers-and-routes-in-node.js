const express = require('express');
const router = express.Router();

// Import the supplier controller functions
const supplierController = require('../controllers/supplierController');

// Routes for suppliers
router.get('/', supplierController.getAllSuppliers);
router.get('/:id', supplierController.getSupplierById);
router.post('/', supplierController.createSupplier);
router.put('/:id', supplierController.updateSupplier);
router.delete('/:id', supplierController.deleteSupplier);

module.exports = router;
