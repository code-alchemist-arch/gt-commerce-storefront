import styled from "styled-components";
import { themeGet } from "@styled-system/theme-get";

export const FiltersWrapper = styled.div<{ centered?: boolean }>`
  ${({ centered }) => !centered && "width: 100%"};
  background: transparent;

  display: flex;
  justify-content: center;
`;

export const FiltersInnerWrapper = styled.div`
  width: 100%;
  display: flex;
  margin: 0 auto;
  padding: 10px 15px;
  background: #fff;

  @media screen and (max-width: 767px) {
    flex-direction: column-reverse;
  }
`;

export const FiltersCategories = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex: 1;

  &.expanded {
    max-height: 300px;
    overflow: none;
  }

  @media screen and (max-width: 767px) {
    flex-direction: column;
    max-height: fit-content;
  }
`;

export const FiltersControls = styled.div`
  display: flex;
  justify-content: space-between;
  padding-top: 10px;
  min-width: 200px;
`;

export const FilterControl = styled.div`
  font-size: 14px;
  font-weight: 500;
  text-decoration: underline;
  display: flex;
  align-items: center;
  cursor: pointer;
  color: ${themeGet("colors.black")};
  height: fit-content;
  &:hover {
    color: ${themeGet("secondary.color")};

    svg path {
      stroke: ${themeGet("secondary.color")};
    }
  }
`;

export const FilterOptionsWrapper = styled.div`
  background: #fff;
  &:not(.mobile):not(.tablet) {
    box-shadow: 0px 4px 31px rgba(0, 0, 0, 0.08);
    border-radius: 18px;
    padding: 15px 35px;
  }

  & .ais-RefinementList {
    display: flex;
    max-width: 600px;
    max-height: 150px;
    overflow: scroll;
  }

  & .ais-RefinementList-item {
    cursor: pointer;
    display: inline-block;
    width: 200px;
  }

  & .ais-RefinementList-label {
    display: flex;
    -webkit-box-align: center;
    align-items: center;
    font-weight: 400;
    font-size: 13px;
    line-height: 21px;
    margin: 5px 0px;
  }

  & .ais-RefinementList-checkbox {
    margin: 0;
    margin-right: 10px;
    min-width: 20px;
  }

  & .ais-RefinementList-count {
    margin-left: 10px;
    background: ${themeGet("colors.grayBackground")};
    width: 20px;
    border-radius: 10px;
    text-align: center;
  }

  @media screen and (max-width: 767px) {
    padding: 5px 15px !important;
  }
`;

export const OptionsListWrapper = styled.div`
  display: flex;
  max-width: fit-content;
  max-height: 150px;
  overflow: hidden auto;

  ul > li {
    cursor: pointer;
    display: inline-block;
    width: 200px;

    &:hover {
      span {
        color: ${themeGet("secondary.color")} !important;
      }
    }
  }
`;

export const FiltersPopover = styled.div`
  left: 0px;
  top: calc(100% + 15px);
  display: none;
  position: absolute;
  z-index: 99;

  &.visible {
    display: block;
  }

  @media screen and (max-width: 767px) {
    position: relative;
    top: auto;
  }
`;

export const FiltersPopoverWrapper = styled.div`
  position: relative;
  cursor: pointer;

  &.hidden {
    display: none;
  }

  @media screen and (max-width: 767px) {
    display: flex;
    flex-direction: column-reverse;
  }
`;

export const ToggleIcon = styled.div`
  display: flex;
  align-items: center;

  cursor: pointer;
  width: fit-content;
`;
