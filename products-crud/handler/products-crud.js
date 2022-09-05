const { commandMapper } = require('ebased/handler');
const inputMode = require('ebased/handler/input/commandApi');
const outputMode = require('ebased/handler/output/commandApi');

const { createProductDomain } = require('../domain/create-product.domain');

module.exports.createProduct = async (command, context) => commandMapper(
  { command, context },
  inputMode,
  createProductDomain,
  outputMode,
);
