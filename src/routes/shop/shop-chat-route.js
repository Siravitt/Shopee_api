const express = require("express");
const router = express.Router();

const upload = require("../../middlewares/upload");
const shopChatController = require("../../controllers/shop/shop-chat-controller");

router.get("/all-chat", shopChatController.getAllChat);
router.get("/:userId", shopChatController.getChatByUser);
router.post(
  "/:userId",
  upload.single("messageImage"),
  shopChatController.createChat
);

module.exports = router;
