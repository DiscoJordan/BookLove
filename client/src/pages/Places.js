import React, { useContext, useEffect } from "react";
import { PlacesContext } from "../context/PlacesContext";
import PlaceCard from "../components/PlaceCard";

function Places({user}) {
  const { places, getPlaces } = useContext(PlacesContext);

  useEffect(() => {
    getPlaces();
  }, []);

  
  return (
    <>
      <div className="places__wrapper">
        <div className="container">
          <div className="grid__places">
            {places.map((place) => (
              <PlaceCard user={user} place={place} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default Places;
