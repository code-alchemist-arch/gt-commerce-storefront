import styled from "styled-components";
import { themeGet } from "@styled-system/theme-get";

export const ProductViewSwitchWrapper = styled.div`
  display: flex;
  align-items: center;
  & button {
    width: 45px;
    height: 45px;
    outline: none;
    padding: 5px;
    background: #fff;
    border: none;
    box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.07);
    border-radius: 11px;
    cursor: pointer;
    margin: 0px 2px;
    & svg path {
      fill: ${themeGet("colors.black")};
    }

    &.disabled {
      cursor: not-allowed;
      & svg path {
        fill: ${themeGet("primary.color")};
      }
    }
  }

  @media screen and (min-width: 991px) {
    button {
      background: none;
      box-shadow: none;
    }
  }
`;

export const DivisorLine = styled.span`
  display: none;
  border-left: 1px solid ${themeGet("colors.gray")};
  width: 1px;
  height: 27px;

  @media screen and (min-width: 991px) {
    display: block;
  }
`;
