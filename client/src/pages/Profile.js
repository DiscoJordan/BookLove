import React, { useEffect, useState } from "react";
import { URL } from "../config";
import axios from "axios";
import { Link } from "react-router-dom";
import Button from "../components/Button";

function Profile({ user }) {
  console.log(user);
  const [userData, setUserData] = useState();
  const [option, setOption] = useState("wishes");

  const switchClick = (option) => {
    setOption(option);
  };
  const getUser = async (req, res) => {
    try {
      const response = await axios.get(`${URL}/user/get/${user.username}`);
      setUserData(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getUser();
  }, []);

  console.log(userData);
  return (
    <div className="profile__wrapper">
      <div className="container">
        <div className="profile__info">
          <div className="profile__avatar">
            <img src="/images/defaultavatar.png" alt="default avatar" />
          </div>
          <div className="profile__username">
            {userData?.isAdmin && (
              <span className="material-symbols-outlined">star_rate</span>
            )}
            <h3>{userData?.username}</h3>
            <div className="profile__badge">
              <h3>{userData?.visited.length}</h3>
            </div>
          </div>
          <div className="profile__about">
            <p>{userData?.about || "No information about"}</p>
          </div>
          <div className="profile__buttons">
            <Button content={"Edit Profile"} />
            {userData?.isAdmin && (
              <Link to={"/addnewplace"}>
                <Button content={"Add new Place"} />
              </Link>
            )}
          </div>
        </div>
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
        <div className="option__content">
          {option === "wishes" && <h1>wishes list is empty</h1>}
          {option === "visited" && <h1>visited list is empty</h1>}
        </div>
      </div>
    </div>
  );
}

export default Profile;
