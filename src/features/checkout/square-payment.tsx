import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import Image from "next/image";
import loadScript from "../../utils/loadScript";
import Label from "../../components/label/label";

const FormWrapper = styled.div<{ hidden?: boolean }>`
  margin: 25px 0;
  ${({ hidden }) => hidden && "visibility: hidden"};
`;

const Card = styled.div``;

const DigitalPaymentBtn = styled.button`
  margin-top: 10px;
  position: relative;
  width: 250px;
  height: 50px;
  padding: 0;
  border: none;
  cursor: pointer;
`;

type WindowType = Window &
  typeof globalThis & {
    Square: any;
  };

const CheckoutForm = ({
  handleOnChange,
  handleDataChange,
  totalPrice,
  hidden,
  showSaveCardInfo,
  visible,
}) => {
  const [cardRendered, setCardRendered] = useState(false);
  const [card, setCard] = useState(null);
  const [applePay, setApplePay] = useState(null);
  const [googlePay, setGooglePay] = useState(null);
  const [saveCardInformation, setSaveCardInformation] = useState(false);
  const stateRef = useRef(saveCardInformation);

  const handleSetSaveCardInfo = (data) => {
    stateRef.current = data;
    setSaveCardInformation(data);
  };

  useEffect(() => {
    const getSquare = async () => {
      if (cardRendered) {
        return;
      }
      setCardRendered(true);
      await loadScript("https://web.squarecdn.com/0.0.29/square.js");
      const Square = (window as WindowType).Square;
      if (!Square) {
        return;
      }
      const payments = Square.payments(
        process.env.SQUARE_APPLICATION_ID,
        process.env.SQUARE_LOCATION_ID
      );

      const c = await payments.card();
      setCard(c);
      await c.attach("#card");

      // TODO: get the countryCode and currencyCode from backend
      const request = payments.paymentRequest({
        countryCode: process.env.COUNTRY_CODE,
        currencyCode: process.env.CURRENCY_CODE,
        total: {
          amount: totalPrice.toString(),
          label: "Total",
          pending: false,
        },
      });

      try {
        const applePay = await payments.applePay(request);
        setApplePay(applePay);
      } catch (err) {
        console.error(err);
      }

      try {
        const googlePay = await payments.googlePay(request);
        setGooglePay(googlePay);
      } catch (err) {
        console.error(err);
      }
    };
    getSquare();
  }, []);

  // Triggering resize event fixes height of the embedded iframe
  useEffect(() => {
    if (window && !hidden) {
      window.dispatchEvent(new Event("resize"));
      card.addEventListener("submit", handleSubmit);
      // FIXME
      // @ts-ignore
      window.SquareSubmit = handleSubmit;
    }
  }, [hidden]);

  const handleSubmit = async (event) => {
    if (event) event.preventDefault();
    try {
      const result = await card?.tokenize();
      if (result.status === "OK") {
        handleDataChange("token", result.token);
        handleDataChange("cardBrand", result.details.card.brand);
        handleDataChange("expMonth", result.details.card.expMonth);
        handleDataChange("expYear", result.details.card.expYear);
        handleDataChange("last4", result.details.card.last4);
        handleDataChange("type", result.details.card.type);
        handleDataChange("saveCard", saveCardInformation);
        const token = stateRef.current ? `${result.token},,,` : result.token;
        // handleOnChange({
        //   complete: result.status === "OK",
        //   token,
        // });
        return {
          complete: result.status === "OK",
          token,
        };
        console.log(result);
      } else {
        console.error(result);
      }
    } catch (err) {
      console.error(err);
      return;
    }
  };

  const handleApplePay = async (event) => {
    event.preventDefault();
    try {
      const token = await applePay.tokenize();
      console.log("token", token);
    } catch (err) {
      console.log(err);
    }
  };
  const handleGooglePay = async (event) => {
    event.preventDefault();
    try {
      const token = await googlePay.tokenize();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <FormWrapper hidden={hidden}>
      <form
        style={{ display: visible ? "inline" : "none" }}
        id="paymentForm"
        onSubmit={handleSubmit}
      >
        <Card id="card" style={{ flex: 1 }} />
        {showSaveCardInfo && (
          <Label
            iconName={`${saveCardInformation ? "checkCircle" : "circle"}`}
            className={`radioButton ${saveCardInformation ? "selected" : ""}`}
            text="Save my card for next time"
            fontSize={14}
            fontWeight={500}
            iconWidth={24}
            iconHeight={24}
            onClick={() => handleSetSaveCardInfo(!saveCardInformation)}
          />
        )}
      </form>
      {applePay && (
        <DigitalPaymentBtn onClick={handleApplePay}>
          <Image
            src="/images/apple-pay-button.svg"
            alt="Buy with Apple Pay"
            layout="fill"
            quality={95}
          />
        </DigitalPaymentBtn>
      )}
      {googlePay && (
        <DigitalPaymentBtn onClick={handleGooglePay}>
          <Image
            src="/images/google-pay-button.svg"
            alt="Buy with Google Pay"
            layout="fill"
            quality={95}
          />
        </DigitalPaymentBtn>
      )}
    </FormWrapper>
  );
};
export default CheckoutForm;
