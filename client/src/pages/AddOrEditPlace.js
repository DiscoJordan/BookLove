import React, { useState, useContext, useEffect } from "react";
import Button from "../components/Button";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { URL } from "../config";
import { PlacesContext } from "../context/PlacesContext";
import { TagsContext } from "../context/TagsContext";
import InputOfTags from "../components/InputOfTags";

function AddOrEditPlace() {
  const { editTitle, setEditTitle, places, getPlaces } =
    useContext(PlacesContext);
  const { currentTag, setCurrentTag, tags,getTags } = useContext(TagsContext);

  const { oldtitle } = useParams();
  console.log(places);
  const beingEdited =
    editTitle && places.find((place) => place.title === editTitle);

  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const [placeData, setPlaceData] = useState({
    title: "",
    subtitle: "",
    location: "",
    hours: "",
    price: "",
    description: {
      header: "",
      descriptionText: "",
    },
    tags: [],
  });

  useEffect(() => {
    if (beingEdited) {
      setPlaceData({ ...beingEdited });
    }
    setEditTitle(JSON.parse(localStorage.getItem("editTitle")) || "");
  }, [places]);

  let handleChange = (e) => {
    if (e.target.name === "header" || e.target.name === "descriptionText") {
      let copy = { ...placeData };
      copy.description[e.target.name] = e.target.value;
      setPlaceData(copy);
    } else {
      setPlaceData({ ...placeData, [e.target.name]: e.target.value });
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${URL}/place/add`, placeData);
      console.log(response);
      setMessage(response.data.data);
      setTimeout(() => {
        setMessage("");
      }, 2000);
      getPlaces();
      if (response.data.ok) {
        setTimeout(() => {
          navigate(-1);
        }, 2000);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${URL}/place/${oldtitle}/update`,
        placeData
      );
  
      getPlaces();
      console.log(response.data);
      setTimeout(() => {
        setMessage("");
      }, 2000);
      console.log(response);
      if (response.data.ok) {
        setTimeout(() => {
          navigate(-1);
        }, 2000);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleTags = async (e) => {
    e.preventDefault();
    if (!currentTag) return alert("No skill specified!");
    if (!tags.some((tag) => tag.tagTitle === currentTag)) {
      try {
        const response = await axios.post(`${URL}/tag/add`, {tagTitle:currentTag});
        console.log(response);
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

  useEffect(() => {
    console.log(placeData);
  }, [placeData]);

  return (
    <div className="newPlace__wrapper">
      <div className="container">
        <h1 className={message ? "message" : ""}>
          {message || (editTitle ? "Edit Place" : "Create new Place")}
        </h1>
        <div className="form">
          <form
            onSubmit={editTitle ? handleUpdate : handleSubmit}
            onChange={handleChange}
            className="form__fields"
            action=""
          >
            <div className="form__sides">
              <div className="leftside__fields">
                <input
                  className="form__input"
                  placeholder="Title*"
                  value={placeData?.title}
                  name="title"
                  type="text"
                />

                <input
                  className="form__input"
                  placeholder="Subtitle"
                  value={placeData?.subtitle}
                  name="subtitle"
                  type="text"
                />
                <input
                  className="form__input"
                  placeholder="Header"
                  value={placeData?.description.header}
                  name="header"
                  type="text"
                />
                <input
                  className="form__input"
                  placeholder="Location*"
                  value={placeData?.location}
                  name="location"
                  type="text"
                />
                <input
                  className="form__input"
                  placeholder="Hours*"
                  value={placeData?.hours}
                  name="hours"
                  type="text"
                />
                <input
                  className="form__input"
                  placeholder="Price*"
                  value={placeData?.price}
                  name="price"
                  type="number"
                />
              </div>
              <div className="rightside__fields">
                <textarea
                  className="form__input"
                  placeholder="Description"
                  value={placeData?.description.descriptionText}
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
                <button onClick={(e) => deleteTag(e, tag)}>
                  <Button reversed={true} close={true} content={tag.tag} />
                </button>
              ))}
            </div>
            <h4>here you could add cover photo</h4>
            <h4>here you could add tags</h4>
            <h4>here you could add photos</h4>

            <button>
              <Button reversed={true} content={editTitle ? "Update" : "Continue"} />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddOrEditPlace;
