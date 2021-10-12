import gql from "graphql-tag";
import { CHECKOUT_FRAGMENT } from "graphql/query/checkout.query";
import { ORDER_FRAGMENT } from "../query/order.query";

export const CHECKOUT_CREATE = gql`
  mutation($email: String!, $lines: [CheckoutLineInput]!) {
    checkoutCreate(input: { email: $email, lines: $lines }) {
      checkout {
        ...checkoutFields
      }
      created
      checkoutErrors {
        field
        message
        code
      }
    }
  }
  ${CHECKOUT_FRAGMENT}
`;

export const CHECKOUT_EMAIL_UPDATE = gql`
  mutation($checkoutId: ID!, $email: String!) {
    checkoutEmailUpdate(checkoutId: $checkoutId, email: $email) {
      checkout {
        ...checkoutFields
      }
      checkoutErrors {
        field
        message
        code
      }
    }
  }
  ${CHECKOUT_FRAGMENT}
`;

export const CHECKOUT_SHIPPING_ADDRESS_UPDATE = gql`
  mutation($checkoutId: ID!, $shippingAddress: AddressInput!) {
    checkoutShippingAddressUpdate(
      checkoutId: $checkoutId
      shippingAddress: $shippingAddress
    ) {
      checkout {
        ...checkoutFields
      }
      checkoutErrors {
        field
        message
        code
      }
    }
  }
  ${CHECKOUT_FRAGMENT}
`;

export const CHECKOUT_SHIPPING_METHOD_UPDATE = gql`
  mutation($checkoutId: ID!, $shippingMethodId: ID!) {
    checkoutShippingMethodUpdate(
      checkoutId: $checkoutId
      shippingMethodId: $shippingMethodId
    ) {
      checkout {
        ...checkoutFields
      }
      checkoutErrors {
        field
        message
        code
      }
    }
  }
  ${CHECKOUT_FRAGMENT}
`;

export const CHECKOUT_BILLING_ADDRESS_UPDATE = gql`
  mutation($checkoutId: ID!, $billingAddress: AddressInput!) {
    checkoutBillingAddressUpdate(
      checkoutId: $checkoutId
      billingAddress: $billingAddress
    ) {
      checkout {
        ...checkoutFields
      }
      checkoutErrors {
        field
        message
        code
      }
    }
  }
  ${CHECKOUT_FRAGMENT}
`;

export const CHECKOUT_LINES_UPDATE = gql`
  mutation($checkoutId: ID!, $lines: [CheckoutLineInput]!) {
    checkoutLinesUpdate(checkoutId: $checkoutId, lines: $lines) {
      checkout {
        ...checkoutFields
      }
      checkoutErrors {
        field
        message
        code
      }
    }
  }
  ${CHECKOUT_FRAGMENT}
`;

export const CHECKOUT_PAYMENT_CREATE = gql`
  mutation(
    $checkoutId: ID!
    $gateway: String!
    $token: String!
    $amount: PositiveDecimal!
  ) {
    checkoutPaymentCreate(
      checkoutId: $checkoutId
      input: { gateway: $gateway, token: $token, amount: $amount }
    ) {
      checkout {
        ...checkoutFields
      }
      payment {
        id
        chargeStatus
      }
      paymentErrors {
        field
        message
        code
      }
    }
  }
  ${CHECKOUT_FRAGMENT}
`;

export const CHECKOUT_COMPLETE = gql`
  mutation($checkoutId: ID!) {
    checkoutComplete(checkoutId: $checkoutId) {
      order {
        ...orderFields
      }
      checkoutErrors {
        field
        message
      }
    }
  }
  ${ORDER_FRAGMENT}
`;

export const CHECKOUT_ADD_PROMO_CODE = gql`
  mutation($checkoutId: ID!, $promoCode: String!) {
    checkoutAddPromoCode(checkoutId: $checkoutId, promoCode: $promoCode) {
      checkout {
        ...checkoutFields
      }
      checkoutErrors {
        field
        message
        code
      }
    }
  }
  ${CHECKOUT_FRAGMENT}
`;

export const CHECKOUT_REMOVE_PROMO_CODE = gql`
  mutation($checkoutId: ID!, $promoCode: String!) {
    checkoutRemovePromoCode(checkoutId: $checkoutId, promoCode: $promoCode) {
      checkout {
        ...checkoutFields
      }
      checkoutErrors {
        field
        message
        code
      }
    }
  }
  ${CHECKOUT_FRAGMENT}
`;
