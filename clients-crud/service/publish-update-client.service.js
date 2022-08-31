const sns = require('ebased/service/downstream/sns');

async function publishUpdatedClient(clientCreatedEvent) {
  const { eventPayload, eventMeta } = clientCreatedEvent.get();

  const snsPublishParams = {
    TopicArn: process.env.CLIENTS_CREATED_TOPIC,
    Message: eventPayload,
  };

  await sns.publish(snsPublishParams, eventMeta);
}

module.exports = { publishUpdatedClient };
