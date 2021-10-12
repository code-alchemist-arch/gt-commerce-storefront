import React from "react";

const Plus = ({ width = 24, height = 24, color = "#2A2D34" }) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M11.418 16.166C11.418 16.5802 11.7538 16.916 12.168 16.916C12.5822 16.916 12.918 16.5802 12.918 16.166V12.75H16.3333C16.7475 12.75 17.0833 12.4142 17.0833 12C17.0833 11.5858 16.7475 11.25 16.3333 11.25H12.918V7.8327C12.918 7.41849 12.5822 7.0827 12.168 7.0827C11.7538 7.0827 11.418 7.41849 11.418 7.8327V11.25H8C7.58579 11.25 7.25 11.5858 7.25 12C7.25 12.4142 7.58579 12.75 8 12.75H11.418V16.166Z"
        fill={color}
      />
    </svg>
  );
};

// SVG plus icon
export default React.memo(Plus);
