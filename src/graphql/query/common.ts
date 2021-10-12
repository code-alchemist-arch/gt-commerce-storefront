import gql from "graphql-tag";

export const ATTRIBUTE_FRAGMENT = gql`
  fragment attributeFields on SelectedAttribute {
    attribute {
      name
    }
    values {
      name
    }
  }
`;

export const MONEY_FRAGMENT = gql`
  fragment moneyFields on Money {
    currency
    amount
  }
`;

export const TAXED_MONEY_FRAGMENT = gql`
  fragment taxedMoneyFields on TaxedMoney {
    currency
    gross {
      ...moneyFields
    }
    net {
      ...moneyFields
    }
    tax {
      ...moneyFields
    }
  }
  ${MONEY_FRAGMENT}
`;
