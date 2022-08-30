const { commandMapper } = require('ebased/handler');
const inputMode = require('ebased/handler/input/commandApi');
const outputMode = require('ebased/handler/output/commandApi');

const { createProductsDomain } = require('../domain/create-products.domain');

module.exports.createProducts = async (command, context) => commandMapper(
  { command, context },
  inputMode,
  createProductsDomain,
  outputMode,
);
