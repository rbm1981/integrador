const dynamo = require('ebased/service/storage/dynamo');

async function updateClientService(commandPayload) {
  await dynamo.updateItem({
    ...commandPayload,
    TableName: process.env.CLIENTS_TABLE,
  });
}

module.exports = { updateClientService };
