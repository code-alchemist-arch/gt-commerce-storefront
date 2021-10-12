import styled from "styled-components";
import { themeGet } from "@styled-system/theme-get";
import { LabelStyle } from "components/label/label.style";

export const ItemImgWrapper = styled.div`
  width: 120px;
  img {
    width: 84px;
    height: 84px;
    object-fit: contain;
  }

  @media screen and (max-width: 464px) {
    width: 70px;
    img {
      width: 70px;
      height: 70px;
    }
  }
`;

export const ItemDescription = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  flex: 1;

  .title {
    font-weight: normal;
    font-size: 14px;
  }

  .vintage {
    margin-top: 10px;
  }

  @media screen and (max-width: 464px) {
    ${LabelStyle} {
      margin: 0;
    }

    .vintage {
      margin-top: 20px;
    }
  }
`;

export const ItemPricing = styled.div`
  display: flex;
  font-weight: 500;
  font-size: 13px;
  margin-top: 20px;
  align-items: flex-end;

  .unitPrice {
    color: ${themeGet("colors.gray")};
  }

  .subtotal {
    color: ${themeGet("colors.black")};
    font-weight: 600;
    margin-left: 50px;
    font-size: 15px;
  }

  @media screen and (max-width: 464px) {
    position: absolute;
    flex-direction: column;
    bottom: 21px;
    right: 10px;
    font-size: 12px;
    align-items: flex-end;

    .unitPrice {
      text-align: right;
    }

    .subtotal {
      color: ${themeGet("colors.black")};
      margin: 0;
      text-align: right;
    }
  }
`;

export const OrderItemWrapper = styled.div`
  display: flex;
  padding: 15px 30px;
  align-items: center;

  border-top: 1px solid;
  border-color: ${themeGet("colors.lightGray")};
  position: relative;

  @media screen and (max-width: 464px) {
    padding: 20px 0;
  }

  &.compressed {
    padding: 10px 0;

    ${ItemDescription} {
      ${LabelStyle} {
        margin: 0;
      }

      .vintage {
        margin-top: 20px;
      }
    }

    ${ItemImgWrapper} {
      width: 70px;
      margin-right: 5px;
      img {
        width: 70px;
        height: 70px;
      }
    }
    ${ItemPricing} {
      position: absolute;
      flex-direction: column;
      bottom: 10px;
      right: 10px;
      font-size: 14px;

      .unitPrice {
        text-align: right;
      }

      .subtotal {
        color: ${themeGet("colors.black")};
        margin: 0;
        text-align: right;
      }
    }
  }
`;
