import React, { useContext } from "react";
import CircleButton from "./CircleButton";
import { URL } from "../config";
import axios from "axios";
import { PlacesContext } from "../context/PlacesContext";
import { UserContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";
function ManageButtons({ place }) {
    const { userData, getUserData } = useContext(UserContext);
    const { getPlaces, setEditTitle } = useContext(PlacesContext);
    const wishMatch = userData?.wishes?.some((e) => e.title === place.title);
  const visitedMatch = userData?.visited?.some((e) => e.title === place.title);

  const navigate = useNavigate();

  const deletePlace = async (e) => {
    e.preventDefault();
    e.stopPropagation();

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

  const editPlace = (e) => {
    e.stopPropagation();
    navigate(`/${place.title}/addnewplace`);
    setEditTitle(place.title);
    localStorage.setItem("editTitle", JSON.stringify(place.title));
  };

  const updatePreferences = async (update, value,e) => {
    e.stopPropagation();
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
    <div className="place__buttons">
    {!userData?.isAdmin && (
      <button
        onClick={(e) => {
          if (wishMatch) {
            //remove
            updatePreferences("wishes", false,e);

          } else {
            //add
            updatePreferences("wishes", true,e);

          }
        }}
      >
        <CircleButton content={!wishMatch?'wish_off':'wish'} />
      </button>
    )}
   {!userData?.isAdmin && (
      <button
        onClick={(e) => {
          if (visitedMatch) {
            //remove
           updatePreferences("visited", false,e);

          } else {
            //add
            updatePreferences("visited", true,e);

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
  )
}

export default ManageButtons