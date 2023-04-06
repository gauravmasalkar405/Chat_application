import React, { useState } from "react";
import styled from "styled-components";

const Contacts = ({ contacts, changeChat, getClickedUser }) => {
  const [currentSelected, setCurrentSelected] = useState(undefined);

  // using this we will get selected contact and we will pass it to changechat so we can access it in chat component
  const changeCurrentChat = (index, contact) => {
    setCurrentSelected(index);
    changeChat(contact);
    getClickedUser(true);
  };

  return (
    <ContactContainer>
      {contacts.length > 0 &&
        contacts.map((contact, index) => (
          <div key={index} className="container">
            <div
              className={`contact ${
                currentSelected === index ? "selected" : ""
              }`}
              onClick={() => {
                // we will pass selected contact and its index to this function
                changeCurrentChat(index, contact);
              }}
            >
              <div className="image-container">
                <img
                  src={`data:image/png;base64,${contact.profilePic}`}
                  alt="contact"
                />
              </div>
              <p className="contacts-username">{contact.username}</p>
            </div>
          </div>
        ))}
    </ContactContainer>
  );
};

const ContactContainer = styled("div")`
  width: 100%;

  .container {
    .contact {
      height: 3.5rem;
      width: 100%;
      padding: 0 1rem;
      border-bottom: 1px solid #e7e7e7;
      display: flex;
      justify-content: space-between;
      align-items: center;

      .contacts-username {
        width: 6rem;
      }
    }

    .selected {
      background-color: rgb(240, 242, 245);
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
`;

export default Contacts;
