import React, { useContext, useEffect, memo } from "react";
import { UserContext } from "../context/UserContext";
import { PlacesContext } from "../context/PlacesContext";
import axios from "axios";
import { URL } from "../config";
import Button from "./Button";

const Comment = memo(function Comment({ comment, placeId }) {
  const { users, getUsers, userData } = useContext(UserContext);
  const { getPlaces } = useContext(PlacesContext);

  const deleteComment = async (e) => {
    e.preventDefault();
    console.log(`1`);
    try {
      const response = await axios.post(`${URL}/place/deletecomment`, {
        comment: comment,
        userId: userData?._id,
        placeId: placeId,
      });
      console.log(response);
      if (response.data.ok) {
        console.log(`2`);
        getPlaces();
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUsers();
  }, []);
  const [ownerOFComment] = users.filter((user) => user._id === comment.userId);

  return (
    <div className="comment__card">
      <div className="comment__info">
        <div className="comment__user">
          <div className="comment__photo">
            <img src={ownerOFComment?.photo?.photo_url} alt="user photo" />
          </div>
          <h3>{ownerOFComment?.username}</h3>
        </div>
        <p>{comment.date}</p>
        {userData?._id === comment.userId || userData?.isAdmin ? (
          <button onClick={deleteComment}>
            <Button content={"Delete"} />
          </button>
        ) : null}
      </div>

      <p>{comment.comment}</p>
    </div>
  );
});

export default Comment;
