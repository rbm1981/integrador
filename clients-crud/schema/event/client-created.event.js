const { DownstreamEvent } = require('ebased/schema/downstreamEvent');

class ClientCreated extends DownstreamEvent {
  constructor(payload, meta) {
    super({
      type: 'CLIENT.CREATE_CLIENT',
      specversion: 'v1.0.0',
      payload,
      meta,
      schema: {
        strict: false,
        name: { type: String, required: true },
        lastName: { type: String, required: true },
        dni: { type: String, required: true },
        birth: { type: String, required: true },
      },
    });
  }
}

module.exports = { ClientCreated };
