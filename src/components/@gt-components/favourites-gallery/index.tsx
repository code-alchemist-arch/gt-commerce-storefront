import { FC } from "react";
import Link from "next/link";
import Image from "next/image";

import { IFavItem } from "../favourites";
import { FavouritesGalleryWrapper, FavItem } from "./index.styles";

export interface IFavouriteGalleryProps {
  favItems: IFavItem[];
}

export const FavouritesGallery: FC<IFavouriteGalleryProps> = ({ favItems }) => {
  if (!favItems || favItems.length < 1) return null;
  return (
    <FavouritesGalleryWrapper>
      {favItems.map((favItm: IFavItem, idx) => (
        <FavItem key={idx}>
          <Link href={favItm?.url || ""} passHref>
            <Image layout="fill" src={favItm.image?.url} alt={favItm?.alt} />
          </Link>
        </FavItem>
      ))}
    </FavouritesGalleryWrapper>
  );
};
