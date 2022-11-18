const products = [
  {
    id: 1,
    name: 'Martelo de Thor'
  },
  {
    id: 2,
    name: 'Traje de encolhimento'
  },
  {
    id: 3,
    name: 'Escudo do Capitão América'
  }
]; 

const newProduct = {
  id: 4,
  name: 'Iphone 14'
}

const updateReturn = {
  ResultSetHeader: {
    fieldCount: 0,
    affectedRows: 1,
    insertId: 0,
    info: 'Rows matched: 1  Changed: 0  Warnings: 0',
    serverStatus: 2,
    warningStatus: 0,
    changedRows: 0
  },
};

const deleteReturn = {
  ResultSetHeader: {
    fieldCount: 0,
    affectedRows: 1,
    insertId: 0,
    info: '',
    serverStatus: 2,
    warningStatus: 0
  },
};

module.exports = {
  products,
  newProduct,
  updateReturn,
  deleteReturn,
}