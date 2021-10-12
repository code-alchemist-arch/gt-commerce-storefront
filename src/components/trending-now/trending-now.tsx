import React, { useEffect, useState } from "react";
import { CarouselInternalState } from "react-multi-carousel";
import { useQuery } from "@apollo/client";

import { HomeTitle } from "../home-title/home-title";
import { GTProductCarousel } from "components/@gt-components/gt-carousel";
import { Products } from "interfaces";
import { GET_PRODUCTS } from "graphql/query/products.query";
import NoResultFound from "components/no-result/no-result";

import {
  ProductCardDataTypesense,
  ProductCard as GTProductCard,
} from "components/@gt-components/product-card";
import Loader from "components/loader/loader";

import {
  LoadingProductsWrapper,
  TrendingNowContainer,
} from "./trending-now.style";
import { useCart } from "contexts/cart/use-cart";

type Props = {
  showFavourite?: boolean;
  fetchLimit?: number;
  title?: string;
};

export const TrendingNow: React.FC<Props> = ({ fetchLimit = 16, title }) => {
  const [slidesToShow, setSlidesToShow] = useState(6);

  const result = useQuery<Products>(GET_PRODUCTS, {
    variables: {
      filter: {
        isPublished: true,
      },
      channel: process.env.API_CHANNEL,
      afterCursor: "",
      limit: slidesToShow * 2 || fetchLimit,
    },
    notifyOnNetworkStatusChange: true,
  });

  const { data, error, loading } = result;

  const { add } = useCart();

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;

      if (width > 2999) {
        setSlidesToShow(10);
      } else if (width > 1439) {
        setSlidesToShow(6);
      } else if (width > 1023) {
        setSlidesToShow(4);
      } else if (width > 659) {
        setSlidesToShow(3);
      } else {
        setSlidesToShow(2);
      }
    };

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (data?.products?.edges?.length === 0) {
    return <NoResultFound />;
  }

  const prod_items = data?.products?.edges.map<ProductCardDataTypesense>(
    (edgeItem) => {
      const {
        id,
        name,
        variants,
        slug,
        isAvailable,
        collections,
        attributes,
        metadata,
      } = edgeItem.node;

      const image = metadata
        .filter((item) => item.key.includes("image_srcset_primary"))
        .map((item) => ({
          srcSet: item.value,
          url: item.value.split(",\n")[0],
        }))[0];

      const product_size = attributes.filter(
        (attr) => attr.attribute.name === "Product Size (GT)"
      )[0]?.values[0]?.name;
      const price = variants[0]?.pricing?.priceUndiscounted?.gross?.amount.toFixed(
        2
      );
      const salePrice = variants[0]?.pricing?.price?.gross?.amount.toFixed(2);
      const collection_names = collections.map((colItm) => colItm.name);
      const collection_slugs = collections.map((colItm) => colItm.slug);

      return {
        id: id,
        image_srcset: image?.srcSet,
        image_thumbnail_100: image?.url,
        image_thumbnail_250: image?.url,
        image_thumbnail_500: image?.url,
        in_stock: isAvailable,
        inventoried: true,
        on_sale_flag: false,
        on_sale_price: salePrice,
        product_brand: "",
        product_category: "",
        product_id: variants[0].id,
        product_name: name,
        product_size: product_size,
        product_sku: variants[0].sku,
        product_subcategory: "region",
        product_subsubcategory: "",
        qty_available: variants[0].quantityAvailable,
        region: "Califonia, United State",
        retail_price: price,
        slug: slug,
        vintage: "2099",
        collection_names: collection_names,
        collection_slugs: collection_slugs,
      };
    }
  );

  /**
   * Responsive Breakpoints for Slider
   */
  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 10,
    },
    desktop: {
      breakpoint: { max: 2999, min: 1440 },
      items: 6,
    },
    tablet: {
      breakpoint: { max: 1439, min: 1120 },
      items: 5,
    },
    medium: {
      breakpoint: { max: 1119, min: 768 },
      items: 4,
    },
    mobile: {
      breakpoint: { max: 767, min: 576 },
      items: 3,
    },
    smallmobile: {
      breakpoint: { max: 575, min: 425 },
      items: 2,
    },
    xsmallmobile: {
      breakpoint: { max: 424, min: 0 },
      items: 1,
    },
  };

  if (error) {
    return <div>Error</div>;
  }

  const afterChangeHandler = (
    prevSlide: number,
    { slidesToShow, currentSlide }: CarouselInternalState
  ) => {
    if (currentSlide + slidesToShow > prod_items.length - 2) {
      const { endCursor, hasNextPage } = data.products.pageInfo;

      result &&
        hasNextPage &&
        result?.fetchMore &&
        result.fetchMore({
          variables: {
            afterCursor: endCursor,
            limit: slidesToShow > 2 ? slidesToShow : 3,
          },
          updateQuery: (prev, { fetchMoreResult }) => {
            if (!fetchMoreResult) {
              return prev;
            }

            return {
              products: {
                ...fetchMoreResult.products,
                edges: [
                  ...prev.products.edges,
                  ...fetchMoreResult.products.edges,
                ],
              },
            };
          },
        });
    }
  };

  /**
   * On Click Product Cart Button Handler
   *
   * @param {string} productId Product ID
   */
  const onClickCartHandler = (productId: string) => {
    const product = data?.products?.edges.find(
      (edgeItem) => edgeItem.node.id === productId
    ).node;

    add(product, 1);
  };

  return (
    <TrendingNowContainer>
      <HomeTitle title={title ? title : "Trending now"} />
      {prod_items && prod_items.length > 0 ? (
        <GTProductCarousel
          afterChange={afterChangeHandler}
          swipeable={true}
          responsive={responsive}
          loading={loading}
          slidesToSlide={slidesToShow}
        >
          {prod_items?.map((product) => (
            <GTProductCard
              key={product.id}
              link={`/products/${product.slug}`}
              subComponentAttrIcon
              subComponentHoverAttribute="vintage"
              subComponentAttribute="region"
              subTextAttribute="product_size"
              data={product}
              variant="grid"
              onClickCartButton={() => onClickCartHandler(product.id)}
              status={
                !product.in_stock
                  ? {
                      name: "sold_out",
                      text: "Sold Out",
                    }
                  : undefined
              }
            />
          ))}
        </GTProductCarousel>
      ) : (
        <LoadingProductsWrapper>
          <Loader />
        </LoadingProductsWrapper>
      )}
    </TrendingNowContainer>
  );
};
