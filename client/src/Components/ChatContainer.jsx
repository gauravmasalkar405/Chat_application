import React, { useState, useEffect } from "react";
import ChatHeader from "./ChatHeader";
import ChatInput from "./ChatInput";
import Messages from "./Messages";
import axios from "axios";
import { getAllMessageroute, sendMessageRoute } from "../ApiRoutes/ApiRoutes";
import styled from "styled-components";

const ChatContainer = ({
  currentChat,
  currentUser,
  socket,
  getClickedChat,
}) => {
  const [messages, setMessages] = useState([]);
  const [arrivalMessage, setArrivalMessage] = useState(null);
  let [newMessageSent, setNewMessageSent] = useState(1);

  // run this useeffect when user sends new message and user selects new contact
  useEffect(() => {
    const fetchAllMessages = async () => {
      try {
        // sender and receiver will be sent to api
        if (currentChat) {
          const response = await axios.post(getAllMessageroute, {
            sender: currentUser.userId,
            receiver: currentChat._id,
          });

          //messages
          setMessages(response.data);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchAllMessages();
  }, [newMessageSent, currentChat, currentUser]);

  const handleMessage = async (msg) => {
    try {
      // to store all messages to database
      const { data } = await axios.post(sendMessageRoute, {
        sender: currentUser.userId,
        receiver: currentChat._id,
        message: msg,
      });

      // -------1
      socket.current.emit("send-msg", {
        sender: currentUser.userId,
        receiver: currentChat._id,
        message: msg,
      });

      //---------2
      const msgs = [...messages];
      msgs.push({ fromSender: true, message: msg });
      setMessages(msgs);

      console.log(data.msg);

      //newMessageSent is used to run useEffect when we send new message
      setNewMessageSent(++newMessageSent);
    } catch (error) {
      console.log(error);
    }
  };

  //------------>3
  useEffect(() => {
    if (socket.current) {
      socket.current.on("msg-receive", (msg) => {
        setArrivalMessage({ fromSender: false, message: msg });
      });
    }
  }, [socket, newMessageSent]);

  //------------>4
  useEffect(() => {
    arrivalMessage && setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage, socket]);

  return (
    <ChatContainer_>
      <ChatHeader currentChat={currentChat} getClickedChat={getClickedChat} />
      {/* messages will be passed to component as prop */}
      <Messages messages={messages} />
      <ChatInput handleMessage={handleMessage} />
    </ChatContainer_>
  );
};

const ChatContainer_ = styled("div")``;

export default ChatContainer;
