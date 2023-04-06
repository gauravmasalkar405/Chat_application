import React, { useState } from "react";
import axios from "axios";
import { setProfilePicRoute } from "../ApiRoutes/ApiRoutes";
import { Buffer } from "buffer";
import image from "../assets/loginpage.jpg";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import nullProfilePic from "../assets/null.jpg";

const SetProfile = () => {
  const [showProfilePic, setShowProfilePic] = useState(null);
  const [image, setImage] = useState(null);
  const [profilePic, setProfilePic] = useState(false);
  const [isFetched, setIsFethced] = useState(false);

  const handleChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      setShowProfilePic(URL.createObjectURL(file));
      setImage(file);
      setProfilePic(true);
    } else {
      toast.error("please upload a valid image file", toastOptions);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (showProfilePic === null) {
      toast.error("Please upload valid profile picture.", toastOptions);
      return;
    }

    const newUser = await JSON.parse(localStorage.getItem("newUser"));

    // The first line creates a new FileReader object. The readAsArrayBuffer() method of the FileReader object is called with an image parameter, This method reads the contents of the image file as an array buffer.
    const reader = new FileReader();

    // array buffer stores binary data
    reader.readAsArrayBuffer(image);

    //reader.onload is an event handler function that is executed when the load event is fired by the FileReader object.The load event is fired when the readAsArrayBuffer() method has successfully read the contents of the file into memory, and the contents are available in the result property of the FileReader object.
    reader.onload = async () => {
      // It creates a Buffer object using the reader.result, which is the result of reading the image file as an array buffer. The Buffer object is a Node.js built-in object for handling binary data.
      const buffer = new Buffer(reader.result);

      // It converts the Buffer object to a base64-encoded string using the toString() method with the "base64" encoding parameter. This creates a string that represents the contents of the image file in a base64 format.
      const picture = buffer.toString("base64");

      try {
        const response = await axios.post(setProfilePicRoute, {
          userId: newUser.userId,
          profilePic: picture,
        });

        setProfilePic(response.data.pic);

        setIsFethced(true);
        localStorage.removeItem("newUser");
      } catch (error) {
        console.log(error);
      }
    };
  };

  //toast css
  const toastOptions = {
    position: "top-left",
    autoClose: 4000,
    pauseOnHover: true,
    draggable: true,
    className: "toastmessage",
  };

  return (
    <ProfileContainer>
      <div className="profile-container">
        <div className="title">Set up your profile picture</div>
        <div className="image-container">
          {/* if profile picture is not set then show default picture */}
          <img src={profilePic ? showProfilePic : nullProfilePic} alt="" />
        </div>
        <form onSubmit={handleSubmit}>
          <input className="input" type="file" onChange={handleChange} />
          <button type="submit">set profile picture</button>
        </form>
        <span>
          {isFetched && (
            <p>
              Profile picture set successfully. Now you can
              <Link to="/"> login.</Link>
            </p>
          )}
        </span>
      </div>
      <ToastContainer />
    </ProfileContainer>
  );
};

const ProfileContainer = styled("div")`
  height: 100vh;
  width: auto;
  display: flex;
  align-items: center;
  background: url(${image});
  background-size: cover;
  background-position: center;

  .profile-container {
    background-color: rgba(255, 255, 255, 0.5);
    height: 25rem;
    width: 20rem;
    border-radius: 0.2rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 1.5rem;
    align-items: center;
    position: absolute;
    right: 12rem;

    .title {
      font-size: 1.1rem;
      color: #193300;
      font-weight: 500;
    }

    .image-container {
      display: flex;
      justify-content: center;
      height: 8rem;
      width: 8rem;
      box-shadow: 0px 1px 60px 6px white;
      overflow: hidden;
      border-radius: 50%;
      border: 1px solid #e0e0e0;

      img {
        border: none;
      }
    }

    form {
      width: 100%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      gap: 1rem;

      .input {
        width: 80%;
        height: 1.6rem;
      }

      .input::file-selector-button {
        background-color: rgba(255, 255, 255, 0.7);
        border: none;
        height: 100%;
        width: 100%;
        font-size: 0.7rem;
        font-weight: 600;
        color: #193300;
        transition: 0.3s ease-in-out;
        border: 1px solid #e0e0e0;
      }

      input::file-selector-button:hover {
        background-color: rgba(255, 255, 255, 1);
      }

      button {
        font-size: 0.7rem;
        font-weight: 600;
        width: 80%;
        height: 1.6rem;
        border: none;
        border-radius: 2px;
        color: white;
        background-color: rgb(61, 88, 33);
        transition: 0.2s ease-in;
      }
    }
    span {
      text-align: center;
      width: 80%;
      font-size: 0.78rem;

      a {
        font-size: 0.8rem;
      }
    }
  }

  .toastmessage {
    width: 20rem;
    height: auto;
    font-size: 0.75rem;
    font-weight: 500;
    color: #193300;
    background-color: rgba(255, 255, 255, 0.3);
    border-radius: 0.2rem;
  }

  @media only screen and (max-width: 992px) {
    .profile-container {
      right: calc(50% - 10rem);
    }

    .toastmessage {
      width: 15rem;
    }
  }

  @media only screen and (max-width: 576px) {
    .toastmessage {
      width: 10rem;
      margin-top: 1rem;
      margin-left: 1rem;
    }
  }
`;

export default SetProfile;
