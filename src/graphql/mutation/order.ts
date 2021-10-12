import { gql } from "@apollo/client";
import { ORDER_FRAGMENT } from "../query/order.query";

export const ADD_ORDER = gql`
  mutation($orderInput: String!) {
    addOrder(orderInput: $orderInput) {
      id
      userId
      products {
        id
        title
      }
      status
    }
  }
`;

export const GET_PAYMENT = gql`
  mutation($paymentInput: String!) {
    charge(paymentInput: $paymentInput) {
      status
    }
  }
`;

export const ORDER_ADD_NOTE = gql`
  mutation($order: ID!, $input: OrderAddNoteInput!) {
    orderAddNote(order: $order, input: $input) {
      order {
        ...orderFields
      }
      orderErrors {
        field
        code
        message
      }
    }
  }
  ${ORDER_FRAGMENT}
`;
