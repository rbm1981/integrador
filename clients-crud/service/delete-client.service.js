const dynamo = require('ebased/service/storage/dynamo');

async function deleteClientService(commandPayload) {
  await dynamo.update({
    TableName: process.env.CLIENTS_TABLE,
    Key: { dni: commandPayload.dni },
  });
}

module.exports = { deleteClientService };
