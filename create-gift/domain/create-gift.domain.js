const { CreateClientValidation } = require("../schema/input/create-client.input");
const { createGiftService } = require("../service/create-gift.service");
const { giftChoser } = require("../helper/gift-chooser.helper");

async function createGiftDomain(eventPayload, eventMeta, rawEvent) {
  // new CreateClientValidation(eventPayload, eventMeta);

  console.log('eventPayload', eventPayload.Message);
  const message = JSON.parse(eventPayload.Message);
  console.log('message', message);

  const dbParams = {
    ExpressionAttributeNames: {
      "#G": "gift",
    },
    ExpressionAttributeValues: {
      ":g": {
        S: giftChoser(message.birth),
      },
    },
    Key: {
      "dni": {
        S: message.dni,
      },
    },
    ReturnValues: "ALL_NEW",
    UpdateExpression: "SET #G = :g"
  };


  console.log('dbParams', dbParams);


  await createGiftService(dbParams);

  return {
    statusCode: 200,
    body: "Gift added succesfully",
  };
}
  
module.exports = { createGiftDomain };
  