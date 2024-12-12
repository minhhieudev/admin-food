import React from "react";
import "./style.css";
import MST from "../..";
import { useContainerDimensions } from "../../../app/hooks";

function Container({ children, title, right }) {
  const { width, height } = useContainerDimensions(window);

  return (
    <div className="cn-container">
      <div className="cn-title-container">
        <MST.Title>{title}</MST.Title>
        <div>{right}</div>
      </div>
      <div
        className="cn-content"
        style={{
          height: height - 182,
          // width: width - 440,
          overflow: "auto",
        }}
      >
        {children}
      </div>
    </div>
  );
}

export default Container;
