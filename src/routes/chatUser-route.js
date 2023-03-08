const express = require("express");
const router = express.Router();

const userChatController = require("../controllers/chatUser-controller")

router.get("/get-all-chat", userChatController.getAllChat)
router.get("/get-message/:shopId", userChatController.getChatMessage)

module.exports = router