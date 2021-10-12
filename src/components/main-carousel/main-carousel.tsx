import React, { useState } from "react";
import dynamic from "next/dynamic";

import Image from "next/image";
import Link from "next/link";

import {
  Arrow,
  CarouselItemWrapper,
  MainCarouselWrapper,
} from "./main-carousel.style";
import { EmblaCarousel } from "../embla-carousel/EmblaCarousel";

const responsive = {
  desktop: {
    breakpoint: {
      max: 3000,
      min: 1024,
    },
    items: 1,
  },
  mobile: {
    breakpoint: {
      max: 464,
      min: 0,
    },
    items: 1,
  },
  tablet: {
    breakpoint: {
      max: 1024,
      min: 200,
    },
    items: 1,
  },
};

type CarouselItem = {
  id: number | string;
  src: string;
  alt: string;
  link?: string;
};

type MainCarouselProps = {
  items: Array<CarouselItem>;
  deviceType: {
    desktop: boolean;
    mobile: boolean;
    tablet: boolean;
  };
  title?;
};

const getDeviceType = (deviceType) => {
  if (deviceType?.desktop) return "desktop";
  if (deviceType?.tablet) return "tablet";
  if (deviceType?.mobile) return "mobile";
};

const Carousel = dynamic(() => import("react-multi-carousel"), {
  ssr: true,
});

const MainCarousel = ({
  items = [],
  deviceType = { desktop: true, mobile: false, tablet: false },
  ...rest
}: MainCarouselProps): React.ReactElement => {
  const [deviceTypeClass] = useState(getDeviceType(deviceType));

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        margin: "0 auto",
      }}
    >
      <EmblaCarousel slides={items} deviceType={deviceTypeClass} />
      {/*<MainCarouselWrapper>*/}
      {/*  <Carousel*/}
      {/*    showDots={items.length > 1}*/}
      {/*    infinite={items.length > 1 ? true : false}*/}
      {/*    slidesToSlide={1}*/}
      {/*    containerClass={`main-carousel`}*/}
      {/*    responsive={responsive}*/}
      {/*    deviceType={deviceTypeClass}*/}
      {/*    autoPlay={deviceTypeClass !== "mobile" ? true : false}*/}
      {/*    arrows={deviceType.desktop && items.length > 1}*/}
      {/*    customLeftArrow={<Arrow className="left" aria-label="left-button" />}*/}
      {/*    customRightArrow={*/}
      {/*      <Arrow className="right" aria-label="right-button" />*/}
      {/*    }*/}
      {/*    {...rest}*/}
      {/*  >*/}
      {/*    {items.map((item: CarouselItem, index: number) => (*/}
      {/*      <Link key={index} href={item.link || "/"} passHref>*/}
      {/*        <CarouselItemWrapper>*/}
      {/*          <Image*/}
      {/*            src={item.src}*/}
      {/*            alt={item.alt}*/}
      {/*            layout="responsive"*/}
      {/*            width={1600}*/}
      {/*            height={"100%"}*/}
      {/*            quality={75}*/}
      {/*            priority={index === 0}*/}
      {/*            objectFit="cover"*/}
      {/*          />*/}
      {/*        </CarouselItemWrapper>*/}
      {/*      </Link>*/}
      {/*    ))}*/}
      {/*  </Carousel>*/}
      {/*</MainCarouselWrapper>*/}
    </div>
  );
};

export default React.memo(MainCarousel);
