const { v4: uuidv4 } = require('uuid');
const { CreatePurchaseValidation } = require('../schema/input/create-purchase.input');
const { CreatePurchaseService } = require('../service/create-purchase.service');
const { getClientByIdService } = require('../service/get-client-by-id.service');

async function CreatePurchaseDomain(commandPayload, commandMeta) {
  console.log(commandPayload, commandMeta);
  // eslint-disable-next-line no-new
  new CreatePurchaseValidation(commandPayload, commandMeta);

  const { Item: client } = await getClientByIdService({ dni: commandPayload.dni });

  console.log('client', client);
  // eslint-disable-next-line no-param-reassign
  commandPayload.id = uuidv4();

  await CreatePurchaseService(commandPayload);

  return {
    statusCode: 200,
    body: 'Purchase added succesfully',
  };
}

module.exports = { CreatePurchaseDomain };
