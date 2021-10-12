import { gql } from "graphql-request";

export const GET_MAILCHIMP = gql`
  query getMailchimp {
    mailchimp {
      api_key
      server
      audience_id
    }
  }
`;
