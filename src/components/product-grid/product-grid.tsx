import React from "react";
import { ProductCard } from "components/product-card/product-card-eight";
import styled from "styled-components";
import css from "@styled-system/css";
import ErrorMessage from "components/error-message/error-message";
import { useQuery, NetworkStatus } from "@apollo/client";
import { GET_PRODUCTS } from "graphql/query/products.query";
import { useRouter } from "next/router";
import { Button } from "components/button/loadmore-button";
import { FormattedMessage } from "react-intl";
import { Box } from "components/box";
import NoResultFound from "components/no-result/no-result";
import { LoaderItem, LoaderWrapper } from "./product-list/product-list.style";
import Placeholder from "components/placeholder/placeholder";
import { Products } from "../../interfaces";
import {
  ProductCardDataTypesense,
  ProductCard as GTProductCard,
} from "components/@gt-components/product-card";
import { useCart } from "contexts/cart/use-cart";

const Grid = styled.div(
  css({
    display: "grid",
    gridGap: "20px",
    gridTemplateColumns: "repeat(6, minmax(0, 1fr))",

    "@media screen and (max-width: 1200px)": {
      gridTemplateColumns: "repeat(4, minmax(0, 1fr))",
    },

    "@media screen and (max-width: 960px)": {
      gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
      gridGap: "10px",
    },

    "@media screen and (max-width: 660px)": {
      gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
    },
  })
);

interface Props {
  loadMore?: boolean;
  fetchLimit?: number;
  style?: any;
}

export const ProductGrid = ({
  style,
  loadMore = true,
  fetchLimit = 16,
}: Props) => {
  const { data, error, loading, fetchMore, networkStatus } = useQuery<Products>(
    GET_PRODUCTS,
    {
      variables: {
        filter: {
          isPublished: true,
        },
        channel: process.env.API_CHANNEL,
        afterCursor: "",
        limit: fetchLimit,
      },
      notifyOnNetworkStatusChange: true,
    }
  );

  const loadingMore = networkStatus === NetworkStatus.fetchMore;
  const { add } = useCart();

  if (error) return <ErrorMessage message={error.message} />;
  if (loading && !loadingMore) {
    return (
      <LoaderWrapper>
        <LoaderItem>
          <Placeholder uniqueKey="1" />
        </LoaderItem>
        <LoaderItem>
          <Placeholder uniqueKey="2" />
        </LoaderItem>
        <LoaderItem>
          <Placeholder uniqueKey="3" />
        </LoaderItem>
      </LoaderWrapper>
    );
  }
  if (data.products?.edges?.length === 0) {
    return <NoResultFound />;
  }
  const handleLoadMore = () => {
    const afterCursor = data.products.pageInfo.endCursor;
    fetchMore({
      variables: {
        afterCursor,
        limit: fetchLimit,
      },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult) {
          return prev;
        }

        return {
          products: {
            ...fetchMoreResult.products,
            edges: [...prev.products.edges, ...fetchMoreResult.products.edges],
          },
        };
      },
    });
  };
  const { edges, pageInfo } = data.products;

  const prod_items = edges.map<ProductCardDataTypesense>((edgeItem) => {
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
      metadata: metadata,
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
  });

  /**
   * Cart Button Handler
   * @param {string} productId Product Id
   */
  const onClickCartButtonHandler = (productId: string) => {
    const product = edges.find((item) => item.node.id === productId).node;

    add(product, 1);
  };

  return (
    <section>
      <Grid style={style}>
        {prod_items.map((product) => (
          <GTProductCard
            link={`/products/${product.slug}`}
            subComponentAttrIcon
            subComponentHoverAttribute="vintage"
            subComponentAttribute="region"
            subTextAttribute="product_size"
            data={product}
            variant="grid"
            key={product.id}
            onClickCartButton={() => onClickCartButtonHandler(product.id)}
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
      </Grid>

      {loadMore && pageInfo?.hasNextPage && (
        <Box style={{ textAlign: "center" }} mt={"2rem"}>
          <Button
            onClick={handleLoadMore}
            loading={loadingMore}
            variant="secondary"
            style={{
              fontSize: 14,
              display: "inline-flex",
            }}
            border="1px solid #f1f1f1"
          >
            <FormattedMessage id="loadMoreButton" defaultMessage="Load More" />
          </Button>
        </Box>
      )}
    </section>
  );
};
