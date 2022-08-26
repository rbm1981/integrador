const dynamo = require('ebased/service/storage/dynamo');

async function createGiftService(commandPayload) {
  await dynamo.updateItem({
    ...commandPayload,
    TableName: process.env.CLIENTS_TABLE,
  });
}

module.exports = { createGiftService };