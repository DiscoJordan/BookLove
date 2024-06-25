import React from "react";
import Button from "../components/Button";
import { Link } from 'react-router-dom';
function Registration() {
  return (
    <div className="registration__wrapper">
        <div className="container">
          <h1>Get Started</h1>
          <div className="form">
            <form className="form__fields" action="">
                <input className="form__input" placeholder="Nickname*" type="text" />
                <input className="form__input" placeholder="Email*" type="email" />
                <input className="form__input" placeholder="Password*" type="text" />
                <input className="form__input" placeholder="Repeat Password*" type="text" />
                <div className="terms">
                    <input type="checkbox" />
                    <p>By checking the box you agree to our <Link to="/terms">Terms and Conditions</Link></p>
                </div>
                <button><Button  content={"Continue"} /></button>
                <p className="terms" >Already  a member? <Link to="/login"> Log In</Link></p>
            </form>
          </div>
      </div>
    </div>
  );
}

export default Registration;
