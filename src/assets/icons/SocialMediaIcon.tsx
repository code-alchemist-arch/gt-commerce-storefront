import React from "react";

const SocialMediaIcon = ({ width = 32, height = 32, color = "#2A2D34" }) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 46 45.25`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect
        x="1"
        y="18.25"
        width="10"
        height="26"
        rx="3"
        fill="none"
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
      <path
        d="M11,34.25a10,10,0,0,0,10,10H39.5a3.52,3.52,0,0,0,3.5-3.5h0a3.51,3.51,0,0,0-3.5-3.5h1a3.5,3.5,0,0,0,0-7h1a3.52,3.52,0,0,0,3.5-3.5h0a3.5,3.5,0,0,0-3.5-3.5c.15,0-4.23,0-4.09,0H41.5c.22,0,.69-.07.7-.07a3.5,3.5,0,0,0-.7-6.93H28A11.57,11.57,0,0,0,29.21,4.31C27.89,1.42,25.69,1,24.82,1c-2.74,0-2,4-2.78,6.37-2.6,8.12-8.31,13.88-11,13.88Z"
        fill="none"
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      />
    </svg>
  );
};

export default React.memo(SocialMediaIcon);
