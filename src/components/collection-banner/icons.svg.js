import React from "react";

export const Expand = () => {
  return (
    <svg
      width="92"
      height="82"
      viewBox="0 0 92 82"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g filter="url(#filter0_d)">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M11.7203 41.0965C12.0154 40.3224 12.8822 39.9341 13.6562 40.2293L45.6306 52.4205L77.6049 40.2293C78.379 39.9341 79.2458 40.3224 79.5409 41.0965C79.836 41.8705 79.4478 42.7373 78.6737 43.0324L46.165 55.4274C45.8208 55.5586 45.4404 55.5587 45.0962 55.4274L12.5875 43.0324C11.8134 42.7373 11.4251 41.8705 11.7203 41.0965Z"
          fill="white"
        />
      </g>
      <defs>
        <filter
          id="filter0_d"
          x="0"
          y="0.000244141"
          width="91.2612"
          height="91.2612"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          />
          <feOffset dy="4" />
          <feGaussianBlur stdDeviation="5.5" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.2 0"
          />
          <feBlend
            mode="normal"
            in2="BackgroundImageFix"
            result="effect1_dropShadow"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow"
            result="shape"
          />
        </filter>
      </defs>
    </svg>
  );
};
