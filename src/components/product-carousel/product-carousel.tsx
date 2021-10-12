import React from "react";
import {
  ProductsCarouselWrapper,
  Arrow,
  CollectionTitle,
  LoaderItem,
} from "./product-carousel.style";
import { useQuery } from "@apollo/client";

import Link from "next/link";

import dynamic from "next/dynamic";
import { GET_PRODUCTS } from "../../graphql/query/products.query";
import { ProductCard } from "../product-card/product-card-four";
import Placeholder from "../placeholder/placeholder";

const Carousel = dynamic(() => import("components/carousel/carousel"), {
  ssr: true,
});
// const MobileCarousel = dynamic(() => import('components/MobileCarousel/MobileCarousel'), {
//   ssr: false,
// });

const responsive = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 1440 },
    items: 4,
    slidesToSlide: 4,
  },
  desktop: {
    breakpoint: { max: 1440, min: 1240 },
    items: 4,
    slidesToSlide: 4,
  },
  tablet: {
    breakpoint: { max: 1240, min: 768 },
    items: 4,
    slidesToSlide: 4,
  },
  minitablet: {
    breakpoint: { max: 768, min: 464 },
    items: 3,
    slidesToSlide: 3,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 2,
    slidesToSlide: 2,
    // partialVisibilityGutter: 40,
  },
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

const ProductsCarousel = ({
  collectionTitle,
  collections = [],
  fetchLimit = 15,
  deviceType,
  showFavourite = false,
}) => {
  const { data, error, loading, fetchMore } = useQuery(GET_PRODUCTS, {
    variables: {
      filter: {
        isPublished: true,
        collections,
      },
      afterCursor: "",
      limit: fetchLimit,
      channel: process.env.API_CHANNEL,
    },
  });

  if (error) {
    return <div>unexpected error</div>;
  }

  let items;
  if (loading) {
    items = Array(fetchLimit)
      .fill(1)
      .map((i, k) => (
        <LoaderItem key={k}>
          <Placeholder />
        </LoaderItem>
      ));
  } else {
    const { products } = data;
    items = products.edges.map((item: any, index: number) => (
      <div key={item.node.id}>
        <Link
          href="/products/[slug]"
          as={`/products/${item.node.slug}`}
          passHref
        >
          <a onClick={(event) => event.preventDefault()}>
            <ProductCard data={item.node} />
          </a>
        </Link>
      </div>
    ));
  }
  return (
    <>
      {!!collectionTitle && (
        <CollectionTitle>{collectionTitle}</CollectionTitle>
      )}
      <ProductsCarouselWrapper>
        {deviceType?.desktop ? (
          <Carousel
            data={items}
            responsive={responsive}
            itemClass="product-item"
            infinite={false}
          />
        ) : (
          <></>
        )}
      </ProductsCarouselWrapper>
    </>
  );
};

export default React.memo(ProductsCarousel);
