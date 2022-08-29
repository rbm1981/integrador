const { batchEventMapper } = require('ebased/handler');
const inputMode = require('ebased/handler/input/batchEventQueue');
const outputMode = require('ebased/handler/output/batchEventConfirmation');
const { createGiftDomain } = require('../domain/create-card.domain');

module.exports.handler = async (events, context) => {
  const normalizedEvent = (events) => events?.Records?.map((record) => JSON.parse(record?.body));
  console.log(normalizedEvent(events));
  return batchEventMapper({ events, context }, inputMode, createGiftDomain, outputMode);
}
