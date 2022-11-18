const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

const { expect } = chai;
chai.use(sinonChai);

const { productsService } = require('../../../src/services');
const { productsController } = require('../../../src/controllers');
const controllerMock = require('./Mocks/products.controller.mock');

describe('Test controller layer of products path', function () {
  afterEach(sinon.restore);

  it('should return status 500 and message with "Internal server error!"', async function() {
    const res = {};
    const req = {};

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    sinon.stub(productsService, 'getAllProducts')
      .resolves({ type: 'INTERNAL_SERVER_ERROR', message: 'Internal server error!' });

    await productsController.findAllProducts(req, res);

    expect(res.status).to.have.been.calledWith(500);
    expect(res.json).to.have.been.calledWith({ message: 'Internal server error!' });
  });

  it('should return status 200 and message with "Internal server error!"', async function () {
    const res = {};
    const req = {};

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    sinon.stub(productsService, 'getAllProducts')
      .resolves({ type: null, message: controllerMock.allProducts });

    await productsController.findAllProducts(req, res);

    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(controllerMock.allProducts);
  });

  it('should return status 404 and message with "Product not found"', async function () {
    const res = {};
    const req = { params: { id: 1 } };

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    sinon.stub(productsService, 'getProductById')
      .resolves({ type: 'PRODUCT_NOT_FOUND', message: 'Product not found' });

    await productsController.findProductById(req, res);

    expect(res.status).to.have.been.calledWith(404);
    expect(res.json).to.have.been.calledWith({ message: 'Product not found' });
  });

  it('should return status 200 and message with an object', async function () {
    const res = {};
    const req = { params: { id: 1 } };

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    sinon.stub(productsService, 'getProductById')
      .resolves({ type: null, message: controllerMock.allProducts[0] });

    await productsController.findProductById(req, res);

    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(controllerMock.allProducts[0]);
  });

  it('should return status 500 and message with "Product not created"', async function () {
    const res = {};
    const req = { body: { name: 'Abcdef' } };

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    sinon.stub(productsService, 'insertProduct')
      .resolves({ type: 'PRODUCT_NOT_CREATED', message: 'Product not created' });

    await productsController.createNewProduct(req, res);

    expect(res.status).to.have.been.calledWith(500);
    expect(res.json).to.have.been.calledWith({ message: 'Product not created' });
  });

  it('should return status 201 and message with "Product not created"', async function () {
    const res = {};
    const req = { body: { name: 'nome1' } };

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    sinon.stub(productsService, 'insertProduct')
      .resolves({ type: null, message: controllerMock.newProduct });

    await productsController.createNewProduct(req, res);

    expect(res.status).to.have.been.calledWith(201);
    expect(res.json).to.have.been.calledWith(controllerMock.newProduct);
  });

  it('should return status 404 and message with "Product not found"', async function () {
    const res = {};
    const req = { params: { id: 1 }, body: { name:'Raio de Zeus' } };

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    sinon.stub(productsService, 'updateItem')
      .resolves({ type: 'PRODUCT_NOT_FOUND', message: 'Product not found' });

    await productsController.updateProduct(req, res);

    expect(res.status).to.have.been.calledWith(404);
    expect(res.json).to.have.been.calledWith({ message: 'Product not found' });
  });

  it('should return status 200 and message with an obejct updated', async function () {
    const res = {};
    const req = { params: { id: 1 }, body: { name: 'Raio de Zeus' } };

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    sinon.stub(productsService, 'updateItem')
      .resolves({ type: null, message: controllerMock.newProduct });

    await productsController.updateProduct(req, res);

    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(controllerMock.newProduct);
  });

  it('should return status 404 and message with "Product not found"', async function () {
    const res = {};
    const req = { params: { id: 1 } };

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    sinon.stub(productsService, 'deleteItem')
      .resolves({ type: 'PRODUCT_NOT_FOUND', message: 'Product not found' });

    await productsController.deleteProduct(req, res);

    expect(res.status).to.have.been.calledWith(404);
    expect(res.json).to.have.been.calledWith({ message: 'Product not found' });
  });

  it('should return status 204', async function () {
    const res = {};
    const req = { params: { id: 1 } };

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    sinon.stub(productsService, 'deleteItem')
      .resolves({ type: null, message: { affectedRows: 1 } });

    await productsController.deleteProduct(req, res);

    expect(res.status).to.have.been.calledWith(204);
  });

  it('should return status 200 for success search', async function () {
    const res = {};
    const req = { query: { q: 'M' } };

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    sinon.stub(productsService, 'findItemByName')
      .resolves({ type: null, message: [controllerMock.newProduct] });

    await productsController.findProductByName(req, res);

    expect(res.status).to.have.been.calledWith(200);
  });

  it('should return status 500 for internal error', async function () {
    const res = {};
    const req = { query: { q: 'M' } };

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    sinon.stub(productsService, 'findItemByName')
      .resolves({ type: 'INTERNAL_ERRROR', message: 'Internal error' });

    await productsController.findProductByName(req, res);

    expect(res.status).to.have.been.calledWith(500);
  });
});

