const Joi = require("joi");
const validate = require("./validate");

const registerSchema = Joi.object({
  shopName: Joi.string().trim().required().messages({
    "any.required": "Shop name is required",
    "string.empty": "Shop name is required",
    "string.base": "Shop name must be a string",
  }),
  email: Joi.string().email({ tlds: false }).required().messages({
    "any.required": "Email is required",
    "string.email": "Must be a valid email",
    "string.empty": "Email is required",
  }),
  phone: Joi.string()
    .pattern(/^[0-9]{10}$/)
    .required().messages({
      "alternatives.match": "mobile number",
    }),
  password: Joi.string().alphanum().min(6).trim().required().messages({
    "string.empty": "Password is required",
    "string.alphanum": "Password must contain number or alphabet",
    "string.min": "Password length must be at least 6 characters long",
  }),
  confirmPassword: Joi.string()
    .valid(Joi.ref("password"))
    .trim()
    .required()
    .messages({
      "any.only": "Password not match",
      "string.empty": "Confirm password is require",
    }),
});

const loginSchema = Joi.object({
  email: Joi.string().required().messages({
    "string.empty": "Email is required",
  }),
  password: Joi.string().required().messages({
    "string.empty": "Password is required",
  }),
});

exports.validateRegister = validate(registerSchema);

exports.validateLogin = validate(loginSchema);
