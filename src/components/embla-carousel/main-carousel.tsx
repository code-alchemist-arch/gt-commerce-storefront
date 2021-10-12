import React from "react";
import dynamic from "next/dynamic";
import { CarouselContainer } from "./embla-carousel.style";

const EmblaCarousel = dynamic(() => import("./EmblaCarousel"), {
  ssr: false,
});

type CarouselItem = {
  id: number | string;
  src: string;
  alt: string;
  link?: string;
};

type MainCarouselProps = {
  items: Array<CarouselItem>;
  title?;
  mobileIndex: string;
};

const MainCarousel = ({
  items = [],
  mobileIndex,
}: MainCarouselProps): React.ReactElement => {
  return (
    <CarouselContainer>
      <EmblaCarousel slides={items} mobileIndex={mobileIndex} />
    </CarouselContainer>
  );
};

export default MainCarousel;
