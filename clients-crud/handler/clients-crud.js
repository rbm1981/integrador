const { commandMapper } = require('ebased/handler');
const inputMode = require('ebased/handler/input/commandApi');
const outputMode = require('ebased/handler/output/commandApi');

const { createClientDomain } = require('../domain/create-client.domain');
const { getAllClientsDomain } = require('../domain/get-all-clients.domain');
const { getClientById } = require('../domain/get-client-by-id.domain');

module.exports.handler = async (command, context) => commandMapper(
  { command, context },
  inputMode,
  createClientDomain,
  outputMode,
);

module.exports.getAll = async (command, context) => commandMapper(
  { command, context },
  inputMode,
  getAllClientsDomain,
  outputMode,
);

module.exports.getById = async (command, context) => commandMapper(
  { command, context },
  inputMode,
  getClientById,
  outputMode,
);
