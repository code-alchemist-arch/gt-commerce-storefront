import { ArrowNext } from "assets/icons/ArrowNext";
import { ArrowPrev } from "assets/icons/ArrowPrev";
import Loader from "components/loader/loader";
import React, { FC } from "react";
import Carousel, { CarouselInternalState } from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

import {
  GTCarouselWrapper,
  LoadMoreWrapper,
  GTCarouselArrowButton,
  CarouselButtonGroupWrapper,
} from "./index.styles";

const defaultResponsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 6,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 4,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 2,
  },
};

interface IGTCustomButtonProps {
  [x: string]: any;
  next: any;
  previous: any;
  goToSlide: any;
  loading?: boolean;
}

const GTCustomButtonGroup: FC<IGTCustomButtonProps> = ({
  next,
  previous,
  goToSlide,
  loading = false,
  ...rest
}) => {
  const {
    carouselState: { currentSlide },
  } = rest;
  return (
    <CarouselButtonGroupWrapper className="carousel-button-group">
      <GTCarouselArrow
        direction="prev"
        className={currentSlide === 0 ? "disable" : ""}
        onClick={() => previous()}
      />

      {loading ? (
        <GTCarouselLoadMore>
          <Loader />
        </GTCarouselLoadMore>
      ) : (
        <GTCarouselArrow
          direction="next"
          className={currentSlide === 0 ? "disable" : ""}
          onClick={() => next()}
        />
      )}
    </CarouselButtonGroupWrapper>
  );
};
export interface IGTProductCarouselProps {
  props?: any;
  component?: any;
  autoPlay?: boolean;
  infinite?: boolean;
  customLeftArrow?: React.ReactElement;
  customRightArrow?: React.ReactElement;
  responsive?: any;
  swipeable?: boolean;
  showDots?: boolean;
  /**
   * Arrow show status
   */
  arrows?: boolean;
  /**
   * Loading Status to fetch items
   */
  loading?: boolean;
  /**
   * Number of Slides to move at once
   */
  slidesToSlide?: number;
  /**
   * Center mode of slider
   */
  centerMode?: boolean;
  /**
   * Before Change Handler
   */
  beforeChange?: (nextSlide: number) => void;
  /**
   * After Change handler
   */
  afterChange?: (
    previousSlide: number,
    { slidesToShow, currentSlide }: CarouselInternalState
  ) => void;
}

export const GTProductCarousel: FC<IGTProductCarouselProps> = ({
  component,
  responsive = defaultResponsive,
  infinite,
  showDots,
  arrows = false,
  swipeable = true,
  slidesToSlide = 1,
  customLeftArrow,
  customRightArrow,
  beforeChange,
  afterChange,
  loading,
  centerMode = false,
  ...props
}): React.ReactElement => {
  const { children } = props;
  return (
    <GTCarouselWrapper>
      <Carousel
        beforeChange={beforeChange}
        afterChange={afterChange}
        arrows={arrows}
        responsive={responsive}
        showDots={showDots}
        slidesToSlide={slidesToSlide}
        infinite={infinite}
        containerClass="gt-product-carousel-container"
        swipeable={swipeable}
        customLeftArrow={customLeftArrow}
        customRightArrow={customRightArrow}
        centerMode={centerMode}
        customButtonGroup={<GTCustomButtonGroup loading={loading} />}
        {...props}
      >
        {children}
      </Carousel>
      {loading && (
        <GTCarouselLoadMore>
          <Loader />
        </GTCarouselLoadMore>
      )}
    </GTCarouselWrapper>
  );
};

export const GTCarouselLoadMore = ({ children = null }) => {
  return <LoadMoreWrapper>{children}</LoadMoreWrapper>;
};

interface IGTCarouselArrowProps {
  direction: "prev" | "next";
  onClick?: () => void;
  className?: string;
}

const GTCarouselArrow: FC<IGTCarouselArrowProps> = ({
  direction,
  onClick,
  className,
}) => {
  return (
    <GTCarouselArrowButton
      direction={direction}
      className={className}
      onClick={onClick}
    >
      {direction === "prev" ? (
        <ArrowPrev color="#FFFFFF" />
      ) : (
        <ArrowNext color="#FFFFFF" />
      )}
    </GTCarouselArrowButton>
  );
};
