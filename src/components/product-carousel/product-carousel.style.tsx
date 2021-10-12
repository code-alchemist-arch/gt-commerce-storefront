import styled from "styled-components";
import { themeGet } from "@styled-system/theme-get";

export const Arrow = styled.button`
  position: absolute;
  outline: 0;
  transition: all 0.5s;
  z-index: 500;
  border: 0;
  background: rgba(0, 0, 0, 0.5);
  background: #ffffff;
  width: 41px;
  height: 64px;
  opacity: 0;
  cursor: pointer;
  box-shadow: 1px 4px 12px rgba(0, 0, 0, 0.09);

  &:hover {
    box-shadow: 1px 4px 12px rgba(0, 0, 0, 0.27);
  }

  &::before {
    font-size: 20px;
    font-weight: 600;
    color: ${themeGet("colors.gray")};
    display: block;
    font-family: revicons;
    text-align: center;
    z-index: 2;
    position: relative;
  }

  &.left {
    &::before {
      content: "\\E824";
    }
    left: 0px;
    border-radius: 4px;
  }

  &.right {
    &::before {
      content: "\\E825";
    }
    right: 0px;
    border-radius: 4px;
  }
`;

export const ProductsCarouselWrapper = styled.div`
  margin: 50px 0 0 -10px;
  width: calc(100% + 20px);
  position: relative;
  // background: blue;

  & .carousel-button-group {
    position: absolute;
    // top: 125px;
    top: calc(50% - 64px);
    margin: 0 0 0 -15px;
    width: calc(100% + 30px);
  }

  & .react-multi-carousel-track {
    margin: 10px 0px 25px 0px;
  }
  & .react-multi-carousel-track .product-item {
    padding: 0 6px;
    .product-card {
      height: 400px;
    }
  }
  &:hover {
    ${Arrow} {
      opacity: 1;
    }
  }
`;

export const CollectionTitle = styled.div`
  font-style: normal;
  font-weight: 600;
  font-size: 20px;
  margin-bottom: 10px;
  color: ${themeGet("colors.black")};
  letter-spacing: 1px;
`;

export const LoaderItem = styled.div`
  // width: 100%;
  // padding: 0 15px;
  // margin-bottom: 30px;
  & > svg {
    height: 100%;
    width: 100%;

    rect {
      // height: 100%;
      width: 300%;
      @media (max-width: 768px) {
        width: 200%;
      }
    }
  }
`;
