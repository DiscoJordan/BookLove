import React from "react";
import axios from "axios";
import Button from "./Button";
import { URL } from "../config";
import { useContext } from "react";
import { PlacesContext } from "../context/PlacesContext";
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
  const { getPlaces } = useContext(PlacesContext);
  const uploadWidget = () => {
    // remember to add your credentials to the .env file

    window.cloudinary.openUploadWidget(
      {
        cloud_name: process.env.REACT_APP_CLOUD_NAME,
        upload_preset: process.env.REACT_APP_UPLOAD_PRESET, // settings --> upload --> Upload presets
        tags: ["user"], // add the given tags to the uploaded files
        // cropping: true,
        // showAdvancedOptions: true,  //add advanced options (public_id and tag)
        // sources: ["local", "url"], // restrict the upload sources to URL and local files
        // multiple: false,  //restrict upload to a single file
        // folder: "assets", //upload files to the specified folder in your media library
        // context: {alt: "user_uploaded"}, //add the given context data to the uploaded files
        // clientAllowedFormats: ["images"], //restrict uploading to image files only
        // maxImageFileSize: 2000000,  //restrict file size to less than 2MB
        // maxImageWidth: 2000, //Scales the image down to a width of 2000 pixels before uploading
        // theme: "purple", //change to a purple theme
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
      const response = await axios.post(`${URL}/place/uploadPhotos`, {
        files: result.info.files,
        id: idOfPlace,
      });
      response.data.ok
        ? setPlaceData({ ...placeData, photos: response.data.result })
        : alert("Something went wrong");
      getPlaces();
    } catch (error) {
      console.log(error);
    }
  };
  const removePicture = async () => {
    try {
      const response = await axios.post(`${URL}/place/removePicture`, {
        public_id: id,
      });
      !response.status===200&& alert("Something went wrong");

    } catch (error) {
      console.log(error);
    }
  };
  // function to send data to server to create a new post
  return (
    <div className="flex_upload">
      {/* form to add title, description, author, date -- onchange goes to state */}
      <div className="upload">
        <Button content={content} reversed={reversed} onClick={uploadWidget} />
      </div>
      {/* button PUBLISH POST on click take data from state and send to server on the body -- function*/}
    </div>
  );
};

export default UploadImages;
