import React from "react";
import "./style.css";

function Button(props) {
  const {
    vairant = "primary",
    type = "contained",
    isLoading = false,
    ...otherProps
  } = props;
  return isLoading ? (
    <div className="d-flex">
      <div className="btn btn-disable">
        <div className="loader" />
      </div>
    </div>
  ) : (
    <button
      {...otherProps}
      className={`btn poppins-medium ${
        props.disabled || isLoading ? "btn-disable" : `btn-${type}`
      } ${props?.className}`}
    >
      {otherProps?.icon}
      {otherProps.children}
    </button>
  );
}

export default Button;
