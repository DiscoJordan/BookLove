import React from "react";

function Button({ content }) {
  return (
    <div className="navigation__button">
      {(content ==='Log In'||content ==='Continue') && <span className="material-symbols-outlined">login</span>}
      {content ==='Sign In' && <span className="material-symbols-outlined">how_to_reg</span>}
      {content ==='Log Out' && <span className="material-symbols-outlined">logout</span>}
      {content ==='Profile' &&  <span className="material-symbols-outlined">account_circle</span>}
      <p>{content}</p>

    </div>
  );
}

export default Button;
