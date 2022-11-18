const { errorMap } = require('../utils/errorMap');

const validateIdField = (req, res, next) => {
  const sales = req.body;
  const everyoneHasId = sales.every((sale) => 'productId' in sale);

  if (everyoneHasId) return next();

  return res.status(errorMap.INVALID_FIELD).json({ message: '"productId" is required' });
};

const validateQuantityField = (req, res, next) => {
  const sales = req.body;
  const everyoneHasQuantity = sales.every((sale) => 'quantity' in sale);

  if (everyoneHasQuantity) return next();

  return res.status(errorMap.INVALID_FIELD).json({ message: '"quantity" is required' });
};

const validateQuantityFieldValue = (req, res, next) => {
  const sales = req.body;
  const everyoneHasQuantityValueValid = sales.every((sale) => Number(sale.quantity) > 0);

  if (everyoneHasQuantityValueValid) return next();

  return res.status(errorMap.INVALID_VALUE)
    .json({ message: '"quantity" must be greater than or equal to 1' });
};

module.exports = {
  validateIdField,
  validateQuantityField,
  validateQuantityFieldValue,
};
