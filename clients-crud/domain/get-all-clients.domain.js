const { getAllClientsService } = require('../service/get-all-clients.service');

async function getAllClientsDomain(commandPayload) {
  await getAllClientsService(commandPayload);

  return {
    statusCode: 200,
    body: 'Client added succesfully',
  };
}

module.exports = { getAllClientsDomain };
