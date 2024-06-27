import React, { useState, useContext, useEffect } from "react";
import { UserContext } from "../context/UserContext";
import PlaceCard from "./PlaceCard";
function UserDashboard() {
  const { userData, getUserData } = useContext(UserContext);
  const [option, setOption] = useState("wishes");

  const switchClick = (option) => {
    setOption(option);
  };

  return (
    <>
      <div className="profile__collections">
        <div className="profile__options">
          <button
            className={option === "wishes" ? "active" : ""}
            onClick={() => switchClick("wishes")}
          >
            <span className="material-symbols-outlined">favorite</span>
            <h2>Places I want to visit ( {userData?.wishes.length} )</h2>
          </button>

          <div className="vertical-line"></div>
          <button
            className={option === "visited" ? "active" : ""}
            onClick={() => switchClick("visited")}
          >
            <span className="material-symbols-outlined">visibility</span>
            <h2>Places I visited ( {userData?.visited.length} )</h2>
          </button>
        </div>

        <hr color="black" />
      </div>
      <div className="place"></div>
      <div className="grid__places">
        {option === "wishes" &&
          (!userData?.wishes.length ? (
            <h2>Wishes list is empty</h2>
          ) : (
            userData.wishes.map((place) => <PlaceCard place={place} />)
          ))}

        {option === "visited" &&
          (!userData?.visited.length ? (
            <h2>Visited list is empty</h2>
          ) : (
            userData.visited.map((place) => <PlaceCard place={place} />)
          ))}
      </div>
    </>
  );
}

export default UserDashboard;
