import React from "react";
import { useEmblaCarousel } from "embla-carousel/react";
import "./carousel.css";

export interface CarouselProps {
  height: number;
  /**
   * Optional click handler
   */
  onClick?: () => void;
}

export const Carousel: React.FC<CarouselProps> = () => {
  const [emblaRef] = useEmblaCarousel();

  return (
    <div className="embla" ref={emblaRef}>
      <div className="embla__container">
        <div className="embla__slide">Slide 1</div>
        <div className="embla__slide">Slide 2</div>
        <div className="embla__slide">Slide 3</div>
      </div>
    </div>
  );
};
