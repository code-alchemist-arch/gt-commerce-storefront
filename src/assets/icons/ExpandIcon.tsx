import React from "react";

const ExpandIcon = ({ width = 24, height = 26, color = "#2A2D34" }) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 24 26"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M5.30541 9.17318C5.70272 8.78956 6.33579 8.80067 6.7194 9.19798L12 14.6672L17.2806 9.19798C17.6642 8.80067 18.2973 8.78956 18.6946 9.17318C19.0919 9.55679 19.103 10.1899 18.7194 10.5872L12.7194 16.8015C12.531 16.9966 12.2713 17.1069 12 17.1069C11.7287 17.1069 11.469 16.9966 11.2806 16.8015L5.2806 10.5872C4.89699 10.1899 4.90809 9.55679 5.30541 9.17318Z"
        fill={color}
      />
    </svg>
  );
};

export default React.memo(ExpandIcon);
