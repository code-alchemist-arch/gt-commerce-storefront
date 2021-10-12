import { FC, ReactElement, useState } from "react";
import Image from "next/image";
import Link from "next/link";

import {
  ProductCardWrapper,
  Favourite,
  ImageWrapper,
  InfoWrapper,
  Title,
  SubText,
  Price,
  SubAttr,
  Description,
  DescriptionReadMore,
  PriceWrapper,
  ProdBadges,
  OnSalePrice,
} from "./index.styles";
import { GTTheme } from "../common/GTtheme";
import { ProductIcon } from "./../base-components/gt-product-icon";
import { GTButton } from "./../base-components/gt-button";
import { CURRENCY } from "utils/constant";
import { GTBadge } from "../base-components/gt-badge";
import { useMemo } from "react";

export interface ProductCardDataTypesense {
  body_html?: string;
  short_description?: string;
  country?: string;
  default_units_per_case?: number;
  gtc_product?: string;
  gtc_variant?: string;
  id: string;
  image_srcset: string;
  image_thumbnail_100: string;
  image_thumbnail_250: string;
  image_thumbnail_500: string;
  in_stock: boolean;
  inventoried?: boolean;
  on_sale_flag?: boolean;
  on_sale_price: number;
  product_brand: string;
  product_category: string;
  product_id: string;
  product_name: string;
  product_size: string;
  product_sku: string;
  product_subcategory: string;
  product_subsubcategory: string;
  qty_available: number;
  region: string;
  retail_price?: number;
  slug: string;
  store_id?: number;
  subregion?: string;
  taxable?: true;
  varietal?: string;
  vintage?: string;
  collection_names?: Array<string>;
  collection_slugs?: Array<string>;
  product_name_order?: number;
}

export interface ProdStatus {
  name: string;
  text: string;
  amount?: string | number;
}

export interface ProdAttribute {
  name: string;
  text: string;
  amount?: string | number;
}

export interface ProductCardProps {
  /**
   * Card Variant
   */
  variant: string | "grid" | "list";
  /**
   * Product Data
   */
  data: ProductCardDataTypesense;
  /**
   * Status of Product
   */
  status?: ProdStatus;
  /**
   * Attribute of Product
   */
  attribute?: ProdAttribute;
  /**
   * Badget Position
   */
  badgePosition?: "left" | "right";
  /**
   * mode
   */
  mode?: string;
  /**
   * Show Favourite
   */
  showFavorite?: boolean;
  /**
   * On Click Cart button handler
   */
  onClickCartButton?: () => void;
  /*
   * Link to product detail
   */
  link?: string;
  subTextAttribute?:
    | "region"
    | "subregion"
    | "product_size"
    | "product_brand"
    | "vintage"
    | "varietal"
    | "product_category"
    | "product_subcategory"
    | "product_subsubcategory"
    | "age";
  subComponentAttribute?:
    | "region"
    | "subregion"
    | "product_size"
    | "product_brand"
    | "vintage"
    | "varietal"
    | "product_category"
    | "product_subcategory"
    | "product_subsubcategory"
    | "age";
  subComponentAttrIcon?: boolean;
  subComponentHoverAttribute?:
    | "region"
    | "subregion"
    | "product_size"
    | "product_brand"
    | "vintage"
    | "varietal"
    | "product_category"
    | "product_subcategory"
    | "product_subsubcategory"
    | "age";
}

export interface IFavouritesIcon {
  width: number;
  height: number;
  color?: string;
}

