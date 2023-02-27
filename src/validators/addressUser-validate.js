const Joi = require("joi");
const validate = require("./validate");

const createAddressSchema = Joi.object({
  name: Joi.string().trim().required().messages({
    "any.required": "name is required",
    "string.empty": "name is required",
    "string.base": "name must be a string",
  }),
  receiverName: Joi.string().trim().required().messages({
    "any.required": "Receiver name is required",
    "string.empty": "Receiver name is required",
    "string.base": "Receiver name must be a string",
  }),
  receiverPhone: Joi.string().trim().required().messages({
    "any.required": "Receiver phone is required",
    "string.empty": "Receiver phone is required",
    "string.base": "Receiver phone must be a string",
  }),
  address: Joi.string().trim().required().messages({
    "any.required": "Address is required",
    "string.empty": "Address is required",
    "string.base": "Address must be a string",
  }),
  subDistrict: Joi.string().trim().required().messages({
    "any.required": "Sub-district is required",
    "string.empty": "Sub-district is required",
    "string.base": "Sub-district must be a string",
  }),
  district: Joi.string().trim().required().messages({
    "any.required": "District is required",
    "string.empty": "District is required",
    "string.base": "District must be a string",
  }),
  province: Joi.string().trim().required().messages({
    "any.required": "Province is required",
    "string.empty": "Province is required",
    "string.base": "Province must be a string",
  }),
  postalCode: Joi.string()
    .pattern(/^[0-9]{5}$/)
    .required()
    .messages({
      "any.required": "Postal code is required",
      "alternatives.match": "Postal code must be 0-9 and 5 length",
    }),
});

const editAddressSchema = Joi.object({
  name: Joi.string().trim().messages({
    "string.base": "name must be a string",
  }),
  receiverName: Joi.string().trim().messages({
    "string.base": "Receiver name must be a string",
  }),
  receiverPhone: Joi.string().trim().messages({
    "string.base": "Receiver phone must be a string",
  }),
  address: Joi.string().trim().messages({
    "string.base": "Address must be a string",
  }),
  subDistrict: Joi.string().trim().messages({
    "string.base": "Sub-district must be a string",
  }),
  district: Joi.string().trim().messages({
    "string.base": "District must be a string",
  }),
  province: Joi.string().trim().messages({
    "string.base": "Province must be a string",
  }),
  postalCode: Joi.string()
    .pattern(/^[0-9]{5}$/)
    .messages({
      "alternatives.match": "Postal code must be 0-9 and 5 length",
    }),
});

exports.validateCreateAddress = validate(createAddressSchema);

exports.validateEditAddress = validate(editAddressSchema);
