import React from "react";
import Image from "next/image";
import {
  EmptyCartWrapper,
  EmptyCartTitle,
  EmptyCartMessage,
} from "./cart.style";
const EmptyCart = () => {
  return (
    <EmptyCartWrapper>
      <EmptyCartTitle>Your cart is empty!</EmptyCartTitle>
      <EmptyCartMessage>
        Looks like you haven’t make your choice yet...
      </EmptyCartMessage>
      <Image
        src="/images/empty-cart.png"
        width={175}
        priority
        height={175}
        quality={95}
      />
    </EmptyCartWrapper>
  );
};

export default EmptyCart;
