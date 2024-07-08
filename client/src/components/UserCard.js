import React, { useContext } from "react";
import axios from "axios";
import { UserContext } from "../context/UserContext";
import { URL } from "../config";
import Button from "./Button";

function UserCard({ user }) {
  const { getUsers,token } = useContext(UserContext);

  const toggleAdmin = async () => {
    axios.defaults.headers.common["Authorization"] = token;
    try {
      const response = await axios.post(`${URL}/user/toggleAdmin`, {
        username: user.username,
      });
      response && getUsers();
    } catch (error) {
      console.log(error);
    }
  };

  const deleteUser = async () => {
    axios.defaults.headers.common["Authorization"] = token;
    try {
      const response = await axios.post(`${URL}/user/delete`, {
        username: user.username,
      });
      response && getUsers();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="user__card">
      <div className="user__field">
        <div className="user__image">
          <img src={user?.photo?.photo_url} alt="userphoto" />
        </div>
        <span className="material-symbols-outlined">person</span>
        <h3>{user.username}</h3>
      </div>
      <div className="user__field">
        <span className="material-symbols-outlined">mail</span>
        <h3>{user.email}</h3>
      </div>
      <div className="user__field">
        <span className="material-symbols-outlined">key</span>
        <input onChange={toggleAdmin} type="checkbox" checked={user.isAdmin} />
      </div>
      <button onClick={deleteUser}>
        <Button content={"Delete"} close={true} />
      </button>
    </div>
  );
}

export default UserCard;
