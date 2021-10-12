import React from "react";

const ListIcon = ({ width = 32, height = 32, color = "#2A2D34" }) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M24 8.4H9C8.66863 8.4 8.4 8.66863 8.4 9V10C8.4 10.3314 8.66863 10.6 9 10.6H24C24.3314 10.6 24.6 10.3314 24.6 10V9C24.6 8.66863 24.3314 8.4 24 8.4ZM9 7C7.89543 7 7 7.89543 7 9V10C7 11.1046 7.89543 12 9 12H24C25.1046 12 26 11.1046 26 10V9C26 7.89543 25.1046 7 24 7H9Z"
        fill={color}
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M24 15.4H9C8.66863 15.4 8.4 15.6686 8.4 16V17C8.4 17.3314 8.66863 17.6 9 17.6H24C24.3314 17.6 24.6 17.3314 24.6 17V16C24.6 15.6686 24.3314 15.4 24 15.4ZM9 14C7.89543 14 7 14.8954 7 16V17C7 18.1046 7.89543 19 9 19H24C25.1046 19 26 18.1046 26 17V16C26 14.8954 25.1046 14 24 14H9Z"
        fill={color}
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M24 22.4H9C8.66863 22.4 8.4 22.6686 8.4 23V24C8.4 24.3314 8.66863 24.6 9 24.6H24C24.3314 24.6 24.6 24.3314 24.6 24V23C24.6 22.6686 24.3314 22.4 24 22.4ZM9 21C7.89543 21 7 21.8954 7 23V24C7 25.1046 7.89543 26 9 26H24C25.1046 26 26 25.1046 26 24V23C26 21.8954 25.1046 21 24 21H9Z"
        fill={color}
      />
    </svg>
  );
};

export default React.memo(ListIcon);
