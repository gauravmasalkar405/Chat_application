import React from "react";
import { CiLogout } from "react-icons/ci";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { AiOutlineArrowLeft } from "react-icons/ai";

const ChatHeader = ({ currentChat, getClickedChat }) => {
  const navigate = useNavigate();

  // on click we will remove loggeduser from localstorage and we will directed to login page
  const handleLogoutButtonClick = (e) => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <ChatHeaderContainer>
      <div className="header">
        <button
          className="go-to-back-button"
          onClick={() => {
            getClickedChat(false);
          }}
        >
          <AiOutlineArrowLeft />
        </button>
        <div className="image-container">
          <img src={`data:image/png;base64,${currentChat.profilePic}`} alt="" />
        </div>
        <div>{currentChat.username} </div>
      </div>
      <button className="logout-button" onClick={handleLogoutButtonClick}>
        <CiLogout />
      </button>
    </ChatHeaderContainer>
  );
};

const ChatHeaderContainer = styled("div")`
  display: flex;
  height: 3.2rem;
  justify-content: space-between;
  align-items: center;
  padding: 0 1rem;
  background-color: rgb(240, 242, 245);
  box-shadow: 0px 5px 5px -5px rgb(104, 104, 104);
  z-index: 1;
  position: relative;

  .header {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;

    .go-to-back-button {
      display: none;
    }

    .image-container {
      height: 2.6rem;
      width: 2.6rem;
      display: flex;
      justify-content: center;
      border-radius: 50%;
      overflow: hidden;

      img {
        border: none;
      }
    }
  }

  .logout-button {
    font-weight: 600;
    font-size: 1.5rem;
    display: flex;
    justify-content: center;
    align-items: center;
    border: none;
    gap: 0.4rem;
    transition: 0.3s ease-in-out;
    color: #54656f;
  }

  @media only screen and (max-width: 576px) {
    .header {
      .go-to-back-button {
        display: block;
        border: none;
        font-size: 0.8rem;
      }
    }
  }
`;

export default ChatHeader;
