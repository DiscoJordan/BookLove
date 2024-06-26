import React, {useContext} from "react";
import CircleButton from "./CircleButton";
import { URL } from "../config";
import axios from "axios";
import { PlacesContext } from "../context/PlacesContext";
import { useNavigate } from "react-router-dom";


function PlaceCard({ place }) {
  const navigate = useNavigate()
  const { getPlaces, setEditTitle } = useContext(PlacesContext);
  const deletePlace = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${URL}/place/delete`, {title:place.title}); 
      // setMessage(response.data.data);
      // setTimeout(() => {
      //   setMessage("");
      // }, 2000);
      console.log(response);
      if (response.data.ok) {
        //   setTimeout(() => {
        //       navigate(`/}`);
        //   }, 2000);
      }
      getPlaces();
    } catch (error) {
      console.log(error);
    }
  };

  const editPlace = ()=>{
    navigate("/addnewplace")
    setEditTitle(place.title)
    localStorage.setItem("editTitle", place.title)
  }
  

  

  return (
    <div className="place__card">
      <div className="place__info">
        <div className="place__buttons">
          <CircleButton  content={"wish_off"} />
          <CircleButton  content={"visited_off"} />
          
          <button onClick={editPlace}>
            {" "}
            <CircleButton  content={"edit"} />
          </button>
          <button onClick={deletePlace}>
            {" "}
            <CircleButton
             
              content={"delete"}
            />
          </button>
        </div>
        <div className="place__footer">
          <h3>{place.title}</h3>
          <hr color="#FF471F" />
          <div className="place__price">
            <span className="material-symbols-outlined">payments</span>
            <p>{!isNaN(place.price) ? `From ${place.price}€` : place.price}</p>
          </div>
          <div className="place__location">
            <span className="material-symbols-outlined">location_on</span>
            <p>{place.location}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PlaceCard;
