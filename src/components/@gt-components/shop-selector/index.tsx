import Image from "next/image";
import { FC } from "react";
import { ShopMapSVG } from "../shop-map-svg";

import {
  IShopItemProps as ShopItem,
  ShopSelectorItem,
} from "../shop-selector-item";

import {
  ShopItemsWrapper,
  ShopMap,
  ShopSelectorHeader,
  ShopSelectorWrapper,
  ShopsGridWrapper,
} from "./index.styles";

export interface IShopSelectorProps {
  layoutType: "anchor" | "grid" | string;
  anchorPosition?: "left" | "right" | string;
  headerText: string;
  items: Array<ShopItem>;
  anchorItem?: ShopItem;
}

export const ShopSelector: FC<IShopSelectorProps> = ({
  layoutType,
  anchorPosition,
  items,
  headerText,
  anchorItem,
}: IShopSelectorProps) => {
  return (
    <ShopSelectorWrapper>
      <ShopSelectorHeader>
        <h3>{headerText}</h3>
      </ShopSelectorHeader>
      <ShopsGridWrapper>
        {layoutType === "anchor" && (
          <ShopMap anchorPosition={anchorPosition}>
            <ShopMapSVG />
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
