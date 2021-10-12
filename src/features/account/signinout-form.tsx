import styled from "styled-components";
import { themeGet } from "@styled-system/theme-get";

export const Button = styled.button`
  width: 100%;
  background: ${themeGet("button.backgroundColor")};
  border: none;
  padding: 15px 25px;
  color: #fff;
  border-radius: 250px;
  font-weight: 500;
  font-size: 17px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
  margin-top: 35px;
  &:hover {
    box-shadow: 0px 2px 13px rgba(0, 0, 0, 0.25);
  }
`;

export const Wrapper = styled.div`
  text-align: center;
  background-color: #fff;
  width: 100%;
  max-width: 430px;
  @media (max-width: 450px) {
    text-align: left;
  }
`;

export const Container = styled.div`
  background-color: #fff;
  @media (max-width: 768px) {
    // padding: 40px 30px 0;
  }
`;

export const Heading = styled.h3`
  color: ${themeGet("colors.black")};
  margin-bottom: 10px;
  font-style: normal;
  font-weight: bold;
  font-size: 19px;
  line-height: 23px;

  @media (max-width: 450px) {
    margin-bottom: 5px;
  }
`;

export const SubHeading = styled.span`
  margin-bottom: 70px;
  color: ${themeGet("colors.black")};
  font-style: normal;
  font-weight: 500;
  font-size: 17px;
  line-height: 21px;
  display: block;

  @media (max-width: 450px) {
    font-size: 13px;
    font-weight: 400;
    margin-bottom: 30px;
  }
`;

export const TextLabel = styled.span`
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 17px;
  color: ${themeGet("colors.gray")};
`;

export const ForgotPassword = styled.div`
  width: 100%;
  text-align: right;
  & span:hover {
    text-decoration: underline;
    cursor: pointer;
  }
`;

export const OfferSection = styled.div`
  padding: 20px;
  background-color: ${themeGet("colors.lightColor", "#F7F7F7")};
  color: ${themeGet("primary.color", "#009E7F")};
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Offer = styled.p`
  font-size: ${themeGet("fontSizes.2", "15")}px;
  font-weight: ${themeGet("fontWeights.3", "400")};
  margin: 0;
`;

export const HelperText = styled.p`
  font-size: ${themeGet("fontSizes.1", "13")}px;
  font-weight: ${themeGet("fontWeights.3", "400")};
  color: ${themeGet("colors.darkRegular", "#77798c")};
  margin: 0;
  text-align: center;
  width: 100%;

  a {
    font-weight: 700;
    color: #4285f4;
    text-decoration: underline;
  }
`;

export const Input = styled.input`
  width: 100%;
  height: 48px;
  border-radius: 6px;
  background-color: ${themeGet("colors.lightColor", "#F7F7F7")};
  border: 1px solid ${themeGet("colors.borderColor", "#E6E6E6")};

  font-size: ${themeGet("fontSizes.2", "15")}px;
  font-weight: ${themeGet("fontWeights.3", "400")};
  color: ${themeGet("colors.darkBold", "#0D1136")};
  line-height: 19px;
  padding: 0 18px;
  box-sizing: border-box;
  transition: border-color 0.25s ease;
  margin-bottom: 10px;

  &:hover,
  &:focus {
    outline: 0;
  }

  &:focus {
    border-color: ${themeGet("primary.color", "#009e7f")};
  }

  &::placeholder {
    color: ${themeGet("colors.darkRegular", "#77798c")};
    font-size: 14px;
  }

  &::-webkit-inner-spin-button,
  &::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  &.disabled {
    .inner-wrap {
      cursor: not-allowed;
      opacity: 0.6;
    }
  }
`;

export const Divider = styled.div`
  padding: 15px 0;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;

  span {
    font-size: ${themeGet("fontSizes.2", "15")}px;
    font-weight: ${themeGet("fontWeights.3", "400")};
    color: ${themeGet("colors.darkBold", "#0D1136")};
    line-height: 1;
    background-color: #fff;
    z-index: 1;
    position: relative;
    padding: 0 10px;
  }

  &::before {
    content: "";
    width: 100%;
    height: 1px;
    background-color: ${themeGet("colors.borderColor", "#E6E6E6")};
    position: absolute;
    top: 50%;
  }
`;

export const Anchor = styled.a`
  background-color: transparent;
  border: 0;
  outline: 0;
  box-shadow: none;
  padding: 0;
  font-size: 14px;
  font-weight: 700;
  color: ${themeGet("button.backgroundColor", "#009E7F")};
  text-decoration: underline;
  cursor: pointer;
  margin-left: 5px;
  text-decoration: none;
`;

export const FormInput = styled.div`
  height: 50px;
  border-radius: 250px;
  border: 1px solid ${themeGet("colors.lightGray")};
  margin-bottom: 38px;
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

  & input,
  & input::placeholder {
    color: ${themeGet("colors.gray")};
    border: none;
    outline: none;
    height: 100%;
    font-weight: 400;
    font-size: 14px;
    line-height: 35px;
    background: #fff !important;
    // padding: 0 10px;
    width: 100%;
    margin-top: 2px;
    margin-left: 10px;
    &:focus {
      outline: none;
    }
  }
`;

export const PasswordToggleButton = styled.span`
  display: flex;
  cursor: pointer;
  & > svg > path {
    fill: ${themeGet("colors.gray")};
  }
`;

export const ErrorBox = styled.div`
  justify-content: center;
  display: flex;
  flex-direction: column;

  &.with-margin {
    margin: 36px auto;
  }
`;

export const ErrorMessageComponent = styled.div`
  display: flex;
  align-items: center;
  width: 90%;
  margin: 10px auto;
  margin: 10px auto;

  @media screen and (max-width: 415px) {
    width: 90%;
  }

  & span {
    margin-left: 5px;
    color: ${themeGet("primary.color")};
    font-size: 13px;
  }

  & svg {
    width: 20px;
    height: 20px;
    & > path {
      fill: ${themeGet("primary.color")};
    }
  }
`;

export const InteractiveErrorMessageComponent = styled.div<{
  touched: boolean;
  success: boolean;
}>`
  display: flex;
  align-items: center;
  width: 100%;
  margin: 0 auto;

  @media screen and (max-width: 415px) {
    width: 90%;
  }

  & span {
    margin-left: 10px;
    font-size: 13px;
  }

  & svg {
    min-width: 20px;
    width: 20px;
    height: 20px;
    & > path {
      fill: ${({ touched, success }) => {
        if (!touched) return themeGet("colors.gray");
        else {
          if (success) return themeGet("colors.green");
          else return themeGet("primary.color");
        }
      }};
    }
  }
`;

export const SignUpMessage = styled.div`
  margin-top: 40px;
  width: 100%;
  text-align: center;
`;

export const BackToLoginMessage = styled.div`
  width: 100%;
  text-align: center;
  margin-top: 100px;
`;
