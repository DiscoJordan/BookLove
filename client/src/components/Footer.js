import React from "react";
import { Link } from "react-router-dom";
function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__tabs">
          <Link to={"/"}>Книги</Link>
          <Link to={"/about"}>О нас</Link>
          <Link to={"/contacts"}>Контакты</Link>
          <Link to={"/termsAndConditions"}>Правила и Политика</Link>
        </div>
        <div className="footer__email">
          <span className="material-symbols-outlined">mail</span>
          <a href="mailto:barcelove.contact@gmail.com">
            booklove.contact@gmail.com
          </a>
        </div>
     
        <div className="footer__label">
          <p>Сделано с любовью -</p>
         
        </div>
        <div className="footer__rights">
          <p>Copyright © BookLove. All Rights Reserved · 2024</p>
          <div className="footer__backlink">
            
            <p>MADE BY ANE4KA</p>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
