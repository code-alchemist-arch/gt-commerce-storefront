import React from "react";

const WhiskyIcon = ({
  width = 32,
  height = 32,
  color = "#2A2D34",
  variant = 1,
}) => {
  const viewBoxMap = {
    1: "0 0 32 32",
    2: "0 0 35.21 52.67",
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
            fillRule="evenodd"
            clipRule="evenodd"
            d="M10.7359 21.8538C9.29379 20.4118 9.00638 18.4353 10.0804 17.3613C11.1595 16.2824 13.131 16.5698 14.5731 18.0168C16.0153 19.4588 16.3027 21.4353 15.2287 22.5092C14.79 22.9479 14.2051 23.1596 13.5647 23.1596C12.6369 23.1596 11.5931 22.7109 10.7359 21.8538ZM11.7393 20.8554C12.5764 21.6975 13.7462 22 14.2353 21.5109C14.7244 21.0218 14.4168 19.8521 13.5848 19.0151C13.0151 18.4454 12.299 18.1227 11.7444 18.1227C11.4771 18.1227 11.2452 18.1983 11.0838 18.3597C10.5947 18.8487 10.9023 20.0134 11.7393 20.8554Z"
            fill={color}
          />
          <path
            d="M7.46118 20.6513C7.18387 20.374 6.74017 20.374 6.46286 20.6513C6.18556 20.9287 6.18556 21.3724 6.46286 21.6497L10.9401 26.1271C11.0763 26.2632 11.2578 26.3338 11.4393 26.3338C11.6208 26.3338 11.8023 26.2632 11.9385 26.1271C12.2158 25.8498 12.2158 25.4061 11.9385 25.1288L7.46118 20.6513Z"
            fill={color}
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M13.3224 12.7673C13.4988 12.6917 13.6904 12.6514 13.882 12.6514C14.0636 12.6514 14.2451 12.6867 14.4115 12.7522C15.6417 13.2564 16.7409 13.9926 17.6787 14.9354C18.6267 15.8884 19.3527 17.0077 19.8418 18.2582C19.983 18.6111 19.9729 19.0044 19.8166 19.3523C19.6603 19.7002 19.3729 19.9675 19.0199 20.0986L18.2334 20.391C18.072 20.4515 17.9056 20.4818 17.7443 20.4818C17.1796 20.4818 16.6451 20.1439 16.4283 19.5893C16.1207 18.8078 15.6669 18.112 15.077 17.517C14.4972 16.9271 13.8115 16.4682 13.0451 16.1556C12.3392 15.8632 11.9913 15.0615 12.2635 14.3455L12.5661 13.5589C12.7022 13.201 12.9745 12.9186 13.3224 12.7673ZM17.7443 19.07L18.5309 18.7775C18.1275 17.7389 17.5124 16.7657 16.6855 15.9287C15.8636 15.1018 14.9106 14.4817 13.8871 14.0632L13.5846 14.8497C14.5022 15.2279 15.3543 15.7825 16.0854 16.5237C16.8266 17.2699 17.3762 18.1422 17.7443 19.07Z"
            fill={color}
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M27.8038 1C28.1013 1 28.3837 1.11597 28.5954 1.32774L31.2677 3.99502C31.7064 4.43369 31.7064 5.14463 31.2677 5.5833L28.9736 7.87747C28.7769 8.07411 28.5198 8.18 28.2626 8.20017C27.0324 10.8221 25.3332 12.012 24.4811 12.4709L24.8038 15.5617C24.8996 16.4844 24.5819 17.3869 23.9264 18.0424L10.9279 31.041C10.5699 31.399 10.096 31.5957 9.59174 31.5957C9.08753 31.5957 8.61357 31.399 8.25559 31.041L1.55463 24.34C1.19664 23.982 1 23.5081 1 23.0039C1 22.4997 1.19664 22.0257 1.55463 21.6677L14.5532 8.66909C15.2086 8.01866 16.1112 7.69595 17.0339 7.79175L20.1247 8.11446C20.5835 7.26234 21.7735 5.56314 24.3954 4.33286C24.4105 4.06562 24.5264 3.81351 24.718 3.62191L27.0122 1.32774C27.224 1.11597 27.5063 1 27.8038 1ZM9.58165 30.1839C9.71275 30.1839 9.82872 30.1335 9.91948 30.0427L10.4136 29.5385L3.04205 22.1669L2.54288 22.6661C2.45212 22.7568 2.40171 22.8728 2.40171 23.0039C2.40171 23.135 2.45212 23.2509 2.54288 23.3417L9.24384 30.0427C9.33459 30.1335 9.45056 30.1839 9.58165 30.1839ZM23.0491 12.4305C23.0037 11.9616 23.2508 11.5078 23.6743 11.3011C23.9617 11.1599 24.239 10.9885 24.4962 10.8019L21.7987 8.10436C21.6071 8.35647 21.4356 8.62876 21.2945 8.9212C21.0877 9.34474 20.6339 9.59684 20.165 9.54642L16.8826 9.20355C16.8272 9.19851 16.7667 9.19347 16.7112 9.19347C16.2725 9.19347 15.8591 9.36491 15.5465 9.67752L15.2893 9.93466L16.4087 11.054C16.686 11.3313 16.686 11.775 16.4087 12.0524C16.2725 12.1885 16.091 12.2591 15.9095 12.2591C15.728 12.2591 15.5465 12.1885 15.4103 12.0524L14.291 10.933L4.04543 21.1786L11.417 28.5502L21.6625 18.3046L17.1599 13.802C16.8826 13.5247 16.8826 13.081 17.1599 12.8036C17.4373 12.5263 17.881 12.5263 18.1583 12.8036L22.6609 17.3063L22.918 17.0491C23.271 16.6962 23.4424 16.2071 23.392 15.713L23.0491 12.4305ZM22.7567 7.06569L25.5248 9.83382C26.2508 9.01195 26.7399 8.10437 27.0122 7.51444L25.071 5.57321C24.4861 5.85053 23.5785 6.33962 22.7567 7.06569ZM25.9181 4.41857L28.1769 6.67745L28.7063 6.14802L26.4475 3.88915L25.9181 4.41857ZM27.4408 2.89585L29.6996 5.15471L30.0576 4.79673L27.7988 2.53785L27.4408 2.89585Z"
            fill={color}
          />
        </>
      )}
      {variant === 2 && (
        <g id="Layer_2" data-name="Layer 2">
          <g id="Layer_1-2" data-name="Layer 1">
            <path
              d="M31.12,14c-3.46-2.52-2.39-4.91-2.39-4.91l.18-.37V1.08A20.56,20.56,0,0,0,24.74.82a20.56,20.56,0,0,0-4.17.26h0v7.6l.19.37s1.07,2.39-2.4,4.91-3.25,4.08-3.25,7V51.1h0c0,.41,4.31.75,9.63.75s9.64-.34,9.64-.75V21C34.38,18.05,34.59,16.49,31.12,14Z"
              fill="none"
              stroke={color}
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.65"
            />
            <path
              d="M30.4,47.94V21.73c0-3,.77-2.81-2.7-5.34"
              fill="none"
              stroke={color}
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.65"
            />
            <path
              d="M22.75,19.36a7.83,7.83,0,0,0-7.64,8V45.3H30.4V27.37A7.84,7.84,0,0,0,22.75,19.36Z"
              fill="none"
              stroke={color}
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.65"
            />
            <path
              d="M11.34,33.38c-.93,0-2,0-3.19,0-4.5,0-7.31.18-7.32.41C.74,35.21,2.14,51.48,2.24,51.5a32.37,32.37,0,0,0,5.91.35c1,0,2.29,0,3.53-.07"
              fill="none"
              stroke={color}
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.65"
            />
            <line
              x1="14.41"
              y1="45.3"
              x2="1.82"
              y2="45.3"
              fill="none"
              stroke={color}
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.65"
            />
            <line
              x1="20.76"
              y1="8.36"
              x2="28.63"
              y2="8.36"
              fill="none"
              stroke={color}
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.65"
            />
          </g>
        </g>
      )}
    </svg>
  );
};

export default React.memo(WhiskyIcon);