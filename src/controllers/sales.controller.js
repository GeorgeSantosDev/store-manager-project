const { salesService } = require('../services/index');
const errorMap = require('../utils/errorMap');

const addNewSales = async (req, res) => {
  const sales = req.body;
  const { type, message } = await salesService.insertNewSale(sales);

  if (type) return res.status(errorMap.mapError(type)).json({ message });

  res.status(201).json(message);
};

const getSales = async (_req, res) => {
  const { type, message } = await salesService.findAllSales();

  if (type) return res.status(errorMap.mapError(type)).json({ message });

  res.status(200).json(message);
};

const getSaleById = async (req, res) => {
  const { id } = req.params;
  const { type, message } = await salesService.findSaleById(id);
  
  if (type) return res.status(errorMap.mapError(type)).json({ message });

  res.status(200).json(message);
};

const deleteSale = async (req, res) => {
  const { id } = req.params;
  const { type, message } = await salesService.deleteSaleById(id);

  if (type) return res.status(errorMap.mapError(type)).json({ message });

  res.status(204).json();
};

const updateSale = async (req, res) => {
  const { id } = req.params;
  const changes = req.body;

  const { type, message } = await salesService.updateSaleById(id, changes);

  if (type) return res.status(errorMap.mapError(type)).json({ message });

  res.status(200).json(message);
};

module.exports = {
  addNewSales,
  getSales,
  getSaleById,
  deleteSale,
  updateSale,
};
