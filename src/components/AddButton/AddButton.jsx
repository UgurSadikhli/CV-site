import React from "react";
import "./AddButton.css";

const AddButton = ({ onClick }) => {
  const handleClick = () => {
    onClick();
  };
  return (
    <button class="button-add" onClick={handleClick}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="25"
        viewBox="0 0 20 20"
        height="25"
        fill="none"
        class="svg-icon"
      >
        <g
          stroke-width="1.5"
          stroke-linecap="round"
          stroke="#fff"
          className="svgAdd"
        >
          <circle r="7.5" cy="10" cx="10"></circle>
          <path d="m9.99998 7.5v5"></path>
          <path d="m7.5 9.99998h5"></path>
        </g>
      </svg>
      <span class="lable-add">Əlavə et</span>
    </button>
  );
};

export default AddButton;
