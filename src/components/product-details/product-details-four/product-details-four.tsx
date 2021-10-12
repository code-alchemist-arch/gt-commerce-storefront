import React, { useContext, useEffect } from "react";
import { Button } from "components/button/button";
import {
  ProductDetailsWrapper,
  ProductPreview,
  ProductInfo,
  ProductTitlePriceWrapper,
  ProductTitle,
  ButtonText,
  ProductCartWrapper,
  ProductPriceWrapper,
  ProductCartBtn,
  RelatedItems,
  DescriptionParagraph,
  ProductTagsWrapper,
  ProductTagsContainer,
  ProductTagsSection,
  ProductDescriptionWrapper,
  DivisorLine,
  ProductPriceInfo,
  ProductDetailsContainer,
  ProductStockInfo,
  AddToFavouriteButton,
  ProductAttribute,
  ProductAttributes,
  WishlistButton,
  ProductAttributeText,
  ProductBadge,
  Disclaimer,
  Separator,
  Sample,
  SampleInfo,
  SampleTitle,
} from "./product-details-four.style";
import CartIcon from "assets/icons/CartIcon";
import CarouselWithCustomDots from "components/multi-carousel/multi-carousel";
import { CURRENCY } from "utils/constant";
import { FormattedMessage } from "react-intl";
import { useLocale } from "contexts/language/language.provider";
import { useCart } from "contexts/cart/use-cart";
import { Counter } from "components/counter/counter";
import { ProductGrid } from "components/product-grid/product-grid";
import { Product } from "../../../interfaces";
import {
  getDiscountPercentage,
  getProductAttribute,
  getProductAttributeValues,
} from "../../../utils/utils";
import { GET_PRODUCT_GENERAL } from "../../../graphql/query/cms/product_general.query";
import fetcher from "../../../utils/fetcher";
import useSWR from "swr";
import Accordion from "../../accordion/accordion";
import Label from "components/label/label";
import { defaultTheme } from "../../../site-settings/site-theme/default";
import RemindBackInStock from "../../remind-back-in-stock/remind-back-in-stock";
import FavouritesIcon from "../../../assets/icons/FavouritesIcon";
import edjsHTML from "editorjs-html";
import Icon from "../../icon/icon";
import ImagePreviewGallery from "components/image-preview-gallery/image-preview-gallery";
import Facebook from "../../../assets/icons/Facebook";
import Twitter from "../../../assets/icons/Twitter";
import { Linkedin } from "../../../assets/icons/Linkedin";
import { AuthContext } from "../../../contexts/auth/auth.context";
import Image from "next/image";

type ProductDetailsProps = {
  product: Product;
  deviceType: {
    mobile: boolean;
    tablet: boolean;
    desktop: boolean;
  };
  wishlistIcon?: boolean;
};

type TagProps = {
  icon: string;
  text: string;
};

const Tag = ({ icon, text }: TagProps) => (
  <Label
    fontSize={13}
    iconName={icon}
    iconWidth={22}
    iconHeight={22}
    color={defaultTheme.colors.gray}
    text={text}
  />
);

const productPlaceholder = "/images/product-placeholder.png";

