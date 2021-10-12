import { gql } from "graphql-request";

export const GET_GENERAL_OPTIONS = gql`
  query getGeneralOptions {
    generalOption {
      display_header_top
      header_top_text
      header_top_link
      display_header_bottom
      header_bottom_text
      header_bottom_link
      display_footer_top
      footer_top_text
      footer_top_link
      footer_copy
      display_about
      about_title
      about_text
      show_favourite
      display_cart_popup_desktop
      display_cart_popup_mobile
      keep_menu_on_scroll
      social_links {
        label
        icon_slug
        url
      }
      modal {
        image {
          url
        }
        image_position
        header
        text
        newsletter
        link_label
        link_url
        show_on_each_visit
      }
    }
    footer {
      columns {
        id
        title
        content
      }
      address
      phone
      copy
      show_company_info
      operation_hours
      show_newsletter
      newsletter_background {
        url
      }
    }
    menu {
      items {
        id
        label
        url
        icon_slug
        children {
          id
          label
          url
          icon_slug
          show_image
          image {
            url
          }
          icon_list
          column_position
          children {
            id
            label
            url
            icon_slug
          }
        }
      }
    }
  }
`;
