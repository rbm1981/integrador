const {
  CreateClientValidation,
} = require('../schema/input/create-client.input');
const { createProductsService } = require('../service/create-products.serivce');

async function createProductsDomain(commandPayload, commandMeta) {
  // eslint-disable-next-line no-new
  new CreateClientValidation(commandPayload, commandMeta);

  const dbParams = commandPayload.map((product) => ({
    PutRequest: {
      Item: {
        Key: product.id,
        prince: product.price,
        label: product.label,
      },
    },
  }));

  await createProductsService(commandPayload);

  return {
    statusCode: 200,
    body: 'Client added succesfully',
  };
}

module.exports = { createProductsDomain };
