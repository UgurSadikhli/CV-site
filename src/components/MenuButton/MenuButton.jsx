import React from "react";
import "./MenuButton.css";

const MenuButton = ({ onClick }) => {
  const handleClick = () => {
    onClick();
  };
  return (
    <div class="paste-button">
      <button class="button-p">
        {" "}
        <svg
          fill="currentColor"
          viewBox="0 0 24 24"
          className="burger-icon"
          onClick={handleClick}
        >
          <path d="M3 6h18v2H3zm0 5h18v2H3zm0 5h18v2H3z" />
        </svg>
      </button>
      <div className="dropdown-content">
        <a id="top" onClick={handleClick} >
         Exit
        </a>
      </div>
    </div>
  );
};

export default MenuButton;
