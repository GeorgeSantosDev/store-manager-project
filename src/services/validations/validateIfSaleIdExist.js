const { salesModel } = require('../../models/index');

const saleExist = async (id) => {
  const sale = await salesModel.findById(Number(id));

  return sale;
};

module.exports = {
  saleExist,
};
