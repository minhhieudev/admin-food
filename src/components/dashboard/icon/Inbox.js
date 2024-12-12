import * as React from "react";
import "./style.css";
const SVGInbox = (props) => (
  <div className="icon-inbox">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={16}
      height={16}
      viewBox="0 0 16 16"
      fill="none"
      {...props}
    >
      <path
        d="M1.5 9H4.07295C4.64111 9 5.1605 9.321 5.41459 9.82918L5.58541 10.1708C5.8395 10.679 6.35889 11 6.92705 11H9.07295C9.64111 11 10.1605 10.679 10.4146 10.1708L10.5854 9.82918C10.8395 9.321 11.3589 9 11.9271 9H14.5M1.5 9.22555V12C1.5 12.8284 2.17157 13.5 3 13.5H13C13.8284 13.5 14.5 12.8284 14.5 12V9.22555C14.5 9.07602 14.4776 8.92734 14.4337 8.78442L12.8258 3.55887C12.6321 2.92948 12.0506 2.5 11.3921 2.5H4.60786C3.94935 2.5 3.36785 2.92948 3.17419 3.55887L1.56633 8.78442C1.52236 8.92734 1.5 9.07602 1.5 9.22555Z"
        stroke="white"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  </div>
);
export default SVGInbox;
