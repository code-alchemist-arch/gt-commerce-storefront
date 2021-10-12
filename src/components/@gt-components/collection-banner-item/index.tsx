import { FC, ReactElement } from "react";

import { ItemWrapper } from "./index.styles";

export interface IBannerItemProps {
  imgUrl: string;
  link?: string;
  imgAlt?: string;
  title?: string;
  subTitle?: string;
}

export const ShopBannerItem: FC<IBannerItemProps> = ({
  imgUrl,
  imgAlt = "",
  link = "#",
  title,
  subTitle,
}: IBannerItemProps): ReactElement => {
  return (
    <ItemWrapper>
      <a href={link} title={title}>
        <figure>
          <img src={imgUrl} alt={imgAlt} />
          <figcaption>
            <h3>{title}</h3>
            <p>{subTitle}</p>
          </figcaption>
        </figure>
      </a>
    </ItemWrapper>
  );
};
