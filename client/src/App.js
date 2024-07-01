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

function App() {
  const {isLoggedIn,logout,user,login,getUserData,verify_token  } = useContext(UserContext);

  useEffect(() => {
    getUserData()
    verify_token();
  }, []);

  
  return (
  
    <TagsProvider>
    <ContextProvider>
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
            user?.isAdmin ? <AddOrEditPlace /> : <Navigate to={`/`} />
          }
        />
         <Route
          path={`/:oldtitle/addnewplace`}
          element={
            user?.isAdmin ? <AddOrEditPlace /> : <Navigate to={`/`} />
          }
        />
          <Route
          path={`/`}
          element={
             <Places user={user}/> 
          }
        />
          <Route
          path={`/place/:title/`}
          element={
             <CurrentPlace />
          }
        />

      </Routes>
      <Footer />
    </Router>
    </ContextProvider>
    </TagsProvider>

  );
}

export default App;
