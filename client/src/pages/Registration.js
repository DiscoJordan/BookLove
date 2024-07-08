import React, { useState } from "react";
import Button from "../components/Button";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { URL } from "../config";

function Registration({login}) {
  const navigate = useNavigate();
  const [message, setMessage] = useState('');
  const [isChecked, setIsChecked] = useState(false);
  const [userData, setUserData] = useState({
    username: "",
    email: "",
    password: "",
    password2: "",
  });
  let handleChange = (e)=>{
    setUserData({...userData, [e.target.name]:e.target.value})
  }
  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const response = await axios.post(`${URL}/user/reg`, {
            username: userData.username,
            email: userData.email,
            password: userData.password,
            password2: userData.password2
        });
        setMessage(response.data.message);
        setTimeout(() => {
          setMessage("");
        }, 2000);
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
    <div className="registration__wrapper">
      <div className="container">
        <h1 className={message ? 'message' : ''}>{message||'Get Started'}</h1>
        <div className="form">
          <form onSubmit={handleSubmit} onChange={handleChange} className="form__fields" action="">
            <input
              className="form__input"
              placeholder="Username*"
              name="username"
              type="text"
            />
            <input
              className="form__input"
              placeholder="Email*"
              name="email"
              type="email"
            />
            <input
              className="form__input"
              placeholder="Password*"
              name="password"
              type="password"
            />
            <input
              className="form__input"
              placeholder="Repeat Password*"
              name="password2"
              type="password"
            />
            <div onChange={()=>handleCheckboxChange()} className="terms">
              <label >
              <input name="terms"  defaultChecked={isChecked}   type="checkbox" />
              By checking the box you agree to our
              <Link to="/termsAndConditions">Terms and Conditions</Link>
              </label>
            
            </div>
            <button className="longbutton" disabled={!isChecked} >
              <Button reversed={true} content={"Continue"} />
            </button>
            <p className="terms">
              Already a member? <Link to="/login"> Log In</Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Registration;
