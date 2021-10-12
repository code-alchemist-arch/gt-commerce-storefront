import styled from "styled-components";
import { themeGet } from "@styled-system/theme-get";

export const StyledBar = styled.div<{ top: boolean }>`
  display: flex;
  width: 100%;
  min-height: 56px;
  justify-content: center;
  align-items: center;
  color: ${({ top }) =>
    top ? themeGet("topMessageBar.color") : themeGet("messageBar.color")};
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  text-align: center;
  padding: ${themeGet("topMessageBar.padding")};
  background: ${({ top }) =>
    top
      ? themeGet("topMessageBar.backgroundColor")
      : themeGet("messageBar.backgroundColor")};

  transition: margin-top 0.4s ease-in-out;
  cursor: pointer;

  &:hover {
    filter: brightness(90%);
  }

  &.link {
    cursor: pointer;
  }

  @media screen and (max-width: 767px) {
    font-size: 13px;
    padding: 5px;
    min-height: 27px;
  }

  @media screen and (max-width: 1024px) {
    font-size: 14px;
  }

  &.hideHeader {
    margin-top: -250px;
  }
`;
