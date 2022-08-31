const dynamo = require('ebased/service/storage/dynamo');

async function getAllClientsService() {
  return dynamo.scanTable({
    TableName: process.env.CLIENTS_TABLE,
  });
}

module.exports = { getAllClientsService };
