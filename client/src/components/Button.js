import React from "react";

const Button = ({ content, onClick }) => {
    const iconMap = {
      "Log In": "login",
      "Continue": "login",
      "Sign In": "how_to_reg",
      "Log Out": "logout",
      "Profile": "account_circle",
      "Edit Profile": "tune",
      "Add new Place": "add_circle"
    };
  
    return (
      <div className="navigation__button" onClick={onClick ? onClick : null}>
        {iconMap[content] && (
          <span className="material-symbols-outlined">{iconMap[content]}</span>
        )}
        <p>{content}</p>
      </div>
    );
  };

export default Button;
