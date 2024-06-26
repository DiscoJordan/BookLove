import React from "react";
import Button from "./Button";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { PlacesContext } from "../context/PlacesContext";
import PlaceCard from "./PlaceCard";

function AdminDashboard() {
  const { places } = useContext(PlacesContext);
  console.log(places);
  return (
    <>
      <div className="admin__buttons">
        <Link to={"/addnewplace"}>
          <Button content={"Add new Place"} />
        </Link>
      </div>
      <hr />
      <div className="admin__places">
        {places.map((place) => (
          <PlaceCard place={place} />
        ))}
      </div>
    </>
  );
}

export default AdminDashboard;