const ProductDetails: React.FunctionComponent<ProductDetailsProps> = ({
  product,
  deviceType,
  wishlistIcon,
}) => {
  const { authState } = useContext<any>(AuthContext);
  const { isRtl } = useLocale();
  const pageUrl = `https://${process.env.VERCEL_URL}/products/${product.slug}`;
  const { add, update, isInCart, getItem } = useCart();
  const { name, metadata, variants, collections } = product;
  const sku = variants[0].sku;
  const price = variants[0]?.pricing?.priceUndiscounted?.gross?.amount.toFixed(
    2
  );
  const salePrice = variants[0]?.pricing?.price?.gross?.amount.toFixed(2);
  const discountPercentage = getDiscountPercentage(product);

  const parsedDescription = JSON.parse(product.descriptionJson);
  const edjsParser = edjsHTML();
  const HTMLdescription =
    product.descriptionJson !== "{}"
      ? edjsParser.parse(parsedDescription).join("<br/>")
      : "";

  const country = getProductAttribute(product, "Country");
  const vintage = getProductAttribute(product, "Vintage");
  const varietal = getProductAttribute(product, "Varietal");
  const region = getProductAttribute(product, "Region");
  const subRegion = getProductAttribute(product, "Sub Region");
  const size = getProductAttribute(product, "Product Size (GT)");
  const flavorProfile = getProductAttributeValues(
    product,
    "Flavor Profile (GT)"
  );

  const images = metadata
    .filter((item) => item.key.includes("image_srcset"))
    .map((item) => ({
      srcSet: item.value,
      url: item.value.split(" ")[0],
    }));

  const regionTag = region
    ? `${subRegion ? subRegion.concat(", ") : ""}${region}.`
    : undefined;
  const { data: productGeneralData } = useSWR(GET_PRODUCT_GENERAL, fetcher);

  const descriptionItems = [
    {
      id: 1,
      icon: "varietal",
      title: "Product description ",
      component:
        HTMLdescription !== "" ? (
          <DescriptionParagraph
            dangerouslySetInnerHTML={{ __html: HTMLdescription }}
          />
        ) : (
          <DescriptionParagraph>
            <p style={{ fontWeight: 600 }}>
              We don&apos;t have a description of this product.
            </p>
          </DescriptionParagraph>
        ),
    },
  ];
  productGeneralData?.productGeneral?.tabs.forEach(
    (tab: { title: string; text: string; icon_slug: string }, index) => {
      descriptionItems.push({
        id: index + 2,
        icon: tab.icon_slug,
        title: tab.title,
        component: (
          <DescriptionParagraph
            dangerouslySetInnerHTML={{ __html: tab.text }}
          />
        ),
      });
    }
  );

  const handleAddClick = (e) => {
    e.stopPropagation();
    add(product);
  };

  const handleRemoveClick = (e) => {
    e.stopPropagation();
    const item = getItem(product.id);
    update(product.id, item?.quantity - 1);
  };

  useEffect(() => {
    setTimeout(() => {
      window.scrollTo(0, 0);
    }, 500);
  }, []);

  const phoneNumber = authState?.user?.addresses[0]?.phone;
  const isProductAvailable =
    product.isAvailable && product.variants[0]?.quantityAvailable;

  return (
    <>
      <ProductDetailsWrapper className="product-card" dir="ltr">
        {!isRtl && (
          <ProductPreview>
            <ImagePreviewGallery
              items={images.length > 0 ? images : [{ url: productPlaceholder }]}
              layout={defaultTheme.productDetails.gallery.layout}
            />
            {discountPercentage && (
              <ProductBadge>- {discountPercentage}%</ProductBadge>
            )}
            <Disclaimer>
              The product images shown are for illustration purposes only and
              may not be an exact representation of the product. We are unable
              to guarantee any specific vintages displayed.
            </Disclaimer>
          </ProductPreview>
        )}

        <ProductInfo dir={isRtl ? "rtl" : "ltr"}>
          <ProductTitlePriceWrapper>
            <ProductTitle>{name}</ProductTitle>
          </ProductTitlePriceWrapper>
          <ProductPriceWrapper>
            {!!discountPercentage ? (
              <div className="label">
                On
                <br />
                sale
              </div>
            ) : (
              <div className="label">
                Reg.
                <br />
                price
              </div>
            )}
            <ProductPriceInfo>
              {!!discountPercentage && (
                <>
                  <span className="discount">{discountPercentage}%</span> -
                  <span className="base-price">
                    {CURRENCY}
                    {price}
                  </span>
                </>
              )}
              <span className="sale-price">
                {CURRENCY} {salePrice}
              </span>
            </ProductPriceInfo>
          </ProductPriceWrapper>

          <DescriptionParagraph
            dangerouslySetInnerHTML={{ __html: HTMLdescription }}
          />

          {flavorProfile && flavorProfile.length > 0 && (
            <ProductAttributes>
              {flavorProfile.map((item, i) => (
                <ProductAttribute key={i}>
                  <Icon name={item.toLowerCase()} />
                </ProductAttribute>
              ))}
            </ProductAttributes>
          )}
          <ProductCartWrapper>
            <ProductStockInfo inStock={!!isProductAvailable}>
              {isProductAvailable ? "In Stock" : "Out of stock"}
            </ProductStockInfo>
            <ProductCartBtn>
              {!isInCart(product.id) ? (
                <Button
                  className="cart-button"
                  variant="primary"
                  size="big"
                  onClick={handleAddClick}
                  disabled={!isProductAvailable}
                >
                  <div style={{ marginRight: 10 }}>
                    <CartIcon color={defaultTheme.colors.white} />
                  </div>
                  <ButtonText>
                    <FormattedMessage
                      id="addToCartButton"
                      defaultMessage="Add to cart"
                    />
                  </ButtonText>
                </Button>
              ) : (
                <Counter
                  value={getItem(product.id).quantity}
                  onDecrement={handleRemoveClick}
                  onIncrement={handleAddClick}
                  className="card-counter"
                  variant="altHorizontal"
                />
              )}
            </ProductCartBtn>
            {!wishlistIcon && (
              <WishlistButton>
                <FavouritesIcon width={22} height={22} />
                <div className="text">
                  <FormattedMessage
                    id="addToWishlist"
                    defaultMessage="Add to Wishlist"
                  />
                </div>
              </WishlistButton>
            )}
          </ProductCartWrapper>
          {!isProductAvailable && (
            <RemindBackInStock phoneNumber={phoneNumber}></RemindBackInStock>
          )}
          {wishlistIcon && (
            <AddToFavouriteButton>
              <FavouritesIcon />
            </AddToFavouriteButton>
          )}
          <Separator />
          <Sample>
            <div style={{ position: "relative" }}>
              <Image
                src={images.length > 0 ? images[0].url : productPlaceholder}
                layout="fixed"
                width={40}
                height={60}
                objectFit="contain"
                priority
                alt="the product img"
              />
            </div>
            <SampleInfo>
              <SampleTitle>Trial Bottle of {name}</SampleTitle>
              <ProductPriceInfo>
                <span className="sale-price">
                  {CURRENCY} {salePrice}
                </span>
              </ProductPriceInfo>
            </SampleInfo>
            <div>
              <Button
                variant="primary"
                size="big"
                onClick={handleAddClick}
                disabled={!isProductAvailable}
              >
                <ButtonText>
                  <FormattedMessage id="buy" defaultMessage="Buy" />
                </ButtonText>
              </Button>
            </div>
          </Sample>
        </ProductInfo>

        {isRtl && (
          <ProductPreview>
            <CarouselWithCustomDots
              items={product.images}
              deviceType={deviceType}
            />
          </ProductPreview>
        )}
      </ProductDetailsWrapper>
      <ProductDetailsContainer>
        <ProductTagsWrapper deviceType={deviceType}>
          {!deviceType.mobile && (
            <Label
              className="title"
              text="Product Details"
              fontSize={20}
              fontWeight={600}
            />
          )}
          <ProductTagsContainer deviceType={deviceType}>
            <ProductAttributeText>
              <div className="label">SKU:</div>
              <div className="value">{sku}</div>
            </ProductAttributeText>
            <ProductAttributeText>
              <div className="label">Categories:</div>
              <div className="value">
                {collections.map((item) => item.name).join(", ")}
              </div>
            </ProductAttributeText>
            <ProductAttributeText>
              <div className="label">Share:</div>
              <div className="value">
                <a
                  href={`https://www.facebook.com/sharer/sharer.php?u=${pageUrl}`}
                  // target="_blank" security
                  style={{ marginRight: 10 }}
                >
                  <Facebook width={25} height={25} color="#3b5999" />
                </a>
                <a
                  href={`https://twitter.com/intent/tweet?text=${pageUrl}`}
                  // target="_blank" security
                  style={{ marginRight: 10 }}
                >
                  <Twitter width={25} height={25} color="#55acee" />
                </a>
                <a
                  href={`https://www.linkedin.com/sharing/share-offsite/?url=${pageUrl}`}
                  // target="_blank" security
                  style={{ marginRight: 10 }}
                >
                  <Linkedin width={25} height={25} color="#0077B5" />
                </a>
              </div>
            </ProductAttributeText>
            {!(varietal || vintage || country || regionTag || size) &&
              deviceType.desktop && (
                <Label
                  className="no-product-info"
                  fontSize={13}
                  iconWidth={22}
                  iconHeight={22}
                  color={defaultTheme.colors.gray}
                  text="We have no additional information about this product."
                />
              )}
            {!!(varietal || vintage) && (
              <ProductTagsSection>
                {!!varietal && <Tag icon="varietal" text={varietal} />}
                {!!vintage && <Tag icon="vintage" text={vintage} />}
                {/* <Tag icon="rate" text="(MOCK)Rate 5.8 " /> */}
              </ProductTagsSection>
            )}

            {!!(country || regionTag) && (
              <>
                {!deviceType.tablet && <DivisorLine />}
                <ProductTagsSection>
                  {!!country && <Tag icon="countries" text={country} />}
                  {!!regionTag && <Tag icon="region" text={regionTag} />}
                </ProductTagsSection>
              </>
            )}
            {!!size && (
              <>
                {!deviceType.tablet && <DivisorLine />}
                <ProductTagsSection>
                  <Tag icon="size" text={size} />
                  {/* <Tag icon="alcohol-percentage" text="(MOCK)42% Alcohol" /> */}
                </ProductTagsSection>
              </>
            )}
          </ProductTagsContainer>
        </ProductTagsWrapper>
        <ProductDescriptionWrapper deviceType={deviceType}>
          <Accordion className="accordion" items={descriptionItems} />
        </ProductDescriptionWrapper>
      </ProductDetailsContainer>

      <RelatedItems>
        <h2>
          <FormattedMessage
            id="intlRelatedItems"
            defaultMessage="Related Items"
          />
        </h2>

        <ProductGrid
          loadMore={false}
          fetchLimit={6}
          style={{
            gridTemplateColumns: "repeat(auto-fit, minmax(170px, 1fr))",
          }}
        />
      </RelatedItems>
    </>
  );
};

export default ProductDetails;
