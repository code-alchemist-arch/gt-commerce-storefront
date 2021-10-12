import React from "react";

const DiscountIcon = ({
  width = 32,
  height = 32,
  color = "#2A2D34",
  variant = 1,
}) => {
  const viewBoxMap = {
    1: "0 0 32 32",
    2: "0 0 73.34 62.14",
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
        <>
          <path
            d="M26.12 12.62l-1.55-2.15.29-1.81c.03-.3-.04-.58-.26-.76l-1.27-1.28 1.49-1.48a.68.68 0 000-.95.68.68 0 00-.94 0l-1.49 1.49-1.34-1.34a.93.93 0 00-.8-.26l-6.74 1.13c-.51.07-.98.32-1.34.69l-7.44 7.44a2.48 2.48 0 000 3.53l6.38 6.39v1.3a2.5 2.5 0 002.5 2.51H24.1a2.5 2.5 0 002.5-2.5v-10.5c0-.5-.14-1.02-.47-1.45zm-14.35 9.44l-6.1-6.1a1.16 1.16 0 010-1.67l7.4-7.45c.18-.18.4-.29.66-.32l6.56-1.1 1.2 1.2-1.17 1.17-.65-.66a.68.68 0 00-.94 0 .68.68 0 000 .95l2.21 2.21a.6.6 0 00.47.18c.18 0 .33-.07.47-.18a.68.68 0 000-.94l-.65-.66 1.16-1.16 1.16 1.16-.04.3-.29 1.81-.72 4.5c-.04.26-.15.48-.33.66l-7.4 7.4c-.21.23-.5.37-.83.37-.32 0-.61-.1-.83-.36l-.65-.65-.7-.66zm13.52 2.5c0 .66-.54 1.2-1.2 1.2H13.62a1.2 1.2 0 01-1.2-1.2v-.03c.44.33.98.51 1.49.51.65 0 1.27-.25 1.77-.73l7.4-7.4c.36-.37.62-.88.69-1.39l.5-3.2.8 1.1c.15.21.22.43.22.69v10.46z"
            fill={color}
          />
          <path
            d="M16.27 16.13c-.85-.85-2.19-.78-3.1.14-.93.92-.93 2.2-.08 3.04.85.85 2.2.78 3.11-.14.85-.85.92-2.19.07-3.04zm-.85.85c.29.28.29.85-.2 1.34-.36.36-.93.64-1.35.22-.36-.36-.21-.92.21-1.35.42-.42.92-.63 1.34-.21zM15.64 12.52c.84-.84.92-2.19.07-3.04-.85-.84-2.2-.77-3.11.15-.92.91-.92 2.19-.08 3.04.85.84 2.13.84 3.12-.15zm-1-.84c-.35.35-.91.63-1.34.2-.35-.35-.21-.91.21-1.34.36-.35.92-.63 1.35-.2.28.28.28.84-.21 1.34zM19.45 14.08c.22-.21.29-.57 0-.85a.55.55 0 00-.56-.14l-9.2 1.41c-.14 0-.2.08-.35.22a.65.65 0 000 .85c.14.14.36.2.57.14l9.2-1.42c.13 0 .2-.07.34-.2z"
            fill={color}
          />
        </>
      )}
      {variant === 2 && (
        <g id="Layer_2" data-name="Layer 2">
          <g
            id="shopping_and_e-commerceicons"
            data-name="shopping and e-commerceicons"
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
          </g>
        </g>
      )}
    </svg>
  );
};

export default React.memo(DiscountIcon);
