import styled from "styled-components";
import { themeGet } from "@styled-system/theme-get";
import { LabelStyle } from "components/label/label.style";

export const OrderDetailWrapper = styled.div`
  display: flex;
  align-items: center;
  padding: 20px 30px;

  @media screen and (max-width: 464px) {
    padding: 0px;
    margin-bottom: 20px;
    flex-direction: column;
  }
`;

export const OrderMetadata = styled.div`
  display: flex;

  @media screen and (max-width: 464px) {
    justify-content: space-between;
    width: 100%;
    padding: 10px 10px;
    padding-bottom: 20px;
    border-bottom: 1px solid ${themeGet("colors.lightGray")};
  }
`;

export const OrderStatus = styled.div`
  display: flex;
  flex-direction: row;
  flex: 1;
  height: 70px;

  @media screen and (max-width: 800px) {
    display: none;
  }
`;

export const OrderMetadataItem = styled.div<{ showOnMobile?: boolean }>`
  &:not(:first-child):not(:last-child) {
    margin: 0 45px;
  }
  & div.title {
    color: ${themeGet("colors.gray")};
    text-transform: uppercase;
    font-weight: 400;
    font-size: 12px;
  }

  & div.value {
    color: ${themeGet("colors.black")};
    margin-top: 15px;
    font-weight: 600;
    font-size: 14px;
  }

  @media screen and (max-width: 464px) {
    &:not(:first-child):not(:last-child) {
      margin: 0 20px;
    }
    & div.title {
      font-size: 12px;
    }

    & div.value {
      margin-top: 10px;
      font-size: 13px;
    }
  }

  ${({ showOnMobile }) =>
    showOnMobile &&
    `
    display: none;

    @media screen and (max-width: 800px) {
      display: block;
    }
  `}
`;

export const OrderDetailMore = styled.div`
  cursor: pointer;
  transition: all 0.5s ease-out;
  margin-left: auto;

  &.expanded {
    transform: rotate(-180deg);
  }
  svg > path {
    fill: ${themeGet("colors.gray")};
  }

  @media screen and (max-width: 580px) {
    display: none;
  }
`;

export const OrderDetailContentWrapper = styled.div`
  height: auto;
  max-height: 0px;
  overflow: hidden;

  transition: max-height 0.3s ease-out;

  &.expanded {
    max-height: 2000px;
  }
`;

export const OrderDetailPricing = styled.div`
  // background: ${themeGet("colors.testGreen")};
  display: flex;
  border-top: 1px solid;
  border-bottom: 1px solid;
  border-color: ${themeGet("colors.lightGray")};
  padding: 20px 30px;

  .itemPrice {
    font-size: 13px;
    display: flex;
    padding: 5px 0;
    border-right: 1px solid ${themeGet("colors.lightGray")};
    margin-right: 15px;
    .price {
      margin: 0 15px;
      font-weight: 600;
      font-size: 13px;
    }
  }

  .total {
    font-size: 13px;
    font-weight: 600;
    display: flex;
    padding: 5px 0;
    flex: 1;
    justify-content: flex-end;

    .price {
      margin-left: 15px;
    }
  }

  @media screen and (max-width: 464px) {
    padding: 20px 10px;
    flex-direction: column;

    .itemPrice {
      margin-right: 0px;
      font-size: 15px;
      padding-left: 15px;
      border-right: none;
      .price {
        width: 100%;
        text-align: right;
        margin: 0;
        font-size: 14px;
      }
    }

    .total {
      border-top: 1px solid ${themeGet("colors.lightGray")};
      padding-top: 20px;
      padding-left: 15px;
      margin-top: 10px;
      width: 100%;
      justify-content: space-between;
      font-size: 15px;
    }
  }
`;

export const OrderDetailAddress = styled.div`
  display: flex;
  padding: 20px 20px;
  & .shippingAddress {
    flex: 1;
    margin-right: 15px;
  }

  & .billingAddress {
    flex: 1;
    margin-left: 15px;
  }

  & .description {
    font-size: 12px;
  }

  @media screen and (max-width: 464px) {
    padding: 20px 20px;
    ${LabelStyle} {
      flex-direction: column;
      align-items: flex-start;
    }

    & .shippingAddress {
      margin-right: 5px;
    }

    & .billingAddress {
      margin-left: 5px;
    }
  }
`;

export const ViewDetail = styled.div`
  color: ${themeGet("colors.black")};
  text-decoration: underline;
  text-align: right;
  cursor: pointer;
  font-size: 14px;
  margin: 15px;

  @media screen and (min-width: 580px) {
    display: none;
  }
`;
