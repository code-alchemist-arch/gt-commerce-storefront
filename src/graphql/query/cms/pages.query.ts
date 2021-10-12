import { gql } from "graphql-request";

export const GET_PAGES = gql`
  query getPages($slug: String) {
    pages(where: { slug: $slug }) {
      slug
      title
      content
      cover_image {
        url
      }
      seo_information {
        seo_title
        seo_description
        seo_image {
          url
        }
        keywords {
          name
        }
      }
    }
  }
`;
