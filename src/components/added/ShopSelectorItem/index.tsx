import { FC, ReactElement } from "react";
import { ShopItemImage, ShopItemLink, ShoptItemWrapper } from "./index.styles";

export interface IShopItemProps {
  imageSrc: string;
  imageAlt: string;
  url: string;
}

export const ShopSelectorItem: FC<IShopItemProps> = ({
  imageAlt,
  imageSrc,
  url,
}): ReactElement => {
  return (
    <ShoptItemWrapper>
      <ShopItemLink href={url}>
        <ShopItemImage
          width="354px"
          height="354px"
          src={imageSrc}
          alt={imageAlt}
        />
      </ShopItemLink>
    </ShoptItemWrapper>
  );
};
