const dynamo = require('ebased/service/storage/dynamo');

async function updateClientService(commandPayload) {
  await dynamo.updateItem({
    ...commandPayload,
    Key: { dni: commandPayload.id },
    TableName: process.env.CLIENTS_TABLE,
  });
}

module.exports = { updateClientService };
