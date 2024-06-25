import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Registration from "./pages/Registration.js";
import Navbar from "./components/Navbar.js";
import { URL } from "./config";
import * as jose from "jose";
import "./App.css";
import Footer from "./components/Footer.js";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(null);
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
  const [token, setToken] = useState(JSON.parse(localStorage.getItem("token")));

  useEffect(() => {
    const verify_token = async () => {
      debugger
      try {
        if (!token) {
          setIsLoggedIn(false);
        } else {
          axios.defaults.headers.common["Authorization"] = token;
          const response = await axios.post(`${URL}/users/verify_token`);
          return response.data.ok ? login(token) : logout();
        }
      } catch (error) {
        console.log(error);
      }
    };
    verify_token();
  }, [token]);

  const login = (token) => {
   debugger
    let decodedToken = jose.decodeJwt(token);
    // composing a user object based on what data we included in our token (login controller - jwt.sign() first argument)
    let user = {
      username: decodedToken.userName,
    };
    localStorage.setItem("token", JSON.stringify(token));
    localStorage.setItem("user", JSON.stringify(user));
    setIsLoggedIn(true);
  };
  
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setIsLoggedIn(false);
  };


  return (
    <Router>
      <Navbar isLoggedIn={isLoggedIn} />
      <Routes>
      <Route path="/registration" element={<Registration/>} />

      </Routes>
      <Footer/>
    </Router>
  );
}

export default App;
