import React, { useState } from "react";
import { defaultTheme } from "../../site-settings/site-theme/default";
import { CURRENCY } from "../../utils/constant";
import { CommentsInput } from "../cart-detail/cart-detail.style";
import CouponBox from "../coupon-box/coupon-box";
import InformationBox from "../information-box/information-box";
import Label from "../label/label";
import {
  SummaryRow,
  SummaryDivisor,
  ActionButton,
  OrderBoxWrapper,
  VoucherCode,
  CouponError,
  AppliedCoupon,
  RemoveCoupon,
} from "./order-box.style";

type props = {
  title: string;
  items: any[];
  total: number;
  currency: string;
  note?: string;
  appliedCoupon?: string;
  couponError?: string;
  action: string;
  actionDisabled?: boolean;
  aplyingCoupon: boolean;
  onAction?: Function;
  handleNoteChange: Function;
  handleApplyCoupon: Function;
  handleRemoveCoupon: Function;
};

const OrderBox: React.FC<props> = ({
  title,
  items = [],
  total = 0,
  currency = CURRENCY,
  note = "",
  appliedCoupon,
  couponError,
  action = "",
  actionDisabled = true,
  aplyingCoupon = false,
  onAction,
  handleNoteChange,
  handleApplyCoupon,
  handleRemoveCoupon,
}: props) => {
  const handleActionClick = () => {
    onAction && !actionDisabled && onAction();
  };
  const [currentCoupon, setCurrentCoupon] = useState(appliedCoupon || "");
  const [showVoucherInput, setShowVoucherInput] = useState(false);

  React.useEffect(() => {
    if (!couponError && appliedCoupon) {
      setShowVoucherInput(false);
    }
  }, [couponError, appliedCoupon]);

  const handleCouponChange = (value) => {
    setCurrentCoupon(value);
  };

  const handleApplyButtonClick = async () => {
    handleApplyCoupon && handleApplyCoupon(currentCoupon);
    // setShowVoucherInput(false);
  };

  const handleShowApplyInput = () => {
    setCurrentCoupon("");
    setShowVoucherInput(true);
  };

  return (
    <OrderBoxWrapper>
      <InformationBox title={title} dark>
        {items.length === 0 ? (
          <Label
            text="Your order is empty"
            fontSize={16}
            className="emptyOrder"
            color={defaultTheme.colors.gray}
            fontWeight={500}
          />
        ) : (
          <>
            {items.map((row, index) => (
              <SummaryRow key={`summary_row_${index}`}>
                <Label text={row.description} fontSize={16} />
                <Label text={row.value} fontSize={16} />
              </SummaryRow>
            ))}
            <SummaryDivisor />
            <SummaryRow className="total">
              <Label text="Total" fontSize={16} fontWeight={600} />
              <Label
                text={`${currency} ${total.toFixed(2)}`}
                fontSize={16}
                fontWeight={600}
              />
            </SummaryRow>
            <SummaryDivisor />
            {handleNoteChange && (
              <>
                <Label
                  iconName="edit"
                  text="Additional Comments"
                  fontWeight={900}
                  className="aditionalComments"
                  iconColor={defaultTheme.primary.color}
                />
                <CommentsInput
                  rows="6"
                  onChange={handleNoteChange}
                  defaultValue={note}
                  placeholder="If you have a special request for this order you can write it here.
              For example: Please put for Thomas on box."
                />
              </>
            )}
            {appliedCoupon && (
              <AppliedCoupon>
                <span>Applied Code:</span>
                <Label
                  iconName="discount"
                  iconWidth={25}
                  iconHeight={25}
                  text={appliedCoupon}
                  color={defaultTheme.primary.color}
                  fontWeight={600}
                />
                <RemoveCoupon onClick={() => handleRemoveCoupon(appliedCoupon)}>
                  Remove
                </RemoveCoupon>
              </AppliedCoupon>
            )}
            {handleApplyCoupon && (
              <>
                {!showVoucherInput ? (
                  <VoucherCode
                    onClick={handleShowApplyInput}
                    className={appliedCoupon ? "applied" : ""}
                  >
                    {!appliedCoupon
                      ? "Do you have a Discount Code?"
                      : "Do you want to change the discount code?"}
                  </VoucherCode>
                ) : (
                  <CouponBox
                    onUpdate={handleCouponChange}
                    value={currentCoupon}
                    onClick={handleApplyButtonClick}
                    disabled={!currentCoupon}
                    buttonTitle={aplyingCoupon ? "Applying..." : "Apply"}
                    intlCouponBoxPlaceholder="couponPlaceholder"
                    className="orderButton"
                    style={{
                      boxShadow: "0 3px 6px rgba(0, 0, 0, 0.06)",
                      margin: "10px 0 10px",
                    }}
                  />
                )}
              </>
            )}
            {couponError && (
              <CouponError>
                <Label
                  iconWidth={20}
                  iconHeight={20}
                  iconName="alert"
                  color="red"
                  text={couponError}
                />
              </CouponError>
            )}
            {action && (
              <ActionButton
                disabled={actionDisabled}
                onClick={handleActionClick}
              >
                {action}
              </ActionButton>
            )}
          </>
        )}
      </InformationBox>
    </OrderBoxWrapper>
  );
};

export default OrderBox;
