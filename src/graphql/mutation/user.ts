import gql from "graphql-tag";
import { USER_FRAGMENT } from "graphql/query/user.query";

export const TOKEN_CREATE = gql`
  mutation($email: String!, $password: String!) {
    tokenCreate(email: $email, password: $password) {
      token
      user {
        ...userFields
      }
      errors {
        field
        message
        message
      }
    }
  }
  ${USER_FRAGMENT}
`;

export const TOKEN_VERIFY = gql`
  mutation($token: String!) {
    tokenVerify(token: $token) {
      user {
        ...userFields
      }
    }
  }
  ${USER_FRAGMENT}
`;

export const ACCOUNT_REGISTER = gql`
  mutation($email: String!, $password: String!) {
    accountRegister(
      input: {
        email: $email
        password: $password
        redirectUrl: "${process.env.STOREFRONT_URL}/account/confirm"
      }
    ) {
      accountErrors {
        field
        message
        code
      }
      user {
        ...userFields
      }
    }
  }
  ${USER_FRAGMENT}
`;

export const CONFIRM_ACCOUNT = gql`
  mutation($email: String!, $token: String!) {
    confirmAccount(email: $email, token: $token) {
      accountErrors {
        field
        message
        code
      }
      user {
        ...userFields
      }
    }
  }
  ${USER_FRAGMENT}
`;

export const REQUEST_PASSWORD_RESET = gql`
  mutation($email: String!) {
    requestPasswordReset(
      email: $email
      redirectUrl: "${process.env.STOREFRONT_URL}/account/reset-password-confirm"
    ) {
      accountErrors {
        field
        message
        code
      }
    }
  }
`;

export const SET_PASSWORD = gql`
  mutation($email: String!, $password: String!, $token: String!) {
    setPassword(token: $token, email: $email, password: $password) {
      accountErrors {
        field
        message
        code
      }
    }
  }
`;

export const PASSWORD_CHANGE = gql`
  mutation($newPassword: String!, $oldPassword: String!) {
    passwordChange(newPassword: $newPassword, oldPassword: $oldPassword) {
      user {
        ...userFields
      }
      accountErrors {
        field
        message
        code
      }
    }
  }
  ${USER_FRAGMENT}
`;

export const DELETE_PAYMENT = gql`
  mutation SavedPaymentMutation($savedPaymentInput: AccountSavedPaymentInput!) {
    deleteSavedPayment(input: $savedPaymentInput) {
      accountErrors {
        field
        message
        code
      }
    }
  }
`;
