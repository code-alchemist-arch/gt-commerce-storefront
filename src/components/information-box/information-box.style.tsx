import styled from "styled-components";
import { themeGet } from "@styled-system/theme-get";

export const Box = styled.div<{ boxOverflow: boolean }>`
  position: relative;
  background: ${themeGet("colors.white")};
  box-shadow: 0px 4px 22px rgba(0, 0, 0, 0.03);

  border-radius: ${themeGet("borderRadius")};
  overflow: ${(props) => (props.boxOverflow ? "visible" : "hidden")};

  &.collapsed {
    height: 50px;
  }
`;
export const BoxTitle = styled.div<{
  primary?: boolean;
  dark?: boolean;
  noPadding?: boolean;
}>`
  display: flex;
  justify-content: center;
  padding: 10px 25px;

  border-bottom: 1px solid
    ${({ primary }) =>
      primary
        ? themeGet("button.backgroundColor")
        : themeGet("colors.lightGray")};
  background: ${({ primary, dark }) =>
    primary
      ? themeGet("button.backgroundColor")
      : dark
      ? themeGet("colors.black")
      : themeGet("colors.white")};
`;
export const BoxContent = styled.div<{ noPadding: boolean }>`
  padding: ${(props) => (props.noPadding ? "0" : "15px 25px")};

  @media screen and (max-width: 460px) {
    padding: 10px 15px;
  }
`;

export const BoxExpand = styled.span`
  position: absolute;
  right: 25px;
  cursor: pointer;

  svg {
    transform: rotate(-180deg);
    transition: all 0.5s ease-in-out;
  }

  &.collapsed {
    svg {
      transform: rotate(0deg);
    }
  }
`;
