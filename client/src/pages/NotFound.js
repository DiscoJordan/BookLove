import React from "react";
import { Link } from "react-router-dom";
import Button from "../components/Button";

function notFound() {
  return (
    <div className="notFound">
      <h1>404</h1>
      <h4>Page not found :(</h4>
      <Link to={'/'}>
        <Button reversed={true} content={"To main page"} />
      </Link>
    </div>
  );
}

export default notFound;
