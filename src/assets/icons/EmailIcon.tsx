import React from "react";

const EmailIcon = ({ width = 25, height = 25, color = "#2A2D34" }) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 25 25"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M20.362 4H3.64432C2.18867 4 1 5.21151 1 6.70808V18.2919C1 19.782 2.18867 21 3.64432 21H14.1707C14.6157 21 14.978 20.6307 14.978 20.1772C14.978 19.7237 14.6157 19.3544 14.1707 19.3544H3.64432C3.07223 19.3544 2.6082 18.8815 2.6082 18.2919V7.20694L9.5559 12.513C10.2488 13.0442 11.0815 13.3034 11.9078 13.3034C12.7342 13.3034 13.5669 13.0377 14.2534 12.513L21.3918 7.07736V18.2919C21.3918 18.875 20.9277 19.3544 20.3557 19.3544H19.0843C18.6394 19.3544 18.2771 19.7237 18.2771 20.1772C18.2771 20.6307 18.6394 21 19.0843 21H20.3557C21.8177 21 23 19.7885 23 18.2919V6.70808C23.0063 5.21151 21.8177 4 20.362 4ZM13.2999 11.1913C12.4799 11.8133 11.3421 11.8133 10.5221 11.1913L3.32649 5.69741C3.4282 5.66502 3.53626 5.64558 3.65068 5.64558H20.362C20.4319 5.64558 20.4955 5.65206 20.5591 5.66502L13.2999 11.1913Z"
        fill={color}
      />
    </svg>
  );
};

export default React.memo(EmailIcon);