const { createCardService } = require('../service/create-card.service');
const { createCard } = require('../helper/create-card.helper');

async function createCardDomain(eventPayload) {
  const message = JSON.parse(eventPayload.Message);
  const [creditCardNumber, expirationDate, securityCode, type] = createCard(message.birth);
  const dbParams = {
    ExpressionAttributeNames: {
      '#C': 'creditCard',
    },
    ExpressionAttributeValues: {
      ':c': {
        number: creditCardNumber,
        expiration: expirationDate,
        ccv: securityCode,
        type,
      },
    },
    Key: {
      dni: message.dni,
    },
    ReturnValues: 'ALL_NEW',
    UpdateExpression: 'SET #C = :c',
  };

  console.log('dbParams', dbParams);

  await createCardService(dbParams);

  return {
    statusCode: 200,
    body: 'Gift added succesfully',
  };
}

module.exports = { createCardDomain };
