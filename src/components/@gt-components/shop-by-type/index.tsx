import Image from "next/image";
import { FC } from "react";
import {
  ShopByTypeItem,
  ShopByTypesWrapper,
  ShopByTypeContainer,
  Title,
} from "./index.styles";

export interface IShopByType {
  shops: Array<{
    imgSrc: string;
  }>;
}

export const ShopByType: FC<IShopByType> = ({ shops }) => {
  return (
    <ShopByTypeContainer>
      <Title>
        <hr />
        <span>Shop By Type</span>
        <hr />
      </Title>
      <ShopByTypesWrapper>
        {shops.map((shopItem, index) => (
          <ShopByTypeItem key={index}>
            <Image layout="fill" src={shopItem.imgSrc} alt="Shopt Item" />
          </ShopByTypeItem>
        ))}
      </ShopByTypesWrapper>
    </ShopByTypeContainer>
  );
};
