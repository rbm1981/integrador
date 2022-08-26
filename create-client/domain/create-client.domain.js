const {
  CreateClientValidation,
} = require("../schema/input/create-client.input");
const { createClientService } = require("../service/create-client.service");
const {
  publishClientCreated,
} = require("../service/publish-client-created.service");

const { ClientCreated } = require("../schema/event/client-created.event");

const { calculateAge } = require("../helper/calculate-age.helper");

async function createClientDomain(commandPayload, commandMeta) {
  new CreateClientValidation(commandPayload, commandMeta);

  if (
    calculateAge(commandPayload.birth) < 18 ||
    calculateAge(commandPayload.birth) > 65
  ) {
    return {
      statusCode: 400,
      body: "Client must be between 18 and 65 years old",
    };
  }

  await createClientService(commandPayload);
  await publishClientCreated(new ClientCreated(commandPayload, commandMeta))

  return {
    statusCode: 200,
    body: "Client added succesfully",
  };
}

module.exports = { createClientDomain };
