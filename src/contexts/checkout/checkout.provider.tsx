import { CheckoutContext, CheckoutState } from "./checkout.context";
import React, { useReducer, ReactElement } from "react";
import { removeLocalState } from "utils/localStorage";
import { getPaymentMethods, getValueFromMetadata, upsert } from "utils/utils";

const defaultState = {
  checkoutServerStatus: undefined,

  availableLines: [],
  outOfStockLines: [],
  globalsErrors: [],
  authenticatedFlow: false,
  email: undefined,
  showContactForm: true,

  shippingAddressStepEnabled: false,
  selectedShippingAddressId: undefined,
  shippingAddressesAvailable: [],
  showShippingAddressForm: false,

  shippingMethodStepEnabled: false,
  selectedShippingMethod: undefined,
  shippingMethodsAvailable: [],

  billingAddressStepEnabled: false,
  selectedBillingAddressId: undefined,
  billingAddressesAvailable: [],
  showBillingAddressForm: false,
  sameBillingAsShippingAddress: undefined,

  paymentStepEnabled: false,
  paymentInformation: undefined,

  voucherCode: undefined,
  canApplyCoupon: false,
  canApplyNote: false,

  totalDeposits: "",
  totalGrams: "",

  paymentMethods: undefined,
  savedPaymentCardSelected: false,
};

