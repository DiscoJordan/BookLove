import React, { useState } from "react";
import Button from "../components/Button";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { URL } from "../config";

const Login = ({ login }) => {
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const [userData, setUserData] = useState({
    username: "",
    password: "",
  });
  let handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${URL}/user/login`, {
        username: userData.username,
        password: userData.password,
      });
      setMessage(response.data.message);
      setTimeout(() => {
        setMessage("");
      }, 2000);
      console.log(response);
      if (response.data.ok) {
        setTimeout(() => {
          login(response.data.token);
          navigate(`/profile`);
        }, 2000);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="login__wrapper">
      <div className="container">
        <h1 className={message ? "message" : ""}>
          {message || "Welcome back"}
        </h1>
        <div className="form">
          <form
            onSubmit={handleSubmit}
            onChange={handleChange}
            className="form__fields"
            action=""
          >
            <input
              className="form__input"
              placeholder="Username*"
              name="username"
              type="text"
            />

            <input
              className="form__input"
              placeholder="Password*"
              name="password"
              type="password"
            />

            <button>
              <Button reversed={true} content={"Continue"} />
            </button>
            <p className="terms">
              Dont have an account?{" "}
              <Link to="/registration"> Register now</Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
