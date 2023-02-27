const Joi = require("joi");
const validate = require("./validate");

const editUserProfileSchema = Joi.object({
  userName: Joi.string().trim(),
  phone: Joi.string().pattern(/^[0-9]{10}$/),
});

exports.validateUserEditProfile = validate(editUserProfileSchema);
