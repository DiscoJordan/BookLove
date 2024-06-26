import React, { useState } from "react";
import Button from "../components/Button";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { URL } from "../config";

function AddNewPlace() {
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const [placeData, setPlaceData] = useState({
    title: "",
    subtitle: "",
    header: "",
    location: "",
    hours: "",
    price: "",
    descriptionText: "",
  });
  let handleChange = (e) => {
    setPlaceData({ ...placeData, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${URL}/place/add`, {
        title: placeData.title,
        subtitle: placeData.subtitle,
        header: placeData.header,
        location: placeData.location,
        hours: placeData.hours,
        price: placeData.price,
        descriptionText: placeData.descriptionText,
      });
      setMessage(response.data.data);
      setTimeout(() => {
        setMessage("");
      }, 2000);
      console.log(response);
      if (response.data.ok) {
        setTimeout(() => {
            
            navigate(`/}`);
        }, 2000);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="newPlace__wrapper">
      <div className="container">
        <h1 className={message ? "message" : ""}>
          {message || "Create new Place"}
        </h1>
        <div className="form">
          <form onSubmit={handleSubmit} onChange={handleChange} className="form__fields" action="">
            <div className="form__sides">
              <div className="leftside__fields">
                <input
                  className="form__input"
                  placeholder="Title*"
                  name="title"
                  type="text"
                />

                <input
                  className="form__input"
                  placeholder="Subtitle"
                  name="subtitle"
                  type="text"
                />
                <input
                  className="form__input"
                  placeholder="Header"
                  name="header"
                  type="text"
                />
                <input
                  className="form__input"
                  placeholder="Location*"
                  name="location"
                  type="text"
                />
                <input
                  className="form__input"
                  placeholder="Hours*"
                  name="hours"
                  type="text"
                />
                <input
                  className="form__input"
                  placeholder="Price*"
                  name="price"
                  type="text"
                />
              </div>
              <div className="rightside__fields">
                <textarea
                  className="form__input"
                  placeholder="Description"
                  name="descriptionText"
                  rows="40"
                  cols="40"
                  type="text"
                />
              </div>
            </div>

            <h4>here you could add cover photo</h4>
            <h4>here you could add tags</h4>
            <h4>here you could add photos</h4>

            <button>
              <Button content={"Continue"} />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddNewPlace;