export const FavouritesIcon = ({
  width = 32,
  height = 32,
  color = "#2A2D34",
}: IFavouritesIcon): ReactElement => {
  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 32 32`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M27.9555 11.7024C27.3629 11.7024 26.8756 12.1935 26.8756 12.7907C26.8756 15.5911 25.19 18.4048 21.845 21.1388L15.9716 25.5584C15.0366 24.9612 13.3641 23.8596 10.2035 21.2583C6.85856 18.511 5.15974 15.6973 5.15974 12.8969C5.15974 11.437 5.60749 10.0301 6.39764 9.02144C7.29314 7.88004 8.55738 7.29607 10.1377 7.29607C11.4019 7.29607 12.5081 7.56151 13.4168 8.07912C13.7855 8.29148 14.1279 8.54364 14.4045 8.83563C14.7995 9.23379 14.9839 9.57887 15.0103 9.61868C15.1815 10.0036 15.5634 10.2292 15.9848 10.2292H16.0374C16.472 10.2292 16.8408 9.9903 17.012 9.60541C17.091 9.44615 18.2762 7.17662 21.8845 7.17662C22.9644 7.17662 23.9258 7.49515 24.7159 8.11894C25.19 8.49056 25.8616 8.41092 26.2304 7.93313C26.5991 7.45533 26.5201 6.77846 26.046 6.40684C24.8608 5.47779 23.4648 5 21.8845 5C18.7898 5 16.9725 6.30066 15.9848 7.34916C15.9584 7.32261 15.9453 7.29607 15.9189 7.2828C15.4975 6.85809 15.0103 6.48647 14.4703 6.18122C13.2324 5.46452 11.7706 5.10618 10.1245 5.10618C7.87258 5.10618 6.00256 5.99541 4.68565 7.66769C3.60578 9.07453 3 10.9326 3 12.8969C3 16.4007 4.9622 19.7718 8.8471 22.9571C12.2579 25.7443 14.0621 26.9122 14.9444 27.4829C15.1288 27.6023 15.2868 27.6953 15.3922 27.7749C15.5765 27.8943 15.7872 27.974 16.0111 27.974H16.0638C16.3008 27.974 16.5247 27.8943 16.7091 27.7616L23.1751 22.8908C23.1883 22.8775 23.2015 22.8775 23.2146 22.8642C27.0863 19.6922 29.0617 16.3078 29.0617 12.804C29.0354 12.1935 28.5613 11.7024 27.9555 11.7024Z"
        fill={color}
      />
    </svg>
  );
};

export const ProductCard: FC<ProductCardProps> = ({
  data,
  status,
  onClickCartButton,
  link,
  attribute = {
    name: "points",
    text: "points",
    amount: 100,
  },
  badgePosition = "left",
  variant = "grid",
  showFavorite = true,
  subTextAttribute,
  subComponentAttribute,
  subComponentAttrIcon,
  subComponentHoverAttribute,
}: ProductCardProps) => {
  const [subCompAttr, setSubCompAttr] = useState<
    | "region"
    | "subregion"
    | "product_size"
    | "product_brand"
    | "vintage"
    | "varietal"
    | "product_category"
    | "product_subcategory"
    | "product_subsubcategory"
    | "age"
  >(subComponentAttribute);

  const onMouseEnterHandler = () => {
    if (
      data[subComponentHoverAttribute] &&
      data[subComponentHoverAttribute] !== ""
    ) {
      setSubCompAttr(subComponentHoverAttribute);
    }
  };

  const onMouseLeaveHandler = () => {
    setSubCompAttr(subComponentAttribute);
  };

  const discountPercentage = useMemo(() => {
    return data.on_sale_flag
      ? ((data.on_sale_price * 100) / data.retail_price).toFixed(0)
      : undefined;
  }, [data]);

  return (
    <ProductCardWrapper variant={variant}>
      <LinkWrapper variant={variant} link={link}>
        {showFavorite && (
          <Favourite position="left">
            <FavouritesIcon width={25} height={25} />
          </Favourite>
        )}
        <ProdBadges position={badgePosition}>
          {status && (
            <GTBadge
              name={status.name}
              variant={status.amount ? "withAmount" : "textonly"}
              amount={status.amount}
              key={status.name}
              text={status.text}
              bgColor={status.name === "sold_out" && "#000000"}
            />
          )}
          {attribute && (
            <GTBadge
              name={attribute.name}
              variant={
                attribute.amount !== undefined ? "withAmount" : "textonly"
              }
              amount={attribute.amount}
              key={attribute.name}
              text={attribute.text}
            />
          )}
          {!(status && attribute) &&
            data.on_sale_flag &&
            discountPercentage && (
              <GTBadge
                name="on sale"
                variant="textonly"
                text={`- ${100 - Number(discountPercentage)}%`}
              />
            )}
        </ProdBadges>
        <ImageWrapper variant={variant}>
          {data.image_thumbnail_500 && (
            <Image
              layout="fill"
              src={data.image_thumbnail_500}
              srcSet={data.image_srcset}
              alt="product"
            />
          )}
        </ImageWrapper>
      </LinkWrapper>
      {variant === "list" && (
        <div>
          <Description>{data.short_description}</Description><DescriptionReadMore><LinkWrapper variant={variant} link={link}><strong>Read More</strong></LinkWrapper></DescriptionReadMore>
        </div>
      )}
      {subComponentAttribute && (
        <div
          style={{
            minHeight: 30,
          }}
        >
          {data[subCompAttr] && data[subCompAttr] !== "" && (
            <SubAttr
              onMouseEnter={onMouseEnterHandler}
              onMouseLeave={onMouseLeaveHandler}
              title={data[subCompAttr]}
            >
              {subComponentAttrIcon && (
                <ProductIcon
                  width={14}
                  height={14}
                  componentAttr={subCompAttr}
                />
              )}
              <span>{data[subCompAttr]}</span>
            </SubAttr>
          )}
        </div>
      )}
      <InfoWrapper variant={variant}>
        <Title variant={variant}>{data.product_name}</Title>
        {data[subTextAttribute] && data[subTextAttribute] !== "" && (
          <SubText>{data[subTextAttribute]}</SubText>
        )}
        {data.on_sale_flag && <OnSalePrice>{data.retail_price}</OnSalePrice>}
        <PriceWrapper>
          <GTButton
            type="button"
            backgroundColor={GTTheme.background.primary.main}
            hoverColor={GTTheme.background.primary.dark}
            onClick={onClickCartButton}
            size="medium"
            disabledColor={"gray"}
            disabled={data.qty_available < 1}
            text={data.qty_available < 1 ? "Out of Stock" : "Add to Cart"}
          />

          <Price>
            {CURRENCY}
            {data.on_sale_flag ? data.on_sale_price : data.retail_price}
          </Price>
        </PriceWrapper>
      </InfoWrapper>
    </ProductCardWrapper>
  );
};

const LinkWrapper: FC<{
  link: string;
  variant: string;
}> = ({ link, variant, children }): React.ReactElement => {
  return link && link !== "" ? (
    <Link href={link} passHref>
      <div
        style={{
          width: variant === "grid" ? "100%" : "50%",
          maxWidth: 200,
          flexShrink: 0,
        }}
      >
        {children}
      </div>
    </Link>
  ) : (
    <>{children}</>
  );
};
