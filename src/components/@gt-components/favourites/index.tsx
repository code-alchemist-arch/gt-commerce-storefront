import Image from "next/image";
import Link from "next/link";
import { FC } from "react";

import { FavItem, FavouritesWrapper } from "./index.styles";

export interface IFavItem {
  name?: string;
  image: {
    url: string;
  };
  url?: string;
  alt?: string;
}

export interface IFavProps {
  favItems: Array<IFavItem>;
}

export const Favourites: FC<IFavProps> = ({ favItems }) => {
  return (
    <FavouritesWrapper>
      {favItems.map((favItm: IFavItem, idx) => (
        <FavItem key={idx}>
          <Link href={favItm?.url || ""} passHref>
            <>
              <Image layout="fill" src={favItm.image?.url} alt={favItm?.alt} />
            </>
          </Link>
        </FavItem>
      ))}
    </FavouritesWrapper>
  );
};
