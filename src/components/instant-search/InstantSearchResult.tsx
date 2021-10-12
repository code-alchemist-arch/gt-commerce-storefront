import React from "react";
import {
  InstantSearchResultWrapper,
  ResultContent,
  ResultImage,
  ResultName,
  ResultPrice,
  ResultVintage,
} from "./InstantSearch.style";
import { CURRENCY } from "../../utils/constant";
import Label from "../label/label";
import Image from "../image/image";
import Link from "next/link";
import { ProductTypesense } from "../../interfaces";

const productPlaceholder = "/images/product-placeholder.png";

const InstantSearchResult = ({
  hit,
  onClick,
}: {
  hit: ProductTypesense;
  onClick;
}) => {
  const {
    retail_price,
    product_name,
    vintage,
    slug,
    on_sale_flag,
    on_sale_price,
    image_srcset,
    image_thumbnail_100,
    in_stock,
  } = hit;

  const price = on_sale_flag ? on_sale_price : retail_price;

  return (
    <Link href="/products/[slug]" as={`/products/${slug}`} passHref>
      <InstantSearchResultWrapper onClick={onClick}>
        <ResultImage>
          <Image
            src={image_thumbnail_100 || productPlaceholder}
            alt={product_name}
            width="83px"
            height="92px"
            srcSet={image_srcset}
          />
        </ResultImage>
        <ResultContent>
          <ResultName> {product_name}</ResultName>
          {in_stock && (
            <ResultPrice>
              {CURRENCY}
              {price}
            </ResultPrice>
          )}
        </ResultContent>
        {vintage && (
          <ResultVintage>
            <Label
              iconName="vintage"
              iconWidth={22}
              iconHeight={22}
              text={vintage}
              fontWeight={500}
              fontSize={10}
            />
          </ResultVintage>
        )}
      </InstantSearchResultWrapper>
    </Link>
  );
};

export default InstantSearchResult;
