import { gql } from "@apollo/client";

export const ADDRESS_FRAGMENT = gql`
  fragment addressFields on Address {
    id
    firstName
    lastName
    companyName
    streetAddress1
    streetAddress2
    city
    country {
      code
      country
    }
    countryArea
    postalCode
    phone
    isDefaultShippingAddress
    isDefaultBillingAddress
  }
`;

export const ADDRESS_CREATE = gql`
  mutation($input: AddressInput!, $type: AddressTypeEnum) {
    accountAddressCreate(input: $input, type: $type) {
      address {
        ...addressFields
      }
      user {
        addresses {
          ...addressFields
        }
      }
      accountErrors {
        field
        message
        code
      }
    }
  }
  ${ADDRESS_FRAGMENT}
`;

export const ADDRESS_UPDATE = gql`
  mutation($id: ID!, $input: AddressInput!) {
    accountAddressUpdate(id: $id, input: $input) {
      address {
        ...addressFields
      }
      user {
        addresses {
          ...addressFields
        }
      }
      accountErrors {
        field
        message
        code
      }
    }
  }
  ${ADDRESS_FRAGMENT}
`;
export const ADDRESS_DELETE = gql`
  mutation($id: ID!) {
    accountAddressDelete(id: $id) {
      address {
        ...addressFields
      }
      accountErrors {
        field
        message
        code
      }
    }
  }
  ${ADDRESS_FRAGMENT}
`;

export const ADDRESS_SET_DEFAULT = gql`
  mutation($id: ID!, $type: AddressTypeEnum!) {
    accountSetDefaultAddress(id: $id, type: $type) {
      user {
        addresses {
          ...addressFields
        }
      }
      accountErrors {
        field
        message
        code
      }
    }
  }
  ${ADDRESS_FRAGMENT}
`;
