import React from "react";

const GiftIcon = ({ width = 32, height = 32, color = "#2A2D34" }) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 32 32`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M26.346 10.4206C26.3026 9.59566 25.9557 8.81411 25.4353 8.20624C24.698 7.38127 23.6572 6.90366 22.5296 6.90366H22.0959V6.16553C22.0959 2.77883 19.3203 0 15.9375 0C12.5548 0 9.77923 2.77883 9.77923 6.16553V6.90366H9.43226C8.47816 6.90366 7.52406 7.25102 6.83016 7.94573C6.13627 8.59701 5.70257 9.50882 5.61584 10.464L4.22805 27.8752C4.14131 28.787 4.44488 29.6988 4.96531 30.4369H3.10046C2.66678 30.4369 2.31984 30.7843 2.31984 31.2185C2.31984 31.6526 2.66678 32 3.10046 32H23.9174C25.0016 32 25.9991 31.5658 26.7363 30.7843C27.4736 30.0027 27.8205 28.9607 27.7338 27.8752L26.346 10.4206ZM25.5654 29.6554C25.1317 30.133 24.5245 30.3935 23.9174 30.3935H8.00111C7.35058 30.3935 6.78679 30.133 6.35311 29.6554C5.91942 29.1777 5.70258 28.5699 5.74595 27.962L7.13374 10.5509C7.22047 9.37856 8.21796 8.46676 9.38891 8.46676H9.73585V10.5509C9.73585 10.9851 10.0828 11.3324 10.5165 11.3324C10.9502 11.3324 11.2971 10.9851 11.2971 10.5509V6.12212C11.2971 3.6038 13.3788 1.51967 15.8942 1.51967C18.4096 1.51967 20.4913 3.6038 20.4913 6.12212V6.86024H14.1161C13.6824 6.86024 13.3354 7.2076 13.3354 7.64179C13.3354 8.07598 13.6824 8.42334 14.1161 8.42334H20.4913V10.5509C20.4913 10.9851 20.8382 11.3324 21.2719 11.3324C21.7056 11.3324 22.0525 10.9851 22.0525 10.5509V8.42334H22.4862C23.1367 8.42334 23.7439 8.72727 24.1776 9.20488C24.4812 9.59566 24.698 10.0299 24.7414 10.5075L26.1292 27.9186C26.2159 28.5699 25.9991 29.1777 25.5654 29.6554Z"
        fill={color}
      />
      <path
        d="M20.3605 15.0233C20.3605 14.8496 20.187 14.7193 20.0135 14.7193H19.4931C19.4064 14.7193 19.3197 14.7628 19.2329 14.8496C19.1895 14.9364 19.1462 15.0233 19.1462 15.1101C19.2329 15.8917 19.2763 16.5429 19.3197 17.1074C19.3197 18.1929 18.7558 18.931 18.3222 19.3218C17.715 19.8862 16.8476 20.1902 16.0236 20.1902C15.1996 20.1902 14.3322 19.8862 13.7251 19.3218C13.2914 18.931 12.7276 18.1929 12.7276 17.1074C12.771 16.5429 12.8143 15.8482 12.9011 15.1101C12.9011 15.0233 12.9011 14.9364 12.8144 14.8496C12.771 14.7628 12.6409 14.7193 12.5541 14.7193H12.0337C11.8602 14.7193 11.7301 14.8496 11.6867 15.0233C11.6 15.8048 11.5567 16.4995 11.5133 17.064C11.5133 17.064 11.5133 17.064 11.5133 17.1074C11.5133 18.2363 11.947 19.2349 12.6842 20.0165C13.3781 20.7546 14.3322 21.2322 15.3731 21.3625C15.3731 21.3625 15.4165 21.3625 15.4165 21.4059V24.0545C15.4165 24.0545 15.4165 24.0979 15.3731 24.0979H13.8118C13.6383 24.0979 13.4649 24.2282 13.4649 24.4018V24.9663C13.4649 25.14 13.595 25.2702 13.8118 25.2702H18.2354C18.4089 25.2702 18.5824 25.14 18.5824 24.9663V24.4018C18.5824 24.2282 18.4523 24.0979 18.2354 24.0979H16.6742C16.6742 24.0979 16.6308 24.0979 16.6308 24.0545V21.4059C16.6308 21.4059 16.6308 21.3625 16.6742 21.3625C17.715 21.2322 18.6691 20.7546 19.363 20.0165C20.1437 19.2349 20.534 18.2363 20.534 17.1074C20.534 17.1074 20.534 17.1074 20.534 17.064C20.4906 16.4995 20.4472 15.8048 20.3605 15.0233Z"
        fill={color}
      />
      <path
        d="M16.8051 19.583C16.8485 19.583 16.9353 19.583 16.9786 19.5396C17.9327 19.1922 18.5833 18.3672 18.7567 17.412C18.8435 16.9344 18.7567 16.5436 18.7567 16.2831V16.2397C18.7567 16.1094 18.67 15.9792 18.5399 15.8923C18.4098 15.8055 18.2797 15.7621 18.1496 15.8055C17.846 15.8489 17.6725 16.1094 17.7159 16.4134V16.5002C17.7593 16.7173 17.8026 16.9778 17.7159 17.3252C17.6292 17.933 17.2388 18.4107 16.6317 18.6277C16.5016 18.6712 16.4148 18.758 16.3281 18.8883C16.2414 19.0185 16.2414 19.1488 16.3281 19.279C16.4148 19.4527 16.5883 19.583 16.8051 19.583Z"
        fill={color}
      />
      <path
        d="M30.1297 11.2475C30.36 10.7572 30.9445 10.5462 31.4352 10.7763C31.926 11.0065 32.1371 11.5905 31.9068 12.0809C31.6765 12.5713 31.092 12.7822 30.6012 12.5521C30.1105 12.322 29.8994 11.7379 30.1297 11.2475Z"
        fill={color}
      />
      <path
        d="M0.0932143 8.41242C0.323514 7.92205 0.908026 7.71108 1.39876 7.94121C1.88949 8.17134 2.10062 8.75541 1.87032 9.24578C1.64002 9.73615 1.05551 9.94711 0.564773 9.71699C0.0740391 9.48686 -0.137085 8.90278 0.0932143 8.41242Z"
        fill={color}
      />
      <path
        d="M4.37209 3.91835C4.60239 3.42799 5.1869 3.21702 5.67763 3.44715C6.16837 3.67727 6.37949 4.26135 6.14919 4.75172C5.91889 5.24209 5.33438 5.45305 4.84365 5.22292C4.35291 4.9928 4.14179 4.40872 4.37209 3.91835Z"
        fill={color}
      />
    </svg>
  );
};

export default React.memo(GiftIcon);