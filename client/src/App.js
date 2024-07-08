import React, { useContext, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Registration from "./pages/Registration.js";
import CurrentPlace from "./pages/CurrentPlace.js";
import Profile from "./pages/Profile.js";
import Login from "./pages/Login.js";
import Navbar from "./components/Navbar.js";
import "./App.css";
import Footer from "./components/Footer.js";
import AddOrEditPlace from "./pages/AddOrEditPlace.js";
import { ContextProvider } from "./context/PlacesContext.js";
import { TagsProvider } from "./context/TagsContext.js";
import Places from "./pages/Places.js";
import { UserContext } from "./context/UserContext.js";
import ScrollToTop from "./components/ScrollToTop.js";
import Users from "./pages/Users.js";
import About from "./pages/About.js";
import Contacts from "./pages/Contacts.js";
import Terms from "./pages/Terms.js";
import NotFound from "./pages/NotFound.js";

function App() {
  const { isLoggedIn, logout, user, login, getUserData, verify_token } =
    useContext(UserContext);

  useEffect(() => {
    if (user) {
      getUserData();
    }
    verify_token();
  }, []);

  return (
    <TagsProvider>
      <ContextProvider>
        <Router>
        <ScrollToTop/>
          <Navbar isLoggedIn={isLoggedIn} logout={logout} user={user} />
          <Routes>
            <Route
              path="/registration"
              element={
                !isLoggedIn ? <Registration login={login} /> : <Navigate to={`/profile`} />
              }
            />
            <Route
              path={"/login"}
              element={
                !isLoggedIn ? (
                  <Login login={login} user={user} />
                ) : (
                  <Navigate to={`/profile`} />
                )
              }
            />
            <Route
              path={`/profile`}
              element={
                isLoggedIn ? (
                  <Profile user={user} />
                ) : (
                  <Navigate to={`/login`} />
                )
              }
            />
            <Route
              path={`/addnewplace`}
              element={
                user?.isAdmin ? <AddOrEditPlace /> : <Navigate to={`/`} />
              }
            />
            <Route
              path={`/:oldtitle/addnewplace`}
              element={
                user?.isAdmin ? <AddOrEditPlace /> : <Navigate to={`/`} />
              }
            />
            <Route path={`/`} element={<Places user={user} />} />
            <Route path={`/about`} element={<About />} />
            <Route path={`/contacts`} element={<Contacts />} />
            <Route path={`/termsAndConditions`} element={<Terms />} />
      
            <Route path={`/place/:title/`} element={<CurrentPlace />} />
            <Route
              path={`/users`}
              element={
                user?.isAdmin ? <Users /> : <Navigate to={`/`} />
              }
            />
            <Route path={`/*`} element={<NotFound />} />
          </Routes>
          <Footer />
        </Router>
      </ContextProvider>
    </TagsProvider>
  );
}

export default App;
