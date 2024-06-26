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
import AddNewPlace from "./pages/AddNewPlace.js";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(null);
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
  const [isAdmin, setIsAdmin] = useState(JSON.parse(localStorage.getItem("isAdmin")));
  const [token, setToken] = useState(JSON.parse(localStorage.getItem("token")));


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

  const login = (token) => {
    let decodedToken = jose.decodeJwt(token);
    // composing a user object based on what data we included in our token (login controller - jwt.sign() first argument)
    let user = {
      username: decodedToken.userName, isAdmin:decodedToken.isAdmin 
    };
    localStorage.setItem("token", JSON.stringify(token));
    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("isAdmin", JSON.stringify(isAdmin));
    setIsLoggedIn(true);
    setUser(user);
    setIsAdmin(user.isAdmin);
  
    };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setIsLoggedIn(false);
  };
  
  return (
    <Router>
      <Navbar isLoggedIn={isLoggedIn} logout={logout} user={user} />
      <Routes>
        <Route
          path="/registration"
          element={
            !isLoggedIn ? (
              <Registration />
            ) : (
              <Navigate to={`/profile/${user.username}`} />
            )
          }
        />
        <Route
          path={"/login"}
          element={
            !isLoggedIn ? (
              <Login login={login} user={user} />
            ) : (
              <Navigate to={`/profile/${user.username}`} />
            )
          }
        />
        <Route
          path={`/profile/:username`}
          element={
            isLoggedIn ? <Profile user={user} /> : <Navigate to={`/login`} />
          }
        />
        <Route
          path={`/addnewplace`}
          element={
            isAdmin ? <AddNewPlace /> : <Navigate to={`/`} />
          }
        />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
