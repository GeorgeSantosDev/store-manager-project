const express = require('express');
const { salesController } = require('../controllers/index');
const validateSalesInformation = require('../middlewares/validateSalesInformation');

const router = express.Router();

router.get('/', salesController.getSales);
router.get('/:id', salesController.getSaleById);
router.post('/',
  validateSalesInformation.validateIdField,
  validateSalesInformation.validateQuantityField,
  validateSalesInformation.validateQuantityFieldValue,
  salesController.addNewSales);
router.delete('/:id', salesController.deleteSale);
router.put('/:id',
  validateSalesInformation.validateIdField,
  validateSalesInformation.validateQuantityField,
  validateSalesInformation.validateQuantityFieldValue,
  salesController.updateSale);

module.exports = router;
