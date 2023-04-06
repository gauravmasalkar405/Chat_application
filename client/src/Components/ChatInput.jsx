import React, { useState } from "react";
import styled from "styled-components";
import { RiSendPlane2Fill } from "react-icons/ri";

const ChatInput = ({ handleMessage }) => {
  const [msg, setMsg] = useState("");

  const handleChange = (e) => {
    setMsg(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (msg.length > 0) {
      // here we will send message and once msg is sent msg will be empty
      handleMessage(msg);
      setMsg("");
    }
  };

  return (
    <InputContainer>
      <form onSubmit={handleSubmit} className="input-form">
        <input
          className="msg-input"
          type="text"
          onChange={handleChange}
          value={msg}
          placeholder="Type a message"
        />
        <div className="msg-send-btn-container">
          <button className="msg-send-btn" type="submit">
            <RiSendPlane2Fill />
          </button>
        </div>
      </form>
    </InputContainer>
  );
};

const InputContainer = styled("div")`
  position: relative;
  display: flex;
  height: 3.2rem;
  justify-content: space-between;
  align-items: center;
  padding: 0 1rem;
  background-color: rgb(240, 242, 245);
  box-shadow: 0px -5px 4px -5px rgb(104, 104, 104);

  .input-form {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .msg-input {
      width: calc(100% - 2rem - 1rem);
      height: 1.8rem;
      padding-left: 10px;
      font-size: 0.8rem;
      outline: none;
      border-radius: 20px;
      border: 1px solid #cccccc;
    }

    .msg-send-btn-container {
      height: 1.8rem;
      width: auto;

      .msg-send-btn {
        color: #54656f;
        border: none;
        font-size: 1.8rem;
      }
    }
  }
`;

export default ChatInput;
