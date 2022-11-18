const express = require('express');
const { productsController } = require('../controllers/index');
const validateNameField = require('../middlewares/validateNameField');

const router = express.Router();

router.get('/', productsController.findAllProducts);
router.get('/search', productsController.findProductByName);
router.get('/:id', productsController.findProductById);
router.post('/', validateNameField, productsController.createNewProduct);
router.put('/:id', validateNameField, productsController.updateProduct);
router.delete('/:id', productsController.deleteProduct);

module.exports = router;
