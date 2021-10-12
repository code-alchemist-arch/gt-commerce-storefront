import styled from "styled-components";
import { themeGet } from "@styled-system/theme-get";

export const AddToCartButtonWrapper = styled.div`
  & > .cart-button {
    display: flex;
    justify-content: space-between;
    border: 1px solid ${themeGet("button.backgroundColor")};
    border-radius: ${themeGet("button.borderRadius")};
    // height: 36px;
    padding: 7px;
    padding-right: 9px;
    font-size: ${themeGet("fontSizes.1", "13")}px;
    font-weight: ${themeGet("fontWeights.6", "700")};

    background-color: ${themeGet("button.backgroundColor")}!important;

    & svg > path {
      fill: white;
    }
    .btn-text {
      color: white;
    }
    &:hover {
      // box-shadow: 0px 4px 11px rgba(0, 0, 0, 0.25);
      box-shadow: 0px 2px 13px rgba(0, 0, 0, 0.25);
    }
    svg {
      fill: currentColor;
    }

    &.disabled {
      background: ${themeGet("colors.gray")} !important;
      opacity: 0.5;
      border: 1px solid ${themeGet("colors.gray")};
      &:hover {
        box-shadow: none;
      }
    }
  }

  &.mini {
    .cart-button {
      width: 45px !important;
      height: 45px;
      justify-content: center;
      svg {
        width: 40px;
        height: 30px;
      }
    }
  }
`;
