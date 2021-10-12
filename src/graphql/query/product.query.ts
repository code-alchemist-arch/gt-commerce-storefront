import gql from "graphql-tag";

export const PRODUCT_FRAGMENT = gql`
  fragment commonProductsFields on Product {
    id
    slug
    name
    description
    seoTitle
    seoDescription
    descriptionJson
    collections {
      id
      name
      slug
    }
    variants {
      id
      sku
      quantityAvailable
      metadata {
        key
        value
      }
      pricing {
        discount {
          gross {
            amount
          }
        }
        price {
          gross {
            amount
          }
        }
        priceUndiscounted {
          gross {
            amount
          }
        }
      }
    }
    images {
      alt
      url
    }
    thumbnail(size: 300) {
      url
      alt
    }
    isAvailable
    isAvailableForPurchase
    metadata {
      key
      value
    }
    attributes {
      attribute {
        name
      }
      values {
        name
      }
    }
    pricing {
      onSale
      priceRange {
        start {
          gross {
            amount
          }
        }
        stop {
          gross {
            amount
          }
        }
      }
      priceRangeUndiscounted {
        start {
          gross {
            amount
          }
        }
        stop {
          gross {
            amount
          }
        }
      }
      onSale
      discount {
        currency
        gross {
          amount
          currency
        }
      }
    }
  }
`;

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
    product(slug: $slug) {
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
  ) {
    products(
      first: $limit
      after: $afterCursor
      filter: $filter
      sortBy: $sortBy
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
  query getProductVariants($ids: [ID]) {
    productVariants(ids: $ids, first: 100) {
      edges {
        node {
          id
          quantityAvailable
          isAvailable
          product {
            name
          }
        }
      }
    }
  }
`;
