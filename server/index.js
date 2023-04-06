const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const userRoutes = require("./routes/userRoutes");
const messageRoutes = require("./routes/messageRoutes");
const bodyParser = require("body-parser");
const socket = require("socket.io");
require("dotenv").config();

const app = express();

// we have to pass the body parser otherwise our backend will not be able to read objects that our client has sent to backend server
app.use(bodyParser.json()); // parse JSON-encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // parse URL-encoded bodies

app.use(cors());

// login and registration routes
app.use("/api/auth", userRoutes);

// routes to send and get message
app.use("/api/message", messageRoutes);

const PORT = process.env.PORT || 5000;
const MONGO_URL = process.env.MONGO_URL;

mongoose
  .connect(MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("database connected successfully");
  })
  .catch((err) => {
    console.log(err.message);
  });

const server = app.listen(PORT, () => {
  console.log(`server is started successfully on port ${PORT}`);
});

// websocket integration

// this will create socket connection with the backend server as we have passed it as first parameter and we have passed second parameter as cors where origin specifies from where connections will be allowed, credentials will be used for authentication

// io is going to be our socket server

// basically this function will create new socket.io server instance which will handle real time communication between client and server
const io = socket(server, {
  cors: {
    origin: "http://localhost:3000",
    Credentials: true,
  },
});

// this will create global object variable and we are going to store messages here
global.onlineUsers = new Map();

// When a new client connects to the server, a socket object is created to manage the communication between the client and server. The io.on("connection") function registers a callback function that will be executed whenever a new connection is established.
io.on("connection", (socket) => {
  // Inside the callback function, we first store the socket object in a global variable, which allows it to be accessed from other parts of the application if needed.
  global.chatSocket = socket;

  // We then register two event listeners on the socket object. The first listens for an "add-user" event, which is triggered when a client wants to add a new user to the list of online users. When this event is triggered, we add a new entry to an onlineUsers Map object, mapping the userId to the current socket object's unique socket.id.
  socket.on("add-user", (userId) => {
    onlineUsers.set(userId, socket.id);
  });

  // The second event listener listens for a "send-msg" event, which is triggered when a client wants to send a message to another user. When this event is triggered, we first look up the socket.id of the recipient user using their userId stored in the onlineUsers Map. If a socket.id is found for the recipient, we use the socket.to() function to specify the socket.id of the recipient and the emit() function to send the actual message payload with the "msg-receive" event name. This emits the "msg-receive" event to the recipient's socket object, allowing them to receive and handle the message as needed.
  socket.on("send-msg", (data) => {
    const sendUserSocket = onlineUsers.get(data.receiver);
    if (sendUserSocket) {
      socket.to(sendUserSocket).emit("msg-receive", data.message);
    }
  });
});
