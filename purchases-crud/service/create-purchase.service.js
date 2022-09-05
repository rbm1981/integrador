const dynamo = require('ebased/service/storage/dynamo');

async function CreatePurchaseService(commandPayload) {
  await dynamo.putItem({
    TableName: process.env.PURCHASES_TABLE,
    Item: commandPayload,
  });
}

module.exports = { CreatePurchaseService };
