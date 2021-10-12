import { createContext, Dispatch } from "react";

type CheckoutLine = {
  variantId: string;
  quantity: number;
  quantityAvailable?: number;
  name?: string;
};

type CheckoutError = {
  id: string;
  type: "error" | "warning";
  title: string;
  message: string;
};

export interface CheckoutState {
  checkoutServerStatus?: any;

  availableLines: CheckoutLine[];
  outOfStockLines: CheckoutLine[];
  globalsErrors: CheckoutError[];

  authenticatedFlow: boolean;
  email?: string;
  showContactForm: boolean;

  shippingAddressStepEnabled: boolean;
  selectedShippingAddressId?: string;
  shippingAddressesAvailable: any[];
  showShippingAddressForm: boolean;

  shippingMethodStepEnabled: boolean;
  selectedShippingMethod: any;
  shippingMethodsAvailable: any[];

  billingAddressStepEnabled: boolean;
  selectedBillingAddressId?: string;
  billingAddressesAvailable: any[];
  showBillingAddressForm: boolean;
  sameBillingAsShippingAddress?: boolean;

  paymentStepEnabled: boolean;
  paymentInformation: any;

  voucherCode: string;
  canApplyCoupon: boolean;
  canApplyNote: boolean;

  totalDeposits: string;
  totalGrams: string;

  paymentMethods: {
    id: string;
    cardType: string;
    lastFourDigit: string;
  }[];
  savedPaymentCardSelected: boolean;
}

interface ContextProps {
  state: CheckoutState;
  dispatch: Dispatch<{ type: string; payload?: any }>;
}

export const CheckoutContext = createContext({} as ContextProps);
