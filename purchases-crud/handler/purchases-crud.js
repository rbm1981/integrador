const { commandMapper } = require('ebased/handler');
const inputMode = require('ebased/handler/input/commandApi');
const outputMode = require('ebased/handler/output/commandApi');

const { CreatePurchaseDomain } = require('../domain/create-purchase.domain');

module.exports.createPurchase = async (command, context) => commandMapper(
  { command, context },
  inputMode,
  CreatePurchaseDomain,
  outputMode,
);
