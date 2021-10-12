import React from "react";
import Link from "next/link";
import { AddItemToCart } from "components/add-item-to-cart";
import styled from "styled-components";
import css from "@styled-system/css";
import { CURRENCY } from "../../utils/constant";
import { Favourite, ProductCardPriceBox, Tag } from "./product-card.style";
import { defaultTheme } from "../../site-settings/site-theme/default";
import { ProductTypesense } from "../../interfaces";
import { variant } from "styled-system";
import FavouritesIcon from "../../assets/icons/FavouritesIcon";

const Card = styled.div<{ variant: string }>(
  {
    height: "100%",
    position: "relative",
    backgroundColor: "#fff",
    overflow: "hidden",
    borderRadius: 6,
    border: "1px solid #f3f3f3",
    display: "flex",
    flexDirection: "column",
    transition: "0.3s ease-in-out",
    cursor: "pointer",

    ":hover": {
      boxShadow: "0 2px 4px rgba(0, 0, 0, 0.08)",
      transform: "translateY(-5px)",
    },
  },
  variant({
    variants: {
      list: {
        flexDirection: "row",
      },
      grid: {
        flexDirection: "column",
      },
    },
  })
);
const ImageWrapper = styled.div<{ variant: string }>(
  {
    padding: "10px 0",
    height: "100%",
    position: "relative",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flex: 2,
    overflow: "hidden",
  },
  variant({
    variants: {
      list: {
        justifyContent: "flex-start",
        height: "100%",
      },
      grid: {
        padding: 0,
        marginTop: 30,
      },
    },
  })
);

const Image = styled.img({
  maxWidth: "100%",
  maxHeight: "100%",
  height: "auto",
  objectFit: "contain",
});

const Discount = styled.div(
  css({
    position: "absolute",
    top: "1rem",
    left: "1rem",
    backgroundColor: "primary.regular",
    color: "#fff",
    overflow: "hidden",
    padding: "0.25rem 0.5rem",
    fontSize: 12,
    borderRadius: 6,
    pointerEvents: "none",
  })
);

const Title = styled.h2<{ condensed?: boolean; grid?: boolean }>`
  margin-top: 5px;
  color: #663344;
  font-size: 16px;
  font-weight: 500;
  text-align: ${({ condensed }) => (condensed ? "center" : "left")};
  ${({ grid }) =>
    grid &&
    `
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
  `};
`;

const SubTitle = styled.div<{ condensed?: boolean }>`
  margin-bottom: 8px;
  font-size: 14px;
  font-weight: 400;
  color: #4c4c4c;
  text-align: ${({ condensed }) => (condensed ? "center" : "left")};
`;

const PriceWrapper = styled.div<{ condensed?: boolean }>`
  display: flex;
  align-items: center;
  margin-right: ${({ condensed }) => (condensed ? 0 : "15px")};
  margin-bottom: ${({ condensed }) => (condensed ? "15px" : 0)};
`;

const Price = styled.span(
  css({
    color: "rgb(86,86,86)",
    fontSize: 18,
    fontWeight: "semiBold",
    lineHeight: 1,
  })
);

const SalePrice = styled.span(
  css({
    color: "text.regular",
    fontSize: 15,
    lineHeight: 1,
    fontWeight: "regular",
    padding: "0 5px",
    overflow: "hidden",
    position: "relative",
    marginLeft: 10,
    display: "flex",
    alignItems: "center",

    ":before": {
      content: '""',
      width: "100%",
      height: 1,
      display: "inline-block",
      backgroundColor: "text.regular",
      position: "absolute",
      top: "50%",
      left: 0,
    },
  })
);

const Box = styled.div`
  box-sizing: "border-box";
  min-width: 0;
  margin: 0;
  padding: 2px;
  padding-bottom: 10px;
  margin-right: 30px;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  flex: 1;

  @media screen and (max-width: 991px) {
    padding: 15px;
  }

  @media screen and (max-width: 400px) {
    padding: 15px 5px;
  }
`;

const productPlaceholder = "/images/product-placeholder.png";

interface Props {
  data: ProductTypesense;
  mode?: string;
}

export const ProductCard = ({ data, mode }: Props) => {
  const {
    retail_price,
    product_name,
    product_size,
    in_stock,
    slug,
    on_sale_flag,
    on_sale_price,
    image_srcset,
    image_thumbnail_100,
  } = data;

  const price = on_sale_flag ? on_sale_price : retail_price;
  return (
    <Link href="/products/[slug]" as={`/products/${slug}`} passHref>
      <Card className="product-card" variant={mode}>
        {!in_stock && (
          <Tag
            className={`disabled ${defaultTheme.productCard.tag.position}`}
            position={defaultTheme.productCard.tag.position}
          >
            Sold Out
          </Tag>
        )}
        <Favourite tagPosition={defaultTheme.productCard.tag.position}>
          <FavouritesIcon width={25} height={25} />
        </Favourite>
        <ImageWrapper variant={mode}>
          <Image
            src={image_thumbnail_100 || productPlaceholder}
            alt={product_name}
            srcSet={image_srcset}
            height={mode === "grid" ? "250px" : "100%"}
            width={mode === "list" ? "200px" : "100%"}
          />
        </ImageWrapper>
        <Box>
          <Title grid={mode === "grid"} condensed>
            {product_name}
          </Title>
          <SubTitle condensed>{product_size}</SubTitle>
          <ProductCardPriceBox condensed>
            <PriceWrapper condensed>
              {in_stock && (
                <Price>
                  {CURRENCY}
                  {price}
                </Price>
              )}
            </PriceWrapper>

            {/*<AddItemToCart data={data} slug={data.slug} disabled={!in_stock} />*/}
          </ProductCardPriceBox>
        </Box>
      </Card>
    </Link>
  );
};
