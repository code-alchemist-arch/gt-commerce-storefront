import styled from "styled-components";
import { themeGet } from "@styled-system/theme-get";

export const LayoutWrapper = styled.div`
  background-color: ${themeGet("colors.gray.200", "#F7F7F7")};

  @media (max-width: 990px) {
    background-color: ${themeGet("colors.white", "#ffffff")};
  }

  .reuseModalHolder {
    padding: 0;
    overflow: auto;
    border-radius: ${themeGet("radii.small", "3px")}
      ${themeGet("radii.small", "3px")} 0 0;
    border: 0;
  }

  .sticky-outer-wrapper {
    height: auto !important;
  }
`;

export const BrandSide = styled.div`
  background: ${themeGet("primary.color")};
  background-size: cover;
  width: 100%;
  height: 100%;

  img {
    cursor: pointer;
  }
`;

export const MainContainer = styled.div<{
  deviceType: {
    desktop: boolean;
    tablet: boolean;
    mobile: boolean;
  };
}>`
  height: 100vh;
  background: #fff;
  display: flex;
  position: relative;

  ${({ deviceType }) =>
    deviceType?.desktop &&
    `
    ${BrandSide} {
      border-bottom-right-radius: 50px;
      padding: 25px;
    }
    `}

  ${({ deviceType }) =>
    (deviceType?.tablet || deviceType?.mobile) &&
    `
    flex-direction: column;
    justify-content: flex-end;
    ${ActionContent} {
      padding: 25px 110px;
      border-top-left-radius: 50px;
      border-top-right-radius: 50px;
      position: absolute;
      top: 240px;
      bottom: 0px;
      width: 100%;
      min-width: 100%;

      @media screen and (orientation: landscape) {
        top: 140px;
      }
    }
    `}

    ${BrandSide} {
    padding: 50px;
  }

  ${({ deviceType }) =>
    deviceType?.mobile &&
    `${ActionContent} {
         padding: 30px 30px;
         border-top-left-radius: 0px;
         @media screen and (max-width: 375px) {
          top: 110px;
          padding: 30px 30px;
         }
         @media screen and (max-width: 320px) {
          top: 100px;
          padding: 20px 15px;
         }
      }
      ${BrandSide} {
        padding: 25px;
      }
      ${Logo} {
        width: 90px;
        top: 25px;
        left: 25px;
      }

      ${CloseAction} {
        top: 25px;
        right: 25px;
      }
    `}
`;

export const ActionContent = styled.div`
  background: white;
  min-width: 650px;
  padding: 70px 110px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  overflow-y: scroll;
  @media screen and (max-width: 450px) {
    justify-content: flex-start;
  }
`;

export const Logo = styled.img`
  color: #fff;
  width: auto;
  height: auto;
  position: absolute;
  top: 65px;
  left: 65px;
  z-index: 999;
  cursor: pointer;
`;

export const CloseAction = styled.div`
  position: absolute;
  top: 30px;
  right: 30px;
  cursor: pointer;
`;

export const FormInput = styled.div`
  color: ${themeGet("colors.black")};
  height: 50px;
  border-radius: 5px;
  border: 1px solid ${themeGet("colors.lightGray")};
  margin-bottom: 22px;
  overflow: hidden;
  padding: 5px 15px;
  display: flex;
  align-items: center;
  width: 100%;

  & > svg {
    min-width: 25px;
    & > path {
      fill: ${themeGet("colors.gray")};
    }
  }

  &.noMargin {
    margin-bottom: 0px;
  }

  &.hasErrors {
    margin-bottom: 0px;
    border: 1px solid ${themeGet("primary.color")};
    & input {
      color: ${themeGet("primary.color")};
    }
    & > svg > path {
      fill: ${themeGet("primary.color")};
    }
  }

  & input {
    color: ${themeGet("colors.black")};
    border: none;
    outline: none;
    height: 100%;
    font-weight: 400;
    font-size: 14px;
    line-height: 35px;
    background: #fff !important;
    width: 100%;
    margin-top: 2px;
    margin-left: 10px;

    &:focus {
      outline: none;
    }

    &::placeholder {
      color: ${themeGet("colors.gray")};
    }
  }
`;

export const FiltersWrapper = styled.div`
  flex-grow: 1;
`;

export const ErrorMessageComponent = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  margin: 2px 0 2px 5px;

  @media screen and (max-width: 415px) {
    width: 90%;
  }

  & span {
    margin-left: 5px;
    color: ${themeGet("primary.color")};
    font-size: 12px;
  }

  & svg {
    width: 18px;
    height: 18px;
    & > path {
      fill: ${themeGet("primary.color")};
    }
  }
`;

export const TextLabel = styled.span`
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 17px;
  color: ${themeGet("colors.gray")};
