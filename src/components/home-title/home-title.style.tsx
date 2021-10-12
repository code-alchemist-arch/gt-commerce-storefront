import styled from "styled-components";
import { themeGet } from "@styled-system/theme-get";

export const HomeTitle = styled.h2`
  text-align: center;
  position: relative;
  z-index: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  white-space: nowrap;
  margin: 30px 0 15px 0;
  text-transform: uppercase;
  font-size: 30px;
  font-weight: 600;

  & > span {
    margin: 0 30px;
  }

  & > .line {
    width: 100%;
    height: 2px;
    background-color: ${themeGet("colors.grayLine")};
  }

  @media screen and (max-width: 767px) {
    white-space: normal;
  }
`;

export const HomeSubtitle = styled.h3`
  color: ${themeGet("colors.grayText")};
  text-align: center;
  margin-bottom: 15px;
  font-weight: 200;
  font-style: italic;
`;
