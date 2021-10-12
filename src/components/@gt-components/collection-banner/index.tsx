import Image from "next/image";
import { ReactElement } from "react";
import { FC } from "react";

import {
  IBannerItemProps as BannerItem,
  ShopBannerItem,
} from "./../collection-banner-item/index";

import { ShopBannerWrapper, CenterMap } from "./index.styles";

export interface IShopBannerProps {
  items: BannerItem[];
  shopMap: BannerItem;
}

export const ShopBanner: FC<IShopBannerProps> = ({
  items,
  shopMap,
}): ReactElement => {
  return (
    <ShopBannerWrapper>
      {items.map((itm, index) => (
        <ShopBannerItem key={index} {...itm} />
      ))}
      <CenterMap>
        <a href={shopMap.link} title={shopMap?.title}>
          <Image layout="fill" src={shopMap.imgUrl} alt={shopMap.imgAlt} />
        </a>
      </CenterMap>
    </ShopBannerWrapper>
  );
};
