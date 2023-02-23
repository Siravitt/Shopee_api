const Joi = require("joi");
const validate = require("./validate");

const createProduct = Joi.object({
  name: Joi.string().trim().required().messages({
    "any.required": "Product name is required",
    "string.empty": "Product name is required",
    "string.base": "Product name must be a string",
  }),
  price: Joi.string().trim().required().messages({
    "any.required": "Price is required",
    "string.empty": "Price is required",
    "string.base": "Price must be a string",
  }),
  description: Joi.string().trim().messages({
    "string.base": "Description must be a string",
  }),
  weight: Joi.string().trim().required().messages({
    "any.required": "Weight is required",
    "string.empty": "Weight is required",
    "string.base": "Weight must be a string",
  }),
  categoryId: Joi.string().trim().required().messages({
    "any.required": "Category is required",
    "string.empty": "Category is required",
    "string.base": "Category must be a string",
  }),
});

const editProduct = Joi.object({
  name: Joi.string().trim().messages({
    "string.empty": "Product name is required",
    "string.base": "Product name must be a string",
  }),
  price: Joi.string().trim().messages({
    "string.empty": "Price is required",
    "string.base": "Price must be a string",
  }),
  description: Joi.string().trim().messages({
    "string.base": "Description must be a string",
  }),
  weight: Joi.string().trim().messages({
    "string.empty": "Weight is required",
    "string.base": "Weight must be a string",
  }),
  categoryId: Joi.string().trim().messages({
    "string.empty": "Category is required",
    "string.base": "Category must be a string",
  }),
  array: Joi.array(),
});

exports.validateCreateProduct = validate(createProduct);
exports.validateEditProduct = validate(editProduct);
