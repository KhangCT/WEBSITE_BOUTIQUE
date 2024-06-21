const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const roomSchema = new Schema({
  userId: {
    type: String,
  },
  chat: [
    {
      text: {
        type: String,
        required: true,
      },
      role: {
        type: String,
        required: true,
      },
      author: { type: String },
    },
  ],
});

module.exports = mongoose.model("RoomChat", roomSchema);
