import React from "react";
import "./EmotionItem.css";
const EmotionItem = ({ id, img, name, onClick, isSelected }) => {
  const handleOnClick = () => {
    onClick(id);
  };
  return (
    <div
      className={[
        "EmotionItem",
        isSelected ? `EmotionItem_on_${id}` : "EmotionItem_off",
      ].join(" ")}
    >
      <img src={img} alt={`emotion_${id}`} onClick={handleOnClick} />
      <span>{name}</span>
    </div>
  );
};

export default EmotionItem;
