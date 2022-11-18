const { expect } = require('chai');
const sinon = require('sinon');
const { productsModel } = require('../../../src/models');
const { productsService } = require('../../../src/services');
const serviceMocks = require('./Mocks/products.service.mocks');

describe('Test service layer of products path', function () {
  afterEach(sinon.restore);
  
  it('should return a object with type null and message with an array of objects', async function() {
    sinon.stub(productsModel, 'findAll').resolves(serviceMocks.allProducts);
    const response = await productsService.getAllProducts();
    expect(response).to.be.deep.equal({ type: null, message: serviceMocks.allProducts });
  });

  it('should return a object with type INTERNAL_SERVER_ERROR and message with "Internal server error!"', async function () {
    sinon.stub(productsModel, 'findAll').resolves('');
    const response = await productsService.getAllProducts();
    expect(response).to.be.deep.equal({ type: 'INTERNAL_SERVER_ERROR', message: 'Internal server error!' });
  });

  it('should return a object with type null and message with a object', async function () {
    sinon.stub(productsModel, 'findById').resolves(serviceMocks.allProducts[0]);
    const response = await productsService.getProductById();
    expect(response).to.be.deep.equal({ type: null, message: serviceMocks.allProducts[0] });
  });

  it('should return a object with type PRODUCT_NOT_FOUND and message with "Product not found', async function () {
    sinon.stub(productsModel, 'findById').resolves(undefined);
    const response = await productsService.getProductById();
    expect(response).to.be.deep.equal({ type: 'PRODUCT_NOT_FOUND', message: 'Product not found' });
  });

  it('should return a object with type null and message with an object', async function () {
    sinon.stub(productsModel, 'insert').resolves([{ insertId: 1 }])
    sinon.stub(productsModel, 'findById').resolves(serviceMocks.allProducts[0]);
    const response = await productsService.insertProduct('Martelo do Thor');
    expect(response).to.be.deep.equal({ type: null, message: serviceMocks.allProducts[0] });
  });

  it('should return a object with type PRODUCT_NOT_CREATED and message with "Product not created"', async function () {
    sinon.stub(productsModel, 'insert').resolves([{ insertId: '' }])
    sinon.stub(productsModel, 'findById').resolves('');
    const response = await productsService.insertProduct('Martelo do Thor');
    expect(response).to.be.deep.equal({ type: 'PRODUCT_NOT_CREATED', message: 'Product not created' });
  });

  it('should return a object with type PRODUCT_NOT_FOUND and message with "Product not found" for update function', async function () {
    sinon.stub(productsModel, 'findById').resolves(undefined);
    const response = await productsService.updateItem(1, 'Anything');
    expect(response).to.be.deep.equal({ type: 'PRODUCT_NOT_FOUND', message: 'Product not found' });
  });

  it('should return a object with type null and message with an object for update function"', async function () {
    sinon.stub(productsModel, 'findById').resolves([serviceMocks.allProducts[0]]);
    sinon.stub(productsModel, 'update').resolves({ id: 1, name: { } });
    const response = await productsService.updateItem(1, 'Anything');
    expect(response).to.be.deep.equal({ type: null, message: { id: 1, name: 'Anything' } });
  });

  it('should return a object with type PRODUCT_NOT_FOUND and message with "Product not found"  for delete function', async function () {
    sinon.stub(productsModel, 'findById').resolves(undefined);
    const response = await productsService.deleteItem();
    expect(response).to.be.deep.equal({ type: 'PRODUCT_NOT_FOUND', message: 'Product not found' });
  });

  it('should return a object with type null and message with an object for delete function"', async function () {
    sinon.stub(productsModel, 'findById').resolves([serviceMocks.allProducts[0]]);
    sinon.stub(productsModel, 'deleteProduct').resolves({});
    const response = await productsService.deleteItem();
    expect(response).to.be.deep.equal({ type: null, message: { } });
  });

  it('should return all products', async function () {
    sinon.stub(productsModel, 'findAll').resolves(serviceMocks.allProducts);
    const response = await productsService.findItemByName('');
    expect(response).to.be.deep.equal({ type: null, message: serviceMocks.allProducts });
  });

  it('should return a product search by name', async function () {
    sinon.stub(productsModel, 'findByName').resolves(serviceMocks.allProducts);
    const response = await productsService.findItemByName('M');
    expect(response).to.be.deep.equal({ type: null, message: serviceMocks.allProducts });
  });
});


