import React from "react";

const NewProductsIcon = ({ width = 32, height = 32, color = "#2A2D34" }) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 61.91 61.91`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g>
        <g>
          <polyline
            points="33.02 35.02 28.33 36.96 24.85 28.57 29.54 26.63"
            fill="none"
            stroke={color}
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2.06"
          />
          <line
            x1="26.59"
            y1="32.76"
            x2="31.28"
            y2="30.82"
            fill="none"
            stroke={color}
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2.06"
          />
        </g>
        <polyline
          points="17.74 41.34 14.27 32.95 24.29 38.63 20.81 30.24"
          fill="none"
          stroke={color}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2.06"
        />
        <polyline
          points="44.17 20.57 44.91 30.09 38.71 22.83 39.45 32.35 33.24 25.09"
          fill="none"
          stroke={color}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2.06"
        />
      </g>
      <path
        d="M12.12,27.13A19.72,19.72,0,0,1,13.2,23.6a19.49,19.49,0,0,1,1.73-3.25,19,19,0,0,1,2.34-2.89,19.23,19.23,0,0,1,2.9-2.41A19.46,19.46,0,0,1,23.6,13.2a19.06,19.06,0,0,1,7.49-1.46,18.85,18.85,0,0,1,3.69.38,19.72,19.72,0,0,1,3.53,1.08,19.2,19.2,0,0,1,3.26,1.73"
        fill="none"
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2.06"
      />
      <path
        d="M49.79,34.78a19.72,19.72,0,0,1-1.08,3.53A19.2,19.2,0,0,1,47,41.57a19.42,19.42,0,0,1-5.24,5.3,19.73,19.73,0,0,1-3.43,1.84,19.06,19.06,0,0,1-11.18,1.08,19.72,19.72,0,0,1-3.53-1.08A19.49,19.49,0,0,1,20.35,47"
        fill="none"
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2.06"
      />
      <path
        d="M23.5,4.18h0a4.21,4.21,0,0,1,7.73-1h0A4.21,4.21,0,0,0,37.88,4h0a4.21,4.21,0,0,1,7.21,3h0a4.22,4.22,0,0,0,5.33,4.09h0a4.21,4.21,0,0,1,4.75,6.19h0a4.21,4.21,0,0,0,2.56,6.2h0a4.21,4.21,0,0,1,1,7.73h0a4.22,4.22,0,0,0-.87,6.66h0a4.21,4.21,0,0,1-3,7.2h0a4.21,4.21,0,0,0-4.08,5.33h0a4.22,4.22,0,0,1-6.19,4.75h0a4.21,4.21,0,0,0-6.2,2.56h0a4.21,4.21,0,0,1-7.74,1h0A4.21,4.21,0,0,0,24,57.88h0a4.22,4.22,0,0,1-7.21-3h0a4.21,4.21,0,0,0-5.33-4.08h0a4.21,4.21,0,0,1-4.74-6.19h0a4.22,4.22,0,0,0-2.57-6.2h0a4.22,4.22,0,0,1-1-7.74h0A4.2,4.2,0,0,0,4,24H4a4.22,4.22,0,0,1,3-7.21H7a4.22,4.22,0,0,0,4.09-5.33h0A4.21,4.21,0,0,1,17.3,6.75h0A4.22,4.22,0,0,0,23.5,4.18Z"
        fill="none"
        stroke={color}
        strokeMiterlimit="10"
        strokeWidth="2.06"
      />
    </svg>
  );
};

export default React.memo(NewProductsIcon);