function reducer(state: CheckoutState, action: any) {
  switch (action.type) {
    case "CREATE_CHECKOUT":
      // TODO Review later
      // setLocalState('checkout_token', action.payload.token);

      return {
        ...state,
        showContactForm: false,
        showShippingAddressForm: !state.authenticatedFlow
          ? true
          : state.shippingAddressesAvailable.length === 0,
        shippingAddressStepEnabled: true,
        email: state.authenticatedFlow ? state.email : action.payload.email,
        checkoutServerStatus: action.payload,
        voucherCode: action.payload.voucherCode,
        canApplyCoupon: true,
        canApplyNote: true,
        totalDeposits: getValueFromMetadata(
          "total_deposits",
          action.payload.metadata
        ),
        totalGrams: getValueFromMetadata(
          "total_grams",
          action.payload.metadata
        ),
      };
    case "UPDATE_CHECKOUT":
      return {
        ...state,
        checkoutServerStatus: action.payload,
      };
    case "EMAIL_CHECKOUT_UPDATE":
      return {
        ...state,
        showContactForm: false,
        shippingAddressStepEnabled: true,
        email: action.payload.email,
        checkoutServerStatus: action.payload.checkout,
      };

    case "UPDATE_SHIPPING_ADDRESS":
      return {
        ...state,
        shippingAddressesAvailable: state.authenticatedFlow
          ? state.shippingAddressesAvailable
          : [action.payload.checkout.shippingAddress],
        selectedShippingAddressId: action.payload.selectedShippingAddressId,
        billingAddressesAvailable: state.authenticatedFlow
          ? state.billingAddressesAvailable.filter(
              (addr) => addr.id !== action.payload.selectedShippingAddressId
            )
          : [],
        checkoutServerStatus: action.payload.checkout,
        showShippingAddressForm: false,
        shippingMethodStepEnabled: true,
        shippingMethodsAvailable: action.payload.checkout.availableShippingMethods.map(
          (sm) => ({
            id: sm.id,
            name: sm.name,
            price: sm.price.amount,
            description: getValueFromMetadata("description", sm.metadata),
          })
        ),
      };
    case "REMOVE_SHIPPING_ADDRESS":
      // eslint-disable-next-line no-case-declarations
      const newShippingAddressAvailable = state.shippingAddressesAvailable.filter(
        (addr) => addr.id !== action.payload.shippingAddressId
      );

      // eslint-disable-next-line no-case-declarations
      const isRemovingSelectedShippingAddress =
        state.selectedShippingAddressId &&
        state.selectedShippingAddressId === action.payload.shippingAddressId;

      return {
        ...state,
        shippingAddressesAvailable: newShippingAddressAvailable,
        // billingAddressesAvailable: newShippingAddressAvailable,
        selectedShippingAddressId: isRemovingSelectedShippingAddress
          ? undefined
          : state.selectedShippingAddressId,
        showShippingAddressForm: !newShippingAddressAvailable.length,
        shippingMethodStepEnabled: !isRemovingSelectedShippingAddress,
        selectedShippingMethod: isRemovingSelectedShippingAddress
          ? undefined
          : state.selectedShippingMethod,
        billingAddressStepEnabled: !isRemovingSelectedShippingAddress,
        selectedBillingAddressId: isRemovingSelectedShippingAddress
          ? undefined
          : state.selectedBillingAddressId,
      };
    case "UPDATE_SHIPPING_METHOD":
      return {
        ...state,
        checkoutServerStatus: action.payload.checkout,
        selectedShippingMethod: action.payload.selectedShippingMethod,
        billingAddressStepEnabled: true,
      };
    case "UPDATE_BILLING_ADDRESS":
      return {
        ...state,
        billingAddressesAvailable: state.authenticatedFlow
          ? state.billingAddressesAvailable
          : !action.payload.sameAsShipping
          ? [action.payload.checkout.billingAddress]
          : [],
        selectedBillingAddressId: action.payload.selectedBillingAddressId,
        checkoutServerStatus: action.payload.checkout,
        sameBillingAsShippingAddress: action.payload.sameAsShipping,
        showBillingAddressForm: false,
        paymentStepEnabled: true,
      };
    case "REMOVE_BILLING_ADDRESS":
      return {
        ...state,
        billingAddressesAvailable: !state.authenticatedFlow
          ? []
          : state.billingAddressesAvailable,
        selectedBillingAddressId: !state.authenticatedFlow
          ? undefined
          : state.selectedBillingAddressId,
      };
    case "ADD_USER_SHIPPING_ADDRESS":
      return {
        ...state,
        showShippingAddressForm: false,
        shippingAddressesAvailable: [
          ...state.shippingAddressesAvailable,
          action.payload.address,
        ],
      };
    case "EDIT_USER_SHIPPING_ADDRESS":
      return {
        ...state,
        showShippingAddressForm: false,
        shippingAddressesAvailable: state.shippingAddressesAvailable.map(
          (addr) =>
            addr.id === action.payload.address.id
              ? action.payload.address
              : addr
        ),
      };
    case "REMOVE_USER_SHIPPING_ADDRESS":
      // eslint-disable-next-line no-case-declarations
      const newUserAddresses = state.shippingAddressesAvailable.filter(
        (addr) => addr.id !== action.payload.address.id
      );

      // eslint-disable-next-line no-case-declarations
      const isRemovingUserSelectedShippingAddress =
        state.selectedShippingAddressId &&
        state.selectedShippingAddressId === action.payload.address.id;

      return {
        ...state,
        showShippingAddressForm: newUserAddresses.length === 0,
        shippingAddressesAvailable: newUserAddresses,
        shippingMethodStepEnabled: !isRemovingUserSelectedShippingAddress,
        billingAddressStepEnabled: !isRemovingUserSelectedShippingAddress,
      };
    case "ADD_USER_BILLING_ADDRESS":
      return {
        ...state,
        showBillingAddressForm: false,
        billingAddressesAvailable: [
          ...state.billingAddressesAvailable,
          action.payload.address,
        ],
      };
    case "EDIT_USER_BILLING_ADDRESS":
      return {
        ...state,
        showBillingAddressForm: false,
        billingAddressesAvailable: state.billingAddressesAvailable.map((addr) =>
          addr.id === action.payload.address.id ? action.payload.address : addr
        ),
      };
    case "REMOVE_USER_BILLING_ADDRESS":
      return {
        ...state,
        billingAddressesAvailable: state.billingAddressesAvailable.filter(
          (addr) => addr.id !== action.payload.address.id
        ),
      };

    case "SHOW_CONTACT_FORM":
      return {
        ...state,
        showContactForm: true,
      };
    case "HIDE_CONTACT_FORM":
      return {
        ...state,
        showContactForm: false,
      };
    case "SHOW_SHIPPING_ADDRESS_FORM":
      return {
        ...state,
        showShippingAddressForm: true,
      };
    case "HIDE_SHIPPING_ADDRESS_FORM":
      return {
        ...state,
        showShippingAddressForm: false,
      };
    case "SHOW_BILLING_ADDRESS_FORM":
      return {
        ...state,
        showBillingAddressForm: true,
        sameBillingAsShippingAddress: false,
      };
    case "HIDE_BILLING_ADDRESS_FORM":
      return {
        ...state,
        showBillingAddressForm: false,
        sameBillingAsShippingAddress: action.payload.sameAsShipping,
        paymentStepEnabled: false,
      };
    case "SET_PAYMENT_INFORMATION":
      return {
        ...state,
        paymentInformation: action.payload,
        // paymentStepEnabled: false,
      };
    case "CLEAR_PAYMENT_INFORMATION":
      return {
        ...state,
        paymentInformation: undefined,
      };
    case "ADD_VOUCHER_CODE":
      return {
        ...state,
        checkoutServerStatus: action.payload.checkout,
        voucherCode: action.payload.voucherCode,
      };
    case "REMOVE_VOUCHER_CODE":
      return {
        ...state,
        checkoutServerStatus: action.payload.checkout,
        voucherCode: undefined,
      };

    case "DISABLE_ALL_STEPS":
      return {
        ...state,
        shippingAddressStepEnabled: false,
        selectedShippingAddressId: undefined,
        showShippingAddressForm: false,
        shippingMethodStepEnabled: false,
        selectedShippingMethod: undefined,
        billingAddressStepEnabled: false,
        selectedBillingAddressId: undefined,
        paymentStepEnabled: false,
        canApplyCoupon: false,
        canApplyNote: false,
      };
    case "SET_AVAILABLE_LINES":
      return {
        ...state,
        availableLines: action.payload.lines,
      };
    case "SET_OUT_OF_STOCK_LINES":
      return {
        ...state,
        outOfStockLines: action.payload.lines,
      };
    case "ADD_GLOBAL_ERROR":
      return {
        ...state,
        globalsErrors: upsert(state.globalsErrors, action.payload.error),
      };
    case "SET_GLOBALS_ERRORS":
      return {
        ...state,
        globalsErrors: action.payload.errors,
      };
    case "SET_DATA":
      return {
        ...state,
        checkout: action.payload,
      };
    case "CLEAR_CHECKOUT":
      removeLocalState("checkout_token");
      removeLocalState("order-note");
      return {
        ...defaultState,
      };
    case "DELETE_CARD":
      return {
        ...state,
        paymentMethods: state.paymentMethods.filter(
          (item) => item.lastFourDigit !== action.payload
        ),
      };
    case "SET_SAVED_PAYMENT_CARD_SELECTED":
      return {
        ...state,
        savedPaymentCardSelected: true,
      };
    case "CLEAR_SAVED_PAYMENT_CARD_SELECTED":
      return {
        ...state,
        savedPaymentCardSelected: false,
      };

    default:
      return state;
  }
}

