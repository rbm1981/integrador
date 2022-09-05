const { InputValidation } = require('ebased/schema/inputValidation');

class CreateProductValidation extends InputValidation {
  constructor(payload, meta) {
    super({
      type: 'PRODUCTS.CREATE_PRODUCT',
      specversion: 'v1.0.0',
      source: meta.source,
      payload,
      schema: {
        id: { type: String, required: true },
        label: { type: String, required: true },
        price: { type: Number, required: true },
      },
    });
  }
}

module.exports = { CreateProductValidation };
