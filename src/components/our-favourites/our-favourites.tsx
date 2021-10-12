import React from "react";
import Image from "next/image";
import {
  OurFavoritesBottomWrapper,
  OurFavouritesBottomImage,
  OurFavouritesBottomImageWrapper,
  OurFavouritesContainer,
} from "./our-favourites.style";

import { HomeTitle } from "../home-title/home-title";
import ProductsCarousel from "../product-carousel/product-carousel";
import Link from "next/link";
import { Favourites, IFavItem } from "components/@gt-components/favourites";
import { useState } from "react";
import { FavouritesGallery } from "components/@gt-components/favourites-gallery";

interface Props {
  images: {
    image: {
      url: string;
    };
    alt: string;
    url: string;
  }[];
  products: any[];
  deviceType: {
    mobile: boolean;
    tablet: boolean;
    desktop: boolean;
  };
  title: string;
  subtitle: string;
  showFavourite?: boolean;
}

export const OurFavourites: React.FC<Props> = ({
  title,
  subtitle,
  images,
  products = [],
  deviceType,
  showFavourite,
}) => {
  const [galleryImages, setGalleryImages] = useState<IFavItem[]>([
    {
      name: "gallery-img-1",
      image: {
        url:
          "https://via.placeholder.com/356x400.png?text=Image+with+link+456x400",
      },
      alt: "Gallery Image 1",
      url: "/",
    },
    {
      name: "gallery-img-2",
      image: {
        url:
          "https://via.placeholder.com/356x400.png?text=Image+with+link+456x400",
      },
      alt: "Gallery Image 2",
      url: "/",
    },
    {
      name: "gallery-img-3",
      image: {
        url:
          "https://via.placeholder.com/356x400.png?text=Image+with+link+456x400",
      },
      alt: "Gallery Image 3",
      url: "/",
    },
    {
      name: "gallery-img-4",
      image: {
        url:
          "https://via.placeholder.com/356x400.png?text=Image+with+link+456x400",
      },
      alt: "Gallery Image 4",
      url: "/",
    },
  ]);

  return (
    <OurFavouritesContainer>
      <HomeTitle title={title} subtitle={subtitle} />
      <Favourites favItems={images} />
      <FavouritesGallery favItems={galleryImages} />
    </OurFavouritesContainer>
  );
};
