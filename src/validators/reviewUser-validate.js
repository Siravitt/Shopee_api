const Joi = require("joi");
const validate = require("./validate");

const createReviewSchema = Joi.object({
  comment: Joi.string().trim(),
  rating: Joi.string().trim().required(),
});

exports.validateCreateReview = validate(createReviewSchema);
