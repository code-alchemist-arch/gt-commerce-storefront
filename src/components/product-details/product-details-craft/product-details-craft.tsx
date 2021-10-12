import React, { ChangeEvent, useContext, useEffect } from "react";
import { themeGet } from "@styled-system/theme-get";
import { Button } from "components/button/button";
import {
  ProductDetailsWrapper,
  ProductPreview,
  ProduBadge,
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
  ProductAttributeTextTwo,
  ProductCharWrapper,
  ProductQTYInput,
} from "./product-details-craft.style";
import ProductStyle, {
  ProductStyleContainer,
  ProductStyleWrapper,
} from "./ProductStyle";
import ProductChar from "./ProductCharacter/ProductChar";
import CartIcon from "assets/icons/CartIcon";
import CarouselWithCustomDots from "components/multi-carousel/multi-carousel";
import { CURRENCY } from "utils/constant";
import { FormattedMessage } from "react-intl";
import { useLocale } from "contexts/language/language.provider";
import { useCart } from "contexts/cart/use-cart";
import { Counter } from "components/counter/counter";
import { ProductGrid } from "components/product-grid/product-grid";
import { Product } from "../../../interfaces";
import { getDiscountPercentage } from "../../../utils/utils";
import { GET_PRODUCT_GENERAL } from "../../../graphql/query/cms/product_general.query";
import fetcher from "../../../utils/fetcher";
import useSWR from "swr";
import Label from "components/label/label";
import { defaultTheme } from "../../../site-settings/site-theme/default";
import RemindBackInStock from "../../remind-back-in-stock/remind-back-in-stock";
import FavouritesIcon from "../../../assets/icons/FavouritesIcon";
import ImagePreviewGallery from "components/image-preview-gallery/image-preview-gallery";
import Facebook from "../../../assets/icons/Facebook";
import Twitter from "../../../assets/icons/Twitter";
import { Linkedin } from "../../../assets/icons/Linkedin";
import { AuthContext } from "../../../contexts/auth/auth.context";
import Image from "next/image";
import { GTProductDetailItem } from "components/@gt-components/product-detail-item";
import { GTBadge } from "components/@gt-components/base-components/gt-badge";
import { useState } from "react";

