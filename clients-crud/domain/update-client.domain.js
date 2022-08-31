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
  await updateClientService(commandPayload);
  if (commandPayload.birth !== Item.birth) {
    await publishUpdatedClient(new UpdatedClient(commandPayload, commandMeta));
  }

  return {
    statusCode: 200,
    body: { ...commandPayload, ...Item },
  };
}

module.exports = { updateClientDomain };
