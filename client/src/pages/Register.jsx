import React, { useState } from "react";
import styled from "styled-components";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";
import { registerRoute } from "../ApiRoutes/ApiRoutes";
import axios from "axios";
import image from "../assets/loginpage.jpg";
import { BiShow } from "react-icons/bi";
import { BiHide } from "react-icons/bi";

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);

  // when account is created successfully we will make this true and will use to show popup
  const [navigateToLoginPage, setNavigateToLoginpage] = useState(false);

  const handleShowPass = (e) => {
    setShowPassword(!showPassword);
  };

  const [values, setValues] = useState({
    username: "",
    email: "",
    password: "",
    confirmpassword: "",
  });

  //   toast css
  const toastOptions = {
    position: "top-left",
    autoClose: 4000,
    pauseOnHover: true,
    draggable: true,
    className: "toastmessage",
  };

  const handleChange = (e) => {
    // { ...values, [e.target.name]: e.target.value } if we use code like this here spread operator destructures values object and upadates those peoperties with new values example if we do like this -----> {username : "gaurav", username : "gary"} ------> output: { username: 'gary' }
    setValues({ ...values, [e.target.name]: e.target.value });
    // it does like this {username: "gaurav", [username]:e.target.value} ------------> output: values[username] = e.target.value.
  };

  const handleValidation = () => {
    const { password, confirmpassword, username, email } = values;
    if (password !== confirmpassword) {
      toast.error("Passwords does not match.", toastOptions);
      return false;
    } else if (username.length < 3) {
      toast.error("Invalid username.", toastOptions);
      return false;
    } else if (password.length < 8) {
      toast.error("Invalid password.", toastOptions);
      return false;
    } else if (email === "") {
      toast.error("Email is required.", toastOptions);
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // if client side validation is successfull then send user data to api
    if (handleValidation()) {
      const { username, email, password } = values;
      const { data } = await axios.post(registerRoute, {
        username,
        email,
        password,
      });
      if (!data.status) {
        toast.error(data.msg, toastOptions);
      } else {
        // when res wll be true that means account is created successfully
        localStorage.setItem("newUser", JSON.stringify(data));
        setNavigateToLoginpage(true);
      }
    }
  };

  return (
    <RegisterContainer>
      <div className="register-container">
        <div className="title">Create an account</div>
        <form onSubmit={handleSubmit}>
          <input
            id="username"
            type="text"
            name="username"
            placeholder="User name"
            onChange={handleChange}
          />
          <input
            id="email"
            type="email"
            name="email"
            placeholder="Email"
            onChange={handleChange}
          />
          <div>
            <input
              className="password"
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              onChange={handleChange}
            />
            <button
              className="showPass-btn"
              type="button"
              onClick={handleShowPass}
            >
              {showPassword ? <BiShow /> : <BiHide />}
            </button>
          </div>
          <div>
            <input
              className="password"
              type={showPassword ? "text" : "password"}
              name="confirmpassword"
              placeholder="Confirm password"
              onChange={handleChange}
            />
            <button
              className="showPass-btn"
              type="button"
              onClick={handleShowPass}
            >
              {showPassword ? <BiShow /> : <BiHide />}
            </button>
          </div>
          <button id="register-btn" type="submit">
            Sign up
          </button>
          <span>
            {navigateToLoginPage ? (
              <p>
                Account created successfully plz set your profile picture
                <Link to="/profile"> here.</Link>
              </p>
            ) : (
              ""
            )}
          </span>
        </form>
      </div>

      <ToastContainer />
    </RegisterContainer>
  );
};

const RegisterContainer = styled("div")`
  height: 100vh;
  width: auto;
  display: flex;
  align-items: center;
  background: url(${image});
  background-size: cover;
  background-position: center;

  .register-container {
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
      font-size: 1.5rem;
      color: #193300;
      font-weight: 500;
    }

    form {
      width: 100%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      gap: 1rem;

      #username,
      #email {
        width: 80%;
        height: 1.6rem;
        border-radius: 2px;
        outline: none;
        border: none;
        padding: 0.45rem;
        font-size: 0.65rem;
      }

      div {
        background-color: white;
        width: 80%;
        height: 1.6rem;
        border-radius: 2px;

        .password {
          width: 90%;
          height: 100%;
          outline: none;
          border: none;
          padding: 0.45rem;
          font-size: 0.65rem;
        }

        .showPass-btn {
          width: 10%;
          border: none;
          outline: none;
          background-color: white;
          color: #193300;
          font-size: 0.8rem;
        }
      }

      #register-btn {
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

      #register-btn:hover {
        background-color: rgba(61, 88, 33, 0.85);
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
    .register-container {
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
export default Register;
