import React, { useState } from "react";
import styled from "styled-components";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link, useNavigate } from "react-router-dom";
import { loginRoute } from "../ApiRoutes/ApiRoutes";
import axios from "axios";
import image from "../assets/loginpage.jpg";
import { BiShow } from "react-icons/bi";
import { BiHide } from "react-icons/bi";

const Login = () => {
  const navigate = useNavigate();

  const [values, setValues] = useState({
    username: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleShowPass = (e) => {
    setShowPassword(!showPassword);
  };

  // toast css
  const toastOptions = {
    position: "top-left",
    autoClose: 4000,
    pauseOnHover: true,
    draggable: true,
    className: "toastmessage",
  };

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const validation = () => {
    const { password, username } = values;

    if (username.length < 3) {
      toast.error("Invalid username.", toastOptions);
      return false;
    } else if (password.length < 8) {
      toast.error("Invalid password.", toastOptions);
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validation()) {
      const { username, password } = values;

      //response will be stored in data
      const { data } = await axios.post(loginRoute, {
        username,
        password,
      });

      // if validation fails give error
      if (!data.status) {
        toast.error(data.msg, toastOptions);
      }

      // if validation successfull navigate to chat page and store data of logged user in loacl storage
      if (data.status) {
        //JSON.stringify method coverts data types to json strings and reason to do that is localstorage can only store strings so before storing we have to convert it to string while restrieving data from localstorage we have to use json parse method so data is coverted to original data type
        localStorage.setItem("loggedUserData", JSON.stringify(data));
        navigate("/chat");
      }
    }
  };

  return (
    <LoginContainer>
      <div className="login-container">
        <div className="title">Chatster</div>
        <form onSubmit={handleSubmit}>
          <input
            id="username"
            type="text"
            placeholder="Username"
            name="username"
            onChange={handleChange}
          />
          <div>
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="password"
              name="password"
              onChange={handleChange}
            />
            <button id="showPass-btn" type="button" onClick={handleShowPass}>
              {showPassword ? <BiHide /> : <BiShow />}
            </button>
          </div>
          <button id="login-btn" type="submit">
            Login
          </button>
          <span>
            Don't have an account? <Link to="/register">Sign up</Link>
          </span>
        </form>
      </div>
      <ToastContainer />
    </LoginContainer>
  );
};

const LoginContainer = styled("div")`
  height: 100vh;
  width: auto;
  display: flex;
  align-items: center;
  background: url(${image});
  background-size: cover;
  background-position: center;

  .login-container {
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
      font-size: 2.5rem;
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

      #username {
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

        #password {
          width: 90%;
          height: 100%;
          outline: none;
          border: none;
          padding: 0.45rem;
          font-size: 0.65rem;
        }

        #showPass-btn {
          width: 10%;
          border: none;
          outline: none;
          background-color: white;
          color: #193300;
          font-size: 0.8rem;
        }
      }

      #login-btn {
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

      #login-btn:hover {
        background-color: rgba(61, 88, 33, 0.85);
      }

      span {
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
    .login-container {
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
export default Login;
