import styled from "styled-components";
import { themeGet } from "@styled-system/theme-get";
import { DeviceType } from "../../interfaces";

export const CartGrid = styled.div<{ deviceType: DeviceType }>`
  display: grid;
  grid-template-columns: 1fr 340px;
  grid-gap: 35px;
  @media screen and (max-width: 991px) {
    grid-template-columns: 1fr 300px;
  }
  @media screen and (max-width: 580px) {
    grid-template-columns: 1fr;
    grid-gap: 15px;
  }

  & .summary {
    @media screen and (min-width: 991px) {
      grid-column: 2;
      grid-row: 1/ 3;
    }
    & .aditionalComments {
      margin: 15px 0;
      svg > path {
        fill: ${themeGet("primary.color")};
      }
    }
  }

  & .go-to-homepage {
    width: 200px;
    margin: 0 auto;
  }
`;

export const SummaryRow = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;

  &.subtotal {
    margin-top: 50px;
  }
`;

export const SummaryDivisor = styled.div`
  margin: 15px 0;
  border-bottom: 1px solid ${themeGet("colors.lightGray")};
  margin-left: -25px;
  width: calc(100% + 50px);
`;

export const CommentsInput = styled.textarea<any>`
  width: 100%;
  resize: none;
  border: 1px solid ${themeGet("colors.lightGray")};
  background: #f7f7f733;

  padding: 15px;
  border-radius: ${themeGet("borderRadius")};
  outline: none;
  color: ${themeGet("colors.gray")};
  font-size: 15px;
`;

export const VoucherCode = styled.span`
  width: 100%;
  display: block;
  text-align: center;
  color: ${themeGet("primary.color")};
  margin: 40px 0;
`;

export const ProceedCheckout = styled.button`
  outline: none;
  border: none;
  background: ${(props) =>
    props.disabled
      ? themeGet("colors.gray")
      : themeGet("button.backgroundColor")};
  padding: 15px;
  width: 100%;
  border-radius: ${themeGet("button.borderRadius")};
  color: white;
  cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};
  font-weight: 500;
  font-size: 17px;
  line-height: 17px;

  &:hover {
    box-shadow: 0px 2px 13px rgba(0, 0, 0, 0.25);
  }
`;

export const ErrorMsg = styled.span`
  font-size: ${themeGet("fontSizes.2", "14")}px;
  font-weight: 400;
  color: ${themeGet("colors.secondaryHover", "#FF282F")};
  padding-top: 10px;
  display: flex;
  justify-content: center;
`;

export const RelatedDivisor = styled.div`
  height: 1px;
  border-bottom: 2px solid ${themeGet("primary.color")};
  width: 60px;
  margin: 10px 0;
`;
