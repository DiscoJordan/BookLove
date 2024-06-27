import React from "react";
import Button from "./Button";
import { Link } from "react-router-dom";
import { useContext,useEffect } from "react";
import { PlacesContext } from "../context/PlacesContext";
import PlaceCard from "./PlaceCard";

function AdminDashboard() {
  const { places,getPlaces } = useContext(PlacesContext);


  useEffect(() => {
    getPlaces();
  }, []);

  return (
    <>
      <div className="admin__buttons">
        <Link to={"/addnewplace"}>
          <Button content={"Add new Place"} onClick={()=>localStorage.removeItem("editTitle")}/>
        </Link>
      </div>
      <hr />
      <div className="grid__places">
        {places.map((place) => (
          <PlaceCard place={place} />
        ))}
      </div>
    </>
  );
}

export default AdminDashboard;
