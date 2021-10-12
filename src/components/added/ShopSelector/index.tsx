import Image from "next/image";
import { FC } from "react";
// import { GlobalStyle } from "../CommonStyles/index.styles";
import {
  IShopItemProps as ShopItem,
  ShopSelectorItem,
} from "../ShopSelectorItem";
import {
  ShopItemsWrapper,
  ShopMap,
  ShopSelectorHeader,
  ShopSelectorWrapper,
  ShopsGridWrapper,
} from "./index.styles";

export interface IShopSelectorProps {
  layoutType: "anchor" | "grid";
  anchorPosition?: "left" | "right";
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
      {/*<GlobalStyle />*/}
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
