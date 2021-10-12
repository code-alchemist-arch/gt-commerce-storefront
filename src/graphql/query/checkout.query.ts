import gql from "graphql-tag";
import { ADDRESS_FRAGMENT } from "../mutation/address";

export const CHECKOUT_FRAGMENT = gql`
  fragment checkoutFields on Checkout {
    id
    token
    email
    metadata {
      key
      value
    }
    shippingPrice {
      currency
      gross {
        currency
        amount
      }
    }
    subtotalPrice {
      currency
      gross {
        currency
        amount
      }
      tax {
        currency
        amount
      }
      net {
        currency
        amount
      }
    }
    totalPrice {
      gross {
        amount
        currency
      }
    }
    discount {
      currency
      amount
    }
    isShippingRequired
    availableShippingMethods {
      id
      name
      metadata {
        key
        value
      }
      price {
        currency
        amount
      }
    }
    shippingAddress {
      ...addressFields
    }
    billingAddress {
      ...addressFields
    }
    shippingMethod {
      id
      name
      metadata {
        key
        value
      }
      price {
        amount
        currency
      }
    }
    availablePaymentGateways {
      id
      name
      config {
        field
        value
      }
    }
    lines {
      variant {
        id
        product {
          name
          attributes {
            attribute {
              name
            }
            values {
              name
            }
          }
          thumbnail {
            url
            alt
          }
        }
        pricing {
          price {
            gross {
              amount
            }
          }
          discount {
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
      quantity
      totalPrice {
        gross {
          amount
        }
      }
    }
    voucherCode
  }
  ${ADDRESS_FRAGMENT}
`;

export const GET_CHECKOUT = gql`
  query getCheckout($token: UUID!) {
    checkout(token: $token) {
      ...checkoutFields
    }
  }
  ${CHECKOUT_FRAGMENT}
`;
