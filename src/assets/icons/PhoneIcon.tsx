import React from "react";

const PhoneIcon = ({ width = 32, height = 32, color = "#2A2D34" }) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 57.3 57.29"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g id="Layer_2" data-name="Layer 2">
        <g
          id="shopping_and_e-commerceicons"
          data-name="shopping and e-commerceicons"
        >
          <path
            d="M27.51,15.35A14.42,14.42,0,0,1,41.94,29.78"
            fill="none"
            stroke={color}
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2.06"
          />
          <path
            d="M27.52,8.19A21.59,21.59,0,0,1,49.1,29.78"
            fill="none"
            stroke={color}
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2.06"
          />
          <path
            d="M27.51,1A28.75,28.75,0,0,1,56.26,29.78"
            fill="none"
            stroke={color}
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2.06"
          />
          <path
            d="M4.43,8.92h0c-7,7-2.83,22.51,9.3,34.64s27.65,16.3,34.64,9.31c2.12-2.12,3.09-6.94,3.09-6.94a1.81,1.81,0,0,0-1-2l-12.7-5.08a2.45,2.45,0,0,0-2.38.54L31.67,43.1a2.27,2.27,0,0,1-2.51.52l-.19-.1-.08-.05A38.05,38.05,0,0,1,20.35,37a38.27,38.27,0,0,1-6.53-8.54s0-.05,0-.08a1.14,1.14,0,0,1-.1-.19,2.26,2.26,0,0,1,.51-2.52l3.68-3.68a2.39,2.39,0,0,0,.54-2.38L13.34,6.86a1.83,1.83,0,0,0-2-1S6.55,6.8,4.43,8.92Z"
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

export default React.memo(PhoneIcon);
