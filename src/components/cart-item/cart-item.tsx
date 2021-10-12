import React from "react";
import { Counter } from "components/counter/counter";
import { CURRENCY } from "utils/constant";
import {
  ItemBox,
  Image,
  Information,
  Name,
  Price,
  Weight,
  Total,
} from "./cart-item.style";

interface Props {
  data: any;
  onDecrement: () => void;
  onIncrement: () => void;
  onRemove: () => void;
}

const productPlaceholder = "/images/product-placeholder.png";

export const CartItem: React.FC<Props> = ({
  data,
  onDecrement,
  onIncrement,
  onRemove,
}) => {
  const { name, metadata, variants, quantity } = data;

  const image = metadata
    .filter((item) => item.key.includes("image_srcset_primary"))
    .map((item) => ({
      srcSet: item.value,
      url: item.value.split(",\n")[0],
    }))[0];

  const price = variants[0]?.pricing?.priceUndiscounted?.gross?.amount.toFixed(
    2
  );
  const salePrice = variants[0]?.pricing?.price?.gross?.amount.toFixed(2);
  const displayPrice = salePrice ? salePrice : price;
  return (
    <ItemBox>
      <Counter
        value={quantity}
        onDecrement={onDecrement}
        onIncrement={onIncrement}
        variant="lightVertical"
      />
      <Image src={image?.url || productPlaceholder} />
      <Information>
        <Name>{name}</Name>
        <Price>
          {CURRENCY}
          {displayPrice}
        </Price>
        <Weight>{quantity} X</Weight>
      </Information>
      <Total>
        {CURRENCY}
        {(quantity * displayPrice).toFixed(2)}
      </Total>
    </ItemBox>
  );
};
