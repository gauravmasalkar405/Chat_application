import React, { useEffect, useRef } from "react";
import styled from "styled-components";

const Messages = ({ messages }) => {
  const containerRef = useRef(null);

  //to scroll upward automatically when new message comes
  useEffect(() => {
    containerRef.current.scrollTop = containerRef.current.scrollHeight;
  }, [messages]);

  return (
    <MessagesContainer>
      <div className="message-container" ref={containerRef}>
        {messages.map((msg, index) => {
          return (
            <div key={index}>
              <div
                // we will use this to differentiate messages whether it is sender or receiver
                className={`message ${msg.fromSender ? "sended" : "recieved"}`}
              >
                <div className="content">
                  <p className="msg-content">{msg.message}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </MessagesContainer>
  );
};

const MessagesContainer = styled("div")`
  .message-container {
    height: calc(100vh - 6.4rem);
    padding: 0 1rem 1rem 1rem;
    display: flex;
    flex-direction: column;
    overflow: scroll;
    background-color: #e9e9e9;
  }

  .message-container::-webkit-scrollbar {
    display: none;
  }

  .message {
    display: flex;
    align-items: center;
    .content {
      display: flex;
      max-width: 65%;
      overflow-wrap: break-word;
      font-size: 0.8rem;
      padding: 0.3rem 0.3rem;
      height: auto;
      margin: 0.1rem 0rem;
      line-height: 1.1rem;
      text-align: justify;

      .msg-content {
        margin: auto 0px;
      }
    }
  }
  .sended {
    justify-content: flex-end;
    .content {
      background-color: rgb(195, 243, 187);
      border-radius: 5px 0px 5px 5px;
    }
  }
  .recieved {
    justify-content: flex-start;
    .content {
      background-color: rgb(255, 255, 255);
      border-radius: 0px 5px 5px 5px;
    }
  }

  @media only screen and (max-width: 576px) {
  }
`;
export default Messages;
