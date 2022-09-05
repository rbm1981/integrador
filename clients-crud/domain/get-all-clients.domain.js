const { getAllClientsService } = require('../service/get-all-clients.service');

async function getAllClientsDomain() {
  const { Items } = await getAllClientsService();

  return {
    statusCode: 200,
    body: Items,
  };
}

module.exports = { getAllClientsDomain };
