const Joi = require("joi");
const validate = require("./validate");

const chatSchema = Joi.object({
  message: Joi.string().trim(),
  messageImage: Joi.string().trim(),
});

exports.validateChat = validate(chatSchema);
