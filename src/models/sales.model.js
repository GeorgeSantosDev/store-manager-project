const camelize = require('camelize');
const snakeize = require('snakeize');
const connection = require('./connection');
const currentDate = require('../utils/currentDate');

const insertSaleId = async () => {
  const [{ insertId }] = await connection.execute(
    'INSERT INTO StoreManager.sales (date) VALUES (?)',
    [currentDate()],
  );

  return insertId;
};

const insertSales = async (sale) => {
  const columns = Object.keys(snakeize(sale));
  const values = Object.values(sale);
  const placeholders = Object.values(sale).map((_) => '?');

  const newSale = await connection.execute(
    `INSERT INTO StoreManager.sales_products (${columns}) VALUES (${placeholders})`,
    [...values],
  );

  return newSale;
};

const findById = async (id) => {
  const [result] = await connection.execute(
    `SELECT 
      sp.product_id, sp.quantity, s.date
    FROM
      StoreManager.sales_products AS sp
        RIGHT JOIN
      StoreManager.sales AS s ON s.id = sp.sale_id
    WHERE
      s.id = ?
    ORDER BY sale_id ASC , product_id ASC`,
    [id],
  );

  return camelize(result);
};

const findAll = async () => {
  const [result] = await connection.execute(
    `SELECT 
      sp.sale_id, sp.product_id, sp.quantity, s.date
    FROM
      StoreManager.sales_products AS sp
        RIGHT JOIN
      StoreManager.sales AS s ON s.id = sp.sale_id
    ORDER BY sale_id ASC , product_id ASC`,
  );

  return camelize(result);
};

const deleteSale = async (id) => {
  await connection.execute(
    'DELETE FROM StoreManager.sales_products WHERE sale_id = ?',
    [id],
  );

  const [result] = await connection.execute(
    'DELETE FROM StoreManager.sales WHERE id = ?',
    [id],
  );

  return result;
};

const update = async (id, { quantity, productId }) => {
  const [result] = await connection.execute(
    `UPDATE StoreManager.sales_products
    SET quantity = ?
    WHERE sale_id = ? AND product_id = ?`,
    [quantity, id, productId],
  );

  return result;
};

module.exports = {
  insertSales,
  insertSaleId,
  findById,
  findAll,
  deleteSale,
  update,
};
