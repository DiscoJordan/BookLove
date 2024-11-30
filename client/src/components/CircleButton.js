import React from "react";

const CircleButton = ({ content }) => {
  const iconMap = {
    visited_off: "credit_card_off",
    visited: "credit_card",
    wish_off: "favorite",
    wish: "heart_broken",
    edit: "edit",
    delete: "delete",
  };

  return (
    <div
      className={
        iconMap[content] === "credit_card_off" ||
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
            {iconMap[content] === "credit_card_off" && "Убрать из купленных"}
            {iconMap[content] === "credit_card" && "Добавить в купленные"}
            {iconMap[content] === "favorite" && "Добавить в список желаемого"}
            {iconMap[content] === "heart_broken" && "Убрать из списка желаемого"}
            {iconMap[content] === "edit" && "Изменить"}
            {iconMap[content] === "delete" && "Удалить"}
          </span>
        </>
      )}
    </div>
  );
};

export default CircleButton;
