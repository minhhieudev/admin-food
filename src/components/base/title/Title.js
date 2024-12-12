import React from "react";
import "./style.css";

function Title({ children }) {
  return (
    <div className="title-container">
      <span className="title-content">{children}</span>
    </div>
  );
}

export default Title;
