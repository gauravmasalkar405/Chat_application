import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { allUsersRoute, host } from "../ApiRoutes/ApiRoutes";
import { io } from "socket.io-client";
import styled from "styled-components";
import Contacts from "../Components/Contacts";
import ChatContainer from "../Components/ChatContainer";
import Welcome from "../Components/Welcome";

const Chat = () => {
  const socket = useRef();

  const [contacts, setContacts] = useState();
  const [isFetched, setIsFetched] = useState(false);
  const [currentUser, setCurrentUser] = useState();
  const [currentChat, setCurrentChat] = useState(undefined);
  const [clicked, setClicked] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        // we will get logged user data from localstorage(we have stored user in localstorage when he logged in succesfully see the login component),we have to use await because it returns promise
        const loggedUserData = await JSON.parse(
          localStorage.getItem("loggedUserData")
        );

        // to get all rest of the users from database we will make following request and pass logged user id and in usercontrollers we have written function which will send all users except logged user
        const users = await axios.get(
          `${allUsersRoute}/${loggedUserData.userId}`
        );

        setContacts(users.data);
        setCurrentUser(loggedUserData);

        // we will remove loggeduser from localstorage at the time of logout chcek chatHeader component

        // set it true when our users data fetched from api
        setIsFetched(true);
      } catch (error) {
        console.log(error);
      }
    };

    fetchUsers();
  }, [isFetched]);

  // ------------>
  useEffect(() => {
    if (currentUser) {
      socket.current = io(host);
      socket.current.emit("add-user", currentUser.userId);
    }
  }, [currentUser]);

  // this function will select current chat and we will pass this function as prop to access in contacts component
  const handleChatChange = (chat) => {
    setCurrentChat(chat);
  };

  // following two functions are used to create responsiveness for mobile and passed as props to childs to get values

  const getClickedUser = (value) => {
    setClicked(value);
  };

  const getClickedChat = (value) => {
    setClicked(value);
  };

  return (
    // we will render component only when loggeduserdata is found in localstorage
    <>
      {JSON.parse(localStorage.getItem("loggedUserData")) ? (
        <MessageContainer>
          <div
            className={
              clicked
                ? "left-column-user-and-contacts"
                : "left-column-user-and-contacts-set-show"
            }
          >
            {
              // after all data fethed from api
              isFetched && (
                <div className="image-container-and-username-container">
                  <div className="image-container">
                    <img
                      src={`data:image/png;base64,${currentUser.profilePic}`}
                      alt="user"
                    ></img>
                  </div>
                  <p className="username">{currentUser.username} </p>
                </div>
              )
            }

            <div className="contact-container">
              {
                // we will pass contacts prop only when isFetched become true if we don't do this then contacts will be undefined bacause its take time to fetch data from api and till that moment our contacts will be undefined and undefined contacts will be passed

                // here we are passing handlechatchange function as prop to contacts component and in contacts component we will pass selected chat as argument to this function and using it we will set that as currentchat
                isFetched && (
                  <Contacts
                    contacts={contacts}
                    changeChat={handleChatChange}
                    getClickedUser={getClickedUser}
                  />
                )
              }
            </div>
          </div>
          <div
            className={
              clicked
                ? "right-column-header-messages-input"
                : "right-column-header-messages-input-set-show"
            }
          >
            {/* if user has not selected any chat then show welocome otherwise show currentChat */}
            {currentChat === undefined ? (
              <Welcome />
            ) : (
              <ChatContainer
                currentChat={currentChat}
                currentUser={currentUser}
                socket={socket}
                getClickedChat={getClickedChat}
              />
            )}
          </div>
        </MessageContainer>
      ) : (
        <LogoutMessage className="logout-message">
          <p>Oops... you are logged out. </p>
        </LogoutMessage>
      )}
    </>
  );
};

const LogoutMessage = styled("div")`
  background-color: #e9e9e9;
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const MessageContainer = styled("div")`
  height: 100vh;
  display: flex;
  background-position: center;
  background-size: cover;

  .left-column-user-and-contacts {
    border-right: 1px solid #e7e7e7;
    height: 100%;
    width: 30%;
    display: flex;
    flex-direction: column;

    .image-container-and-username-container {
      display: flex;
      height: 3.5rem;
      justify-content: space-between;
      align-items: center;
      padding: 0 1rem;
      background-color: rgb(240, 242, 245);
      box-shadow: 0px 5px 5px -5px rgb(104, 104, 104);
      z-index: 1;

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

      .username {
        font-size: 1rem;
        width: 6rem;
      }
    }

    .contact-container {
      height: 100%;
      background-color: white;
    }
  }
  .left-column-user-and-contacts-set-show {
    border-right: 1px solid #e7e7e7;
    height: 100%;
    width: 30%;
    display: flex;
    flex-direction: column;

    .image-container-and-username-container {
      display: flex;
      height: 3.5rem;
      justify-content: space-between;
      align-items: center;
      padding: 0 1rem;
      background-color: rgb(240, 242, 245);
      box-shadow: 0px 5px 5px -5px rgb(104, 104, 104);
      z-index: 1;

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

      .username {
        font-size: 1rem;
        width: 6rem;
      }
    }

    .contact-container {
      height: 100%;
      background-color: white;
    }
  }

  .right-column-header-messages-input {
    width: 70%;
  }
  .right-column-header-messages-input-set-show {
    width: 70%;
  }

  @media only screen and (max-width: 576px) {
    .left-column-user-and-contacts {
      /* width: 100%; */
    }

    .right-column-header-messages-input {
      /* display: none; */
      width: 100%;
      position: absolute;
    }

    .left-column-user-and-contacts-set-show {
      width: 100%;
    }
    .right-column-header-messages-input-set-show {
      display: none;
      width: 100%;
      position: absolute;
    }
  }
`;

export default Chat;
