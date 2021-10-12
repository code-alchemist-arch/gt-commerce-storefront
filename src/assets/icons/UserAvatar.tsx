import React from "react";
export const UserAvatar = ({
  width = "25px",
  height = "30px",
  color = "currentColor",
}) => {
  return (
    <svg
      id="user"
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 25.057 30.034"
    >
      <path
        data-name="Path 1"
        d="M94.265,14.467a7,7,0,0,0,5.115-2.119A7,7,0,0,0,101.5,7.233,7,7,0,0,0,99.38,2.119a7.232,7.232,0,0,0-10.229,0,7,7,0,0,0-2.119,5.114,7,7,0,0,0,2.12,5.115A7,7,0,0,0,94.265,14.467Zm0,0"
        transform="translate(-81.926)"
        fill={color}
      />
      <path
        data-name="Path 2"
        d="M25,255.9a17.868,17.868,0,0,0-.243-1.9,14.951,14.951,0,0,0-.467-1.908,9.425,9.425,0,0,0-.784-1.779,6.715,6.715,0,0,0-1.183-1.541,5.215,5.215,0,0,0-1.7-1.068,5.872,5.872,0,0,0-2.169-.393,2.2,2.2,0,0,0-1.176.5c-.352.23-.765.5-1.225.79a7.018,7.018,0,0,1-1.585.7,6.154,6.154,0,0,1-3.877,0,7,7,0,0,1-1.584-.7c-.456-.291-.868-.557-1.226-.79a2.2,2.2,0,0,0-1.175-.5,5.864,5.864,0,0,0-2.169.393,5.211,5.211,0,0,0-1.7,1.068,6.716,6.716,0,0,0-1.182,1.541A9.443,9.443,0,0,0,.77,252.1,14.987,14.987,0,0,0,.3,254.006a17.8,17.8,0,0,0-.243,1.9c-.04.575-.06,1.171-.06,1.774a4.987,4.987,0,0,0,1.481,3.773A5.332,5.332,0,0,0,5.3,262.843H19.759a5.331,5.331,0,0,0,3.816-1.392,4.985,4.985,0,0,0,1.481-3.773C25.057,257.072,25.036,256.475,25,255.9Zm0,0"
        transform="translate(0 -232.809)"
        fill={color}
      />
    </svg>
  );
};