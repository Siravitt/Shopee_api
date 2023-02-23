const express = require("express");
const router = express.Router();

const upload = require("../../middlewares/upload");
const userChatController = require("../../controllers/user/user-chat-controller");

router.get("/all-chat", userChatController.getAllChat);
router.get("/:shopId", userChatController.getChatByShop);
router.post(
  "/:shopId",
  upload.single("messageImage"),
  userChatController.createChat
);

module.exports = router;
