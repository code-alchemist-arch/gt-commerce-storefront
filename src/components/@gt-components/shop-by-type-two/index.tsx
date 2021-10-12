import Image from "next/image";
import { FC } from "react";

import {
  IShopItemProps as ShopItem,
  ShopSelectorItem,
} from "../shop-by-type-two-item";
import {
  ShopItemsWrapper,
  ShopMap,
  ShopSelectorHeader,
  ShopSelectorWrapper,
  ShopsGridWrapper,
} from "./index.styles";

export interface IShopByTypeTwoProps {
  layoutType: "anchor" | "grid";
  anchorPosition?: "left" | "right";
  headerText: string;
  items: Array<ShopItem>;
  anchorItem?: ShopItem;
}

export const ShopByTypeTwo: FC<IShopByTypeTwoProps> = ({
  layoutType,
  anchorPosition,
  items,
  headerText,
  anchorItem,
}: IShopByTypeTwoProps) => {
  return (
    <ShopSelectorWrapper>
      <ShopSelectorHeader>
        <h3>{headerText}</h3>
      </ShopSelectorHeader>
      <ShopsGridWrapper>
        {layoutType === "anchor" && (
          <ShopMap anchorPosition={anchorPosition}>
            <Image layout="fill" src={anchorItem.imageSrc} alt="Map" />
          </ShopMap>
        )}
        <ShopItemsWrapper
          anchorPosition={anchorPosition}
          layoutType={layoutType}
        >
          {items.map((item, index) => (
            <ShopSelectorItem key={index} {...item} />
          ))}
        </ShopItemsWrapper>
      </ShopsGridWrapper>
    </ShopSelectorWrapper>
  );
};
