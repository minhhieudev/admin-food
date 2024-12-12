import React, { useEffect, useState } from "react";
import "./style.css";
function Input(props) {
  const {containerClassName, errorContainerClassName, errorTextClassName, ...otherPropInput} = props
  return (
    <div className={containerClassName}>
      <div
        className={`input-container ${
          props?.errorMessage
            ? "input-container-has-error"
            : "input-container-no-error"
        }`}
        style={{
          ...props.style,
        }}
      >
        {props.left && (
          <div
            className="input-left"
            style={{
              backgroundColor: props?.disabled ? "#FAFAFA" : "white",
            }}
          >
            {props.left}
          </div>
        )}
        <input
          className="input-content"
          style={{
            ...props.inputStyle,
          }}
          {...otherPropInput}
        />
        {props.right && (
          <div
            className="input-right"
            style={{
              backgroundColor: props?.disabled ? "#FAFAFA" : "white",
            }}
          >
            {props.right}
          </div>
        )}
      </div>

      {props?.errorMessage && (
        <div className={`text-right ${errorContainerClassName}`}>
          <span className={`input-error-message ${errorTextClassName}`}>{props?.errorMessage}</span>
        </div>
      )}
    </div>
  );
}

export default Input;
