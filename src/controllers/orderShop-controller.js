const { OrderShop, Order, OrderItem, Product, Shop } = require("../models");

exports.getOrder = async (req, res, next) => {
  try {
    const order = await OrderItem.findAll({
      include: [
        {
          model: Order,
          where: {
            userId: req.user.id,
          },
        },
        {
          model: OrderShop,
          where: {
            shopId: req.shop.id,
            status: req.query.status,
          },
        },
        {
          model: Product,
        },
      ],
    });
    res.status(200).json({ order });
  } catch (err) {
    next(err);
  }
};
exports.getOrderForshop = async (req, res, next) => {
  try {
    const orderShop = await OrderShop.findAll({
      include: { model: Shop },
      where: {
        shopId: req.shop.id,
        status: req.query.status,
      },
    });
    res.status(200).json({ orderShop });
  } catch (err) {
    next(err);
  }
};

exports.updateOrder = async (req, res, next) => {
  try {
    await OrderShop.update(
      {
        status: req.body.status,
      },
      {
        where: {
          id: req.body.orderShopId,
        },
      }
    );
    res.status(200).json({ message: "update success" });
  } catch (err) {
    next(err);
  }
};
