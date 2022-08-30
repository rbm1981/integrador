const dynamo = require('ebased/service/storage/dynamo');

async function getAllClientsService(commandPayload) {
  await dynamo.scanTable({
    TableName: process.env.CLIENTS_TABLE,
  });
}

module.exports = { getAllClientsService };
