const Joi = require("joi");
const validate = require("./validate");

const editUserProfileSchema = Joi.object({
  firstName: Joi.string().trim(),
  lastName: Joi.string().trim(),
  userName: Joi.string().trim(),
  email: Joi.string().trim(),
  phone: Joi.string().pattern(/^[0-9]{10}$/),
});

exports.validateUserEditProfile = validate(editUserProfileSchema);
