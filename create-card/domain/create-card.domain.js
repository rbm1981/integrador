const { createCardService } = require("../service/create-card.service");
const { createCard } = require("../helper/create-card.helper");

async function createCardtDomain(eventPayload, eventMeta, rawEvent) {
  const [creditCardNumber, expirationDate, securityCode, type] = createCard(eventPayload.birth);
  const dbParams = {
    ExpressionAttributeNames: {
      "#C": "creditCard",
    },
    ExpressionAttributeValues: {
      ":c": {
        "number": creditCardNumber,
        "expiration": expirationDate,
        "ccv":  securityCode,
        "type": type
      },
    },
    Key: {
      dni: body.dni ,
    },
    ReturnValues: "ALL_NEW",
    UpdateExpression: "SET #C = :c",
  };


  console.log('dbParams', dbParams);
  
  
  await createCardService(dbParams);

  return {
    statusCode: 200,
    body: "Gift added succesfully",
  };
}
  
module.exports = { createCardtDomain };
  