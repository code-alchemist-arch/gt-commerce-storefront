import gql from "graphql-tag";
import { PRODUCT_FRAGMENT } from "./product.query";

export const GET_COLLECTION_BY_SLUG = gql`
  query getCollectionBySlug(
    $collectionSlug: String!
    $limit: Int
    $afterCursor: String
    $withProducts: Boolean = false
    $channel: String!
  ) {
    collection(slug: $collectionSlug, channel: $channel) {
      id
      name
      slug
      backgroundImage {
        alt
        url
      }
      seoTitle
      seoDescription
      description
      products(first: $limit, after: $afterCursor) @include(if: $withProducts) {
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
  }
  ${PRODUCT_FRAGMENT}
`;
