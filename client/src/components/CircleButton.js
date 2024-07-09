import React from "react";

const CircleButton = ({ content }) => {
  const iconMap = {
    visited_off: "visibility_off",
    visited: "visibility",
    wish_off: "favorite",
    wish: "heart_broken",
    edit: "edit",
    delete: "delete",
  };

  return (
    <div
      className={
        iconMap[content] === "visibility_off" ||
        iconMap[content] === "heart_broken"
          ? "circle__button active__circle__button"
          : "circle__button "
      }
    >
      {iconMap[content] && (
        <>
          {" "}
          <span className="material-symbols-outlined">{iconMap[content]}</span>
          <span className="tooltiptext">
            {iconMap[content] === "visibility_off" && "Remove from visited"}
            {iconMap[content] === "visibility" && "Add to visited"}
            {iconMap[content] === "favorite" && "Add to wishes"}
            {iconMap[content] === "heart_broken" && "Remove from wishes"}
            {iconMap[content] === "edit" && "Edit"}
            {iconMap[content] === "delete" && "Delete"}
          </span>
        </>
      )}
    </div>
  );
};

export default CircleButton;
