const RoomChat = require("../models/roomchat");
const User = require("../models/user");
const io = require("../socket");
exports.getCreateChatRoom = (req, res, next) => {
  const newChat = new RoomChat({
    chat: [{ text: "Can I help you ?", role: "tele" }],
  });

  newChat
    .save()
    .then(() => {
      return res.json({ chatId: newChat._id });
    })
    .catch((err) => {
      console.log(err);
    });
};
exports.getChatById = (req, res, next) => {
  const chatId = req.params.chatId;

  RoomChat.findById(chatId)
    .then((chatRoom) => {
      return res.json(chatRoom);
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.getAllChat = (req, res, next) => {
  RoomChat.find()
    .then((chatRoom) => {
      console.log(chatRoom);
      return res.json(chatRoom);
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.postChatById = (req, res, next) => {
  const chatId = req.params.chatId;
  const userChat = req.body.userChat;
  const role = req.body.role;
  RoomChat.findById(chatId)
    .then((chatRoom) => {
      chatRoom.chat.push({
        $each: [
          {
            text: userChat,
            role: role,
          },
        ],
      });
      io.getIO().emit("chat", {
        action: "create",
        chatRoom: chatRoom,
      });
      return chatRoom.save();
    })
    .catch((err) => {
      console.log(err);
    });
};
