const { expect } = require('chai');
const sinon = require('sinon');
const { salesModel, productsModel } = require('../../../src/models');
const { salesService } = require('../../../src/services');
const serviceMock = require('./Mocks/sales.service.mock');
const validations = require('../../../src/services/validations/index');

describe('Test service layer of sales path', function () {
  afterEach(sinon.restore);

  it('should return a object with type PRODUCT_NOT_FOUND and message with "Product not found"', async function () {
    sinon.stub(productsModel, 'findById').resolves(undefined);
    const response = await salesService.insertNewSale(serviceMock.newSale);
    expect(response).to.be.deep.equal({ type: 'PRODUCT_NOT_FOUND', message: 'Product not found' });
  });

  it('should return a object with type null and message with an object for insert', async function () {
    sinon.stub(productsModel, 'findById').resolves({ id: 1, name: 'Martelo do Thor' });
    sinon.stub(salesModel, 'insertSaleId').resolves(1);
    sinon.stub(salesModel, 'insertSales').resolves({ affectedRows: 1 });
    const response = await salesService.insertNewSale(serviceMock.newSale);
    expect(response).to.be.deep.equal({ type: null, message: { id: 1, itemsSold: serviceMock.newSale } });
  });

  it('should return a object with type INTERNAL_SERVER_ERROR and message with "Internal server error!"', async function () {
    sinon.stub(salesModel, 'findAll').resolves(undefined);
    const response = await salesService.findAllSales();
    expect(response).to.be.deep.equal({ type: 'INTERNAL_SERVER_ERROR', message: 'Internal server error!' });
  });

  it('should return a object with type null and message with an array of sales', async function () {
    sinon.stub(salesModel, 'findAll').resolves(serviceMock.allSales);
    const response = await salesService.findAllSales();
    expect(response).to.be.deep.equal({ type: null, message: serviceMock.allSales });
  });

  it('should return a object with type SALE_NOT_FOUND and message with "Sale not found"', async function () {
    sinon.stub(salesModel, 'findById').resolves([]);
    const response = await salesService.findSaleById(1);
    expect(response).to.be.deep.equal({ type: 'SALE_NOT_FOUND', message: 'Sale not found' });
  });

  it('should return a object with type null and message with an array of sales', async function () {
    sinon.stub(salesModel, 'findById').resolves(serviceMock.sale);
    const response = await salesService.findSaleById(1);
    expect(response).to.be.deep.equal({ type: null, message: serviceMock.sale });
  });

  it('should return a object with type SALE_NOT_FOUND and message with "Sale not found"', async function () {
    sinon.stub(salesModel, 'findById').resolves([]);
    const response = await salesService.deleteSaleById(1);
    expect(response).to.be.deep.equal({ type: 'SALE_NOT_FOUND', message: 'Sale not found' });
  });

  it('should return a object with type null and message with an array of sales', async function () {
    sinon.stub(salesModel, 'findById').resolves(serviceMock.sale);
    sinon.stub(salesModel, 'deleteSale').resolves({ affectedRows: 1 });
    const response = await salesService.deleteSaleById(1);
    expect(response).to.be.deep.equal({ type: null, message: { affectedRows: 1 } });
  });

  it('should return a object with type PRODUCT_NOT_FOUND and message with "Product not found"', async function () {
    sinon.stub(validations.productValidation, 'productExist').resolves(undefined);
    const response = await salesService.updateSaleById(1, serviceMock.saleUpdate);
    expect(response).to.be.deep.equal({ type: 'PRODUCT_NOT_FOUND', message: 'Product not found' });
  });

  it('should return a object with type SALE_NOT_FOUND and message with "Sale not found"', async function () {
    sinon.stub(salesModel, 'findById').resolves([]);
    const response = await salesService.updateSaleById(1, serviceMock.saleUpdate);
    expect(response).to.be.deep.equal({ type: 'SALE_NOT_FOUND', message: 'Sale not found' });
  });

  it('should return a object with type null and message with an object of updated', async function () {
    sinon.stub(salesModel, 'findById').resolves([true]);
    const response = await salesService.updateSaleById(1, serviceMock.saleUpdate);
    expect(response).to.be.deep.equal({ type: null, message: { saleId: 1, itemsUpdated: serviceMock.saleUpdate } });
  });
});


