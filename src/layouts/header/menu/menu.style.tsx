import styled from "styled-components";
import { themeGet } from "@styled-system/theme-get";

export const StyledIcon = styled.span`
  min-width: 16px;
  margin-right: 10px;
  display: flex;
  align-items: center;

  & path {
    fill: ${themeGet("menu.color")};
  }
`;

export const StyledLabel = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-style: normal;
  font-size: 14px;
  text-transform: uppercase;
  @media screen and (max-width: 464px) {
    font-size: 13px;
  }
`;

export const StyledMenu = styled.ul`
  display: flex;
  height: 100%;
`;

export const StyledMenuItem = styled.div`
  cursor: pointer;
  padding: 6px 10px 6px 10px;
  display: inline-flex;
  justify-content: space-between;

  a {
    color: ${themeGet("menu.color")};
    display: flex;
    &:visited {
      color: ${themeGet("menu.color")};
    }
  }

  &.CategoryItem {
    font-style: normal;
    margin-right: 15px;
    & > a > ${StyledLabel} {
      font-size: 13px;
      font-weight: 500;
    }
  }

  &.CategoryItem.active {
    background-color: ${themeGet("menu.item.active.backgroundColor")};
    border-radius: 98px;

    & > a {
      color: ${themeGet("menu.hover.color")};
      & > span > svg > path {
        fill: ${themeGet("menu.hover.color")};
      }
    }

    > div {
      opacity: 1;
      visibility: visible;
    }
  }

  &.SubcategoryItem > a {
    font-size: 14px;
    font-weight: 600;
    width: 100%;
    display: flex;
    flex-direction: column;
  }

  & .SubcategoryItemIcon {
    font-size: 18px;
    padding: 15px 0;

    &:not(:last-child) {
      border-bottom: 1px solid ${themeGet("colors.gray")};
    }

    & > a > div > span {
      font-size: 16px;
    }
  }

  &.SubSubcategoryItem > a {
    font-size: 14px;
    font-weight: normal;
    width: 100%;
  }

  &.SubcategoryItem,
  &.SubSubcategoryItem {
    &:hover {
      & > a {
        color: ${themeGet("menu.hover.color")};
        & > span > svg > path {
          fill: ${themeGet("menu.hover.color")};
        }
      }
    }
  }

  & .expand-icon {
    transform: rotate(-90deg);
  }
`;

export const StyledSubCategoryContainer = styled.div`
  transition: opacity 0.6s ease-in-out;
  visibility: hidden;
  opacity: 0;
  position: absolute;
  margin-top: 36px;
  margin-left: -14px;
  padding-top: 15px;
  z-index: 1000;

  & > .Container {
    width: 100%;
    position: fixed;
    left: 0;
    border-radius: 0;
    background-color: ${themeGet("menu.backgroundColor")};
    padding: 10px 10px 10px 10px;
    -webkit-box-shadow: 2px 0px 5px 0px rgba(189, 189, 189, 0.37);
    -moz-box-shadow: 2px 0px 5px 0px rgba(189, 189, 189, 0.37);
    box-shadow: 2px 0px 5px 0px rgba(189, 189, 189, 0.37);
    cursor: default;

    & > .Content {
      max-width: 1600px;
      margin: 0 auto;
    }
  }
`;

export const SpacerMenuItem = styled.span`
  grid-row: -1;
`;

export const StyledCategoryTitle = styled.span<{ span: number }>`
  color: ${themeGet("colors.gray")};
  font-style: normal;
  font-weight: bold;
  font-size: 13px;
  line-height: 16px;
  text-transform: uppercase;
  margin-left: 20px;
  margin-top: 14px;
  margin-bottom: 14px;
  ${(props) => props.span && `grid-column: 1 / span ${props.span}`}
`;

export const StyledSubCategoryList = styled.ul`
  list-style: none;
  display: flex;
  justify-content: center;
  gap: 30px;

  flex-wrap: wrap;

  & > li > a > span {
    font-size: 14px;
  }

  @media screen and (max-width: 767px) {
    gap: 10px;
  }
`;

/* Tablet */

export const StyledTabletMenu = styled.ul`
  color: ${themeGet("colors.black")};

  & > .rc-collapse {
    background-color: transparent;
    border-radius: 0px;
    border: none;

    & > .rc-collapse-item {
      border: none;
      margin-top: 20px;
      & > .rc-collapse-header {
        padding: 2px 22px;
        background: ${themeGet("colors.lightGray")};
        border-radius: 105px;
        color: ${themeGet("colors.black")};
        justify-content: space-between;
        flex-direction: row-reverse;
      }
    }
    & > .rc-collapse-item-active .styledArrow {
      transform: rotate(-90deg);
    }
  }

  & .CategoryItem {
    font-style: normal;
    font-weight: 500;
    font-size: 17px;
    line-height: 21px;
    padding-left: 0px;
  }
`;
export const StyleMobileHeader = styled.span`
  font-weight: 500;
  font-size: 18px;
  color: ${themeGet("menu.color")};
`;

export const StyledMobileHeaderWrapper = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  margin-bottom: 40px;

  ${StyleMobileHeader} {
    margin-bottom: 3px;
  }
`;

export const Closer = styled.div`
  display: inline-flex;
  position: absolute;
  right: 0px;

  cursor: pointer;

  & svg path {
    stroke: ${themeGet("menu.color")};
  }
`;

/** Mobile Menu */
export const StyledMobileMenu = styled.ul`
  display: flex;
  flex-direction: column;
  margin-bottom: 30px;
  transition: all 0.2s ease;

  & li {
    padding-left: 0px;

    &:not(:first-child) {
      margin-top: 15px;
    }

    &:hover {
      & > a > span {
        color: ${themeGet("colors.black")} !important;
        & > svg > path {
          fill: ${themeGet("colors.black")} !important;
        }
      }
    }
  }

  & .SubcategoryItem {
    margin-top: 10px;
    &:nth-of-type(1) {
      margin-top: 0px;
    }
  }

  & .SubSubcategoryItem {
    span {
      display: flex;
      width: 100%;
      justify-content: flex-start;
    }
  }
  & .SubCategoryContainer {
  }
`;

export const StyledBackButton = styled.button`
  background: transparent;
  border: none;
  margin-left: -10px;

  & svg path {
    fill: ${themeGet("menu.color")};
  }
`;

export const MenuDivisor = styled.div`
  margin: 30px 0;
  margin-left: -60px;
  width: calc(100% + 120px);
  display: block;
  border: 1px solid ${themeGet("colors.lightGray")};

  @media screen and (max-width: 464px) {
    width: calc(100% + 90px);
  }
`;

export const MenuItemLabel = styled.div`
  display: flex;
`;

export const MenuColumn = styled.li<{ column: number }>`
  display: flex;
  flex-direction: column;
  flex: 1;
  max-width: 300px;
  min-width: 300px;
  order: ${({ column }) => column};
`;
