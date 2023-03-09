const express = require("express");
const router = express.Router();

const shopChatController = require("../controllers/chatShop-controller");

router.get("/get-all-chat", shopChatController.getAllChat);
router.get("/get-message/:userId", shopChatController.getChatMessage)

module.exports = router;
