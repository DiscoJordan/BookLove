import React from "react";
import Button from "./Button";
import { Link } from "react-router-dom";
import { useContext,useEffect } from "react";
import { PlacesContext } from "../context/PlacesContext";
import PlaceCard from "./PlaceCard";
import googlePlaces from "../googlePlaces.json";
import axios from "axios";
import { URL } from "../config";


function AdminDashboard() {
  const { places,getPlaces } = useContext(PlacesContext);

  const getPlacesfromGoogle = async () => {
    
    try {
      const response = await axios.post(`${URL}/place/fetch`,googlePlaces);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getPlaces();
  }, []);

  return (
    <>
      <div className="admin__buttons">
        <Link to={"/addnewplace"}>
          <Button content={"Add new Place"} onClick={()=>localStorage.removeItem("editTitle")}/>
        </Link>
        <Link to={"/users"}>
          <Button content={"Users"}/>
        </Link>
        <button onClick={getPlacesfromGoogle}>
        <Button content={"Fetch from Google"}/>
        </button>
      </div>
      <hr />
      <div className="grid__places">
        {places.map((place) => (
          <PlaceCard key={place._id} place={place} />
        ))}
      </div>
    </>
  );
}

export default AdminDashboard;
