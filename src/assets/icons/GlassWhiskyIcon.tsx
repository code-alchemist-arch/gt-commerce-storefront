import React from "react";

const GlassWhiskyIcon = ({ width = 32, height = 32, color = "#2A2D34" }) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 32 32`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M26.1275 25C26.6094 25 27 24.6213 27 24.1541C27 23.6869 26.6094 23.3082 26.1275 23.3082C25.6456 23.3082 25.2549 23.6869 25.2549 24.1541C25.2549 24.6213 25.6456 25 26.1275 25Z"
        fill={color}
      />
      <path
        d="M23.859 23.6472H23.161C23.2657 23.3765 23.3355 23.0719 23.3355 22.7674V8.28575C23.3355 7.5752 22.7422 7 22.0092 7H5.32626C4.59332 7 4 7.5752 4 8.28575V22.7674C4 23.9855 5.01215 24.9667 6.2686 24.9667H23.8241C24.208 24.9667 24.5221 24.6622 24.4872 24.29C24.5221 23.9178 24.208 23.6472 23.859 23.6472ZM22.0092 15.4251C22.0092 15.4589 21.9743 15.4589 21.9394 15.4928L19.6359 17.7259C19.5661 17.7936 19.4614 17.8274 19.4265 17.8274C19.3916 17.8274 19.2869 17.8274 19.2171 17.7259L17.0532 15.6281C16.9136 15.4928 16.9136 15.3236 17.0532 15.1882L19.3567 12.9551C19.4265 12.8874 19.4963 12.8536 19.5661 12.8536C19.6359 12.8536 19.7406 12.8874 19.7755 12.9551L21.9743 15.0867C22.0092 15.1206 22.0092 15.1206 22.0441 15.1544V15.4251H22.0092ZM16.3203 17.2184C16.4948 17.2184 16.6344 17.3537 16.6344 17.5229V20.5004C16.6344 20.6696 16.4948 20.805 16.3203 20.805H13.0744C12.8999 20.805 12.7603 20.6696 12.7603 20.5004V17.5229C12.7603 17.3537 12.8999 17.2184 13.0744 17.2184H16.3203ZM17.8908 20.5004V18.1658L18.3097 18.5718C18.6238 18.8763 19.0775 19.0455 19.5312 19.0117C19.9151 18.9778 20.299 18.8087 20.5783 18.538L22.0092 17.1507V20.7711H17.8908C17.8908 20.7035 17.8908 20.6019 17.8908 20.5004ZM22.0092 8.79329V13.3949L20.683 12.1092C20.0547 11.5001 19.0775 11.5001 18.4493 12.1092L16.1458 14.3423C15.692 14.7822 15.5524 15.4589 15.7967 16.0341H13.0744C12.2019 16.0341 11.5038 16.7108 11.5038 17.5567V20.5343C11.5038 20.6358 11.5038 20.7373 11.5387 20.8388H5.43097V18.335H9.54935C9.89837 18.335 10.1776 18.0643 10.2125 17.7597C10.2125 17.4214 9.93327 17.1169 9.58426 17.1169H5.43097V8.82713C5.43097 8.55644 5.67528 8.31959 5.95449 8.31959H21.5206C21.7649 8.31959 22.0092 8.5226 22.0092 8.79329ZM6.3384 23.6472C5.84978 23.6472 5.43097 23.2411 5.43097 22.7674V22.1584H22.0092V22.7674C22.0092 23.2411 21.5904 23.6472 21.1018 23.6472H6.3384Z"
        fill={color}
      />
    </svg>
  );
};

export default React.memo(GlassWhiskyIcon);