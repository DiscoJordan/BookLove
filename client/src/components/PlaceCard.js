import React, { useContext, useEffect } from "react";
import { UserContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import ManageButtons from "./ManageButtons";

function PlaceCard({ place }) {
  const { getUserData } = useContext(UserContext);


  const navigate = useNavigate();


  const navigateToPlace = (e) => {
    e.stopPropagation();
    navigate(`/place/${place.title}`)
    
  }
  return (
    <div onClick={(e)=>navigateToPlace(e)} className="place__card">
      <div className="place__info">
        <ManageButtons place={place}/>
        <div className="place__footer">
          <h3>{place.title}</h3>
          <hr color="#FF471F" />
          <div className="place__price">
            <span className="material-symbols-outlined">payments</span>
            <p>{place.price=='0' ?'Free': `From ${place.price}€` }</p>
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
