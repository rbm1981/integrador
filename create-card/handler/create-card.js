const { batchEventMapper } = require('ebased/handler');
const inputMode = require('ebased/handler/input/batchEventQueue');
const outputMode = require('ebased/handler/output/batchEventConfirmation');
const { createCardDomain } = require('../domain/create-card.domain');

const normalizedEvents = (events) => ({
  Records: events
    .Records
    .map((record) => ({
      ...record,
      ...{
        body: JSON.parse(record?.body),
      },
    }))
    .map((record) => ({
      ...record,
      body: {
        ...record.body,
        Message: JSON.parse(record?.body?.Message),
      },
    })),
});

module.exports.handler = async (events, context) => {
  console.log(events);
  console.log(normalizedEvents(events));

  return batchEventMapper({
    events: normalizedEvents(events),
    context,
  }, inputMode, createCardDomain, outputMode);
};
