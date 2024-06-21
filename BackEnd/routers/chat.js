const express = require("express");
const router = express.Router();
const chatController = require("../controllers/chat");

router.post("/create", chatController.getCreateChatRoom);
router.get("/:chatId", chatController.getChatById);
router.get("", chatController.getAllChat);
router.put("/:chatId", chatController.postChatById);

module.exports = router;
