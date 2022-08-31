const {
  CreateClientValidation,
} = require('../schema/input/create-client.input');
const { updateClientService } = require('../service/update-client.service');
const { publishUpdatedClient } = require('../service/publish-update-client.service');
const { UpdatedClient } = require('../schema/event/update-client.event');
const { getClientByIdService } = require('../service/get-client-by-id.service');

async function updateClientDomain(commandPayload, commandMeta) {
  // eslint-disable-next-line no-new
  new CreateClientValidation(commandPayload, commandMeta);

  const { Item } = await getClientByIdService(commandPayload);

  // name: { type: String, required: true },
  // lastName: { type: String, required: true },
  // dni: { type: String, required: true },
  // birth: { type: String, required: true },

  const dbParams = {
    ExpressionAttributeNames: {
      '#G': 'name',
      '#H': 'lastName',
      '#I': 'birth',
    },
    ExpressionAttributeValues: {
      ':g': commandPayload.name,
      ':h': commandPayload.lastName,
      ':i': commandPayload.birth,
    },
    Key: {
      dni: commandPayload.dni,
    },
    ReturnValues: 'ALL_NEW',
    UpdateExpression: 'SET #G = :g; SET #H = :h; SET #I = :i',
  };
  await updateClientService(dbParams);
  if (commandPayload.birth !== Item.birth) {
    await publishUpdatedClient(new UpdatedClient(commandPayload, commandMeta));
  }

  return {
    statusCode: 200,
    body: { ...commandPayload, ...Item },
  };
}

module.exports = { updateClientDomain };
