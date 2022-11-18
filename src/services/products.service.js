const { productsModel } = require('../models/index');
const validations = require('./validations/index');

const getAllProducts = async () => {
  const products = await productsModel.findAll();

  if (products) return { type: null, message: products }; 

  return { type: 'INTERNAL_SERVER_ERROR', message: 'Internal server error!' };
};

const getProductById = async (id) => {
  const product = await productsModel.findById(id);

  if (product) return { type: null, message: product };

  return { type: 'PRODUCT_NOT_FOUND', message: 'Product not found' };
};

const insertProduct = async (name) => {
  const [{ insertId }] = await productsModel.insert(name);
  const findNewPRoduct = await productsModel.findById(insertId);

  if (findNewPRoduct) return { type: null, message: findNewPRoduct };

  return { type: 'PRODUCT_NOT_CREATED', message: 'Product not created' };
};

const updateItem = async (id, name) => {
  const product = await validations.productValidation.productExist([{ productId: id }]);
  if (!product) return { type: 'PRODUCT_NOT_FOUND', message: 'Product not found' };
  
  await productsModel.update(id, name);

  return { type: null, message: { id, name } };
};

const deleteItem = async (id) => {
  const product = await validations.productValidation.productExist([{ productId: id }]);
  if (!product) return { type: 'PRODUCT_NOT_FOUND', message: 'Product not found' };

  const productDeleted = await productsModel.deleteProduct(id);

  return { type: null, message: productDeleted };
};

const findItemByName = async (q) => {
  if (!q) return { type: null, message: await productsModel.findAll() };

  const product = await productsModel.findByName(q);

  return { type: null, message: product };
};

module.exports = {
  getAllProducts,
  getProductById,
  insertProduct,
  updateItem,
  deleteItem,
  findItemByName,
};
