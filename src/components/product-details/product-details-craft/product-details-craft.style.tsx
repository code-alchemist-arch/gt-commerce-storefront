import styled from "styled-components";
import { themeGet } from "@styled-system/theme-get";

export const ProductDetailsWrapper = styled.div`
  background-color: ${themeGet("colors.white", "#ffffff")};
  position: relative;
  display: flex;
  flex-wrap: wrap;
  align-items: start;
  box-sizing: border-box;
  padding: 30px;

  @media screen and (max-width: 991px) {
    padding: 0;
  }

  * {
    box-sizing: border-box;
  }
`;

export const ProductPreview = styled.div`
  width: 50%;
  padding: 10px;
  padding-bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  flex-direction: column;

  @media (max-width: 990px) {
    padding: 30px 40px 60px;
  }
  @media (max-width: 767px) {
    flex: 0 0 100%;
    max-width: 100%;
    padding: 30px 25px 60px;
    order: 0;
  }
`;

export const ProduBadge = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
  background-color: #8f2928;
  padding: 8px 13px;
  border-radius: 50px;
  z-index: 1;
  h5 {
    color: #ffffff;
    font-size: 34px;
    line-height: 42px;
    font-weight: 300;
    margin-bottom: 0px;
    border-bottom: 2px solid #ffffff;
  }
  p {
    color: #ffffff;
    font-size: 12px;
    font-weight: 300;
    margin-bottom: 0px;
    text-align: center;
    text-transform: uppercase;
  }
`;

export const BackButton = styled.div`
  position: absolute;
  top: 60px;
  left: 60px;
  z-index: 999;

  @media (max-width: 990px) {
    top: 20px;
    left: 25px;
  }
  .reusecore__button {
    font-family: ${themeGet("fonts.body", "sans-serif")};
    font-size: ${themeGet("fontSizes.sm", "13")}px;
    font-weight: ${themeGet("fontWeights.bold", "700")};
    color: ${themeGet("colors.text.regular", "#77798C")};
    height: 30px;
    .btn-icon {
      margin-right: 5px;
    }
    .btn-text {
      padding: 0;
    }
  }
`;

export const ProductInfo = styled.div`
  width: 50%;
  border-left: 1px solid ${themeGet("colors.gray.500", "#f1f1f1")};
  padding: 55px 60px;

  @media (max-width: 1200px) {
    padding: 30px 40px;
  }
  @media (max-width: 767px) {
    flex: 0 0 100%;
    max-width: 100%;
    padding: 30px 25px;
    border: 0;
    order: 1;
  }
`;

export const SaleTag = styled.span`
  font-size: 12px;
  font-weight: 700;
  color: ${themeGet("colors.white", "#ffffff")};
  background-color: ${themeGet("colors.yellow.alternate", "#f4c243")};
  padding: 0 10px;
  line-height: 24px;
  border-radius: ${themeGet("radii.medium", "12px")};
  display: inline-block;
  position: absolute;
  top: 20px;
  right: 20px;
`;

export const DiscountPercent = styled.span`
  font-size: ${themeGet("fontSizes.xs", "12")}px;
  font-weight: ${themeGet("fontWeights.bold", "700")};
  color: ${themeGet("colors.white", "#ffffff")};
  line-height: 24px;
  background-color: ${themeGet("colors.secondary.regular", "#ff5b60")};
  padding-left: 20px;
  padding-right: 15px;
  position: relative;
  display: inline-block;
  position: absolute;
  bottom: 180px;
  right: -60px;
  -webkit-transform: translate3d(0, 0, 1px);
  transform: translate3d(0, 0, 1px);

  &:before {
    content: "";
    position: absolute;
    left: -8px;
    top: 0;
    width: 0;
    height: 0;
    border-style: solid;
    border-width: 0 8px 12px 0;
    border-color: transparent ${themeGet("colors.secondary.regular", "#ff5b60")}
      transparent transparent;
  }

  &:after {
    content: "";
    position: absolute;
    left: -8px;
    bottom: 0;
    width: 0;
    height: 0;
    border-style: solid;
    border-width: 0 0 12px 8px;
    border-color: transparent transparent
      ${themeGet("colors.secondary.regular", "#ff5b60")} transparent;
  }
`;

export const ProductTitlePriceWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  margin-bottom: 10px;
`;

