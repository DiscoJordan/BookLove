import React from "react";
import axios from "axios";
import Button from "./Button";
import { URL } from "../config";
import { useContext } from "react";
import { UserContext } from "../context/UserContext";
const UploadImages = ({
  content,
  setPlaceData,
  placeData,
  setNewUserData,
  newUserData,
  id,
  reversed,
  idOfPlace,
}) => {
  const { token } = useContext(UserContext);
  const uploadWidget = () => {
    window.cloudinary.openUploadWidget(
      {
        cloud_name: process.env.REACT_APP_CLOUD_NAME,
        upload_preset: process.env.REACT_APP_UPLOAD_PRESET, 
        tags: ["user"]
      },
      (error, result) => {
        if (error) {
          console.log(error);
        } else {
          if (result.event === "queues-end") {
            if (content === "Update image") {
              setNewUserData({
                ...newUserData,
                photo: {
                  public_id: result.info.files[0]?.uploadInfo?.public_id,
                  photo_url: result.info.files[0]?.uploadInfo?.secure_url,
                },
              });
              removePicture();
            } else if (content === "Update cover") {
              removePicture();
              setPlaceData({
                ...placeData,
                cover: {
                  public_id: result.info.files[0]?.uploadInfo?.public_id,
                  photo_url: result.info.files[0]?.uploadInfo?.secure_url,
                },
              });
              
            } else if (content === "Add photos") {
              uploadPlacePhotos(result);
            }
          }
        }
      }
    );
  };

  const uploadPlacePhotos = async (result) => {
    try {
      axios.defaults.headers.common["Authorization"] = token;
      const response = await axios.post(`${URL}/place/uploadPhotos`, {
        files: result.info.files,
        id: idOfPlace,
      });
      response.data.ok
        ? setPlaceData({ ...placeData, photos: response.data.result })
        : alert("Something went wrong");
    } catch (error) {
      console.log(error);
    }
  };
  const removePicture = async () => {
    try {
      axios.defaults.headers.common["Authorization"] = token;
      const response = await axios.post(`${URL}/place/removePicture`, {
        public_id: id,
      });
      !response.status===200&& alert("Something went wrong");

    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="flex_upload">
      <div className="upload">
        <Button content={content} reversed={reversed} onClick={uploadWidget} />
      </div>
    </div>
  );
};

export default UploadImages;
