import React from "react";

const PercentOffIcon = ({ width = 24, height = 24, color = "#2A2D34" }) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 73.34 62.14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12.23,5.54v24.6a4.51,4.51,0,0,0,1.32,3.19L40,59.79a4.51,4.51,0,0,0,6.38,0L71,35.2a4.51,4.51,0,0,0,0-6.38L44.52,2.35A4.52,4.52,0,0,0,41.33,1H16.74A4.51,4.51,0,0,0,12.23,5.54Z"
        fill={color}
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2.06"
      />
      <circle
        cx="27.71"
        cy="16.52"
        r="5.87"
        fill={color}
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2.06"
      />
      <path
        d="M3.1,16.52c0,4.26,5.52,7.71,12.32,7.71s12.33-3.45,12.33-7.71"
        fill="none"
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="6.19"
      />
      <path
        d="M12.26,9.08C7,10,3.1,13,3.1,16.52c0,4.26,5.52,7.71,12.32,7.71s12.33-3.45,12.33-7.71a6.19,6.19,0,0,0-2.7-4.8"
        fill="none"
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2.06"
      />
      <path
        d="M29.26,29.2a4.93,4.93,0,1,0,7,0A4.94,4.94,0,0,0,29.26,29.2Z"
        fill={color}
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2.06"
      />
      <path
        d="M49.58,29.29a4.93,4.93,0,1,0,7,0A4.92,4.92,0,0,0,49.58,29.29Z"
        fill={color}
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2.06"
      />
      <line
        x1="42.94"
        y1="16.65"
        x2="42.94"
        y2="48.76"
        fill={color}
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2.06"
      />
    </svg>
  );
};

// SVG plus icon
export default React.memo(PercentOffIcon);
