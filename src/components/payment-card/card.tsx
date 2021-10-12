import React from "react";
import MasterCard from "./image/master-card.png";
import Paypal from "./image/paypal.png";
import Visa from "./image/visa.png";
import Amex from "./image/american-express.png";
import GenericCard from "./image/credit-card.png";
import {
  PaymentCardWrapper,
  CardLogo,
  CardNumber,
  CardNumTitle,
  Name,
} from "./payment-card.style";

interface Props {
  id: string;
  name: string;
  cardType: string;
  lastFourDigit: string;
  color: string;
}

const Card: React.FC<Props> = ({
  id,
  name,
  cardType,
  lastFourDigit,
  color,
}) => {
  const logo =
    (cardType === "MASTERCARD" && MasterCard) ||
    (cardType === "VISA" && Visa) ||
    (cardType === "AMERICAN_EXPRESS" && Amex) ||
    GenericCard;

  return (
    <PaymentCardWrapper className="payment-card" color={color}>
      <CardLogo>
        <img src={logo} alt={`card-${id}`} />
      </CardLogo>
      <CardNumTitle>Card Number</CardNumTitle>
      <CardNumber>
        <span>****</span>
        <span>****</span>
        <span>****</span>
        <span className="card-number">{lastFourDigit}</span>
      </CardNumber>
      <Name>{name}</Name>
    </PaymentCardWrapper>
  );
};

export default Card;
