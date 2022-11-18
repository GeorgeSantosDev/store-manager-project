const sales = [
  {
    saleId: 1,
    productId: 2,
    quantity: 10,
    date: '2022-11-16T17:06:10.000Z'
  },
  {
    saleId: 2,
    productId: 3,
    quantity: 15,
    date: '2022-11-16T17:06:10.000Z'
  }
];

const sale = [
  {
    productId: 2,
    quantity: 10,
    date: '2022-11-16T17:06:10.000Z'
  }
]

const newSale = {
  productId: 1,
  quantity: 1,
};

const successUpdate = {
  fieldCount: 0,
  affectedRows: 1,
  insertId: 0,
  info: 'Rows matched: 1  Changed: 1  Warnings: 0',
  serverStatus: 2,
  warningStatus: 0,
  changedRows: 1
}

module.exports = {
  sales,
  sale,
  newSale,
  successUpdate,
};
