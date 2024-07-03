import React, { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import Button from "./Button";
import { useLocation } from "react-router-dom";
function Navbar({ isLoggedIn, logout, user }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isProfile, setIsProfile] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop =
        window.pageYOffset || document.documentElement.scrollTop;
      if (scrollTop > 0) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  let ProfileHeader = () => {
    if (location.pathname.startsWith("/profile")|| location.pathname.startsWith("/users")) {
      return true;
    }
  };

  return (
    <header className={ProfileHeader() || isScrolled ? "scrolled" : ""}>
      <div className="container">
        <nav className="navigation">
          <div className="logo">
          <NavLink to={"/"}><img src="/images/Logo.png" alt="logo" /></NavLink>
            
          </div>
          <div className="navbar">
            <NavLink to={"/"}>Places</NavLink>
            <NavLink to={"/about"}>About Us</NavLink>
            <NavLink to={"/contacts"}>Contacts</NavLink>
            {!isLoggedIn && (
              <Link to={"/login"}>
                <Button reversed={true} content={"Log In"} />
              </Link>
            )}
            {!isLoggedIn && (
              <Link to={"/registration"}>
                <Button reversed={true} content={"Sign In"} />
              </Link>
            )}
            {isLoggedIn && (
              <Link to={`/profile`}>
                <Button reversed={true} content={"Profile"} />
              </Link>
            )}
            {isLoggedIn && (
              <Link onClick={logout} to={"/login"}>
                <Button reversed={true} content={"Log Out"} />
              </Link>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
}

export default Navbar;
