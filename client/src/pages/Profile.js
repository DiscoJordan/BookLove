import React, { useEffect, useState } from "react";
import { URL } from "../config";
import axios from "axios";

import Button from "../components/Button";
import UserDashboard from "../components/UserDashboard";
import AdminDashboard from "../components/AdminDashboard";

function Profile({ user }) {
  console.log(user);
  const [userData, setUserData] = useState();

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
            {!userData?.isAdmin &&<div className="profile__badge">
              <h3>{userData?.visited.length}</h3>
            </div>}
          </div>
          <div className="profile__about">
            <p>{userData?.about || "No information about"}</p>
          </div>
          <div className="profile__buttons">
            <Button content={"Edit Profile"} />
          </div>
        </div>
        {userData?.isAdmin ? (
          <AdminDashboard user={user} userData={userData} />
        ) : (
          <UserDashboard userData={userData} />
        )}
      </div>
    </div>
  );
}

export default Profile;
