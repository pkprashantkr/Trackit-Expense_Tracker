import React from "react";
import "./style.css";

function Button({ text, onClick, blue, disabled }) {
  // passing fields as props
  return (
    <div
      className={blue ? "btn btn-blue" : "btn"} // ternary operator for buttons
      onClick={onClick}
      disabled={disabled} // to make buttons non-clickable while submitting.
    >
      {text}
    </div>
  );
}

export default Button;
