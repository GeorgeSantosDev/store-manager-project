const { expect } = require('chai');
const sinon = require('sinon');
const { productsModel } = require('../../../src/models');

const connection = require('../../../src/models/connection');
const modelMocks = require('./Mocks/products.model.mock');

describe('Test model layer of products path', function () {
  afterEach(sinon.restore);

  it('should return an array with all products', async function () {
    sinon.stub(connection, 'execute').resolves([modelMocks.products]);
    const response = await productsModel.findAll();
    expect(response).to.be.deep.equal(modelMocks.products);
  });

  it('should return a product searched by id', async function () {
    sinon.stub(connection, 'execute').resolves([[modelMocks.products[1]]]);
    const response = await productsModel.findById(1);
    expect(response).to.be.deep.equal(modelMocks.products[1]);
  });

  it('should return a new product with id', async function () {
    sinon.stub(connection, 'execute').resolves(modelMocks.newProduct);
    const response = await productsModel.insert('Iphone 14');
    expect(response).to.be.deep.equal(modelMocks.newProduct);
  });

  it('should update product infos', async function () {
    sinon.stub(connection, 'execute').resolves([modelMocks.updateReturn]);
    const response = await productsModel.update(1, 'Iphone 8');
    expect(response).to.be.deep.equal(modelMocks.updateReturn);
  });

  it('should delete product', async function () {
    sinon.stub(connection, 'execute').resolves([modelMocks.deleteReturn]);
    const response = await productsModel.deleteProduct(1);
    expect(response).to.be.deep.equal(modelMocks.deleteReturn);
  });

  it('should return a product by name', async function () {
    sinon.stub(connection, 'execute').resolves([modelMocks.products]);
    const response = await productsModel.findByName('M');
    expect(response).to.be.deep.equal(modelMocks.products);
  });
});
