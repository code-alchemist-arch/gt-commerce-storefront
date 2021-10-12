import React from "react";
import CloseIcon from "../../assets/icons/CloseIcon";
import Card from "./card";
import { DeleteButton, Wrapper } from "./payment-card.style";

interface PaymentCardProps {
  className?: string;
  logo: string;
  alt: string;
  cardNumber: string;
  name: string;
  color?: string;
}

const PaymentCard: React.FunctionComponent<any> = ({
  className,
  onChange,
  onDelete,
  name,
  id,
  cardType,
  lastFourDigit,
  type,
  color,
  active,
}) => {
  function handleChange() {
    if (onChange) {
      onChange();
    }
  }
  function handleDelete() {
    if (onDelete) {
      onDelete();
    }
  }
  return (
    <Wrapper
      htmlFor={`payment-card-${id}`}
      className={`payment-card-radio ${className ? className : ""}`}
    >
      <input
        type="checkbox"
        id={`payment-card-${id}`}
        name={name}
        value={`payment-card-${id}`}
        onChange={handleChange}
        checked={type === "primary" || active}
      />

      <Card
        id={`card-${id}`}
        cardType={cardType}
        lastFourDigit={lastFourDigit}
        color={color}
        name={name}
      />
      <DeleteButton onClick={handleDelete} className="card-remove-btn">
        <CloseIcon />
      </DeleteButton>
    </Wrapper>
  );
};

export default PaymentCard;
