import * as React from "react";
const SVGDashBoard = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={18}
    height={18}
    viewBox="0 0 18 18"
    fill="none"
    {...props}
  >
    <path
      d="M9 5.625H10.125M9 7.875H10.125M4.5 10.125H10.125M4.5 12.375H10.125M12.375 5.625H14.9062C15.3722 5.625 15.75 6.00276 15.75 6.46875V13.5C15.75 14.432 14.9945 15.1875 14.0625 15.1875M12.375 5.625V13.5C12.375 14.432 13.1305 15.1875 14.0625 15.1875M12.375 5.625V3.65625C12.375 3.19026 11.9972 2.8125 11.5312 2.8125H3.09375C2.62776 2.8125 2.25 3.19026 2.25 3.65625V13.5C2.25 14.432 3.00552 15.1875 3.9375 15.1875H14.0625M4.5 5.625H6.75V7.875H4.5V5.625Z"
      stroke="white"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
export default SVGDashBoard;
