import styled from "styled-components";
import { themeGet } from "@styled-system/theme-get";

export const OptionIcon = styled.div`
  margin: 0 30px 0 5px;
  @media screen and (max-width: 450px) {
    margin: 0 10px 0 0;
  }
`;

export const OptionWrapper = styled.div<{ inactive: boolean }>`
  background: ${themeGet("colors.lightGray")};
  border: 1px solid ${themeGet("colors.lightGray")};
  border-radius: 8px;
  // overflow: hidden;
  padding: 18px 15px;
  position: relative;
  display: flex;
  justify-content: space-between;
  &:not(.confirmed):hover {
    // box-shadow: 0px 2px 13px rgba(0, 0, 0, 0.25);
    box-shadow: 0px 1px 7px rgb(0 0 0 / 0.18);
    ${({ inactive }) => !inactive && "cursor: pointer"};
  }

  &.with-tags {
    padding-top: 50px;
  }

  &.confirmed {
    background: ${themeGet("colors.white")};
    border: 1px solid ${themeGet("colors.green")};

    ${OptionIcon} {
      svg path {
        fill: ${themeGet("colors.green")};
      }
    }
  }
`;

export const OptionInfo = styled.div`
  display: flex;
`;

export const OptionTitle = styled.div`
  font-style: normal;
  font-weight: 600;
  font-size: 14px;
  line-height: 17px;
`;
export const OptionSubtitle = styled.div`
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 17px;
  margin-top: 8px;
`;
export const OptionText = styled.div`
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 17px;
  margin-top: 8px;
`;
export const OptionPrice = styled.div`
  font-style: normal;
  font-weight: 600;
  font-size: 14px;
  line-height: 17px;
  white-space: nowrap;
`;

export const OptionMenu = styled.div`
  position: absolute;
  top: 15px;
  right: 15px;
  cursor: pointer;

  &:hover {
    svg > path {
      fill: ${themeGet("colors.black")};
    }
  }

  @media screen and (max-width: 464px) {
    top: 14px;
    right: 2px;
  }
`;

export const Actions = styled.div`
  position: absolute;
  position: absolute;
  top: 40px;
  right: 25px;
  display: none;
  background: white;
  z-index: 9999;
  cursor: pointer;

  font-size: 12px;
  font-weight: 500;
  transition: visibility 0.1s ease;
  border-radius: 8px;
  overflow: hidden;

  &.visible {
    display: block;
    box-shadow: 0px 2px 13px rgba(0, 0, 0, 0.05);
  }

  & > ul {
    list-style: none;
    margin: 0;
    padding: 0;
    & > li {
      padding: 10px 20px;
      border: none;
      outline: 0;
      &:hover {
        color: ${themeGet("primary.color")};
      }
      &:not(:last-child) {
        border-bottom: 1px solid ${themeGet("colors.lightGray")};
      }
    }
  }
`;

export const OptionsTagsWrapper = styled.div`
  position: absolute;
  top: 16px;
  left: 10px;
`;

export const OptionTags = styled.span`
  background: white;
  border-radius: 4px;
  display: inline-flex;
  align-items: center;
  font-size: 12px;
  padding: 3px 5px;
  color: ${themeGet("primary.color")};
  margin: 0 3px;
`;
