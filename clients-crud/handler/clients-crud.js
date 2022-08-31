const { commandMapper } = require('ebased/handler');
const inputMode = require('ebased/handler/input/commandApi');
const outputMode = require('ebased/handler/output/commandApi');

const { createClientDomain } = require('../domain/create-client.domain');
const { getAllClientsDomain } = require('../domain/get-all-clients.domain');
const { getClientByIdDomain } = require('../domain/get-client-by-id.domain');
const { deleteClientDomain } = require('../domain/delete-client.domain');
const { updateClientDomain } = require('../domain/update-client.domain');
const { buyDomain } = require('../domain/buy.domain');

module.exports.create = async (command, context) => commandMapper(
  { command, context },
  inputMode,
  buyDomain,
  outputMode,
);

module.exports.create = async (command, context) => commandMapper(
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
  getClientByIdDomain,
  outputMode,
);

module.exports.delete = async (command, context) => commandMapper(
  { command, context },
  inputMode,
  deleteClientDomain,
  outputMode,
);

module.exports.update = async (command, context) => commandMapper(
  { command, context },
  inputMode,
  updateClientDomain,
  outputMode,
);
