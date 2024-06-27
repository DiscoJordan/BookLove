import React, { useEffect, useContext } from "react";
import Button from "../components/Button";
import UserDashboard from "../components/UserDashboard";
import AdminDashboard from "../components/AdminDashboard";
import { UserContext } from "../context/UserContext";
function Profile() {

  const {userData,getUserData} = useContext(UserContext);
  useEffect(() => {
    getUserData();
    console.log(userData);
  }, []);

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
          <AdminDashboard  />
        ) : (
          <UserDashboard  />
        )}
      </div>
    </div>
  );
}

export default Profile;
