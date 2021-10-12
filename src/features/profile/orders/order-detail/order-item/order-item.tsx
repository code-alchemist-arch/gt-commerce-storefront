import { CURRENCY } from "utils/constant";
import React from "react";
import {
  OrderItemWrapper,
  ItemImgWrapper,
  ItemDescription,
  ItemPricing,
} from "./order-item.style";
import Label from "../../../../../components/label/label";
import Image from "../../../../../components/image/image";
import { defaultTheme } from "../../../../../site-settings/site-theme/default";

const productPlaceholder = "/images/product-placeholder.png";

type OrderItemType = {
  img: { alt: string; url: string };
  title: string;
  vintage: string;
  unitPrice: number;
  quantity: number;
  subtotal: number;
  regularPrice?: number;
  discount?: number;
};

type Props = {
  item: OrderItemType;
  className?: string;
};
const OrderItem: React.FC<Props> = ({ item, className }: Props) => {
  const {
    img,
    title,
    vintage,
    unitPrice,
    quantity,
    subtotal,
    regularPrice,
    discount,
  } = item;
  return (
    <OrderItemWrapper className={className}>
      <ItemImgWrapper>
        <Image alt={title} src={img?.url || productPlaceholder} />
      </ItemImgWrapper>
      <ItemDescription>
        <div className="title">{title}</div>
        <div className="vintage">
          {vintage && (
            <Label
              iconName="vintage"
              iconWidth={24}
              iconHeight={24}
              text={vintage}
              fontSize={12}
              fontWeight={500}
              color={defaultTheme.colors.gray}
            />
          )}
        </div>
      </ItemDescription>
      <ItemPricing>
        <div className="unitPrice">
          {discount && (
            <div style={{ textDecoration: "line-through" }}>
              {CURRENCY} {regularPrice}
            </div>
          )}
          {CURRENCY} {unitPrice.toFixed(2)} X {quantity}
        </div>
        <div className="subtotal">
          {CURRENCY} {subtotal.toFixed(2)}
        </div>
      </ItemPricing>
    </OrderItemWrapper>
  );
};

export default OrderItem;
