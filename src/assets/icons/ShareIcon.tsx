import React from "react";

const ShareIcon = ({ width = 27, height = 27, color = "#2A2D34" }) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 27 27"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M5.55176 13.2012V21.7592C5.55176 22.3266 5.77717 22.8708 6.1784 23.272C6.57964 23.6733 7.12383 23.8987 7.69126 23.8987H20.5282C21.0957 23.8987 21.6399 23.6733 22.0411 23.272C22.4423 22.8708 22.6677 22.3266 22.6677 21.7592V13.2012"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M18.389 6.78388L14.1101 2.50488L9.83105 6.78388"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M14.1104 2.50488V16.4116"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default React.memo(ShareIcon);
