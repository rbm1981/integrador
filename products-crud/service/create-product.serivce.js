const dynamo = require('ebased/service/storage/dynamo');

async function createProductService(commandPayload) {
  await dynamo.putItem({
    TableName: process.env.PRODUCTS_TABLE,
    Item: commandPayload,
  });
}

module.exports = { createProductService };
