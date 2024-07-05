import React, { useContext, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { PlacesContext } from "../context/PlacesContext";
import { TagsContext } from "../context/TagsContext";
import PlaceCard from "../components/PlaceCard";
import Button from "../components/Button";
import Paginationcards from "@mui/material/Pagination";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Autoplay, Pagination } from "swiper/modules";

function Places() {
  const { places } = useContext(PlacesContext); // getPlaces
  const { tags } = useContext(TagsContext);
  const [searchData, setSearchData] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [checkedTags, setCheckedTags] = useState(tags.map(() => false));
  //
  const progressCircle = useRef(null);
  const progressContent = useRef(null);
  const onAutoplayTimeLeft = (s, time, progress) => {
    progressCircle.current.style.setProperty("--progress", 1 - progress);
    progressContent.current.textContent = `${Math.ceil(time / 1000)}s`;
  };
  const [page, setPage] = useState(1);
  const itemsPerPage = 12;

  // Calculate the index range for the items to display
  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const handleChangePage = (event, value) => {
    setPage(value);
  };

  const handleCheckbox = (event) => {
    const { value, checked } = event.target;
    const index = tags.findIndex((tag) => tag.tagTitle === value);
    const newCheckedTags = [...checkedTags];
    newCheckedTags[index] = checked;
    setCheckedTags(newCheckedTags);
    setIsOpen(false);
    setPage(1);
  };

  const toggleCheckBox = (tagTitle) => {
    const index = tags.findIndex((tag) => tag.tagTitle === tagTitle);
    const newCheckedTags = [...checkedTags];
    newCheckedTags[index] = !newCheckedTags[index];
    setCheckedTags(newCheckedTags);
  };

  const handleSearch = (e) => {
    setSearchData(e.target.value);
    setPage(1);
  };

  const filteredList = places.filter((place) => {
    const matchesSearch = place.title
      .toLowerCase()
      .includes(searchData.toLowerCase());
    const matchesTags = checkedTags.some((checked, index) => {
      if (checked) {
        return place.tags.some((tagObj) => tagObj.tag === tags[index].tagTitle);
      }
      return false;
    });
    return matchesSearch && (matchesTags || !checkedTags.includes(true));
  });

  const currentPlaces = filteredList.slice(startIndex, endIndex);

  return (
    <>
      <Swiper
        style={{
          "--swiper-pagination-color": "#FF471F",
        }}
        spaceBetween={0}
        centeredSlides={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        modules={[Autoplay, Pagination]}
        onAutoplayTimeLeft={onAutoplayTimeLeft}
        className="mySwiper"
      >
        <SwiperSlide>
          <div className="firstslide">
            <img src="/images/slidersvg.svg" alt="default avatar" />
            <h4>
              WELCOME TO <span className="orange"> BARCELONA</span>
            </h4>
            <Link to={"/registration"}>
              <Button reversed={true} content={"Explore Barcelona with us"} />
            </Link>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="firstslide">
            <img src="/images/slidersvg.svg" alt="default avatar" />
            <h4>
              WELCOME TO <span className="orange"> BARCELONA</span>
            </h4>
            <Link to={"/registration"}>
              <Button reversed={true} content={"Explore Barcelona with us"} />
            </Link>
          </div>
        </SwiperSlide>

        <div className="autoplay-progress" slot="container-end">
          <svg viewBox="0 0 48 48" ref={progressCircle}>
            <circle cx="24" cy="24" r="20"></circle>
          </svg>
          <span ref={progressContent}></span>
        </div>
      </Swiper>
      <div className="places__wrapper">
        <div className="container">
          <div className="places__filtering">
            <div className="filter__header">
              <div className="navigation__button">
                <span className="material-symbols-outlined">search</span>
                <input
                  onChange={handleSearch}
                  type="text"
                  placeholder="Search"
                />
              </div>
              <div className="dropdown">
                <button
                  onClick={() => (isOpen ? setIsOpen(false) : setIsOpen(true))}
                >
                  <Button
                    content={"Select tags"}
                    arrow={isOpen ? "up" : "down"}
                  />
                </button>
                <div
                  className={
                    isOpen ? "dropdown__options" : "dropdown__options hide"
                  }
                >
                  {tags.map((tag, index) => (
                    <div className="dropdown__option">
                      <label className={checkedTags[index] ? "active" : ""}>
                        <input
                          type="checkbox"
                          onChange={handleCheckbox}
                          value={tag.tagTitle}
                          name={tag.tagTitle}
                          checked={checkedTags[index]}
                        />
                        {tag.tagTitle}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <hr />
            <div className="filter__tags">
              {tags.map(
                (tag, index) =>
                  checkedTags[index] && (
                    <button onClick={() => toggleCheckBox(tag.tagTitle)}>
                      <Button content={tag.tagTitle} close={true} />
                    </button>
                  )
              )}
            </div>
          </div>
          {filteredList.length > 0 ? (
            <>
              <div className="grid__places">
                {currentPlaces.map((place) => (
                  <PlaceCard place={place} />
                ))}
              </div>

              <Paginationcards
                className="pagination"
                count={Math.ceil(filteredList.length / itemsPerPage)}
                page={page}
                onChange={handleChangePage}
                variant="outlined"
                shape="rounded"
              />
            </>
          ) : (
            <h1>Nothing found for the request</h1>
          )}
        </div>
      </div>
    </>
  );
}

export default Places;
