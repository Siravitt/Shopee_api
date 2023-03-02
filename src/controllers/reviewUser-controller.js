const { ProductReview, Order, OrderItem, OrderShop } = require("../models");
const createError = require("../utils/create-error");
const { validateCreateReview } = require("../validators/reviewUser-validate");

exports.getAllReview = async (req, res, next) => {
  try {
    const reviews = await ProductReview.findAll({
      where: {
        productId: req.params.productId,
      },
    });
    res.status(200).json({ reviews });
  } catch (err) {
    next(err);
  }
};

exports.createReview = async (req, res, next) => {
  try {
    const orderSuccess = await OrderItem.findOne({
      where: {
        productId: req.params.productId,
      },
      include: [
        {
          model: OrderShop,
          where: {
            status: "SUCCESS",
          },
        },
        {
          model: Order,
          where: {
            userId: req.user.id,
          },
        },
      ],
    });

    if (!orderSuccess) {
      createError("You have no permission to review this product", 400);
    }

    const value = validateCreateReview(req.body);
    value.productId = req.params.productId;
    await ProductReview.create(value);

    res.status(200).json({ message: "Create review success" });
  } catch (err) {
    next(err);
  }
};
