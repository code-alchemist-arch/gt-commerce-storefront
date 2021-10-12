import { FC } from "react";
import { ProductGalleryWrapper, GalleryItem } from "./index.styles";
import Image from "next/image";

type ProductGalleryItem = {
  imgSrc: string;
};

export interface IProductGalleryProps {
  items: ProductGalleryItem[];
}

export const ProductGallery: FC<IProductGalleryProps> = ({ items }) => {
  return (
    <ProductGalleryWrapper>
      {items.map((item, index) => (
        <GalleryItem key={index}>
          <Image layout="fill" src={item.imgSrc} alt="product gallery item" />
        </GalleryItem>
      ))}
    </ProductGalleryWrapper>
  );
};
