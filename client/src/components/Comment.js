import React, { useContext, useEffect, memo } from "react";
import { UserContext } from "../context/UserContext";
import { PlacesContext } from "../context/PlacesContext";
import axios from "axios";
import { URL } from "../config";
import Button from "./Button";

const Comment = memo(function Comment({ comment, placeId,getPlace }) {
  const { userData,token } = useContext(UserContext);
  const deleteComment = async (e) => {
    e.preventDefault();
    try {
      axios.defaults.headers.common["Authorization"] = token;
      let flag = !!userData?.isAdmin
      const response = await axios.post(`${URL}/place/deletecomment${flag ? 'Admin' : ""}`, {
        comment: comment,
        userId: userData?._id,
        placeId: placeId,
      });
      getPlace()
      // if (response.data.ok) {
      // }
    } catch (error) {
      console.log(error);
    }
  };



  return (
    <div className="comment__card">
      <div className="comment__info">
        <div className="comment__user">
          <div className="comment__photo">
            <img src={comment.userId?.photo?.photo_url} alt="user photo" />
          </div>
          <h3>{comment.userId?.username}</h3>
        </div>
        <p>{comment.date}</p>
        {userData?._id === comment.userId?._id || userData?.isAdmin ? (
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
