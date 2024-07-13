import React, { useContext, useEffect, useState, useMemo } from "react";
import { useParams } from "react-router-dom";
import { PlacesContext } from "../context/PlacesContext";
import { UserContext } from "../context/UserContext";
import ManageButtons from "../components/ManageButtons";
import PlaceCard from "../components/PlaceCard";
import Button from "../components/Button";
import { useRef } from "react";
import axios from "axios";
import { URL } from "../config";
import Comment from "../components/Comment";
import { useNavigate } from "react-router-dom";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Autoplay, Pagination, Navigation } from "swiper/modules";

function CurrentPlace() {
  const [comment, setComment] = useState("");
  const progressCircle = useRef(null);
  const progressContent = useRef(null);
  const navigate = useNavigate();
  const onAutoplayTimeLeft = (s,time, progress) => {
    progressCircle.current.style.setProperty("--progress", 1 - progress);
    progressContent.current.textContent = `${Math.ceil(time / 1000)}s`;
  };
  const { places } = useContext(PlacesContext);
  const { user, userData, token, isLoggedIn } = useContext(UserContext);
  const currentPlaceTitle = useParams().title;
  const [placeInfo, setPlaceInfo] = useState("");
  const mapUrl = `https://www.google.com/maps/embed/v1/place?key=${
    process.env.REACT_APP_GOOGLE_MAP
  }
  &q=${placeInfo?.title}
  &zoom=${16}`;
  const otherPlaces = places.filter(
    (place) => place.title !== currentPlaceTitle
  );
  const getPlace = async () => {
    try {
      const response = await axios.get(`${URL}/place/get/${currentPlaceTitle}`);
      if (response.data.data === "Place was not found") {
        navigate("/notFound");
      } else {
        setPlaceInfo(response.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getPlace();
  }, [placeInfo]);

  const randomIndexes = useMemo(
    () => (otherPlaces.length >= 3 ? getRandomIndexes() : []),
    [otherPlaces.length,currentPlaceTitle]
  );
  function getRandomIndexes() {
    let indexes = [];
    for (let i = 0; indexes.length < 3; i++) {
      let random = Math.floor(Math.random() * otherPlaces.length);
      if (!indexes.includes(random)) {
        indexes.push(random);
      }
    }
    return indexes;
  }

  function formatDateTime(date) {
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");

    return `${day}.${month}.${year}, ${hours}:${minutes}`;
  }

  const commentPlace = async (e) => {
    e.preventDefault();
    const currentDateTime = new Date();
    const formattedDateTime = formatDateTime(currentDateTime);
    try {
      axios.defaults.headers.common["Authorization"] = token;
      const response = await axios.post(`${URL}/place/comment`, {
        placeId: placeInfo._id,
        comment: comment,
        date: formattedDateTime,
        userId: userData._id,
      });

      if (response.data.ok) {
        getPlace();
        setComment("");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {
    setComment(e.target.value);
  };
  return (
    <>
      <div className="place__cover">
        <img src={placeInfo?.cover?.photo_url} alt="default-cover" />
        <div className="container">
          <h1>{placeInfo?.title}</h1>
        </div>
      </div>
      <div className="place__wrapper">
        <div className="container">
          <div className="place__subtitle">
            <h2>{placeInfo?.subtitle}</h2>
            <ManageButtons place={placeInfo} />
          </div>
          <div className="place__main__info">
            <div className="place__tags">
              {placeInfo?.tags?.map((tag) => (
                <Button key={tag._id} content={tag.tag} />
              ))}
            </div>
            <hr />
            <div className="place__time">
              <span className="material-symbols-outlined">schedule</span>
            {placeInfo?.hours?.filter(day=>day!=='').filter(day=>day!=='Open 24 hours').length>0?
            <>
            <div className="time__day">
                <h4>Monday</h4>
                <h5 className="orange">
                  {placeInfo?.hours ? placeInfo?.hours[0] : ""}
                </h5>
              </div>
              <div className="time__day">
                <h4>Tuesday</h4>
                <h5 className="orange">
                  {placeInfo?.hours ? placeInfo?.hours[1] : ""}
                </h5>
              </div>
              <div className="time__day">
                <h4>Wednesday</h4>
                <h5 className="orange">
                  {placeInfo?.hours ? placeInfo?.hours[2] : ""}
                </h5>
              </div>
              <div className="time__day">
                <h4>Thursday</h4>
                <h5 className="orange">
                  {placeInfo?.hours ? placeInfo?.hours[3] : ""}
                </h5>
              </div>
              <div className="time__day">
                <h4>Friday</h4>
                <h5 className="orange">
                  {placeInfo?.hours ? placeInfo?.hours[4] : ""}
                </h5>
              </div>
              <div className="time__day">
                <h4>Saturday</h4>
                <h5 className="orange">
                  {placeInfo?.hours ? placeInfo?.hours[5] : ""}
                </h5>
              </div>
              <div className="time__day">
                <h4>Sunday</h4>
                <h5 className="orange">
                  {placeInfo?.hours ? placeInfo?.hours[6] : ""}
                </h5>
              </div>
              </>:
               <div className="time__day_24">
               <h4>Open 24 hours</h4>
             </div>
              }
            </div>
            <hr />
            <div className="place__secondary-info">
              <div className="place__price">
                <span className="material-symbols-outlined">payments</span>
                <h4>
                  {placeInfo?.price !== 0
                    ? "From " + placeInfo?.price + "€"
                    : "Free"}
                </h4>
              </div>
              <div className="place__location">
                <span className="material-symbols-outlined">pin_drop</span>
                <a
                  target="blank"
                  href={
                    `https://www.google.com/maps/search/` + placeInfo?.location
                  }
                >
                  {placeInfo?.location}
                </a>
              </div>
              {placeInfo?.website && (
                <div className="place__website">
                  <span className="material-symbols-outlined">language</span>
                  <a target="blank" href={placeInfo?.website}>
                    Website
                  </a>
                </div>
              )}
            </div>
            <hr />
          </div>
          <h3>{placeInfo?.description?.header}</h3>
          <p>{placeInfo?.description?.descriptionText}</p>
        </div>
        <div className="container">
          {placeInfo?.photos?.length > 1 && (
            <>
            <h3>Photos</h3>
            <hr color="black" />
            <Swiper
              style={{
                "--swiper-pagination-color": "#FF471F",
                "--swiper-navigation-color": "#FF471F",
              }}
              spaceBetween={0}
              centeredSlides={true}
              autoplay={{
                delay: 3000,
                disableOnInteraction: false,
              }}
              navigation={true}
              pagination={{
                clickable: true,
              }}
              modules={[Autoplay, Pagination, Navigation]}
              onAutoplayTimeLeft={onAutoplayTimeLeft}
              className="mySwiper"
            >
              {placeInfo?.photos?.map((photo, index) => (
                <SwiperSlide key={index}>
                  <img
                    src={photo.photo_url}
                    alt={`Slide ${index}`}
                    style={{ width: "100%" }}
                  />
                </SwiperSlide>
              ))}
              <div className="autoplay-progress" slot="container-end">
                <svg viewBox="0 0 48 48" ref={progressCircle}>
                  <circle cx="24" cy="24" r="20"></circle>
                </svg>
                <span ref={progressContent}></span>
              </div>
            </Swiper>
            </>
          )}
        </div>
        <div className="container">
          <h3>On map</h3>
          <hr color="black" />
          <iframe
            width="100%"
            height="500px"
            style={{ border: 0 }}
            src={mapUrl}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
          {randomIndexes.length ? (
            <>
              <h3>You may also like</h3>
              <hr color="black" />
              <div className="grid__places">
                {otherPlaces.map((place, id) => {
                  if (randomIndexes.includes(id)) {
                    return <PlaceCard key={place._id} user={user} place={place} />;
                  }
                })}
              </div>
            </>
          ) : null}
          <h3>Comments</h3>
          <hr color="black" />
          {isLoggedIn ? (
            <form onSubmit={commentPlace} className="comments">
              <textarea
                value={comment}
                onChange={handleChange}
                className="navigation__button"
              ></textarea>
              <button>
                <Button content={"Post comment"} />
              </button>
            </form>
          ) : (
            <button onClick={()=>navigate('/login')}>
              <Button content={"Log In to post comments"} />
            </button>
          )}
          {placeInfo?.comments?.length ? (
            placeInfo?.comments?.map((comment) => {
              return (
                <Comment
                  key={comment._id}
                  comment={comment}
                  placeId={placeInfo?._id}
                  getPlace={getPlace}
                />
              );
            })
          ) : (
            <h3>There is no any comments</h3>
          )}
        </div>
      </div>
    </>
  );
}
export default CurrentPlace;
