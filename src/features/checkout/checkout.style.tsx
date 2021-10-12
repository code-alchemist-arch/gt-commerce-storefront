import styled from "styled-components";
import { themeGet } from "@styled-system/theme-get";
import { DeviceType } from "../../interfaces";

export const CheckoutGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 440px;
  grid-gap: 25px;
  @media screen and (max-width: 1200px) {
    grid-template-columns: 1fr 300px;
  }
  @media screen and (min-width: 991px) {
    grid-template-columns: 1fr 400px;
  }
  @media screen and (max-width: 700px) {
    grid-template-columns: 1fr;
  }
  @media screen and (max-width: 991px) {
    grid-gap: 15px;
    grid-template-columns: 1fr;
  }

  & > div {
    grid-column: 1;
  }

  & .summary {
    @media screen and (min-width: 991px) {
      grid-column: 2;
      grid-row: 1 / 10;
    }

    .checkoutProducts,
    .checkoutErrors {
      margin-bottom: 25px;

      @media screen and (max-width: 464px) {
        margin-bottom: 15px;
      }
    }

    .checkoutErrors {
      border: 2px solid ${themeGet("primary.color")};
    }
  }

  & .contactInfoStep,
  & .checkoutStep {
    & > div {
      @media screen and (max-width: 450px) {
        padding: 10px 15px;
      }
    }
  }

  & .checkoutLabel {
    margin: 15px 0;
  }

  & .radioButton {
    cursor: pointer;

    &.selected {
      svg > path {
        fill: ${themeGet("colors.green")};
      }
    }
  }
`;

export const ReturnToCart = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  padding: 10px 25px;

  @media screen and (max-width: 450px) {
    padding: 10px 15px;
  }
`;

export const AlreadyHaveAccount = styled.div`
  display: flex;
  font-size: 14px;
  align-items: center;
  color: ${themeGet("colors.gray")};
  justify-content: center;
  & span {
    margin-right: 5px;
  }
  & > a {
    color: ${themeGet("colors.black")};
    font-weight: 600;
  }
`;

export const ContactInformation = styled.div`
  &.confirmed {
    display: flex;
    align-items: center;
  }

  & .emailInput {
    margin: 15px 0;
    max-width: 450px;
  }
`;

export const StepAction = styled.div`
  color: ${themeGet("colors.gray")};
  margin-left: auto;
  font-size: 12px;
  text-decoration: underline;
  cursor: pointer;

  @media screen and (max-width: 450px) {
    font-size: 12px;
  }
`;

export const StepContentWrapper = styled.div`
  margin-top: 15px;
  & > div {
    margin: 20px 0;
    &:last-child {
      margin-bottom: 0px;
    }
  }
`;

export const ProductListSummary = styled.div`
  padding: 0px 0px 20px 0px;
  max-height: 500px;
  overflow-y: scroll;
`;

export const DepositsInfo = styled.div`
  display: flex;
  align-items: center;
  border-top: 1px solid;
  border-color: #f5f5f5;
  padding-top: 20px;
  .icon {
    width: 115px;
    display: flex;
    justify-content: center;
  }
  .info {
    font-weight: normal;
    font-size: 14px;
    width: 100%;
    display: flex;
    justify-content: space-between;
    margin-right: 10px;
    span {
      color: #2a2d34;
      font-weight: 600;
    }
  }
`;

export const CheckoutError = styled.div`
  display: flex;
  color: ${themeGet("colors.black")};
  font-size: 14px;
  .message {
    flex: 1;
    margin-left: 10px;
    color: ${themeGet("primary.color")};

    .title {
      font-weight: 500;
    }

    .items {
      margin-top: 10px;
      font-size: 12px;

      color: ${themeGet("colors.black")};
    }
  }
`;