export const ProductTitle = styled.h1`
  font-family: ${themeGet("fonts.body", "sans-serif")};
  font-size: ${themeGet("fontSizes.2xl", "30")}px;
  font-weight: ${themeGet("fontWeights.semiBold", "600")};
  color: ${themeGet("colors.text.bold", "#0D1136")};
  line-height: 1.5;
  display: flex;

  @media (max-width: 767px) {
    word-break: break-word;
  }
`;

export const ProductPriceWrapper = styled.div`
  display: flex;
  align-items: center;
  flex-shrink: 0;
  margin-bottom: 10px;

  & > .label {
    margin-right: 15px;
  }
`;

export const ProductPrice = styled.div`
  font-family: ${themeGet("fonts.body", "sans-serif")};
  font-size: calc(${themeGet("fontSizes.lg", "21")}px - 1px);
  font-weight: ${themeGet("fontWeights.bold", "700")};
  color: ${themeGet("colors.text.bold", "#0D1136")};
`;

export const SalePrice = styled.span`
  font-family: ${themeGet("fonts.body", "sans-serif")};
  font-size: calc(${themeGet("fontSizes.base", "15")}px + 1px);
  font-weight: ${themeGet("fontWeights.regular", "400")};
  color: ${themeGet("colors.text.regular", "#77798C")};
  padding: 0 5px;
  overflow: hidden;
  position: relative;
  margin-left: 10px;

  &:before {
    content: "";
    width: 100%;
    height: 1px;
    display: inline-block;
    background-color: ${themeGet("colors.text.regular", "#77798C")};
    position: absolute;
    top: 50%;
    left: 0;
  }
`;

export const ProductWeight = styled.div`
  font-family: ${themeGet("fonts.body", "sans-serif")};
  font-size: ${themeGet("fontSizes.sm", "13")}px;
  font-weight: ${themeGet("fontWeights.regular", "400")};
  color: ${themeGet("colors.text.regular", "#77798C")};
`;

export const ProductDescription = styled.p`
  font-family: ${themeGet("fonts.body", "sans-serif")};
  font-size: calc(${themeGet("fontSizes.base", "15")}px + 1px);
  font-weight: ${themeGet("fontWeights.regular", "400")};
  color: ${themeGet("colors.text.medium", "#424561")};
  line-height: 2;
  margin-top: 30px;
`;

export const ProductCartWrapper = styled.div`
  display: flex;
  gap: 15px;
  margin-top: 60px;
  align-items: center;

  flex-wrap: wrap;
  @media (max-width: 767px) {
    margin-top: 40px;
  }
`;

export const ProductCartBtn = styled.div`
  display: flex;
  justify-content: space-between;

  width: 100%;

  flex-wrap: wrap;
  row-gap: 10px;
  .card-counter {
    height: 48px;
    width: 130px;

    .control-button {
      padding: 10px 15px;
    }
  }

  .cart-button {
    padding-left: 15px;
    padding-right: 15px;

    .btn-icon {
      margin-right: 5px;

      svg {
        width: 14px;
        height: auto;
        @media (max-width: 990px) {
          width: 14px;
          margin-right: 8px;
        }
      }
    }
  }
  .quantity {
    width: 115px;
    height: 38px;
  }
`;

export const ProductQTYInput = styled.div`
  display: flex;
  align-items: center;

  padding: 5px 10px;
  background: #d7d8da;
  border-radius: 4px;

  label {
    padding-right: 10px;
    font-weight: 600;
    font-size: 18px;
    color: "#77798C";
  }

  select {
    font-size: 20px;
    background: none;
    border: none;
    padding: 5px;
    outline: none;
    color: "#77798C";
    cursor: pointer;
    &:focus {
      outline: none;
    }
  }

  input {
    height: 45px;
    padding-left: 15px;

    font-size: 20px;
    font-weight: 600;
    width: 100px;
  }
`;

export const ButtonText = styled.span`
  /* @media (max-width: 767px) {
    display: none;
  } */
`;

export const ProductMeta = styled.div`
  margin-top: 60px;
  display: flex;
  justify-content: flex-start;

  @media (max-width: 767px) {
    margin-top: 40px;
  }
`;

export const MetaTitle = styled.span`
  font-family: ${themeGet("fonts.body", "sans-serif")};
  font-size: calc(${themeGet("fontSizes.base", "15")}px + 1px);
  font-weight: ${themeGet("fontWeights.regular", "400")};
  color: ${themeGet("colors.text.regular", "#77798C")};
  flex-shrink: 0;
`;

