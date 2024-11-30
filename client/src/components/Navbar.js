import React, { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import Button from "./Button";
import { useLocation } from "react-router-dom";

function Navbar({ isLoggedIn, logout }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [burger, setBurger] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
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

  let toggleBurger = () => {
    burger ? setBurger(false) : setBurger(true);
  };

  let ProfileHeader = () => {
    if (
      location.pathname.startsWith("/profile") ||
      location.pathname.startsWith("/users")
    ) {
      return true;
    }
  };

  return (
    <header className={ProfileHeader() || isScrolled ? "scrolled" : ""}>
      <div className="container">
        <nav className={burger ? "navigation active" : "navigation"}>
          <div className="logo">
            <NavLink to={"/"}>
              <h1>BookLove</h1>
            </NavLink>
          </div>
          <div onClick={toggleBurger} className={"navbar"}>
            <NavLink to={"/"}>Книги</NavLink>
            <NavLink to={"/about"}>О нас</NavLink>
            <NavLink to={"/contacts"}>Контакты</NavLink>
            {!isLoggedIn && (
              <Link to={"/login"}>
                <Button reversed={true} content={"Войти"} />
              </Link>
            )}
            {!isLoggedIn && (
              <Link to={"/registration"}>
                <Button reversed={true} content={"Регистация"} />
              </Link>
            )}
            {isLoggedIn && (
              <Link to={`/profile`}>
                <Button reversed={true} content={"Профиль"} />
              </Link>
            )}
            {isLoggedIn && (
              <Link onClick={logout} to={"/login"}>
                <Button reversed={true} content={"Выйти"} />
              </Link>
            )}
          </div>
          <div onClick={toggleBurger} className={"burger"}>
            {
              <span className="material-symbols-outlined">
                {burger ? "close" : "menu"}
              </span>
            }
          </div>
        </nav>
      </div>
    </header>
  );
}

export default Navbar;
