const Dyanamo = require('aws-sdk/clients/dynamodb');
const { FaultHandled } = require('ebased/util/error');
const { StorageCommandMetric } = require('ebased/_metric/storageCommand');

const service = 'DYNAMO_COMMAND';
const dynamo = new Dyanamo.DocumentClient();

async function batchWriteItem(params) {
  const operation = 'BATCH_WRITE_ITEM';
  // eslint-disable-next-line no-param-reassign
  params.ReturnConsumedCapacity = 'TOTAL';
  const metric = new StorageCommandMetric(service, operation, params);

  const { ConsumedCapacity, Attributes } = await
  dynamo.batchWriteItem(params).promise().catch((e) => {
    metric.finish({ error: e.message });
    throw new FaultHandled(e.message, { code: operation, layer: service });
  });

  metric.finish({ ConsumedCapacity, Attributes });
  return { Attributes };
}

async function createProductsService(commandPayload) {
  await batchWriteItem({
    RequestItems: {
      [process.env.PRODUCTS_TABLE]: commandPayload,
    },
  });
}

module.exports = { createProductsService };
