import React, { useContext } from "react";
import { useParams } from "react-router-dom";
import { PlacesContext } from "../context/PlacesContext";
import { UserContext } from "../context/UserContext";
import ManageButtons from "../components/ManageButtons";
import PlaceCard from "../components/PlaceCard";
import Button from "../components/Button";
import { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
function CurrentPlace() {
  const key = process.env.REACT_APP_GOOGLE_MAP
  console.log(key);
  const progressCircle = useRef(null);
  const progressContent = useRef(null);
  const onAutoplayTimeLeft = (s, time, progress) => {
    progressCircle.current.style.setProperty("--progress", 1 - progress);
    progressContent.current.textContent = `${Math.ceil(time / 1000)}s`;
  };
  const { places, setCurrentPlace, currentPlace } = useContext(PlacesContext);
  const { user } = useContext(UserContext);
  const currentPlaceTitle = useParams().title;
  const placeInfo = places.find((place) => place.title === currentPlaceTitle);
  const mapUrl = `https://www.google.com/maps/embed/v1/place?key=${key}
  &q=${placeInfo?.title}
  &zoom=${18}`;
  const otherPlaces = places.filter(
    (place) => place.title !== currentPlaceTitle
  );
  setCurrentPlace(places.find((place) => place.title === currentPlaceTitle));
  const randomIndexes = otherPlaces.length >= 3 ? getRandomIndexes() : [];
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
  return (
    <>
      <div className="place__cover">
        <img src={currentPlace?.cover?.photo_url} alt="default cover" />
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
              {placeInfo?.tags.map((tag) => (
                <Button content={tag.tag} />
              ))}
            </div>
            <hr />
            <div className="place__time">
              <span class="material-symbols-outlined">schedule</span>
              <div className="time__day">
                <h4>Monday</h4>
                <h4 className="orange">{placeInfo?.hours[0]}</h4>
              </div>
              <div className="time__day">
                <h4>Tuesday</h4>
                <h4 className="orange">{placeInfo?.hours[1]}</h4>
              </div>
              <div className="time__day">
                <h4>Wednesday</h4>
                <h4 className="orange">{placeInfo?.hours[2]}</h4>
              </div>
              <div className="time__day">
                <h4>Thursday</h4>
                <h4 className="orange">{placeInfo?.hours[3]}</h4>
              </div>
              <div className="time__day">
                <h4>Friday</h4>
                <h4 className="orange">{placeInfo?.hours[4]}</h4>
              </div>
              <div className="time__day">
                <h4>Saturday</h4>
                <h4 className="orange">{placeInfo?.hours[5]}</h4>
              </div>
              <div className="time__day">
                <h4>Sunday</h4>
                <h4 className="orange">{placeInfo?.hours[6]}</h4>
              </div>
            </div>
            <hr />
            <div className="place__secondary-info">
              <div className="place__price">
                <span class="material-symbols-outlined">payments</span>
                <h4>
                  {placeInfo?.price !== 0
                    ? "From " + placeInfo?.price + "€"
                    : "Free"}
                </h4>
              </div>
              <div className="place__location">
                <span class="material-symbols-outlined">pin_drop</span>
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
                  <span class="material-symbols-outlined">language</span>
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
          {currentPlace?.photos?.length > 1 && (
            <Swiper
              style={{
                "--swiper-pagination-color": "#FF471F",
                "--swiper-navigation-color": "#FF471F",
              }}
              spaceBetween={0}
              centeredSlides={true}
              autoplay={{
                delay: 2500,
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
              {currentPlace?.photos?.map((photo, index) => (
                <SwiperSlide key={index}>
                  <img
                    src={photo.photo_url}
                    alt={`Slide ${index}`}
                    style={{ width: "100%" }}
                  />
                </SwiperSlide>
              ))}
              <div className="autoplay-progress" slot="container-end">
                <svg viewBox="0 0 48px 48px" ref={progressCircle}>
                  <circle cx="24" cy="24" r="20"></circle>
                </svg>
                <span ref={progressContent}></span>
              </div>
            </Swiper>
          )}
        </div>
        <div className="container">
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
                    return <PlaceCard user={user} place={place} />;
                  }
                })}
              </div>
            </>
          ) : null}
        </div>
      </div>
    </>
  );
}
export default CurrentPlace;