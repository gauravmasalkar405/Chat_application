const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema(
  {
    // message: an object containing a text field, which is a required string.
    message: {
      text: {
        type: String,
        required: true,
      },
    },
    // here we will store reciever and sender
    users: Array,

    // sender: a reference to a "User" model using its ObjectId. This field is required and ensures that only valid user IDs can be used as the sender.
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    // timestamps has two fields, updatedAt and createdAt
    timestamps: true,
  }
);

module.exports = mongoose.model("Messages", messageSchema);
