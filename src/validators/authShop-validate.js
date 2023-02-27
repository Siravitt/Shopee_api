const Joi = require("joi");
const validate = require("./validate");

const createShopSchema = Joi.object({
  name: Joi.string().trim().required().messages({
    "any.required": "Shop name is required",
    "string.empty": "Shop name is required",
    "string.base": "Shop name must be a string",
  }),
});

exports.validateCreateShop = validate(createShopSchema);
