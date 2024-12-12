import React from "react";
import "./style.css";
function Section({ title, children }) {
  return (
    <div className="section-container">
      <div className="section-title poppins-medium">{title}</div>
      <div className="section-content">{children}</div>
    </div>
  );
}

export default Section;
