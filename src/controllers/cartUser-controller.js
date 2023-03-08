const { Cart, Product, Shop, ProductImage } = require("../models");

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

    const productId = cart.map((el) => el.productId);

    const images = await ProductImage.findAll({
      where: { productId: productId, isMain: true },
      attributes: ["image", "productId"],
    });

    const newCart = [];
    for (const item of cart) {
      const image = images.find((el) => el.productId === item.productId);
      item.dataValues.image = image;
      newCart.push(item);
    }

    res.status(200).json({ newCart });
  } catch (err) {
    next(err);
  }
};

exports.addToCart = async (req, res, next) => {
  try {
    await Cart.create({
      quantity: req.body.quantity,
      productId: req.body.productId,
      userId: req.user.id,
      shopId: req.body.shopId,
    });

    res.status(200).json({ message: "Add success" });
  } catch (err) {
    next(err);
  }
};

exports.updateCart = async (req, res, next) => {
  try {
    await Cart.destroy({
      where: {
        userId: req.user.id,
      },
    });
    await Cart.bulkCreate(req.body);
    res.status(200).json({ message: "Update success" });
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
