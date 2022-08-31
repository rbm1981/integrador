const dynamo = require('ebased/service/storage/dynamo');

async function getClientByIdService(commandPayload) {
  return dynamo.getItem({
    TableName: process.env.CLIENTS_TABLE,
    Key: { dni: commandPayload.id },
  });
}

module.exports = { getClientByIdService };
