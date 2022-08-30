const { InputValidation } = require('ebased/schema/inputValidation');
const Schemy = require('schemy');

const Product = new Schemy({
  id: { type: String, required: true },
  label: { type: String, required: true },
  price: { type: Number, required: true },
});

class CreateClientValidation extends InputValidation {
  constructor(payload, meta) {
    super({
      type: 'PRODUCTS.CREATE_PRODUCTS',
      specversion: 'v1.0.0',
      source: meta.source,
      payload,
      schema: {
        products: { type: [Product], required: true },
      },
    });
  }
}

module.exports = { CreateClientValidation };
