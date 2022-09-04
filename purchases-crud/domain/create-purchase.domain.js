const { v4: uuidv4 } = require('uuid');
const { CreatePurchaseValidation } = require('../schema/input/create-purchase.input');
const { CreatePurchaseService } = require('../service/create-purchase.service');
const { getClientByIdService } = require('../service/get-client-by-id.service');
const { updateClientService } = require('../service/update-client.service');

function getDiscount(cardType) {
  if (cardType === 'Gold') {
    return 12;
  } if (cardType === 'Classic') {
    return 8;
  }
  return 0;
}

async function CreatePurchaseDomain(commandPayload, commandMeta) {
  console.log(commandPayload, commandMeta);
  // eslint-disable-next-line no-new
  new CreatePurchaseValidation(commandPayload, commandMeta);

  const { Item: client } = await getClientByIdService({ dni: commandPayload.dni });

  console.log('client', client);
  // eslint-disable-next-line no-param-reassign
  commandPayload.id = uuidv4();

  console.log('commandPayload', commandPayload);

  if (client.enabled) {
    const discount = getDiscount(client?.creditCard?.type);
    const producstSum = commandPayload
      ?.products?.reduce((acc, product) => (acc + product.price), 0);
    console.log('producstSum', producstSum);
    commandPayload.total = producstSum + ((discount / 100) * producstSum);
    console.log('commandPayload', commandPayload);
    const clclientTotal = client?.purchases?.total ? client?.purchases?.total : 0;
    console.log('clclientTotal', clclientTotal);
    const clientTotalCumulative = clclientTotal + commandPayload.total;
    console.log('clientTotalCumulative', clientTotalCumulative);

    const dbParams = {
      ExpressionAttributeNames: {
        '#G': 'points',
      },
      ExpressionAttributeValues: {
        ':points': Math.floor(clientTotalCumulative / 200),
        ':totalPurchases': clientTotalCumulative,
      },
      Key: {
        dni: client.dni,
      },
      ReturnValues: 'ALL_NEW',
      UpdateExpression: 'SET #G = :points, totalPurchases = :totalPurchases',
    };

    console.log('dbParams', dbParams);
    await CreatePurchaseService(commandPayload);
    await updateClientService(dbParams);
  }

  return {
    statusCode: 200,
    body: 'Purchase added succesfully',
  };
}

module.exports = { CreatePurchaseDomain };
