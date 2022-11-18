const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

const { expect } = chai;
chai.use(sinonChai);

const { salesService } = require('../../../src/services');
const { salesController } = require('../../../src/controllers');
const controllerMock = require('./Mocks/sales.controller.mock');

describe('Test controller layer of sales path', function () {
  afterEach(sinon.restore);

  it('should return status 500 and message with "Internal server error!"', async function () {
    const res = {};
    const req = {};

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    sinon.stub(salesService, 'findAllSales')
      .resolves({ type: 'INTERNAL_SERVER_ERROR', message: 'Internal server error!' });

    await salesController.getSales(req, res);

    expect(res.status).to.have.been.calledWith(500);
    expect(res.json).to.have.been.calledWith({ message: 'Internal server error!' });
  });

  it('should return status 200 and message with an array of sales', async function () {
    const res = {};
    const req = {};

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    sinon.stub(salesService, 'findAllSales')
      .resolves({ type: null, message: controllerMock.allSales });

    await salesController.getSales(req, res);

    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(controllerMock.allSales);
  });


  it('should return status 404 and message with "Sale not found"', async function () {
    const res = {};
    const req = { params: { id: 1 } };

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    sinon.stub(salesService, 'findSaleById')
      .resolves({ type: 'SALE_NOT_FOUND', message: 'Sale not found' });

    await salesController.getSaleById(req, res);

    expect(res.status).to.have.been.calledWith(404);
    expect(res.json).to.have.been.calledWith({ message: 'Sale not found' });
  });

  it('should return status 200 and message with sale object', async function () {
    const res = {};
    const req = { params: { id: 1 } };

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    sinon.stub(salesService, 'findSaleById')
      .resolves({ type: null, message: controllerMock.allSales[0] });

    await salesController.getSaleById(req, res);

    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(controllerMock.allSales[0]);
  });

  it('should return status 404 and message with "Product not found"', async function () {
    const res = {};
    const req = { body: controllerMock.salesForAdd };

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    sinon.stub(salesService, 'insertNewSale')
      .resolves({ type: 'PRODUCT_NOT_FOUND', message: 'Product not found' });

    await salesController.addNewSales(req, res);

    expect(res.status).to.have.been.calledWith(404);
    expect(res.json).to.have.been.calledWith({ message: 'Product not found' });
  });

  it('should return status 201 and message with an object of sales inserted', async function () {
    const res = {};
    const req = { body: controllerMock.salesForAdd };

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    sinon.stub(salesService, 'insertNewSale')
      .resolves({ type: null, message: { id: 1, itemsSold: controllerMock.salesForAdd } });

    await salesController.addNewSales(req, res);

    expect(res.status).to.have.been.calledWith(201);
    expect(res.json).to.have.been.calledWith({ id: 1 , itemsSold: controllerMock.salesForAdd });
  });

  it('should return status 404 and message with "Sale not found"', async function () {
    const res = {};
    const req = { params: { id: 1 }};

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    sinon.stub(salesService, 'deleteSaleById')
      .resolves({ type: 'SALE_NOT_FOUND', message: 'Sale not found' });

    await salesController.deleteSale(req, res);

    expect(res.status).to.have.been.calledWith(404);
    expect(res.json).to.have.been.calledWith({ message: 'Sale not found' });
  });

  it('should return status 204 for success delete', async function () {
    const res = {};
    const req = { params: { id: 1 }};

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    sinon.stub(salesService, 'deleteSaleById')
      .resolves({ type: null, message: true });

    await salesController.deleteSale(req, res);

    expect(res.status).to.have.been.calledWith(204);
    expect(res.json).to.have.been.calledWith();
  });

  it('should return status 404 and message with "Product not found"', async function () {
    const res = {};
    const req = { params: { id: 1 }, body: controllerMock.salesForAdd };

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    sinon.stub(salesService, 'updateSaleById')
      .resolves({ type: 'PRODUCT_NOT_FOUND', message: 'Product not found' });

    await salesController.updateSale(req, res);

    expect(res.status).to.have.been.calledWith(404);
    expect(res.json).to.have.been.calledWith({ message: 'Product not found' });
  });

  it('should return status 404 and message with "Sale not found"', async function () {
    const res = {};
    const req = { params: { id: 1 }, body: controllerMock.salesForAdd };

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    sinon.stub(salesService, 'updateSaleById')
      .resolves({ type: 'SALE_NOT_FOUND', message: 'Sale not found' });

    await salesController.updateSale(req, res);

    expect(res.status).to.have.been.calledWith(404);
    expect(res.json).to.have.been.calledWith({ message: 'Sale not found' });
  });

  it('should return status 200 and message with an object with updated informations', async function () {
    const res = {};
    const req = { params: { id: 1 }, body: controllerMock.salesForAdd };

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    sinon.stub(salesService, 'updateSaleById')
      .resolves({ type: null, message: { saleId: 1, itemsUpdated: controllerMock.salesForAdd } });

    await salesController.updateSale(req, res);

    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith({ saleId: 1, itemsUpdated: controllerMock.salesForAdd });
  });
});

