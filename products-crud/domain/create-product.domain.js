const { CreateProductValidation } = require('../schema/input/create-product.input');
const { createProductService } = require('../service/create-product.serivce');

async function createProductDomain(commandPayload, commandMeta) {
  // eslint-disable-next-line no-new
  new CreateProductValidation(commandPayload, commandMeta);

  await createProductService(commandPayload);

  return {
    statusCode: 200,
    body: 'Product added succesfully',
  };
}

module.exports = { createProductDomain };
