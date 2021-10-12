import { ADDRESS_FRAGMENT } from "../mutation/address";
import gql from "graphql-tag";
import { ORDER_FRAGMENT } from "./order.query";

export const USER_FRAGMENT = gql`
  fragment userFields on User {
    id
    email
    isActive
    checkout {
      token
    }
  }
`;

export const ME = gql`
  query me($ordersLimit: Int = 5, $orderAfterCursor: String) {
    me {
      email
      lastLogin
      addresses {
        ...addressFields
      }
      checkout {
        token
      }
      metadata {
        key
        value
      }
      orders(first: $ordersLimit, after: $orderAfterCursor) {
        totalCount
        pageInfo {
          hasNextPage
          hasPreviousPage
          startCursor
          endCursor
        }
        edges {
          cursor
          node {
            ...orderFields
          }
        }
      }
    }
  }
  ${ADDRESS_FRAGMENT}
  ${ORDER_FRAGMENT}
`;
