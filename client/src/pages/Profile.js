import React, { useEffect, useContext, useState } from "react";
import Button from "../components/Button";
import UserDashboard from "../components/UserDashboard";
import AdminDashboard from "../components/AdminDashboard";
import { UserContext } from "../context/UserContext";
import { URL } from "../config";
import axios from "axios";
import UploadImages from "../components/UploadImages";

function Profile() {
  const { userData, getUserData, setUser, user, token } =
    useContext(UserContext);
  const [isEditting, setIsEditting] = useState(false);
  const [message, setMessage] = useState("");
  const [newUserData, setNewUserData] = useState({
    username: "",
    email: "",
    password: "",
    password2: "",
    about: "",
    photo: {
      photo_url: "",
      public_id: "",
    },
  });
  useEffect(() => {
    getUserData();
  }, []);

  useEffect(() => {
    setNewUserData({
      username: userData?.username,
      email: userData?.email,
      password: "",
      password2: "",
      about: userData?.about,
      photo: {
        photo_url: userData?.photo?.photo_url,
        public_id: userData?.photo?.public_id,
      },
    });
  }, [userData]);

  let handleChange = (e) => {
    setNewUserData({ ...newUserData, [e.target.name]: e.target.value });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      axios.defaults.headers.common["Authorization"] = token;
      const response = await axios.post(`${URL}/user/update`, {
        newUserData,
        oldusername: userData.username,
        oldpassword: userData.password,
      });
      setMessage(response.data.message);
      getUserData();

      setTimeout(() => {
        setMessage("");
      }, 2000);

      if (response.data.user) {
        setUser({ ...user, username: response.data.user.username });
        setTimeout(() => {
          setIsEditting(false);
        }, 500);
      }
    } catch (error) {
      setMessage(error?.response?.data?.message);
      setTimeout(() => {
        setMessage("");
      }, 2000);
      getUserData();
      console.log(error);
    }
  };

  return (
    <div className="profile__wrapper">
      <div className="container">
        <div className="profile__info">
          <div className="profile__avatar">
            <img
              src={newUserData?.photo?.photo_url || userData?.photo?.photo_url}
              alt="avatar"
            />
          </div>
          {!isEditting ? (
            <>
              <div className="profile__username">
                {userData?.isAdmin && (
                  <span className="material-symbols-outlined">star_rate</span>
                )}
                <h3>{userData?.username}</h3>
                {!userData?.isAdmin && (
                  <div className="profile__badge">
                    <h3>{userData?.visited?.length}</h3>
                  </div>
                )}
              </div>
              <div className="profile__about">
                <p>{userData?.about || "Без информации"}</p>
              </div>
              <div className="profile__buttons">
                <button onClick={() => setIsEditting(true)}>
                  <Button
                    content={isEditting ? "Сохранить изменения" : "Изменить профиль"}
                  />
                </button>
              </div>
            </>
          ) : (
            <>
              <UploadImages
                id={userData?.photo?.public_id}
                newUserData={newUserData}
                setNewUserData={setNewUserData}
                content={"Обновить фото"}
              />
              <h2>{message || "Update Profile"}</h2>
              <form
                onChange={handleChange}
                onSubmit={handleUpdate}
                className="change__info"
              >
                <div className="subgrid">
                  <input
                    className="navigation__button"
                    type="text"
                    name="username"
                    placeholder="Имя пользователя*"
                    maxLength={20}
                    defaultValue={newUserData?.username}
                  />
                  <input
                    className="navigation__button"
                    type="text"
                    name="email"
                    placeholder="Email*"
                    defaultValue={newUserData?.email}
                  />
                  <input
                    className="navigation__button"
                    type="password"
                    name="password"
                    defaultValue={newUserData?.password}
                    placeholder="Новый пароль"
                  />
                  <input
                    className="navigation__button"
                    type="password"
                    name="password2"
                    defaultValue={newUserData?.password2}
                    placeholder="Повторите пароль"
                  />
                </div>
                <textarea
                  className="navigation__button"
                  type="text"
                  name="about"
                  placeholder="Дополнительная нформация"
                  defaultValue={newUserData?.about}
                />
                <div className="profile__buttons">
                  <button>
                    <Button
                      content={isEditting ? "Сохранить изменения" : "Изменить профиль"}
                    />
                  </button>
                </div>
              </form>
            </>
          )}
        </div>
        {!isEditting ? (
          userData?.isAdmin ? (
            <AdminDashboard />
          ) : (
            <UserDashboard />
          )
        ) : (
          ""
        )}
      </div>
    </div>
  );
}

export default Profile;
