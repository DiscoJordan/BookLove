import React, { useEffect, useContext } from "react";
import { UserContext } from "../context/UserContext";
import UserCard from "../components/UserCard";

function Users() {
  const { getUsers, users,user } = useContext(UserContext);
  useEffect(() => {
    getUsers();
  }, []);
  let otherUsers = users.filter(someUser=>someUser.username!==user.username)
  return (
    <div className="users__wrapper">
      <div className="container">
        
        <div className="user__list">
        <h1>Users</h1>
        {otherUsers.map((user) => (
          <UserCard user={user}/>
        ))}
      </div>
      </div>
    </div>
  );
}

export default Users;
