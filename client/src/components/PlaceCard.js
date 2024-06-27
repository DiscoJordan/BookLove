import React, { useContext, useEffect, useState } from "react";
import CircleButton from "./CircleButton";
import { URL } from "../config";
import axios from "axios";
import { PlacesContext } from "../context/PlacesContext";
import { UserContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";

function PlaceCard({ place }) {
  const { userData, getUserData , setUserData} = useContext(UserContext);
  const { getPlaces, setEditTitle } = useContext(PlacesContext);

  const wishMatch = userData?.wishes?.some((e) => e.title === place.title);
  const visitedMatch = userData?.visited?.some((e) => e.title === place.title);

  const navigate = useNavigate();

  useEffect(() => {
    getUserData();
  }, []);

  const deletePlace = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${URL}/place/delete`, {
        title: place.title,
      });
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

  const editPlace = () => {
    navigate(`/${place.title}/addnewplace`);
    setEditTitle(place.title);
    localStorage.setItem("editTitle", JSON.stringify(place.title));
  };

  const updatePreferences = async (update, value) => {
    try {
   
      
      const response =await axios.post(`${URL}/user/editList`, {
        username:userData.username,
        placeId: place._id,
        update,
        value,
      });
      console.log(response);
      console.log(wishMatch);
      getUserData()
    } catch (error) {
      console.log(error);
    }
  };



  return (
    <div className="place__card">
      <div className="place__info">
        <div className="place__buttons">
          {!userData?.isAdmin && (
            <button
              onClick={() => {
                if (wishMatch) {
                  //remove
                  updatePreferences("wishes", false);

                } else {
                  //add
                  updatePreferences("wishes", true);

                }
              }}
            >
              <CircleButton content={!wishMatch?'wish_off':'wish'} />
            </button>
          )}
         {!userData?.isAdmin && (
            <button
              onClick={() => {
                if (visitedMatch) {
                  //remove
                  updatePreferences("visited", false);

                } else {
                  //add
                  updatePreferences("visited", true);

                }
              }}
            >
              <CircleButton content={!visitedMatch?'visited':'visited_off'} />
            </button>
          )}
        

          {userData?.isAdmin && (
            <button onClick={editPlace}>
              <CircleButton content={"edit"} />
            </button>
          )}
          {userData?.isAdmin && (
            <button onClick={deletePlace}>
              {" "}
              <CircleButton content={"delete"} />
            </button>
          )}
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
