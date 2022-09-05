const { getClientByIdService } = require('../service/get-client-by-id.service');

async function getClientByIdDomain(commandPayload) {
  const { Item } = await getClientByIdService(commandPayload);
  return {
    statusCode: 200,
    body: Item,
  };
}

module.exports = { getClientByIdDomain };
