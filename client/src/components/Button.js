import React from "react";

function Button({ content }) {
  return (
    <div className="navigation__button">
      {(content ==='Log In'||content ==='Continue') && <span class="material-symbols-outlined">login</span>}
      {content ==='Sign In' && <span class="material-symbols-outlined">how_to_reg</span>}
      {content ==='Log Out' && <span class="material-symbols-outlined">logout</span>}
      {content ==='Log Profile' &&  <span class="material-symbols-outlined">account_circle</span>}
      <p>{content}</p>

    </div>
  );
}

export default Button;
