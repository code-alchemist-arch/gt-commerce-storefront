import styled from "styled-components";
import { themeGet } from "@styled-system/theme-get";

export const FilterHeader = styled.div`
  padding: 40px 30px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 58px;
  color: ${themeGet("colors.black")};

  @media screen and (max-width: 580px) {
    padding: 10px;
  }
`;

export const HeaderLeftSide = styled.div`
  display: flex;
  align-items: stretch;

  & > div {
    display: flex;
    align-items: center;
  }
  svg {
    margin-right: 20px;
  }
`;
export const HeaderRightSide = styled.div`
  margin-right: 10px;
  span {
    text-decoration: underline;
    font-size: 14px;
  }
`;

export const FilterContent = styled.div`
  background: ${themeGet("colors.lightGray")};
`;

export const ButtonsWrapper = styled.div`
  position: absolute;
  bottom: 40px;
  left: 0px;
  width: 100%;
  padding: 10px 20px;
  display: flex;
  justify-content: center;
  &.visible {
    position: fixed;
  }
`;

export const ApplyButton = styled.button`
  border: none;
  background: ${themeGet("primary.color")};
  height: 55px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex: 1;
  max-width: 300px;

  color: #fff;
  font-size: 16px;
  font-weight: 600;
  border-radius: 40px;
  padding: 0 25px;
`;

export const ClearButton = styled.button`
  border: none;
  background: #fff;
  height: 55px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 1;
  color: ${themeGet("primary.color")};
  font-size: 16px;
  font-weight: 500;
  border: 1px solid ${themeGet("primary.color")};
  border-radius: 40px;
  padding: 0 25px;
  margin-right: 20px;
  max-width: 300px;
`;

export const HeaderLabel = styled.div`
  padding-right: 40px;
  width: 100%;
`;

export const FiltersMobileWrapper = styled.div`
  @media screen and (max-width: 580px) {
    margin-bottom: 200px;
    & .rc-collapse {
      border: none;
      .rc-collapse-item {
        border-top: 2px solid ${themeGet("colors.lightGray")};
      }
    }
    & .filter-category {
      position: relative;
      color: ${themeGet("colors.black")} !important;
      font-weight: 500;
      background: #fff;
      i {
        position: absolute;
        right: 25px;
        top: 16px;
        transition: all 0.3s ease;

        &.active {
          transform: rotate(-180deg);
          top: 9px;
        }
      }

      &.selected {
        border-left: 6px solid ${themeGet("primary.color")};
      }
    }
  }

  @media screen and (max-width: 991px) {
    margin-bottom: 300px;
    background: #fff;
    padding: 0 50px;
    & .rc-collapse {
      border: none;
      background: #fff;
      .rc-collapse-item {
        border: none;
        margin-top: 20px;
      }
    }

    & .filter-category {
      position: relative;
      color: ${themeGet("colors.black")} !important;
      font-weight: 500;
      background: ${themeGet("colors.lightGray")};
      border-radius: 105px;
      padding: 1px 16px !important;

      i {
        position: absolute;
        right: 25px;
        top: 10px;
        transition: all 0.3s ease;

        &.active {
          transform: rotate(-180deg);
          top: 6px;
        }
      }

      &.selected {
      }
    }

    ${ButtonsWrapper} {
      justify-content: flex-end;
    }
  }
`;