`;

export const SubmitButton = styled.button`
  width: 100%;
  height: 50px;
  color: #fff;
  font-weight: 500;
  outline: none;
  border: none;

  font-size: 15px;
  border-radius: ${themeGet("button.borderRadius")};
  cursor: pointer;
  margin-top: 10px;

  background: ${themeGet("colors.black")};

  &:disabled {
    background: ${themeGet("colors.gray")};
    opacity: 0.3;
  }

  &:hover {
    box-shadow: 0px 2px 13px rgba(0, 0, 0, 0.25);
  }
`;

export const CancelButton = styled.button`
  width: 100%;
  height: 50px;
  font-weight: 500;
  outline: none;
  border: none;
  background: ${themeGet("colors.gray")};
  font-size: 15px;
  border-radius: ${themeGet("button.borderRadius")};
  cursor: pointer;
  margin-top: 10px;
  color: #fff;

  &:hover {
    box-shadow: 0px 2px 13px rgba(0, 0, 0, 0.25);
  }
`;

export const FormInputRadio = styled.input.attrs((props) => ({
  type: "radio",
}))``;

export const FormSelect = styled.div`
  font-size: 14px;

  & .react-select__control {
    height: 50px;
    border-radius: 5px;
    border: 1px solid ${themeGet("colors.lightGray")};
    margin-bottom: 22px;
  }

  & .react-select__single-value {
    color: ${themeGet("colors.black")};
  }

  & .react-select__value-container {
    padding-left: 25px;
  }
`;

export const FormGroup = styled.div``;

export const FormWrapper = styled.div`
  &.column-two {
    form {
      display: grid;
      grid-template-columns: 1fr 1fr;
      grid-column-gap: 10px;

      ${FormGroup} {
        &.defaultUsage {
          display: inline-flex;
          grid-column: 2;
          cursor: pointer;

          & > div:first-child {
            margin-right: 10px;
          }
        }
        &.actions {
          grid-column: 1/ 3;
          display: flex;
          flex-direction: row-reverse;
          button {
            width: 210px;
            &:last-child {
              margin-right: 15px;
            }
          }
        }
      }
    }
  }
`;

export const ContentControls = styled.div`
  width: 100%;
  padding: 10px 0;
  display: flex;
  justify-content: flex-end;
  align-items: center;

  button.control {
    align-items: center;
    height: 45px;
    background: #fff;
    border: none;
    box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.07);
    border-radius: 24.5px;
    font-size: 14px;
    font-weight: 500;
    color: ${themeGet("colors.black")};
    padding: 0 15px;

    svg {
      margin-left: 5px;
    }
  }
`;

export const FilterTagsContainer = styled.div`
  display: flex;
  justify-content: space-between;

  button {
    border: none;
    cursor: pointer;
    background: none;
    border: 1px solid transparent;

    &:hover {
      border: 1px solid black;
    }
  }
`;

export const FilterTagsWrapper = styled.div`
  display: flex;
  align-items: center;
  flex: 1;
  flex-wrap: wrap;

  &.margin {
    margin: 10px 0;
  }
`;

export const Tag = styled.span`
  font-weight: 500;
  font-size: 12px;
  padding: 5px 10px;
  background: white;
  box-shadow: 0px 4px 22px rgba(0, 0, 0, 0.03);
  border-radius: 2px;
  cursor: pointer;
  display: flex;
  align-items: center;

  svg {
    margin-left: 5px;
  }
`;

export const MobileControlButton = styled.button`
  display: none;
  @media screen and (max-width: 1015px) {
    display: flex;
  }
`;

export const DesktopRefinements = styled.div`
  display: none;
  width: 100%;
  @media screen and (min-width: 1015px) {
    display: block;
  }
`;

export const DesktopFilters = styled.div`
  width: 100%;
  display: none;
  @media screen and (min-width: 1015px) {
    display: block;
  }
`;

export const MobileFilters = styled.button`
  display: none;
  @media screen and (max-width: 1015px) {
    display: block;
  }
`;

export const CollectionWrapper = styled.div`
  display: flex;
`;

export const CollectionTeasers = styled.div`
  margin-right: 30px;

  @media screen and (max-width: 580px) {
    display: none;
  }
`;

export const CollectionTeaser = styled.div`
  height: 400px;
  width: 250px;
  position: relative;
  cursor: pointer;
  color: ${themeGet("colors.black")};
  border-radius: 6px;
  transition: 0.3s ease-in-out;
  margin-bottom: 30px;
  background: ${themeGet("colors.white")};

  &:hover {
    box-shadow: 0 2px 4px rgb(0 0 0 / 8%);
    transform: translateY(-5px);
  }

  & .image {
    border-radius: 6px;
  }
`;

export const CollectionTeaserContent = styled.div`
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
`;

export const StickyHeader = styled.div`
  position: sticky;
  top: 0;
`;
