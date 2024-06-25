import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Registration from "./pages/Registration.js";
import Profile from "./pages/Profile.js";
import Login from "./pages/Login.js";
import Navbar from "./components/Navbar.js";
import { URL } from "./config";
import * as jose from "jose";
import "./App.css";
import Footer from "./components/Footer.js";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(null);
  const [user, setUser] = useState();
  const [token, setToken] = useState();

  useEffect(() => {
    const verify_token = async () => {
      try {
        if (!token) {
          setIsLoggedIn(false);
        } else {
          axios.defaults.headers.common["Authorization"] = token;
          const response = await axios.post(`${URL}/user/verify_token`);
          return response.data.ok ? login(token) : logout();
        }
      } catch (error) {
        console.log(error);
      }
    };
    verify_token();
  }, [token]);

  useEffect(() => {
    // Whenever we are log in or verify the token, set a user and token state
    setUser(JSON.parse(localStorage.getItem("user")));
    setToken(JSON.parse(localStorage.getItem("token")));
  }, [token, isLoggedIn]);

  const login = (token) => {
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
      <Navbar isLoggedIn={isLoggedIn} logout={logout} />
      <Routes>
        <Route path="/registration" element={<Registration />} />
        <Route
          path={"/login"}
          element={
            isLoggedIn ? <Login login={login} /> : <Login login={login} />
          }
        />
        <Route path="/profile" element={<Profile user={user} />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
