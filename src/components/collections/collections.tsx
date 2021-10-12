import React from "react";
import Link from "next/link";

import { CollectionHomeBanner as CollectionHomeBannerType } from "interfaces";
import CollectionHomeBanner from "components/collection-home-banner/CollectionHomeBanner";
import { CollectionsWrapper } from "./collections.style";

type Props = {
  items: CollectionHomeBannerType[];
};

const Collections: React.FC<Props> = ({ items = [] }: Props) => {
  return (
    <CollectionsWrapper
      className={items.length > 4 ? `col-4` : `col-${items.length}`}
    >
      {items.map((item) => (
        <Link href={item.link} key={item.id} passHref>
          <a>
            <CollectionHomeBanner
              title={item.title}
              subtitle={item.subtitle}
              imgSrc={item.imgSrc}
              iconName={item.iconName}
              color={item.color}
              labelPosition={item.labelPosition}
            />
          </a>
        </Link>
      ))}
    </CollectionsWrapper>
  );
};

export default Collections;
