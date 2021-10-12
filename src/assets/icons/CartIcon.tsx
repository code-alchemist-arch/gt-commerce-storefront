import React from "react";

const CartIcon = ({
  color = "#2A2D34",
  width = 32,
  height = 32,
  variant = 2,
}) => {
  const viewBoxMap = {
    1: "0 0 32 32",
    2: "0 0 66.45 68.51",
  };
  return (
    <svg
      width={width}
      height={height}
      viewBox={viewBoxMap[variant]}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {variant === 1 && (
        <path
          d="M29.8 9.7a2.9 2.9 0 00-2.3-1.2H13a1 1 0 000 2.2h14.5a.8.8 0 01.7 1L27 19.3c-.1.6-.5 1-1 1H12.6c-.7 0-1.2-.3-1.4-.9L7.5 6.6C7 5 5.5 4 3.9 4H2.1a1 1 0 000 2.2h1.8c.7 0 1.3.4 1.5 1L9.2 20c.3.8.8 1.5 1.4 1.9.6.4 1.2.6 2 .6H26a3.5 3.5 0 003-2.7l1.3-7.6a3 3 0 00-.5-2.5zM16.7 23.8a1 1 0 00-1 1.1c0 .4-.1.8-.4 1-.3.4-.6.5-1 .6-.8 0-1.5-.7-1.5-1.4 0-.6-.6-1-1.2-1a1 1 0 00-1 1.1c.1 2 1.7 3.4 3.6 3.4h.2c1 0 1.9-.4 2.5-1.2.7-.7 1-1.6 1-2.6-.1-.6-.6-1-1.2-1zM26.1 23.8a1 1 0 00-1 1.1 1.5 1.5 0 01-1.4 1.5 1.4 1.4 0 01-1.5-1.4c0-.6-.6-1-1.2-1a1 1 0 00-1 1.1c0 1 .5 1.9 1.1 2.6.7.6 1.6 1 2.5 1h.1a3.6 3.6 0 003.5-3.8c0-.6-.5-1.1-1.1-1.1z"
          fill={color}
        />
      )}
      {variant === 2 && (
        <g id="Layer_2" data-name="Layer 2">
          <g
            id="shopping_and_e-commerceicons"
            data-name="shopping and e-commerceicons"
          >
            <path
              d="M1,1H11.24A4.55,4.55,0,0,1,15.6,4.28l11.9,39.8a2,2,0,0,0,1.93,1.44H61.91"
              fill="none"
              stroke={color}
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2.06"
            />
            <path
              d="M33.87,54.7A4.86,4.86,0,1,1,29,49.84,4.86,4.86,0,0,1,33.87,54.7Z"
              fill="none"
              stroke={color}
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2.06"
            />
            <path
              d="M61.91,54.7a4.86,4.86,0,1,1-4.85-4.86A4.85,4.85,0,0,1,61.91,54.7Z"
              fill="none"
              stroke={color}
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2.06"
            />
            <path
              d="M21.62,9.93H63.11A2,2,0,0,1,65,12.5l-6.58,22a2.93,2.93,0,0,1-2.81,2.09H25.27"
              fill="none"
              stroke={color}
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2.06"
            />
            <line
              x1="64.48"
              y1="14.32"
              x2="59.13"
              y2="32.23"
              fill="none"
              stroke={color}
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2.06"
            />
            <line
              x1="53.01"
              y1="14.32"
              x2="50.33"
              y2="32.23"
              fill="none"
              stroke={color}
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2.06"
            />
            <line
              x1="41.54"
              y1="14.32"
              x2="41.54"
              y2="32.23"
              fill="none"
              stroke={color}
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2.06"
            />
            <line
              x1="30.07"
              y1="14.32"
              x2="32.75"
              y2="32.23"
              fill="none"
              stroke={color}
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2.06"
            />
            <line
              x1="18.61"
              y1="14.32"
              x2="23.95"
              y2="32.23"
              fill="none"
              stroke={color}
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2.06"
            />
          </g>
        </g>
      )}
    </svg>
  );
};

// SVG Cart icon
export default React.memo(CartIcon);
