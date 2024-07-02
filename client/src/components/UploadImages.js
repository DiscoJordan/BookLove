import React from "react";
import axios from "axios";
import Button from "./Button";
import { URL } from "../config";
import { useContext } from "react";
import { UserContext } from "../context/UserContext";
import { PlacesContext } from "../context/PlacesContext";
const UploadImages = ({ content,setPlaceData, placeData, fetch_pictures, id, reversed}) => {
  const { userData, getUserData } = useContext(UserContext);

  const { getPlaces } = useContext(PlacesContext);
  const uploadWidget = () => {
    // remember to add your credentials to the .env file
    console.log(`//////////////`);
   
    console.log(placeData);
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
              uploadProfilePicture(result);
              
            }
            else if (content === "Update cover" && id) {
              uploadPlaceCover(result);
              
            }
            else if (content === "Add photos" && id) {
              uploadPlacePhotos(result);
            }
          }
        }
      }
    );
  };

  const uploadProfilePicture = async (result) => {

    try {
      const response = await axios.post(`${URL}/user/upload`, {
        file: result.info.files[0],
        username: userData.username,
      });

      response.data.ok ? getUserData() : alert("Something went wrong");
    } catch (error) {
      console.log(error);
    }
  };
  const uploadPlaceCover = async (result) => {

   
    try {
      const response = await axios.post(`${URL}/user/upload`, {
        file: result.info.files[0],
        id: id,
      });
      response.data.ok ? setPlaceData({...placeData, cover:response.data.result}) : alert("Something went wrong");
      getPlaces()
    } catch (error) {
      console.log(error);
    }
  };

  const uploadPlacePhotos = async (result) => {

    try {
      const response = await axios.post(`${URL}/place/uploadPhotos`, {
        files: result.info.files,
        id: id,
      });
  console.log(response.data.result);
      response.data.ok ? setPlaceData({...placeData, photos:response.data.result}) : alert("Something went wrong");
      getPlaces()
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
