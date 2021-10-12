import styled from "styled-components";
import { themeGet } from "@styled-system/theme-get";

export const OrderBoxWrapper = styled.div`
  position: sticky;
  position: -webkit-sticky;
  top: 285px;

  & .emptyOrder {
    justify-content: center;
  }

  & .orderButton {
    button:not(.disabled) {
      background: ${themeGet("colors.black")};
    }
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

export const ActionButton = styled.button`
  outline: none;
  border: none;
  background: ${(props) =>
    props.disabled ? themeGet("colors.gray") : themeGet("colors.black")};
  padding: 15px;
  width: 100%;
  border-radius: 8px;
  color: white;
  cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};
  font-weight: 500;
  font-size: 17px;
  line-height: 17px;

  &:hover {
    box-shadow: 0px 2px 13px rgba(0, 0, 0, 0.25);
  }
`;

export const VoucherCode = styled.span`
  cursor: pointer;
  width: 100%;
  display: block;
  text-align: center;
  color: ${themeGet("colors.green")};
  margin: 10px 0;
  font-weight: 500;
  font-size: 14px;

  &.applied {
    color: ${themeGet("colors.black")};
  }
`;

export const CouponError = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  margin: 0px 0 15px 0;
`;

export const AppliedCoupon = styled.div`
  color: ${themeGet("colors.green")};
  font-weight: 600;
  font-size: 14px;
  display: flex;
  justify-content: center;
  align-items: center;

  span {
    margin-left: 5px;
  }
  svg {
    margin-right: 0px;
  }
`;

export const RemoveCoupon = styled.span`
  text-transform: lowercase;
  font-size: 12px;
  color: ${themeGet("colors.black")};
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`;
