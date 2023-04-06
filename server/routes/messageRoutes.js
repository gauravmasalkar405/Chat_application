const {
  addMessageToDb,
  getMessageFromDb,
} = require("../controllers/messageController");

const router = require("express").Router();

//using this route we wiil add messages to our database.
router.post("/addMessageToDb", addMessageToDb);

//using this route, sender will be able to get all messages on his screeen from his end and other end also
router.post("/getMessageFromDb", getMessageFromDb);

module.exports = router;
