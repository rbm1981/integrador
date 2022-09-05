const { deleteClientService } = require('../service/delete-client.service');

async function deleteClientDomain(commandPayload) {
  const dbParams = {
    ExpressionAttributeNames: {
      '#G': 'enabled',
    },
    ExpressionAttributeValues: {
      ':g': false,
    },
    Key: {
      dni: commandPayload.dni,
    },
    ReturnValues: 'ALL_NEW',
    UpdateExpression: 'SET #G = :g',
  };
  await deleteClientService(dbParams);
  return {
    statusCode: 200,
    body: 'Client deleted succesfully',
  };
}

module.exports = { deleteClientDomain };
