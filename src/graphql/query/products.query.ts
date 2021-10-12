import gql from "graphql-tag";
import { PRODUCT_FRAGMENT } from "./product.query";

export const GET_PRODUCT_WITH_RELATED_PRODUCTS = gql`
  query getProductWithRelatedProducts($slug: String!, $type: String!) {
    product(slug: $slug) {
      id
      title
      weight
      slug
      price
      type
      image
      categories {
        id
        slug
        title
      }
    }
    relatedProducts(slug: $slug, type: $type) {
      id
      title
      slug
      weight
      price
      type
      image
    }
  }
`;

export const GET_RELATED_PRODUCTS = gql`
  query getRelatedProducts($type: String!, $slug: String!) {
    relatedProducts(type: $type, slug: $slug) {
      id
      title
      slug
      weight
      price
      type
      image
    }
  }
`;

export const GET_PRODUCT = gql`
  query getProduct($slug: String!, $channel: String!) {
    product(slug: $slug, channel: $channel) {
      ...commonProductsFields
    }
  }
  ${PRODUCT_FRAGMENT}
`;

export const GET_PRODUCTS = gql`
  query getProducts(
    $limit: Int
    $afterCursor: String
    $filter: ProductFilterInput
    $sortBy: ProductOrder
    $channel: String
  ) {
    products(
      first: $limit
      after: $afterCursor
      filter: $filter
      sortBy: $sortBy
      channel: $channel
    ) {
      totalCount
      pageInfo {
        hasNextPage
        endCursor
      }
      edges {
        cursor
        node {
          ...commonProductsFields
        }
      }
    }
  }
  ${PRODUCT_FRAGMENT}
`;

export const GET_PRODUCTS_BY_COLLECTION = gql`
  query getProductsByCollection(
    $collections: [ID!]
    $limit: Int
    $afterCursor: String
  ) {
    products(
      first: $limit
      after: $afterCursor
      filter: { collections: $collections }
    ) {
      totalCount
      pageInfo {
        hasNextPage
        endCursor
      }
      edges {
        cursor
        node {
          name
        }
      }
    }
  }
  ${PRODUCT_FRAGMENT}
`;

export const GET_PRODUCT_VARIANTS = gql`
  query getProductVariants($ids: [ID], $channel: String!) {
    productVariants(ids: $ids, first: 100, channel: $channel) {
      edges {
        node {
          id
          quantityAvailable
          product {
            name
          }
        }
      }
    }
  }
`;
