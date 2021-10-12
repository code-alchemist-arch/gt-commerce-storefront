import React from "react";

const ShippingIcon = ({ width = 32, height = 32, color = "#2A2D34" }) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M30.0349 14.3577C30.0735 14.3943 30.0735 14.4676 30.0735 14.5409C30.6142 14.9804 30.9231 15.6031 31.0004 16.3357V21.061C31.0004 21.7936 30.3825 22.343 29.6487 22.343H27.7951L27.7951 22.3431C27.8337 22.5995 27.8723 22.8559 27.8723 23.1123C27.8723 23.9547 27.5634 24.6873 27.0614 25.2734H27.1C27.4862 25.2734 27.7951 25.5665 27.7951 25.9328C27.7951 26.2991 27.4862 26.5921 27.1 26.5921H20.5736C20.1874 26.5921 19.8785 26.2991 19.8785 25.9328C19.8785 25.5665 20.1874 25.2734 20.5736 25.2734H21.3846C20.8825 24.6873 20.5736 23.9181 20.5736 23.1123C20.5736 22.9657 20.5736 22.8192 20.6122 22.6727H14.5106C14.5492 22.8192 14.5492 22.9657 14.5492 23.1123C14.5492 23.9181 14.2403 24.6873 13.7383 25.2734H14.3948C14.7809 25.2734 15.0899 25.5665 15.0899 25.9328C15.0899 26.2991 14.7809 26.5921 14.3948 26.5921H5.66716C5.28099 26.5921 4.97205 26.2991 4.97205 25.9328C4.97205 25.5665 5.28099 25.2734 5.66716 25.2734H8.10008C7.59805 24.6873 7.28911 23.9181 7.28911 23.1123C7.28911 22.9657 7.28911 22.8192 7.32773 22.6727H5.47408C4.62449 22.6727 3.92937 22.0134 3.92937 21.2075C3.92937 20.8412 4.23831 20.5482 4.62449 20.5482C5.01066 20.5482 5.31961 20.8412 5.31961 21.2075C5.31961 21.2808 5.39684 21.354 5.47408 21.354H7.82975C8.44764 20.365 9.60617 19.7057 10.9192 19.7057C12.2322 19.7057 13.3907 20.365 14.0086 21.354H21.1142C21.4618 20.8046 21.9638 20.365 22.5817 20.072V7.83758C22.5817 7.76432 22.5045 7.69106 22.4272 7.69106H5.47408C5.39684 7.69106 5.31961 7.76432 5.31961 7.83758V13.6251C5.31961 13.9914 5.01066 14.2844 4.62449 14.2844C4.23831 14.2844 3.92937 13.9914 3.92937 13.6251V7.80095C3.92937 6.99509 4.62449 6.33575 5.47408 6.33575H22.4272C23.0065 6.33575 23.5085 6.66542 23.7789 7.14161H27.6792C28.7605 7.14161 29.6487 7.9841 29.6487 9.00974V10.1086C29.6487 10.5482 29.3784 10.9145 28.9922 11.0976L30.0349 14.3577ZM8.67934 23.1489C8.67934 24.321 9.6834 25.2734 10.9192 25.2734C12.1549 25.2734 13.159 24.321 13.0818 23.1489C13.0818 23.0024 13.0818 22.8558 13.0431 22.7093C12.9273 22.1599 12.5797 21.6837 12.0777 21.3907C11.7301 21.1709 11.3053 21.061 10.8806 21.061C10.4558 21.061 10.031 21.1709 9.6834 21.3907C9.18137 21.6837 8.83381 22.1599 8.71796 22.7093C8.67934 22.8558 8.67934 23.0024 8.67934 23.1489ZM27.7565 8.49692H24.2809V9.85223H28.2971V9.00974C28.2971 8.7167 28.0654 8.49692 27.7565 8.49692ZM27.6406 11.2075H23.9719V13.9914H28.4516H28.4902L27.6406 11.2442V11.2075ZM21.9638 23.1489C21.9638 24.321 22.9679 25.2734 24.2036 25.2734C25.4394 25.2734 26.4435 24.321 26.3662 23.1489C26.3662 22.8925 26.3276 22.6361 26.2118 22.3797C26.1345 22.1233 25.9801 21.9035 25.787 21.7203C25.4394 21.354 24.9374 21.0976 24.3967 21.061H23.9333H23.8947C23.7402 21.061 23.5471 21.0976 23.3927 21.1709C23.1224 21.2808 22.8906 21.3907 22.6976 21.5738C22.35 21.8668 22.1183 22.2698 22.0024 22.7093C21.9638 22.8558 21.9638 23.0024 21.9638 23.1489ZM29.0695 16.409H29.4943V16.2991C29.4943 15.7496 29.0309 15.2735 28.413 15.2735H23.9333V19.7057H24.2036C25.3622 19.7057 26.4049 20.2551 27.0614 21.061H29.5329V17.7277H29.0695C28.6833 17.7277 28.3744 17.4346 28.3744 17.0683C28.3744 16.702 28.6833 16.409 29.0695 16.409ZM11.9237 10.3653C12.0009 10.402 12.0009 10.4752 12.0009 10.5485C11.9623 11.0979 11.9237 11.5741 11.7692 12.0137C11.7692 12.7829 12.194 13.2957 12.5416 13.5888C13.0436 13.9917 13.6615 14.2115 14.318 14.2115C14.9745 14.2115 15.631 13.9917 16.0944 13.5888C16.442 13.2957 16.8668 12.8195 16.8668 12.0137C16.8668 11.5741 16.8281 11.0979 16.7509 10.5485C16.7509 10.4752 16.7895 10.402 16.8281 10.3653C16.8668 10.3287 16.944 10.2921 17.0212 10.2921H17.446C17.6005 10.2921 17.7163 10.3653 17.7163 10.5118C17.755 11.0613 17.7936 11.5741 17.8322 11.977C17.7936 12.7829 17.4846 13.5155 16.9054 14.1016C16.3647 14.651 15.631 14.9807 14.8586 15.0906V16.9953H16.0558C16.2103 16.9953 16.3261 17.1052 16.3261 17.2151V17.618C16.3261 17.7279 16.2103 17.8378 16.0558 17.8378H12.696C12.5416 17.8378 12.4257 17.7279 12.4257 17.618V17.2151C12.4257 17.1052 12.5416 16.9953 12.696 16.9953H13.8932V15.0906C13.1208 14.9807 12.3871 14.6144 11.8465 14.1016C11.2286 13.5155 10.9196 12.7829 10.9196 11.977C10.9196 11.5741 10.9582 11.0613 11.0355 10.5118C11.0355 10.402 11.1513 10.2921 11.3058 10.2921H11.7306C11.8078 10.2921 11.8851 10.3287 11.9237 10.3653ZM14.8975 13.0386C14.7817 13.0752 14.7044 13.1484 14.6658 13.2583C14.6272 13.3682 14.6272 13.4415 14.6658 13.5514C14.7431 13.6979 14.8975 13.8078 15.052 13.8078C15.0906 13.8078 15.1292 13.8078 15.2065 13.7712C15.9402 13.5147 16.4422 12.9287 16.5581 12.2327C16.5854 11.9738 16.5741 11.7698 16.5651 11.6078C16.5614 11.5405 16.5581 11.4805 16.5581 11.4268V11.3902C16.5581 11.2803 16.4809 11.2071 16.4036 11.1338C16.3264 11.0605 16.2105 11.0605 16.0947 11.0605C15.863 11.0972 15.7085 11.2803 15.7471 11.5001V11.5367C15.7857 11.6832 15.7857 11.903 15.7471 12.1228C15.6699 12.5257 15.3609 12.892 14.8975 13.0386ZM7.83065 16.2624H2.84897C2.46279 16.2624 2.15385 15.9694 2.15385 15.6031C2.15385 15.2368 2.46279 14.9438 2.84897 14.9438H7.83065C8.21683 14.9438 8.52577 15.2368 8.52577 15.6031C8.52577 15.9694 8.21683 16.2624 7.83065 16.2624ZM6.67183 17.4348C6.67183 17.0685 6.36289 16.7755 5.97671 16.7755H1.76738C1.38121 16.7755 1.07227 17.0685 1.07227 17.4348C1.07227 17.8011 1.38121 18.0942 1.76738 18.0942H5.97671C6.36289 18.0942 6.67183 17.8011 6.67183 17.4348ZM18.1412 26.0426C18.1412 25.7129 18.4115 25.4565 18.7591 25.4565C19.068 25.4565 19.3384 25.7129 19.377 26.0426C19.377 26.3723 19.1067 26.6287 18.7591 26.6287C18.4115 26.6287 18.1412 26.3723 18.1412 26.0426Z"
        fill={color}
      />
    </svg>
  );
};

export default React.memo(ShippingIcon);