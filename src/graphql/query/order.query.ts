import gql from "graphql-tag";
import { ADDRESS_FRAGMENT } from "graphql/mutation/address";
import { ATTRIBUTE_FRAGMENT, TAXED_MONEY_FRAGMENT } from "./common";

export const ORDER_FRAGMENT = gql`
  fragment orderFields on Order {
    id
    token
    status
    statusDisplay
    paymentStatusDisplay
    paymentStatus
    created
    number
    customerNote
    discount {
      ...moneyFields
    }
    shippingPrice {
      ...taxedMoneyFields
    }
    total {
      ...taxedMoneyFields
    }
    subtotal {
      ...taxedMoneyFields
    }
    shippingAddress {
      ...addressFields
    }
    billingAddress {
      ...addressFields
    }
    lines {
      id
      quantity
      totalPrice {
        ...taxedMoneyFields
      }
      unitPrice {
        ...taxedMoneyFields
      }
      variant {
        product {
          name
          attributes {
            ...attributeFields
          }
        }
      }
      thumbnail {
        url
        alt
      }
    }
  }
  ${ADDRESS_FRAGMENT}
  ${ATTRIBUTE_FRAGMENT}
  ${TAXED_MONEY_FRAGMENT}
`;

export const GET_ORDER = gql`
  query getOrder($id: ID!) {
    order(id: $id) {
      ...orderFields
    }
  }
  ${ORDER_FRAGMENT}
`;

export const GET_ORDER_BY_TOKEN = gql`
  query getOrderByToken($token: UUID!) {
    orderByToken(token: $token) {
      ...orderFields
    }
  }
  ${ORDER_FRAGMENT}
`;
