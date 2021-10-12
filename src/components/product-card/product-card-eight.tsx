import React from "react";
import Link from "next/link";
import { AddItemToCart } from "components/add-item-to-cart";
import styled from "styled-components";
import css from "@styled-system/css";
import { Box } from "components/box";
import { CURRENCY } from "../../utils/constant";
import { Favourite, ProductCardPriceBox, Tag } from "./product-card.style";
import { defaultTheme } from "../../site-settings/site-theme/default";
import FavouritesIcon from "../../assets/icons/FavouritesIcon";
import { variant } from "styled-system";
import themeGet from "@styled-system/theme-get";
import Icon from "../icon/icon";

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

const ImageWrapper = styled.div({
  maxHeight: 290,
  marginTop: 25,
  position: "relative",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  flexGrow: 1,
  overflow: "hidden",

  "@media screen and (max-width: 1280px)": {
    height: 250,
  },

  "@media screen and (max-width: 560px)": {
    height: 180,
  },
});

const Image = styled.img({
  maxWidth: "100%",
  maxHeight: "100%",
  height: "auto",
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

export const Attribute = styled.div`
  border: 1px solid lightGray;
  border-radius: 100px;
  margin: 15px;
  padding: 3px 10px;
  align-self: flex-start;
  font-size: 0.8rem;
  font-weight: bold;
  height: 3vh;
  width: auto;
  color: ${themeGet("primary.color")};

  & > div {
    display: inline-flex;
    align-items: center;
    gap: 8px;
  }

  & .onhover {
    display: none;
  }

  &:hover,
  &:focus {
    .onhover {
      display: flex;
      transition: 0.5s;
      transition-delay: 0.3s;
    }
    .static {
      display: none;
      transition: 0.5s;
      transition-delay: 0.3s;
    }
  }
`;

const productPlaceholder = "/images/product-placeholder.png";

interface Props {
  data: any;
  mode?: string;
}

export const ProductCard = ({ data, mode }: Props) => {
  const {
    name,
    thumbnail,
    variants,
    slug,
    discountInPercent,
    isAvailable,
    metadata,
  } = data;

  const image = metadata
    .filter((item) => item.key.includes("image_srcset_primary"))
    .map((item) => ({
      srcSet: item.value,
      url: item.value.split(",\n")[0],
    }))[0];

  const price = variants[0]?.pricing?.priceUndiscounted?.gross?.amount.toFixed(
    2
  );
  const salePrice = variants[0]?.pricing?.price?.gross?.amount.toFixed(2);
  const discount = variants[0]?.pricing?.discount?.gross?.amount.toFixed(2);
  const primaryAttribute = {
    icon: "menu-wine",
    value: "2099",
  };
  const product_size = "750 mL";
  const secondaryAttribute = {
    icon: "address",
    value: "California, United States",
  };
  return (
    <Link href="/products/[slug]" as={`/products/${slug}`} passHref>
      <Card className="product-card" variant={mode}>
        {!isAvailable ? (
          <Tag
            className={`disabled ${defaultTheme.productCard.tag.position}`}
            position={defaultTheme.productCard.tag.position}
          >
            Sold Out
          </Tag>
        ) : (
          discount && (
            <Tag position="left">
              -{discount}
              {CURRENCY}
            </Tag>
          )
        )}

        <Favourite tagPosition={defaultTheme.productCard.tag.position}>
          <FavouritesIcon width={25} height={25} />
        </Favourite>
        <ImageWrapper>
          <Image
            src={image?.url || productPlaceholder}
            alt={name}
            srcSet={image?.srcSet}
          />
          {discountInPercent ? <Discount>{discountInPercent}%</Discount> : null}
        </ImageWrapper>

        <Attribute>
          <div className="static">
            <Icon name={secondaryAttribute.icon} width={22} height={22} />
            <span>{primaryAttribute.value}</span>
          </div>
          <div className="onhover">
            <Icon name={primaryAttribute.icon} width={22} height={22} />
            <span>{secondaryAttribute.value}</span>
          </div>
        </Attribute>

        <Box
          padding={30}
          paddingTop={0}
          marginRight={30}
          width="100%"
          display="flex"
          flexDirection="column"
          justifyContent="space-between"
          flex="1"
        >
          <Title grid={mode === "grid"} condensed>
            {name}
          </Title>
          <SubTitle condensed>{product_size}</SubTitle>
          <ProductCardPriceBox condensed>
            <PriceWrapper condensed>
              {isAvailable && (
                <>
                  <Price>
                    {CURRENCY}
                    {salePrice ? salePrice : price}
                  </Price>
                  {discountInPercent ? (
                    <SalePrice>
                      {CURRENCY}
                      {price}
                    </SalePrice>
                  ) : null}
                </>
              )}
            </PriceWrapper>

            {/*<AddItemToCart data={data} disabled={!isAvailable} />*/}
          </ProductCardPriceBox>
        </Box>
      </Card>
    </Link>
  );
};
