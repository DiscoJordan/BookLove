import React, {useEffect,useState} from "react";
import { Link, NavLink } from "react-router-dom";
import Button from "./Button";
import { useLocation } from 'react-router-dom';
function Navbar({ isLoggedIn, logout }) {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isProfile, setIsProfile] = useState(false);
    const location = useLocation();

   
    useEffect(() => {
     
      const handleScroll = () => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        if (scrollTop > 0 ) {
          setIsScrolled(true);
        } else {
          setIsScrolled(false);
        }
      };
  
      window.addEventListener('scroll', handleScroll);


    

      return () => {
        window.removeEventListener('scroll', handleScroll);
      };
    }, []);

    let ProfileHeader = ()=>{
        if (location.pathname === '/profile') {
            console.log(location.pathname);
            return true;
        }
    }
  
  return (
    <header  className={(ProfileHeader()||isScrolled)?  "scrolled" : '' }>
      <div className="container">
        <nav className="navigation">
          <div className="logo">
            <img src="/images/Logo.png" alt="logo" />
          </div>
          <div className="navbar">
            <NavLink to={"/"}>Places</NavLink>
            <NavLink to={"/about"}>About Us</NavLink>
            <NavLink to={"/contacts"}>Contacts</NavLink>
            {!isLoggedIn && (
              <Link to={"/login"}>
                <Button content={"Log In"} />
              </Link>
            )}
            {!isLoggedIn && (
              <Link to={"/registration"}>
                <Button content={"Sign In"} />
              </Link>
            )}
            {isLoggedIn && (
              <Link to={"/profile"}>
                <Button content={"Profile"} />
              </Link>
            )}
            {isLoggedIn && (
              <Link onClick={logout} to={"/login"}>
                <Button content={"Log Out"} />
              </Link>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
}

export default Navbar;
