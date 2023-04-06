import React from "react";
import styled from "styled-components";

const Welcome = () => {
  return (
    <WelcomeContainer>
      <p className="headline">Chatster Web</p>
      <p className="headline-msg">
        Send and recieve messages without keeping your phone online.
      </p>
    </WelcomeContainer>
  );
};

const WelcomeContainer = styled("div")`
  height: 100%;
  background-color: #e9e9e9;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  .headline {
    margin-bottom: 1rem;
    font-size: 2.5rem;
    color: #54656f;
  }

  .headline-msg {
    color: #54656f;
    font-size: 0.85rem;
  }
`;
export default Welcome;
