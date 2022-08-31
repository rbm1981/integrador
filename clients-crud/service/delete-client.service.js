const dynamo = require('ebased/service/storage/dynamo');

async function deleteClientService(commandPayload) {
  await dynamo.updateItem({
    ...commandPayload,
    TableName: process.env.CLIENTS_TABLE,
  });
}

module.exports = { deleteClientService };
