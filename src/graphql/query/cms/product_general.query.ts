import { gql } from "graphql-request";

export const GET_PRODUCT_GENERAL = gql`
  query getProductGeneral {
    productGeneral {
      tabs {
        title
        text
        icon_slug
      }
      teasers {
        title
        background_image {
          url
        }
        image {
          url
        }
        link
        category_slug
      }
    }
  }
`;
