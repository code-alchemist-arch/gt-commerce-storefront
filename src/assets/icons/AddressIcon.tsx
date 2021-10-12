import React from "react";

const AddressIcon = ({ width = 32, height = 32, color = "#2A2D34" }) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 60.62 62.66"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g id="Layer_2" data-name="Layer 2">
        <g
          id="shopping_and_e-commerceicons"
          data-name="shopping and e-commerceicons"
        >
          <polygon
            points="59.59 61.63 1.03 61.63 10.99 41.54 49.63 41.54 59.59 61.63"
            fill="none"
            stroke={color}
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2.06"
          />
          <path
            d="M46.93,19.72A16.7,16.7,0,0,0,24.06,4.24a15.56,15.56,0,0,0-9,8.7A16.9,16.9,0,0,0,15.92,28h0L28.16,49.24a2.48,2.48,0,0,0,4.3,0L44.7,28h0A16.44,16.44,0,0,0,46.93,19.72Z"
            fill="none"
            stroke={color}
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2.06"
          />
          <path
            d="M46.93,19.72A16.7,16.7,0,0,0,24.06,4.24a15.56,15.56,0,0,0-9,8.7A16.9,16.9,0,0,0,15.92,28h0L28.16,49.24a2.48,2.48,0,0,0,4.3,0L44.7,28h0A16.44,16.44,0,0,0,46.93,19.72Z"
            fill="none"
            stroke={color}
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2.06"
          />
          <path
            d="M38.42,19.72a8.11,8.11,0,1,1-8.11-8.11A8.11,8.11,0,0,1,38.42,19.72Z"
            fill="none"
            stroke={color}
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2.06"
          />
        </g>
      </g>
    </svg>
  );
};

export default React.memo(AddressIcon);