type CheckoutProviderProps = {
  children: ReactElement;
  user?: {
    email: string;
    addresses: any[];
    metadata: { key: string; value: string }[];
  };
  serverStatus?: any;
};

export const CheckoutProvider: React.FunctionComponent<CheckoutProviderProps> = ({
  children,
  user,
  serverStatus,
}: CheckoutProviderProps) => {
  let authenticatedFlow = defaultState.authenticatedFlow;
  let email = defaultState.email;
  let showContactForm = defaultState.showContactForm;
  let shippingAddressesAvailable = defaultState.shippingAddressesAvailable;
  let shippingAddressStepEnabled = defaultState.shippingAddressStepEnabled;
  let selectedShippingAddressId = defaultState.selectedShippingAddressId;
  let showShippingAddressForm = defaultState.showShippingAddressForm;
  let billingAddressesAvailable = defaultState.billingAddressesAvailable;
  let voucherCode = defaultState.voucherCode;
  let paymentMethods = defaultState.paymentMethods;
  let savedPaymentCardSelected = defaultState.savedPaymentCardSelected;

  if (serverStatus) {
    showContactForm = false;
    email = serverStatus.email;
    shippingAddressStepEnabled = true;

    if (serverStatus.shippingAddress) {
      selectedShippingAddressId = serverStatus.shippingAddress.id;
    } else {
      showShippingAddressForm = true;
    }
    voucherCode = serverStatus.voucherCode;
  }

  if (user) {
    authenticatedFlow = true;
    email = user.email;
    shippingAddressesAvailable = user.addresses.filter(
      (addr) => addr.country?.code === "CA"
    );
    showShippingAddressForm = !(user.addresses?.length > 0);
    billingAddressesAvailable = user.addresses;
    showContactForm = false;
    paymentMethods = getPaymentMethods(user.metadata);
  }

  const [state, dispatch] = useReducer(reducer, {
    ...defaultState,
    authenticatedFlow,
    email,
    checkoutServerStatus: serverStatus,
    showContactForm,
    shippingAddressesAvailable,
    shippingAddressStepEnabled,
    selectedShippingAddressId,
    showShippingAddressForm,
    billingAddressesAvailable,
    voucherCode,
    paymentMethods,
    savedPaymentCardSelected,
  });

  return (
    <CheckoutContext.Provider value={{ state, dispatch }}>
      {children}
    </CheckoutContext.Provider>
  );
};
