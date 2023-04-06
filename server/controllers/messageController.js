const Message = require("../models/messageModel");

module.exports.addMessageToDb = async (req, res, next) => {
  try {
    const { sender, receiver, message } = req.body;
    const data = await Message.create({
      message: { text: message },
      users: [sender, receiver],
      sender: sender,
    });

    // if message is stored successfully
    if (data) {
      return res.json({ msg: "message stored successfully" });
    } else {
      return res.json({ msg: "failed to store message" });
    }
  } catch (error) {
    next(error);
  }
};

module.exports.getMessageFromDb = async (req, res, next) => {
  try {
    // client will send sender and receiver as request
    const { sender, receiver } = req.body;

    // here we will get that data which has both sender and receiver
    const messages = await Message.find({
      users: {
        // this querry will select all messages of sender and receiver
        $all: [sender, receiver],
      },
    }).sort({ updatedAt: 1 });

    // here we will map only messages not other information
    const projectMessages = messages.map((msg) => {
      return {
        // here we will check which message is sender's and which message is receiver's and will use this to differentiate on clients screen
        fromSender: msg.sender.toString() === sender,
        message: msg.message.text,
      };
    });

    res.json(projectMessages);
  } catch (error) {
    next(error);
  }
};
