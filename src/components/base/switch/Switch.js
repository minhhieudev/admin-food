import React from "react";
import "./style.css";
function Switch({ enable = false, onClick = () => {} }) {
  return (
    <div className="switch-container">
      <div
        onClick={onClick}
        className={enable ? "switch-content-enable" : "switch-content-unenable"}
      >
        <div
          className={enable ? "switch-point-enable" : "switch-point-unenable"}
        />
      </div>
    </div>
  );
}

export default Switch;
