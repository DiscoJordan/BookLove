import React from 'react'


const CircleButton = ({ content }) => {
    const iconMap = {
      "visited_off": "visibility_off",
      "visited": "visibility",
      "wish_off": "favorite",
      "wish": "heart_check",
      "edit": "edit",
      "delete": "delete",
      
    };
    
  
    return (
      <div className={(iconMap[content]==='visibility_off' ||iconMap[content]==='heart_check')? "circle__button active__circle__button": "circle__button "}>
        {iconMap[content] && (
          <span className='material-symbols-outlined'>{iconMap[content]}</span>
        )}
      </div>
    );
  };



export default CircleButton