const Joi = require("joi");
const validate = require("./validate");

const editShopProfileSchema = Joi.object({
  name: Joi.string().trim().messages({
    "string.empty": "name is required",
    "string.base": "name must be a string",
  }),
  address: Joi.string().trim().messages({
    "string.empty": "Address is required",
    "string.base": "Address must be a string",
  }),
  district: Joi.string().trim().messages({
    "string.empty": "District is required",
    "string.base": "District must be a string",
  }),
  subDistrict: Joi.string().trim().messages({
    "string.base": "Sub-district must be a string",
  }),
  province: Joi.string().trim().messages({
    "string.empty": "Province is required",
    "string.base": "Province must be a string",
  }),
  postalCode: Joi.string().pattern(/^[0-9]{5}$/),
  description: Joi.string().trim().messages({
    "string.empty": "Description is required",
    "string.base": "Description must be a string",
  }),
});

exports.validateEditShopProfile = validate(editShopProfileSchema);