export const MetaItem = styled.span`
  font-family: ${themeGet("fonts.body", "sans-serif")};
  font-size: calc(${themeGet("fontSizes.base", "15")}px + 1px);
  font-weight: ${themeGet("fontWeights.semiBold", "600")};
  color: ${themeGet("colors.text.bold", "#0D1136")};
  margin-right: 3px;
  letter-spacing: 0.3px;

  &:after {
    content: ", ";
  }

  &:hover {
    text-decoration: underline;
  }
`;

export const MetaSingle = styled.p`
  margin-left: 10px;
  display: flex;
  flex-wrap: wrap;

  a {
    &::last-child {
      ${MetaItem} {
        &:after {
          content: "";
        }
      }
    }
  }
`;

export const RelatedItems = styled.div`
  margin: 35px 20px 70px;

  @media (max-width: 990px) {
    margin-top: 50px;
    margin-left: 15px;
    margin-right: 15px;
  }
  > h2 {
    font-family: ${themeGet("fonts.body", "sans-serif")};
    font-size: ${themeGet("fontSizes.xl", "24")}px;
    font-weight: ${themeGet("fontWeights.semiBold", "600")};
    color: ${themeGet("colors.text.bold", "#0D1136")};
    line-height: 1.2;
    margin-bottom: 30px;
    @media (max-width: 767px) {
      margin-left: 0;
      margin-bottom: 25px;
    }
  }

  > div > div {
    flex: 0 0 20%;
    max-width: 20%;
    padding-left: 15px;
    padding-right: 15px;
    margin-bottom: 30px;

    @media (max-width: 1500px) {
      flex: 0 0 20%;
      max-width: 20%;
    }
    @media (max-width: 1400px) {
      flex: 0 0 25%;
      max-width: 25%;
    }
    @media (max-width: 1060px) {
      flex: 0 0 33.3333333%;
      max-width: 33.3333333%;
    }
    @media (max-width: 1199px) and (min-width: 991px) {
      padding-left: 10px;
      padding-right: 10px;
    }
    @media (max-width: 768px) {
      padding-left: 7.5px;
      padding-right: 7.5px;
      margin-bottom: 15px;
    }
    @media (max-width: 767px) {
      flex: 0 0 50%;
      max-width: 50%;
    }
  }
`;

export const DescriptionParagraph = styled.div`
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 146%;
  padding: 12px 0;

  & a {
    color: ${themeGet("primary.color")};
  }

  & .subtitle {
    margin: 20px 0 10px 0;
    display: block;

    &:first-child {
      margin: 0 0 10px 0;
    }
  }

  & .list {
    margin-bottom: 15px;

    & > li {
      list-style: disc;
      margin-left: 50px;
    }
  }

  & .paragraph {
    margin-bottom: 15px;
  }
`;

export const ProductTagsWrapper = styled.div<{
  deviceType: {
    desktop: boolean;
    tablet: boolean;
    mobile: boolean;
  };
}>`
  flex: 1;
  ${(props) =>
    props.deviceType.desktop &&
    `grid-column: 1 / span 4;
    border-top-left-radius: 70px;
    padding: 30px;
    & .title {
      margin-bottom: 20px;
    }
    max-width: 400px;
    `}
  ${(props) =>
    props.deviceType.tablet &&
    `
    grid-column: 1 / span 6;
    border-top-right-radius: 70px;
    border-top-left-radius: 70px;
    padding: 30px;
    max-width: 400px;
  `}

  ${(props) =>
    props.deviceType.mobile &&
    `max-width: 400px;
    padding: 0px 25px;
  `}

  & .title {
    font-style: normal;
    font-weight: 600;
    font-size: 20px;
    margin: 10px 0;
    letter-spacing: 1px;
  }

  @media screen and (max-width: 767px) {
    padding: 0;
  }
`;

export const ProductTagsContainer = styled.div<{
  deviceType: {
    desktop: boolean;
    tablet: boolean;
    mobile: boolean;
  };
}>`
  margin: 15px 0;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: start;
  ${(props) => props.deviceType.tablet && "padding: 0"};

  & .no-product-info {
    ${(props) => props.deviceType.desktop && "max-width: 250px;"};
  }
`;

export const ProductTagsSection = styled.div`
  margin: 10px 0;
  & > div {
    margin-bottom: 15px;
  }
`;

export const ProductDescriptionWrapper = styled.div<{
  deviceType: {
    desktop: boolean;
    tablet: boolean;
    mobile: boolean;
  };
}>`
  display: flex;

  flex: 1;

  flex-wrap: wrap;

  padding: 0 30px;

  @media screen and (max-width: 767px) {
    padding: 0;
  }
`;

