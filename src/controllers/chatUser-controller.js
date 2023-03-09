const { Chat, sequelize, Shop } = require("../models");

exports.getAllChat = async (req, res, next) => {
  try {
    const chats = await Chat.findAll({
      where: {
        userId: req.user.id,
      },
      attributes: [[sequelize.literal(`DISTINCT shop_id`), "shopId"]],
    });

    const shopId = chats.map((el) => el.dataValues.shopId);

    const allChatShop = await Shop.findAll({
      where: {
        id: shopId,
      },
    });
    // const chats = await sequelize.query("SELECT DISTINCT `shop_id` FROM `chats`")

    res.status(200).json({ allChatShop });
  } catch (err) {
    next();
  }
};

exports.getChatMessage = async (req, res, next) => {
  try {
    const chats = await Chat.findAll({
      where: {
        userId: req.user.id,
        shopId: req.params.shopId,
      },
      order: [["createdAt", "ASC"]],
    });
    res.status(200).json({ chats });
  } catch (err) {
    next(err);
  }
};

exports.createChat = async (req, res, next) => {
  try {
    // req.body.sender = "user";
    await Chat.create(req.body);
    res.status(200);
  } catch (err) {
    next(err);
  }
};
