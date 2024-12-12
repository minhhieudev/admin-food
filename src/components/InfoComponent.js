import React from "react";
import { useContainerDimensions } from "../app/hooks";
import "./init.css";
import "react-toastify/dist/ReactToastify.css";
function InfoComponent() {
  const { width, height } = useContainerDimensions(window);

  return (
    <div
      className="info-container"
      style={{
        width,
        height,
      }}
    >
      <img
        alt="admin"
        style={{
          position: "absolute",
          alignItems: "center",
          justifyContent: "center",
        }}
        width={100}
        height={100}
        src={require("../images/logo.webp")}
      />
    </div>
  );
}

export default InfoComponent;
