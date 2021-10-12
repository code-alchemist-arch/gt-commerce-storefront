import { gql } from "graphql-tag";

export const GET_BLOGPOSTS = gql`
  query getBlogPosts($slug: String, $start: Int, $limit: Int) {
    blogPosts(
      where: { slug: $slug }
      start: $start
      limit: $limit
      sort: "date_published:desc"
    ) {
      slug
      title
      author
      content
      excerpt
      date_published
      header_image {
        url
      }
      preview_image {
        url
      }
      seo {
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
