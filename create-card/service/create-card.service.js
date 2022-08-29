const dynamo = require('ebased/service/storage/dynamo');

async function createCardService(commandPayload) {
  await dynamo.updateItem({
    ...commandPayload,
    TableName: process.env.CLIENTS_TABLE,
  });
}

module.exports = { createCardService };