// const {
//   CreateClientValidation,
// } = require('../schema/input/create-client.input');
const { getClientByIdService } = require('../service/get-client-by-id.service');

async function getClientByIdDomain(commandPayload, commandMeta) {
  console.log(commandPayload, commandMeta);
  // eslint-disable-next-line no-new
  // new CreateClientValidation(commandPayload, commandMeta);

  await getClientByIdService(commandPayload);

  return {
    statusCode: 200,
    body: 'Client added succesfully',
  };
}

module.exports = { getClientByIdDomain };