export const DivisorLine = styled.div`
  width: 130px;
  height: 1px;
  opacity: 0.1;
`;

export const ProductPriceInfo = styled.div`
  font-style: normal;
  color: ${themeGet("colors.gray")};

  display: flex;
  align-items: center;
  & span.discount {
    color: ${themeGet("colors.yellow")};
    font-weight: bold;
    font-size: 17px;
    line-height: 133%;
    margin-right: 5px;
  }

  & span.base-price {
    color: ${themeGet("colors.gray")};
    font-size: 18px;
    line-height: 22px;
    text-decoration-line: line-through;
    margin-left: 5px;
    margin-right: 5px;
  }

  & span.sale-price {
    display: block;
    font-weight: 600;
    font-size: 25px;
    line-height: 30px;
    color: ${themeGet("secondary.color")};
  }
`;

export const ProductDetailsContainer = styled.div`
  display: flex;
  margin: 0px 10px;
  padding: 10px;

  @media (max-width: 991px) {
    flex-direction: column;
    margin: 15px;
  }
`;

export const ProductStockInfo = styled.div<{
  inStock?: boolean;
  layout?: string;
}>`
  border: 2px solid
    ${({ inStock }) =>
      !!inStock ? themeGet("colors.green") : themeGet("colors.red")};
  color: ${({ inStock }) =>
    !!inStock ? themeGet("colors.green") : themeGet("colors.red")};
  height: 48px;
  padding: 0 15px;
  display: flex;
  justify-content: center;
  align-items: center;
  text-transform: uppercase;
`;

export const AddToFavouriteButton = styled.span`
  position: absolute;

  cursor: pointer;
  background: white;
  width: 60px;
  height: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  box-shadow: 0px 2px 15px rgba(0, 0, 0, 0.1);

  transition: all 0.2s ease-in-out;
  svg > path {
    fill: ${themeGet("colors.gray")};
    transition: all 0.2s ease-in-out;
  }

  &:hover {
    box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.2);
    svg > path {
      fill: ${themeGet("primary.color")};
    }
  }

  left: 448px;
  bottom: -30px;

  @media screen and (max-width: 1024px) {
    left: 330px;
  }
  @media screen and (max-width: 768px) {
    left: 270px;
  }
  @media screen and (max-width: 464px) {
    top: -30px;
    right: 30px;
    left: revert;
  }
  @media (max-width: 812px) and (orientation: landscape) {
    top: -30px;
    right: 30px;
    left: revert;
  }
`;
export const ProductAttributes = styled.div`
  display: flex;
`;

export const ProductCharWrapper = styled.div`
  display: flex;
  @media screen and (max-width: 768px) {
    flex-wrap: wrap;
    justify-content: space-between;
  }
`;

export const ProductAttribute = styled.div`
  background: ${themeGet("colors.red")};
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 50px;
  height: 50px;
  margin-right: 15px;
`;

export const WishlistButton = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;

  & .text {
    margin-left: 5px;
  }
`;

export const Separator = styled.div`
  height: 1px;
  background: ${themeGet("colors.grayLine")};
  width: 100%;
  margin: 30px 0;
`;

export const ProductAttributeText = styled.div`
  display: flex;
  margin-bottom: 15px;

  & .label {
    font-weight: bold;
    margin-right: 10px;
  }
`;

export const ProductBadge = styled.div`
  width: 50px;
  height: 50px;
  position: absolute;
  right: 40px;
  top: 40px;
  border-radius: 50%;
  background: ${themeGet("secondary.color")};
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${themeGet("colors.white")};
  font-weight: bold;
`;

export const Disclaimer = styled.div`
  font-style: italic;
  color: ${themeGet("colors.gray")};
`;

export const Sample = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 30px;
  width: 100%;

  @media screen and (max-width: 580px) {
    gap: 15px;
  }
`;

export const SampleInfo = styled.div`
  flex: 1;
`;

export const SampleTitle = styled.h3`
  //font-size: ${themeGet("fontSizes.md", "20")}px;
  font-size: 16px;
  font-weight: ${themeGet("fontWeights.semiBold", "600")};
  color: ${themeGet("colors.text.bold", "#0D1136")};
  line-height: 1.5;

  @media (max-width: 767px) {
    word-break: break-word;
  }
`;

export const ProductAttributeTextTwo = styled.div`
  display: flex;
  line-height: normal;
  padding-bottom: 10px;

  & .label {
    font-weight: bold;
    margin-right: 10px;
  }
`;
