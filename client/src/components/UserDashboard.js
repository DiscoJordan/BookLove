import React, { useState, useContext } from "react";
import { UserContext } from "../context/UserContext";
import PlaceCard from "./PlaceCard";
function UserDashboard() {
  const { userData } = useContext(UserContext);
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
            <h2>Книги которые я хочу купить ( {userData?.wishes?.length} )</h2>
          </button>

          <div className="vertical-line"></div>
          <button
            className={option === "visited" ? "active" : ""}
            onClick={() => switchClick("visited")}
          >
            <span className="material-symbols-outlined">visibility</span>
            <h2>Купленные книги( {userData?.visited?.length} )</h2>
          </button>
        </div>

        <hr color="black" />
      </div>
      <div className="place"></div>
      <div className="grid__places">
        {option === "wishes" &&
          (!userData?.wishes?.length ? (
            <h2>Тут пусто</h2>
          ) : (
            userData.wishes?.map((place) => (
              <PlaceCard key={place._id} place={place} />
            ))
          ))}

        {option === "visited" &&
          (!userData?.visited?.length ? (
            <h2>Тут пусто</h2>
          ) : (
            userData?.visited?.map((place) => (
              <PlaceCard key={place._id} place={place} />
            ))
          ))}
      </div>
    </>
  );
}

export default UserDashboard;
