const dynamo = require('ebased/service/storage/dynamo');

async function createGiftService(commandPayload) {
  await dynamo.updateItem({
    TableName: process.env.CLIENTS_TABLE,
    Item: commandPayload
  });
}

module.exports = { createGiftService };