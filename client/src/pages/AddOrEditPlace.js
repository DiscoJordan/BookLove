import React, { useState, useContext, useEffect } from "react";
import Button from "../components/Button";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { URL } from "../config";
import { PlacesContext } from "../context/PlacesContext";
import { TagsContext } from "../context/TagsContext";
import { UserContext } from "../context/UserContext";
import InputOfTags from "../components/InputOfTags";
import UploadImages from "../components/UploadImages";

function AddOrEditPlace() {
  const { editTitle, setEditTitle, places, getPlaces, setCurrentPlace } =
    useContext(PlacesContext);
  const { token} =
    useContext(UserContext);
  const { currentTag, setCurrentTag, tags, getTags } =
    useContext(TagsContext);
  const { oldtitle } = useParams();
  const beingEdited =
    oldtitle && editTitle && places.find((place) => place.title === editTitle);
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const [placeData, setPlaceData] = useState({
    title: "",
    subtitle: "",
    location: "",
    hours: [],
    price: "",
    cover: {
      photo_url:
        "https://res.cloudinary.com/dgfkzetcg/image/upload/v1720011996/pglltfymihkpt3ev5id7.jpg",
      public_id: "",
    },
    description: {
      header: "",
      descriptionText: "",
    },
    tags: [],
    photos: [],
    website: "",
    coordinates: {
      lat: "",
      lng: "",
    },
  });

  useEffect(() => {
    editTitle
      ? setCurrentPlace(places.find((place) => place.title === oldtitle))
      : setCurrentPlace(
          places.find((place) => place.title === placeData?.title)
        );
  }, []);

  useEffect(() => {
    if (beingEdited) {
      setPlaceData({ ...beingEdited });
      console.log(placeData);
    }
    setEditTitle(JSON.parse(localStorage.getItem("editTitle")) || "");
  }, [places]);

  let handleChange = (e) => {
    if (e.target.name === "header" || e.target.name === "descriptionText") {
      let copy = { ...placeData };
      copy.description[e.target.name] = e.target.value;
      setPlaceData(copy);
    } else if (e.target.name === "lat" || e.target.name === "lng") {
      let copy = { ...placeData };
      copy.coordinates[e.target.name] = e.target.value;
      setPlaceData(copy);
    } else {
      setPlaceData({ ...placeData, [e.target.name]: e.target.value });
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      axios.defaults.headers.common["Authorization"] = token;
      const response = await axios.post(`${URL}/place/add`, placeData);
      setMessage(response.data.data);
      setTimeout(() => {
        setMessage("");
      }, 2000);
      getPlaces();
      if (response.data.ok) {
        setTimeout(() => {
          navigate(-1);
        }, 500);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      axios.defaults.headers.common["Authorization"] = token;
      const response = await axios.post(
        `${URL}/place/${oldtitle}/update`,
        placeData
      );

      getPlaces();
      setTimeout(() => {
        setMessage("");
      }, 2000);
      if (response.data.ok) {
        setTimeout(() => {
          navigate(`/place/${placeData.title}`);
        }, 500);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleTags = async (e) => {
    
    e.preventDefault();
    if (!currentTag) return alert("No skill specified!");
    if (!tags.some((tag) => tag.tagTitle === currentTag)) {
      axios.defaults.headers.common["Authorization"] = token;
      try {
      
        const response = await axios.post(`${URL}/tag/add`, {
          tagTitle: currentTag,
        });
        setMessage(response.data.data);
        setTimeout(() => {
          setMessage("");
        }, 2000);
        getTags();
      } catch (error) {
        console.log(error);
      }
    }
    if (placeData.tags.some((tag) => tag.tag === currentTag)) {
      setCurrentTag("");
      alert("tag already exist");
    } else {
      setPlaceData((prevState) => {
        return {
          ...prevState,
          tags: [...prevState.tags, { tag: currentTag }],
        };
      });
    }
    setCurrentTag("");
  };

  const deleteTag = (e, tag) => {
    e.preventDefault();

    setPlaceData((prevState) => ({
      ...prevState,
      tags: prevState.tags.filter((addedTag) => addedTag.tag !== tag.tag),
    }));
  };

  const deletePhoto = async (id, e) => {
    e.preventDefault();
    setPlaceData((prevState) => ({
      ...prevState,
      photos: prevState.photos.filter((photo) => photo.public_id !== id),
    }));

    try {
      axios.defaults.headers.common["Authorization"] = token;
      const response = await axios.post(`${URL}/place/removePicture`, {
        public_id: id,
      });
      !response.status === 200 && alert("Something went wrong");
    } catch (error) {
      console.log(error);
    }
  };

  const handleChangeHours = (e, index) => {
    e.stopPropagation();
    const newHours = [...placeData?.hours];
    newHours[index] = e.target.value;
    setPlaceData((prevData) => ({
      ...prevData,
      hours: newHours,
    }));
  };

  return (
    <div className="newPlace__wrapper">
      <div className="container">
        <h1 className={message ? "message" : ""}>
          {message || (editTitle ? "Edit Place" : "Create new Place")}
        </h1>

        <form
          onSubmit={editTitle ? handleUpdate : handleSubmit}
          onChange={handleChange}
          className="form"
          action=""
        >
          <div className="form__sides">
            <div className="leftside__fields">
              <input
                className="form__input"
                placeholder="Title*"
                defaultValue={placeData?.title || ""}
                name="title"
                type="text"
              />

              <input
                className="form__input"
                placeholder="Subtitle"
                defaultValue={placeData?.subtitle || ""}
                name="subtitle"
                type="text"
              />
              <input
                className="form__input"
                placeholder="Header"
                defaultValue={placeData?.description?.header || ""}
                name="header"
                type="text"
              />
              <input
                className="form__input"
                placeholder="Location*"
                defaultValue={placeData?.location || ""}
                name="location"
                type="text"
              />
              <input
                className="form__input"
                placeholder="Website"
                defaultValue={placeData?.website || ""}
                name="website"
                type="text"
              />
              <input
                className="form__input"
                placeholder="Price*"
                defaultValue={placeData?.price || ""}
                name="price"
                type="number"
              />
              <h3>Opening Hours</h3>
              <input
                className="form__input"
                placeholder="Monday"
                defaultValue={placeData?.hours[0] || ""}
                onChange={(e) => handleChangeHours(e, 0)}
                name="0"
                type="text"
              />
              <input
                className="form__input"
                placeholder="Tuesday"
                defaultValue={placeData?.hours[1] || ""}
                onChange={(e) => handleChangeHours(e, 1)}
                type="text"
              />
              <input
                className="form__input"
                placeholder="Wednesday"
                defaultValue={placeData?.hours[2] || ""}
                onChange={(e) => handleChangeHours(e, 2)}
                type="text"
              />
              <input
                className="form__input"
                placeholder="Thursday"
                defaultValue={placeData?.hours[3] || ""}
                onChange={(e) => handleChangeHours(e, 3)}
                type="text"
              />
              <input
                className="form__input"
                placeholder="Friday"
                defaultValue={placeData?.hours[4] || ""}
                onChange={(e) => handleChangeHours(e, 4)}
                type="text"
              />
              <input
                className="form__input"
                placeholder="Saturday"
                defaultValue={placeData?.hours[5] || ""}
                onChange={(e) => handleChangeHours(e, 5)}
                type="text"
              />
              <input
                className="form__input"
                placeholder="Sunday"
                defaultValue={placeData?.hours[6] || ""}
                onChange={(e) => handleChangeHours(e, 6)}
                name="6"
                type="text"
              />
              <h3>Coordinates</h3>
              <input
                className="form__input"
                placeholder="Latitude"
                defaultValue={placeData?.coordinates?.lat || ""}
                name="lat"
                type="text"
              />
              <input
                className="form__input"
                placeholder="Longitude"
                defaultValue={placeData?.coordinates?.lng || ""}
                name="lng"
                type="text"
              />
            </div>
            <div className="rightside__fields">
              <textarea
                className="form__input"
                placeholder="Description"
                defaultValue={placeData?.description?.descriptionText || ""}
                name="descriptionText"
                rows="40"
                cols="40"
                type="text"
              />
            </div>
          </div>
          <hr width="100%" color="white" />
          <div className="manageTags">
            <InputOfTags />
            <button onClick={handleTags}>
              <Button reversed={true} content={"Add tag"} />
            </button>
          </div>
          <div className="tagsList">
            {placeData.tags.map((tag) => (
              <button key={tag._id} onClick={(e) => deleteTag(e, tag)}>
                <Button reversed={true} close={true} content={tag.tag} />
              </button>
            ))}
          </div>
          <hr width="100%" color="white" />
          <h2>Cover image</h2>
          <div className="cover__image">
            <img src={placeData?.cover?.photo_url} alt="place" />

            <UploadImages
              reversed={true}
              setPlaceData={setPlaceData}
              content={"Update cover"}
              placeData={placeData}
              id={placeData?.cover?.public_id}
            />
          </div>
          <hr width="100%" color="white" />
          <h2>Place images</h2>
          <UploadImages
            setPlaceData={setPlaceData}
            placeData={placeData}
            reversed={true}
            idOfPlace={placeData?._id}
            content={"Add photos"}
          />
          <div className="place__images">
            {placeData?.photos?.map((photo) => (
              <div key={photo._id} className="place__image">
                <img src={photo.photo_url} alt="photo" />
                <button onClick={(e) => deletePhoto(photo.public_id, e)}>
                  <Button reversed={true} close={true} content={"Delete"} />
                </button>
              </div>
            ))}
          </div>
          <hr width="100%" color="white" />
          <button>
            <Button
              reversed={true}
              content={editTitle ? "Update" : "Add Place"}
            />
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddOrEditPlace;
