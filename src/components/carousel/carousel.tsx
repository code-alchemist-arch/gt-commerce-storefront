import React from "react";
import Carousel from "react-multi-carousel";
import styled from "styled-components";
import { themeGet } from "@styled-system/theme-get";
import { ArrowNext } from "assets/icons/ArrowNext";
import { ArrowPrev } from "assets/icons/ArrowPrev";
import { useLocale } from "contexts/language/language.provider";
import { Arrow } from "../product-carousel/product-carousel.style";

const ButtonPrev = styled("button")`
  height: 40px;
  width: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${themeGet("colors.white", "#ffffff")};
  color: ${themeGet("colors.primary.regular", "#009E7F")};
  padding: 0;
  border-radius: 20px;
  box-shadow: ${themeGet("shadows.base", "0 3px 6px rgba(0, 0, 0, 0.16)")};
  border: 0;
  outline: 0;
  cursor: pointer;
  position: absolute;
  top: 50%;
  left: 40px;
  margin-top: -20px;
  z-index: 99;
`;

const ButtonNext = styled("button")`
  height: 40px;
  width: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #ffffff;
  color: ${themeGet("colors.primary.regular", "#009E7F")};
  padding: 0;
  border-radius: 20px;
  box-shadow: ${themeGet("shadows.base", "0 3px 6px rgba(0, 0, 0, 0.16)")};
  border: 0;
  outline: 0;
  cursor: pointer;
  position: absolute;
  top: 50%;
  right: 40px;
  margin-top: -20px;
  z-index: 99;
`;

const PrevButton = ({ onClick, children }: any) => {
  return (
    <ButtonPrev
      onClick={(e) => {
        e.preventDefault();
        onClick();
      }}
      className="prevButton"
    >
      {children}
    </ButtonPrev>
  );
};
const NextButton = ({ onClick, children }: any) => {
  return (
    <ButtonNext
      onClick={(e) => {
        e.preventDefault();
        onClick();
      }}
      className="nextButton"
    >
      {children}
    </ButtonNext>
  );
};

const ButtonGroup = ({ next, previous, goToSlide, ...rest }) => {
  const {
    carouselState: { currentSlide, totalItems, slidesToShow },
  } = rest;

  const showPrev = currentSlide > 0;
  const showNext = totalItems - slidesToShow > currentSlide;
  return (
    <div className="carousel-button-group">
      {showPrev && (
        <Arrow
          className="left"
          onClick={() => previous()}
          aria-label="left-button"
        />
      )}
      {showNext && (
        <Arrow
          className="right"
          onClick={() => next()}
          aria-label="right-button"
        />
      )}
    </div>
  );
};

type Props = {
  data: any[] | undefined;
  props?: any;
  component?: any;
  autoPlay?: boolean;
  infinite?: boolean;
  isRtl?: boolean;
  customLeftArrow?: React.ReactElement;
  customRightArrow?: React.ReactElement;
  itemClass?: string;
  responsive?: any;
  customButtonGroup?: React.ReactElement<any> | null;
};
const defaultResponsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
  },
};
export default function CustomCarousel({
  data,
  component,
  autoPlay = false,
  infinite = true,
  customLeftArrow,
  customRightArrow,
  customButtonGroup,
  itemClass,
  isRtl,
  responsive = defaultResponsive,
  ...props
}: Props) {
  return (
    <div dir="ltr">
      <Carousel
        arrows={false}
        responsive={responsive}
        showDots={false}
        slidesToSlide={1}
        infinite={infinite}
        containerClass="container-with-dots"
        itemClass={itemClass}
        renderButtonGroupOutside={true}
        customButtonGroup={<ButtonGroup />}
        ssr={true}
        swipeable={true}
        {...props}
        // use dir ltr when rtl true
      >
        {data}
      </Carousel>
    </div>
  );
}
