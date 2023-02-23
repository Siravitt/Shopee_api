const fs = require("fs");

const { validateChat } = require("../../validators/chat-validate");
const cloudinary = require("../../utils/cloudinary");
const { Chat } = require("../../models");

exports.getAllChat = async (req, res, next) => {
  try {
    const chats = await Chat.findAll({
      where: { userId: req.user.id },
    });

    res.status(200).json({ chats });
  } catch (err) {
    next(err);
  }
};

exports.getChatByShop = async (req, res, next) => {
  try {
    const { shopId } = req.params;

    const chat = await Chat.findAll({
      where: {
        userId: req.user.id,
        shopId: shopId,
      },
    });

    res.status(200).json({ chat });
  } catch (err) {
    next(err);
  }
};

exports.createChat = async (req, res, next) => {
  try {
    const { shopId } = req.params;

    const value = validateChat({
      message: req.body.message,
      messageImage: req.file?.path,
    });

    value.userId = req.user.id;
    value.shopId = shopId;
    value.sender = "user";
    if (req.file?.path) {
      value.message = null;
      value.messageImage = await cloudinary.upload(value.messageImage);
      await Chat.create(value);
    } else if (req.body.message) {
      value.messageImage = null;
      await Chat.create(value);
    }

    res.status(200).json({ message: "send message success" });
  } catch (err) {
    next(err);
  } finally {
    if (req.file) {
      fs.unlinkSync(req.file.path);
    }
  }
};
