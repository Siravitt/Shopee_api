const { Cart } = require("../../models");

exports.getCart = async (req, res, next) => {
  try {
    const cart = await Cart.findAll({
      where: {
        userId: req.user.id,
      },
    });
    res.status(200).json({ cart });
  } catch (err) {
    next(err);
  }
};

exports.addToCart = async (req, res, next) => {
  try {
    const cart = await Cart.findOne({
      where: {
        productId: req.body.productId,
      },
    });

    if (cart) {
      await Cart.update(
        {
          quantity: req.body.quantity,
        },
        {
          where: {
            productId: req.body.productId,
            userId: req.user.id,
          },
        }
      );
      res.status(200).json({ message: "update cart success" });
    }

    await Cart.create({
      productId: req.body.productId,
      quantity: req.body.quantity,
      userId: req.user.id,
    });
    res.status(200).json({ message: "add to cart success" });
  } catch (err) {
    next(err);
  }
};

exports.deleteFromCart = async (req, res, next) => {
  try {
  } catch (err) {
    next(err);
  }
};
