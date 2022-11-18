const { salesModel } = require('../models');
const validations = require('./validations/index');

const insertNewSale = async (sales) => {
  const allIdsValid = await validations.productValidation.productExist(sales);

  if (!allIdsValid) return { type: 'PRODUCT_NOT_FOUND', message: 'Product not found' };

  const id = await salesModel.insertSaleId();
  const salesWithId = sales.map((sale) => ({ ...sale, saleId: id }));

  const promises = salesWithId.map((sale) => salesModel.insertSales(sale));
  await Promise.all(promises);

  return { type: null, message: { id, itemsSold: sales } };
};

const findAllSales = async () => {
  const allSales = await salesModel.findAll();

  if (allSales) return { type: null, message: allSales };

  return { type: 'INTERNAL_SERVER_ERROR', message: 'Internal server error!' };
};

const findSaleById = async (id) => {
  const findSale = await validations.salesValidation.saleExist(id);

  if (!findSale[0]) return { type: 'SALE_NOT_FOUND', message: 'Sale not found' };

  const sale = await salesModel.findById(id);

  return { type: null, message: sale };
};

const deleteSaleById = async (id) => {
  const findSale = await validations.salesValidation.saleExist(id);

  if (!findSale[0]) return { type: 'SALE_NOT_FOUND', message: 'Sale not found' };

  const saleDeleted = await salesModel.deleteSale(id);

  return { type: null, message: saleDeleted };
};

const updateSaleById = async (id, changes) => {
  const allIdsValid = await validations.productValidation.productExist(changes);

  if (!allIdsValid) return { type: 'PRODUCT_NOT_FOUND', message: 'Product not found' };

  const findSale = await validations.salesValidation.saleExist(id);

  if (!findSale[0]) return { type: 'SALE_NOT_FOUND', message: 'Sale not found' };

  const saleUpdated = changes.map((change) => salesModel.update(id, change));
  await Promise.all(saleUpdated);

  return { type: null, message: { saleId: id, itemsUpdated: changes } };
};

module.exports = {
  insertNewSale,
  findAllSales,
  findSaleById,
  deleteSaleById,
  updateSaleById,
}; 