type ProductDetailsProps = {
  product: Product;
  gtData: any;
  deviceType: {
    mobile: boolean;
    tablet: boolean;
    desktop: boolean;
  };
  wishlistIcon?: boolean;
  separateCart?: boolean;
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
  gtData,
  deviceType,
  wishlistIcon,
  separateCart = false,
}) => {
  const { authState } = useContext<any>(AuthContext);
  const { isRtl } = useLocale();
  const pageUrl = `https://${process.env.VERCEL_URL}/products/${product.slug}`;
  const { add, update, isInCart, getItem } = useCart();
  const { name, metadata, variants } = product;
  const sku = variants[0].sku;
  const price = variants[0]?.pricing?.priceUndiscounted?.gross?.amount.toFixed(
    2
  );
  const salePrice = variants[0]?.pricing?.price?.gross?.amount.toFixed(2);
  const discountPercentage = getDiscountPercentage(product);

  const category = gtData.category;
  const country = gtData.web_data.country;
  const vintage = gtData.web_data.vintage;
  const age = gtData.web_data.age;
  const rating = gtData.web_data.rating;
  const ratingNumber = gtData.web_data.rating.replace(/[^\d.]/g, "");
  const varietal = gtData.web_data.varietal;
  const region = gtData.web_data.region;
  const size = gtData.size;

  const images = gtData.images.map((image) => {
    return {
      srcSet: image.image_srcset,
      url: image.image_url,
    };
  });

  const { data: productGeneralData } = useSWR(GET_PRODUCT_GENERAL, fetcher);

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
  const [qtyToCart, setQtyToCart] = useState(0);

  const handleAddCart = () => {
    add(product, qtyToCart);

    setQtyToCart(0);
  };
  return (
    <>
      <ProductDetailsWrapper className="product-card" dir="ltr">
        {!isRtl && (
          <ProductPreview>
            {ratingNumber && (
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  right: 0,
                }}
              >
                <GTBadge
                  variant="withAmount"
                  name="points"
                  text="points"
                  amount={ratingNumber}
                />
              </div>
            )}

            {discountPercentage && (
              <div
                style={{
                  position: "absolute",
                  top: ratingNumber ? 100 : 0,
                  right: 0,
                }}
              >
                <GTBadge
                  variant="textonly"
                  name="on_sale"
                  bgColor={themeGet("secondary.color")}
                  text="-10%"
                />
              </div>
            )}

            <ImagePreviewGallery
              items={images.length > 0 ? images : [{ url: productPlaceholder }]}
              layout={defaultTheme.productDetails.gallery.layout}
            />

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
            {/* {!!discountPercentage ? (
              <div className="label">On sale</div>
            ) : (
              <div className="label">Reg. price</div>
            )} */}
            <ProductPriceInfo>
              {!!discountPercentage && (
                <span className="base-price">
                  {CURRENCY}
                  {price}
                </span>
              )}
              <span className="sale-price">
                {CURRENCY} {salePrice}
              </span>
            </ProductPriceInfo>
          </ProductPriceWrapper>

          <DescriptionParagraph
            dangerouslySetInnerHTML={{ __html: gtData.long_description }}
          />

          <ProductStyleWrapper>
            <ProductStyleContainer>
              <ProductStyle
                styleName={"SWEETNESS"}
                dataFillQuantity={parseInt(
                  gtData.private_metadata.meta_sweetness5
                )}
                dataTotalQuantity={5}
                innerCircleColor={"#ff700f"}
                outerCircleFillColor={"#f1592a"}
                outerCircleBackgroundColor={"#e0e0e0"}
              />
              <ProductStyle
                styleName={"BODY"}
                dataFillQuantity={parseInt(gtData.private_metadata.meta_body5)}
                dataTotalQuantity={5}
                innerCircleColor={"#ff700f"}
                outerCircleFillColor={"#f1592a"}
                outerCircleBackgroundColor={"#e0e0e0"}
              />
              <ProductStyle
                styleName={"RICHNESS"}
                dataFillQuantity={parseInt(
                  gtData.private_metadata.meta_richness5
                )}
                dataTotalQuantity={5}
                innerCircleColor={"#ff700f"}
                outerCircleFillColor={"#f1592a"}
                outerCircleBackgroundColor={"#e0e0e0"}
              />
              <ProductStyle
                styleName={"SMOKE"}
                dataFillQuantity={parseInt(gtData.private_metadata.meta_smoke5)}
                dataTotalQuantity={5}
                innerCircleColor={"#ff700f"}
                outerCircleFillColor={"#f1592a"}
                outerCircleBackgroundColor={"#e0e0e0"}
              />
            </ProductStyleContainer>
          </ProductStyleWrapper>

          <ProductCharWrapper>
            {gtData.private_metadata.meta_floral && (
              <ProductChar
                characterName="FLORAL"
                characterImage="https://globaltill-public-resources.s3-ca-central-1.amazonaws.com/dropshare/Floral.jpg"
                displayText="FLORAL"
              />
            )}
            {gtData.private_metadata.meta_fruit && (
              <ProductChar
                characterName="FRUIT"
                characterImage="https://globaltill-public-resources.s3-ca-central-1.amazonaws.com/dropshare/Fruit.jpg"
                displayText="FRUIT"
              />
            )}
            {gtData.private_metadata.meta_herbacious && (
              <ProductChar
                characterName="HERBACIOUS"
                characterImage="https://globaltill-public-resources.s3-ca-central-1.amazonaws.com/dropshare/Herbaceous.jpg"
                displayText="HERBACIOUS"
              />
            )}
            {gtData.private_metadata.meta_nut && (
              <ProductChar
                characterName="NUT"
                characterImage="https://globaltill-public-resources.s3-ca-central-1.amazonaws.com/dropshare/Nut.jpg"
                displayText="NUT"
              />
            )}
            {gtData.private_metadata.meta_maritime && (
              <ProductChar
                characterName="MARITIME"
                characterImage="https://globaltill-public-resources.s3-ca-central-1.amazonaws.com/dropshare/Maritime.jpg"
                displayText="MARITIME"
              />
            )}
            {gtData.private_metadata.meta_smoke && (
              <ProductChar
                characterName="SMOKE"
                characterImage="https://globaltill-public-resources.s3-ca-central-1.amazonaws.com/dropshare/Smoke.jpg"
                displayText="SMOKE"
              />
            )}
            {gtData.private_metadata.meta_savory && (
              <ProductChar
                characterName="SMOKE"
                characterImage="https://globaltill-public-resources.s3-ca-central-1.amazonaws.com/dropshare/Savoury.jpg"
                displayText="SMOKE"
              />
            )}
            {gtData.private_metadata.meta_spice && (
              <ProductChar
                characterName="SPICE"
                characterImage="https://globaltill-public-resources.s3-ca-central-1.amazonaws.com/dropshare/Spice.jpg"
                displayText="SPICE"
              />
            )}
            {gtData.private_metadata.meta_sweet && (
              <ProductChar
                characterName="SWEET"
                characterImage="https://globaltill-public-resources.s3-ca-central-1.amazonaws.com/dropshare/Sweet.jpg"
                displayText="SWEET"
              />
            )}
            {gtData.private_metadata.meta_tobacco && (
              <ProductChar
                characterName="TOBACCO"
                characterImage="https://globaltill-public-resources.s3-ca-central-1.amazonaws.com/dropshare/Tobacco.jpg"
                displayText="TOBACCO"
              />
            )}
            {gtData.private_metadata.meta_wine && (
              <ProductChar
                characterName="WINEY"
                characterImage="https://globaltill-public-resources.s3-ca-central-1.amazonaws.com/dropshare/Winey.jpg"
                displayText="WINEY"
              />
            )}
            {gtData.private_metadata.meta_cereal && (
              <ProductChar
                characterName="CEREAL"
                characterImage="https://globaltill-public-resources.s3-ca-central-1.amazonaws.com/dropshare/Cereal.jpg"
                displayText="CEREAL"
              />
            )}
          </ProductCharWrapper>

          <ProductCartWrapper>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                width: "100%",
              }}
            >
              <ProductStockInfo inStock={!!isProductAvailable}>
                {isProductAvailable ? "In Stock" : "Out of stock"}
              </ProductStockInfo>
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
            </div>
            {!separateCart ? (
              <ProductCartBtn>
                <ProductQTYInput>
                  <label htmlFor="itemQTY">QTY:</label>

                  <select
                    id="itemQTY"
                    defaultValue={1}
                    onChange={(e: ChangeEvent<HTMLSelectElement>) =>
                      setQtyToCart(parseInt(e.target.value, 10))
                    }
                  >
                    {Array(150)
                      .fill(0)
                      .map((_i, index) => (
                        <option key={index} value={index + 1}>
                          {index + 1}
                        </option>
                      ))}
                  </select>
                </ProductQTYInput>
                <Button
                  className="cart-button"
                  variant="primary"
                  size="big"
                  onClick={handleAddCart}
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

                    {qtyToCart > 0 && (
                      <span
                        style={{
                          marginLeft: 5,
                        }}
                      >
                        ${(salePrice * qtyToCart).toFixed(2)}
                      </span>
                    )}
                  </ButtonText>
                </Button>
              </ProductCartBtn>
            ) : (
              <ProductCartBtn>
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
                {isInCart(product.id) && (
                  <Counter
                    value={getItem(product.id)?.quantity}
                    onDecrement={handleRemoveClick}
                    onIncrement={handleAddClick}
                    className="card-counter"
                    variant="altHorizontal"
                  />
                )}
              </ProductCartBtn>
            )}
          </ProductCartWrapper>
          {!isProductAvailable && (
            <RemindBackInStock phoneNumber={phoneNumber} />
          )}
          {wishlistIcon && (
            <AddToFavouriteButton>
              <FavouritesIcon />
            </AddToFavouriteButton>
          )}
          <Separator />

          {gtData.child_product && (
            <Sample>
              <div style={{ position: "relative" }}>
                <Image
                  src={productPlaceholder}
                  layout="fixed"
                  width={40}
                  height={60}
                  objectFit="contain"
                  alt="Product Placeholder"
                />
              </div>
              <SampleInfo>
                <SampleTitle>Trial Bottle of {name}</SampleTitle>
                <ProductPriceInfo>
                  <span className="sale-price">
                    {CURRENCY} {gtData.child_product.unit_sell}
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
          )}
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
      <div style={{ backgroundColor: "#fff" }}>
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
                <div className="label">Share:</div>
                <div className="value">
                  <a
                    href={`https://www.facebook.com/sharer/sharer.php?u=${pageUrl}`}
                    // target="_blank"
                    style={{ marginRight: 10 }}
                  >
                    <Facebook width={25} height={25} color="#3b5999" />
                  </a>
                  <a
                    href={`https://twitter.com/intent/tweet?text=${pageUrl}`}
                    // target="_blank"
                    style={{ marginRight: 10 }}
                  >
                    <Twitter width={25} height={25} color="#55acee" />
                  </a>
                  <a
                    href={`https://www.linkedin.com/sharing/share-offsite/?url=${pageUrl}`}
                    // target="_blank"
                    style={{ marginRight: 10 }}
                  >
                    <Linkedin width={25} height={25} color="#0077B5" />
                  </a>
                </div>
              </ProductAttributeText>
            </ProductTagsContainer>
          </ProductTagsWrapper>

          <ProductDescriptionWrapper deviceType={deviceType}>
            <GTProductDetailItem title="SKU" value={sku} />
            <GTProductDetailItem title="Category" value={category} />
            <GTProductDetailItem title="Size" value={size} />
            <GTProductDetailItem title="Country" value={country} />
            <GTProductDetailItem title="Region" value={region} />
            <GTProductDetailItem title="Varietal" value={varietal} />
            <GTProductDetailItem title="Vintage" value={vintage} />
            <GTProductDetailItem title="Age" value={age} />
            <GTProductDetailItem title="Rating" value={rating} />
          </ProductDescriptionWrapper>
        </ProductDetailsContainer>
      </div>

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
