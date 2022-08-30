const { createCardService } = require('../service/create-card.service');
const { createCard } = require('../helper/create-card.helper');

async function createCardDomain(eventPayload) {
  const [creditCardNumber, expirationDate, securityCode, type] = createCard(eventPayload.birth);
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
      dni: eventPayload.dni,
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
