const { OrderShop, Order, OrderItem, Product } = require("../models");

exports.getOrder = async (req, res, next) => {
  try {
    const order = await OrderItem.findAll({
      include: [
        {
          model: OrderShop,
          where: {
            shopId: req.shop.id,
          },
        },
        {
            model: Product
        }
      ],
    });
    res.status(200).json({ order });
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
