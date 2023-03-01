const { Cart, Product, Shop } = require("../models");

exports.getCart = async (req, res, next) => {
  try {
    const cart = await Cart.findAll({
      where: { userId: req.user.id },
      include: [
        {
          model: Product,
        },
        {
          model: Shop,
        },
      ],
    });
    res.status(200).json({ cart });
  } catch (err) {
    next(err);
  }
};

exports.addOrUpdateCart = async (req, res, next) => {
  try {
    const cart = await Cart.findOne({
      where: { productId: req.body.productId },
    });
    if (!cart) {
      await Cart.create({
        quantity: req.body.quantity,
        productId: req.body.productId,
        userId: req.user.id,
        shopId: req.body.shopId,
      });
    } else {
      await Cart.update(
        {
          quantity: req.body.quantity,
        },
        {
          where: {
            id: cart.id,
          },
        }
      );
    }
    res.status(200).json({ message: "Add success" });
  } catch (err) {
    next(err);
  }
};

exports.deleteCartByProductId = async (req, res, next) => {
  try {
    const { productId } = req.params;
    await Cart.destroy({
      where: {
        productId: productId,
        userId: req.user.id,
      },
    });
    res.status(200).json({ message: "Delete success" });
  } catch (err) {
    next(err);
  }
};

exports.deleteAllCart = async (req, res, next) => {
  try {
    await Cart.destroy({
      where: {
        userId: req.user.id,
      },
    });
    res.status(200).json({ message: "Delete all product in cart" });
  } catch (err) {
    next(err);
  }
};
