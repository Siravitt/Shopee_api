const Joi = require("joi");
const validate = require("./validate");

const createProductSchema = Joi.object({
  name: Joi.string().trim().required().messages({
    "any.required": "Product name is required",
    "string.empty": "Product name is required",
    "string.base": "Product name must be a string",
  }),
  price: Joi.number().integer().min(1).required(),
  description: Joi.string().trim(),
  weight: Joi.number().min(1),
  quantityAvailable: Joi.number().integer().min(1).required(),
  width: Joi.number().min(0),
  length: Joi.number().min(0),
  height: Joi.number().min(0),
  categoryId: Joi.number().required(),
});

exports.validateCreateProduct = validate(createProductSchema);
