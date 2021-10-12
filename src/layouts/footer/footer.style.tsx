import styled from "styled-components";
import { themeGet } from "@styled-system/theme-get";

export const LogoWrapper = styled.div`
  & img {
    cursor: pointer;
    width: 77px;
    height: 27px;
  }
`;

export const Divisor = styled.span`
  display: block;
  border: 1px solid ${themeGet("colors.gray")};
  width: 30px;
  margin: 20px 0;
`;

export const InfoGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  // grid-auto-rows: 50px;
  grid-gap: 20px;
  margin: 10px 0 10px 0;
`;

export const Content = styled.div`
  color: ${themeGet("footer.color")};

  & > p {
    line-height: 30px;
  }
  & > p:not(:last-child) {
    margin-bottom: 30px;
    line-height: 30px;
  }

  a {
    display: block;
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 30px;
    color: ${themeGet("footer.color")};
    &:hover {
      color: ${themeGet("menu.hover.color")} !important;
    }
  }

  a.button {
    color: #fff !important;
    background-color: ${themeGet("footer.button.backgroundColor")};
    border-color: ${themeGet("footer.button.backgroundColor")};
    cursor: pointer;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    height: 40px;
    width: auto;
    border-radius: 6px;
    font-size: 16px;
    font-weight: 500;
    text-decoration: none;
    padding: 0px 30px;
    border: 0px;
    transition: all 0.3s ease 0s;
    box-sizing: border-box;
    letter-spacing: 2px;
    &:hover {
      box-shadow: 0px 2px 13px rgba(0, 0, 0, 0.25);
    }
  }
`;

export const InfoBlock = styled.div`
  color: ${themeGet("footer.color")};
  flex: 1 200px;
  margin-bottom: 30px;
  font-size: 16px;
`;

export const Title = styled.div`
  font-style: normal;
  font-weight: 600;
  font-size: 18px;
  line-height: 18px;
  text-transform: uppercase;
  letter-spacing: 2px;
`;

export const FooterWrapper = styled.div`
  color: ${themeGet("footer.color")};
  font-style: normal;
  font-weight: normal;
  font-size: 12px;
  line-height: 159.6%;
  max-width: 1600px;
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 30px 15px 20px 15px;
  margin: 0 auto;

  a {
    color: ${themeGet("footer.color")};
  }

  &.mobile {
    padding: 20px 20px;

    ${LogoWrapper} {
      text-align: center;
    }

    ${InfoGrid} {
      grid-template-columns: 1fr;
      text-align: center;
    }

    ${InfoBlock} {
      &:not(:first-child) {
        margin-top: 40px;
      }
    }
    ${Divisor} {
      margin: 15px auto;
    }
  }
`;

export const SubscribeButton = styled.button`
  color: #fff;
  background-color: ${themeGet("primary.color")};
  border-color: ${themeGet("primary.color")};
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 40px;
  width: auto;
  border-radius: 6px;
  font-size: 16px;
  font-weight: 500;
  text-decoration: none;
  padding: 0px 30px;
  border: 0px;
  transition: all 0.3s ease 0s;
  box-sizing: border-box;
  letter-spacing: 2px;
  &:hover {
    box-shadow: 0px 2px 13px rgba(0, 0, 0, 0.25);
  }
`;

export const InfoIcon = styled.div`
  display: flex;
  align-items: center;
  margin-top: 15px;
`;

export const Copy = styled.div`
  margin-bottom: 30px;
`;

export const Copyright = styled.div<{ border: boolean }>`
  border-top: ${({ border }) => (border ? "1px solid #818693" : null)};
  margin-top: 15px;
  padding-top: 15px;
  text-align: center;
`;

export const SocialLinks = styled.div`
  margin-top: 15px;
  display: flex;
  justify-content: center;
  gap: 15px;

  & svg:not(:last-child) {
    margin-right: 10px;
  }
`;

export const Newsletter = styled.div`
  padding: 40px 10px 40px 10px;
  background-color: ${themeGet("colors.white")};
`;

export const NewsletterContent = styled.form`
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  position: relative;
  gap: 30px;

  & .bg {
    object-fit: cover;
  }

  & input {
    max-width: 250px;
    min-width: 150px;
    width: 100%;
    margin-bottom: 15px;
    margin-right: 15px;
  }

  & button {
    background-color: ${themeGet("colors.taupe")};
    margin-bottom: 15px;
  }

  & h2,
  & div,
  & button {
    z-index: 1;
  }
`;

export const NewsletterError = styled.div`
  position: absolute;
  bottom: -25px;
  font-size: 14px;
  left: 0;
  margin-top: 5px;
  color: red;
  height: 19px;
`;

export const FooterContainer = styled.footer`
  display: flex;
  flex-direction: column;
  padding: 0;
  width: 100%;
  background-color: ${themeGet("footer.backgroundColor")};
  display: flex;
  justify-content: center;
`;

export const NewsletterText = styled.h4`
  margin-bottom: 15px;
  color: ${themeGet("colors.grayText")};
  text-align: center;

  @media screen and (max-width: 976px) {
    margin-right: 0;
  }
`;

export const InputWrapper = styled.div`
  position: relative;
  flex: 1;

  & input {
    max-width: none;
  }
`;

export const NewsletterThankyou = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: ${themeGet("colors.taupe")}ee;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 40px;
  font-weight: bold;
`;

export const NewsletterInputs = styled.div<{ layout?: string }>`
  display: flex;
  flex-wrap: nowrap;
  justify-content: center;
  align-items: center;
  flex-direction: ${({ layout }) => (layout === "column" ? "column" : "row")};
  flex: 1;
`;

export const OperationHours = styled.div`
  margin-top: 30px;
`;

export const OperationHoursTitle = styled.h5`
  margin-bottom: 10px;
`;
