import React from "react";
import "./Button.css";
const Button = ({ text, type, onClick }) => {
  const buttonType = ["positive", "negative"].includes(type) ? type : "default";
  return (
    <button
      className={["Button", `Button_${buttonType}`].join(" ")}
      onClick={onClick}
    >
      {text}
    </button>
  );
};
Button.defaultProps = {
  type: "default",
};

export default Button;
