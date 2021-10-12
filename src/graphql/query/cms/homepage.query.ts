import { gql } from "graphql-request";

export const GET_HOMEPAGE_CONTENT = gql`
  query getHomepageContent {
    homepage {
      show_main_slider
      show_coupon_list
      show_main_feature
      show_our_favourites
      coupon_list {
        id
        title
        subtitle
        link
        image {
          url
        }
        type
        active
      }
      main_feature {
        image {
          alt
          file {
            url
          }
          imgPosition
        }
      }
      urls {
        title
        columns
        type
        iconPosition
        items {
          label
          icon_slug
          url
        }
      }
      our_favourites {
        title
        subtitle
        images {
          image {
            url
          }
          alt
          url
        }
        products {
          object_id
        }
      }
      content {
        __typename
        ... on ComponentElementsProductsCarousel {
          title
          items_quantity
          collections {
            object_id
          }
        }
        ... on ComponentElementsCollectionBanners {
          banners {
            id
            title
            subtitle
            link
            icon_slug
            active
            color
            image {
              url
            }
          }
        }
        ... on ComponentElementsPolicies {
          items {
            id
            title
            subtitle
            icon_slug
            link
            active
          }
        }
      }
    }
    mainSlider {
      desktop {
        id
        link
        active
        alt
        file {
          url
        }
      }
      tablet {
        id
        link
        active
        alt
        file {
          url
        }
      }
      mobile {
        id
        link
        active
        alt
        file {
          url
        }
      }
    }
  }
`;
