const { Chat, sequelize, Shop, User } = require("../models");

exports.getAllChat = async (req, res, next) => {
  try {
    const chats = await Chat.findAll({
      where: {
        shopId: req.user.id,
      },
      attributes: [[sequelize.literal(`DISTINCT user_id`), "userId"]],
    });

    const userId = chats.map((el) => el.dataValues.userId);
    console.log("AAAA",chats, req.user.id);
    const allChatUser = await User.findAll({
      where: {
        id: userId,
      },
    });
    // const chats = await sequelize.query("SELECT DISTINCT `shop_id` FROM `chats`")

    res.status(200).json({ allChatUser });
  } catch (err) {
    next();
  }
};

exports.getChatMessage = async (req, res, next) => {
    try {
      const chats = await Chat.findAll({
        where: {
          userId: req.params.userId,
          shopId: req.user.id,
        },
        order: [["createdAt", "ASC"]],
      });
      res.status(200).json({ chats });
    } catch (err) {
      next(err);
    }
  };
