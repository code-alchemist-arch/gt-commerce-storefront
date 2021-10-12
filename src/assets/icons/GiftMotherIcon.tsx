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
        d="M31.7934 18.5932C31.7434 18.5503 30.5184 17.4783 28.6183 16.4736C27.2683 15.7568 25.912 15.2606 24.5994 14.9849C24.7619 14.8073 24.9182 14.6296 25.0682 14.4458C26.9057 12.1792 28.0058 9.04875 28.2433 5.39147C28.4246 2.6531 28.062 0.594731 28.0495 0.508966C27.9933 0.202661 27.7183 -0.0117528 27.3995 0.000499404C27.312 0.0127516 25.1869 0.129148 22.5056 0.919414C18.9242 1.96698 16.0553 3.71291 14.2178 5.97957C13.8115 6.48191 13.4365 7.02713 13.099 7.60911C11.3552 6.8556 8.98631 7.05776 7.57376 8.2156C7.09874 8.60154 6.30496 9.47757 6.34246 10.9356C5.07992 10.1759 3.90487 10.4149 3.32985 10.6232C1.22977 11.3705 -0.332791 14.017 0.0609738 16.1734C0.167228 16.7676 0.542242 17.8826 1.84229 18.581C0.542242 19.2732 0.167228 20.3882 0.0609738 20.9885C-0.326541 23.1449 1.22977 25.7914 3.32985 26.5388C3.91112 26.747 5.07992 26.986 6.34246 26.2263C6.30496 27.6782 7.10499 28.5542 7.57376 28.9463C8.43004 29.6508 9.63634 30 10.8426 30C12.0489 30 13.2552 29.6508 14.1115 28.9463C14.5865 28.5604 15.3803 27.6843 15.3428 26.2263C16.6054 26.986 17.7804 26.747 18.3554 26.5388C18.9992 26.3121 19.5867 25.9016 20.0867 25.387C20.5305 25.4422 20.9743 25.4728 21.4055 25.4728C21.7743 25.4728 22.1306 25.4544 22.4868 25.4116C24.7619 25.1604 27.1058 24.0393 29.2746 22.1647C30.8934 20.768 31.8434 19.457 31.8809 19.4019C32.0684 19.1446 32.0309 18.8015 31.7934 18.5932ZM15.1928 6.74533C17.3054 4.14174 20.5118 2.78175 22.8306 2.10175C24.5807 1.58716 26.1057 1.37275 26.8932 1.28698C27.112 3.17382 27.537 9.44082 24.0869 13.6862C23.7806 14.066 23.4369 14.4275 23.0744 14.7766C22.5806 14.7399 22.0993 14.7399 21.6243 14.7766C21.4055 13.4289 20.593 12.0873 19.4992 11.2603L22.0806 8.12983C22.2993 7.86641 22.2556 7.48047 21.9868 7.26605C21.718 7.05164 21.3243 7.09452 21.1055 7.35794L18.3929 10.6477C18.3804 10.6415 18.3679 10.6354 18.3554 10.6354C17.7742 10.4271 16.6054 10.1882 15.3428 10.9478C15.3803 9.54496 14.6365 8.68118 14.1615 8.27686C14.4678 7.71938 14.8178 7.21092 15.1928 6.74533ZM12.9677 21.7359C13.2865 22.1096 13.274 22.5078 13.199 22.7773C13.0615 23.3042 12.6115 23.7881 12.0552 23.9964C11.8239 24.0822 11.5614 24.0393 11.3614 23.8862C11.2489 23.8004 11.1114 23.7514 10.9739 23.7514H10.7364C10.5989 23.7514 10.4676 23.7943 10.3614 23.8739L10.3176 23.9045C10.1176 24.0516 9.8676 24.0822 9.63634 24.0026C9.07382 23.7943 8.6238 23.3164 8.48004 22.7835C8.40504 22.5139 8.39254 22.1096 8.7113 21.7359L8.99881 21.399C9.53008 21.7236 10.1614 21.9074 10.8364 21.9074C11.5114 21.9074 12.1364 21.7236 12.674 21.399L12.9677 21.7359ZM5.31117 18.9792C5.39868 18.8689 5.44868 18.7341 5.44868 18.5993V18.3665C5.44868 18.2318 5.40493 18.1031 5.32367 17.999L5.29242 17.9561C5.14242 17.7601 5.11117 17.515 5.19242 17.2883C5.40493 16.737 5.89245 16.2959 6.43622 16.155C6.71123 16.0815 7.12374 16.0693 7.50501 16.3817L7.84877 16.6635C7.51751 17.1842 7.33 17.8029 7.33 18.4646C7.33 19.1262 7.51751 19.7388 7.84877 20.2656L7.50501 20.5474C7.12374 20.8599 6.71748 20.8476 6.44247 20.7741C5.90495 20.6393 5.41118 20.1982 5.19867 19.653C5.11117 19.4386 5.15492 19.1752 5.31117 18.9792ZM8.71755 15.1993C8.39879 14.8257 8.41129 14.4275 8.48004 14.1579C8.61755 13.6311 9.06757 13.1471 9.61759 12.9388C9.84885 12.8531 10.1114 12.8959 10.3114 13.0491C10.4239 13.1349 10.5614 13.1839 10.6989 13.1839H10.9364C11.0739 13.1839 11.2051 13.141 11.3114 13.0613L11.3552 13.0307C11.5552 12.8837 11.8052 12.8531 12.0364 12.9327C12.599 13.141 13.049 13.6188 13.1927 14.1518C13.2677 14.4213 13.2865 14.8257 12.9615 15.1993L12.6677 15.5363C12.1302 15.2116 11.5052 15.0278 10.8301 15.0278C10.1551 15.0278 9.53008 15.2116 8.99256 15.5363L8.71755 15.1993ZM8.58005 18.4646C8.58005 17.2455 9.59259 16.253 10.8364 16.253C12.0802 16.253 13.0927 17.2455 13.0927 18.4646C13.0927 19.6837 12.0802 20.6761 10.8364 20.6761C9.59259 20.6761 8.58005 19.6898 8.58005 18.4646ZM13.8302 20.2656C14.1615 19.7388 14.349 19.1262 14.349 18.4646C14.349 17.8029 14.1615 17.1903 13.8302 16.6635L14.174 16.3817C14.5553 16.0693 14.9615 16.0815 15.2366 16.155C15.7741 16.2898 16.2678 16.7309 16.4804 17.27C16.5679 17.4966 16.5241 17.7539 16.3678 17.95C16.2803 18.0602 16.2303 18.195 16.2303 18.3298V18.5626C16.2303 18.6973 16.2741 18.826 16.3553 18.9301L16.3866 18.973C16.5366 19.1691 16.5741 19.4141 16.4866 19.6408C16.2741 20.1921 15.7866 20.6332 15.2428 20.7741C14.9678 20.8476 14.5553 20.866 14.174 20.5474L13.8302 20.2656ZM17.6491 16.8289C17.2866 15.9161 16.4803 15.1993 15.5491 14.9666C15.174 14.8747 14.8053 14.8624 14.4553 14.9298C14.524 14.5806 14.5115 14.213 14.4115 13.8394C14.4053 13.8148 14.399 13.7903 14.3928 13.772C14.4115 13.7536 14.424 13.7291 14.4365 13.7046C15.1428 12.51 16.3178 11.199 17.9304 11.7749C19.4555 12.3201 20.6805 14.3907 20.393 15.959C20.1492 17.319 18.9367 17.7968 17.7304 17.9255C17.8117 17.564 17.7866 17.1842 17.6491 16.8289ZM8.38004 9.15902C9.62384 8.13596 12.0614 8.13596 13.3052 9.15902C14.424 10.0779 14.1803 11.4195 13.649 12.5345C13.324 12.2098 12.9302 11.9464 12.4864 11.781C11.9364 11.5788 11.3302 11.6278 10.8239 11.9096C10.3176 11.634 9.71134 11.5911 9.16757 11.7932C8.7363 11.9586 8.34879 12.2159 8.03628 12.5345C7.49876 11.4195 7.255 10.0779 8.38004 9.15902ZM1.28602 15.9651C1.00476 14.3968 2.22356 12.3201 3.74861 11.781C5.36118 11.2051 6.53622 12.5161 7.2425 13.7107C7.255 13.7352 7.27375 13.7536 7.28625 13.7781C7.28 13.8087 7.2675 13.8332 7.26125 13.8639C7.16749 14.2314 7.15499 14.5929 7.22375 14.9359C6.86748 14.8685 6.49247 14.8808 6.1112 14.9727C5.18617 15.2116 4.37989 15.9345 4.02362 16.8534C3.88612 17.2026 3.86112 17.5763 3.93612 17.9255C2.73608 17.7968 1.52978 17.3129 1.28602 15.9651ZM7.24875 23.4573C6.54247 24.6519 5.36743 25.9629 3.75486 25.387C2.22981 24.8418 1.00476 22.7712 1.29227 21.1968C1.53603 19.8552 2.72358 19.3712 3.91737 19.2364C3.88612 19.5305 3.92987 19.8246 4.03613 20.1064C4.39864 21.0191 5.20492 21.7359 6.13621 21.9687C6.51122 22.0606 6.87998 22.0728 7.23625 22.0054C7.16749 22.3546 7.18 22.7222 7.27375 23.0959C7.2925 23.1755 7.3175 23.2552 7.34875 23.3348C7.31125 23.3654 7.28 23.4083 7.24875 23.4573ZM13.3052 28.0029C12.0614 29.026 9.62384 29.026 8.38004 28.0029C7.205 27.0411 7.53001 25.6198 8.11128 24.4743C8.41754 24.7683 8.78631 25.0011 9.19882 25.1481C9.42383 25.2339 9.66134 25.2707 9.8926 25.2707C10.2301 25.2707 10.5614 25.1849 10.8614 25.0195C11.3677 25.2952 11.9739 25.3442 12.5177 25.1359C12.9177 24.9827 13.274 24.7561 13.5802 24.4681C14.1553 25.6198 14.4803 27.0411 13.3052 28.0029ZM17.9304 25.387C16.3178 25.9629 15.1428 24.6519 14.4365 23.4573C14.4115 23.4083 14.374 23.3654 14.3365 23.3287C14.3678 23.249 14.3928 23.1633 14.4115 23.0775C14.5053 22.7099 14.5178 22.3485 14.449 21.9993C14.8053 22.0667 15.1803 22.0545 15.5616 21.9564C16.4991 21.7175 17.3054 20.9946 17.6554 20.0696C17.7616 19.7939 17.7992 19.5121 17.7741 19.2303C18.9617 19.3651 20.1492 19.8491 20.3868 21.1907C20.6743 22.7651 19.4555 24.8418 17.9304 25.387ZM22.3493 24.1925C21.8993 24.2415 21.4305 24.2537 20.9555 24.2353C21.5368 23.2245 21.8181 22.0483 21.6243 20.9885C21.518 20.3943 21.143 19.2793 19.843 18.581C21.143 17.8887 21.518 16.7738 21.6243 16.1734C21.6368 16.1121 21.643 16.0509 21.6493 15.9896C25.5682 15.6772 29.2558 18.1828 30.5059 19.1384C29.4933 20.3759 26.3682 23.7453 22.3493 24.1925Z"
        fill={color}
      />
      <path
        d="M22.7993 5.80792C22.8993 6.04684 23.1494 6.19999 23.4181 6.18774C23.6681 6.16936 23.8931 5.99783 23.9744 5.76504C24.0556 5.51999 23.9681 5.24432 23.7619 5.09117C23.5556 4.93801 23.2619 4.92576 23.0431 5.06054C22.7868 5.21981 22.6868 5.53837 22.7993 5.80792Z"
        fill={color}
      />
      <path
        d="M31.1921 13.5C31.39 13.5 31.5879 13.4506 31.7363 13.3024C31.8848 13.1542 31.9343 13.006 31.9343 12.8084C31.9343 12.6108 31.8848 12.4132 31.7363 12.265C31.5879 12.1168 31.4395 12.0674 31.2415 12.0674C31.0436 12.0674 30.8457 12.1168 30.7467 12.265C30.5983 12.4132 30.5488 12.5614 30.5488 12.759C30.5488 12.9566 30.5983 13.1542 30.7467 13.3024C30.7962 13.4506 30.9941 13.5 31.1921 13.5Z"
        fill={color}
      />
      <path
        d="M31.1426 6.34716C31.3405 6.34716 31.5384 6.29776 31.6869 6.14956C31.8353 6.00136 31.8848 5.85316 31.8848 5.65557C31.8848 5.45797 31.8353 5.26037 31.6869 5.11217C31.5384 4.96397 31.39 4.91457 31.1921 4.91457C30.9941 4.91457 30.7962 4.96397 30.6973 5.11217C30.5488 5.26037 30.4993 5.40857 30.4993 5.60617C30.4993 5.80376 30.5488 6.00136 30.6973 6.14956C30.7962 6.24836 30.9447 6.34716 31.1426 6.34716Z"
        fill={color}
      />
      <path
        d="M7.97592 3.48199C8.37176 3.48199 8.71812 3.13619 8.71812 2.74099C8.71812 2.3458 8.42124 2 7.97592 2C7.778 2 7.58008 2.0494 7.48112 2.1976C7.33268 2.3458 7.2832 2.494 7.2832 2.69159C7.2832 2.88919 7.33268 3.08679 7.48112 3.23499C7.58008 3.38319 7.778 3.48199 7.97592 3.48199Z"
        fill={color}
      />
    </svg>
  );
};

export default React.memo(GiftIcon);