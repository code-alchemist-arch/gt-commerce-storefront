import React, { useState, useContext } from "react";
import { useToasts } from "react-toast-notifications";
import Currency from "currency.js";

import {
  CheckoutGrid,
  ReturnToCart,
  AlreadyHaveAccount,
  ProductListSummary,
  DepositsInfo,
  CheckoutError,
} from "./checkout.style";
import Link from "next/link";
import InformationBox from "components/information-box/information-box";

import { useMutation, useApolloClient } from "@apollo/client";

import ContactInformationStep from "./contact-information-step";
import ShippingAddressStep from "./shipping-address-step";
import ShippingMethodStep from "./shipping-method-step";
import BillingAddressStep from "./billing-address-step";
import { CheckoutContext } from "contexts/checkout/checkout.context";
import PaymentStep from "./payment-step";
import { useRouter } from "next/router";
import { CartContext } from "../../contexts/cart/use-cart";
import { useAppDispatch } from "contexts/app/app.provider";
import AlertIcon from "../../assets/icons/AlertIcon";
import BoxIcon from "../../assets/icons/BoxIcon";
import CartIcon from "../../assets/icons/CartIcon";
import Label from "../../components/label/label";
import {
  CHECKOUT_CREATE,
  CHECKOUT_LINES_UPDATE,
  CHECKOUT_EMAIL_UPDATE,
  CHECKOUT_ADD_PROMO_CODE,
  CHECKOUT_REMOVE_PROMO_CODE,
  CHECKOUT_PAYMENT_CREATE,
  CHECKOUT_COMPLETE,
} from "../../graphql/mutation/checkout";
import { GET_PRODUCT_VARIANTS } from "../../graphql/query/products.query";
import { LoaderModal } from "../../layouts/app-layout";
import Spinner from "../../spinner/spinner";
import { getLocalState, setLocalState } from "../../utils/localStorage";
import { getProductAttribute } from "../../utils/utils";
import OrderItem from "../profile/orders/order-detail/order-item/order-item";
import { ORDER_ADD_NOTE } from "../../graphql/mutation/order";
import { defaultTheme } from "../../site-settings/site-theme/default";
import OrderBox from "../../components/order-box/order-box";
import { CURRENCY } from "../../utils/constant";

function Checkout() {
  const router = useRouter();
  const { addToast } = useToasts();

  const CartContextState = useContext(CartContext);

  const {
    state: {
      authenticatedFlow,
      checkoutServerStatus,
      availableLines,
      outOfStockLines,
      globalsErrors,
      email,
      showContactForm,
      shippingAddressStepEnabled,
      shippingAddressesAvailable,
      showShippingAddressForm,
      selectedShippingAddressId,
      selectedShippingMethod,
      shippingMethodStepEnabled,
      billingAddressesAvailable,
      billingAddressStepEnabled,
      showBillingAddressForm,
      selectedBillingAddressId,
      sameBillingAsShippingAddress,
      shippingMethodsAvailable,
      paymentStepEnabled,
      paymentInformation,
      voucherCode,
      canApplyCoupon,
      canApplyNote,
      totalDeposits,
      totalGrams,
      paymentMethods,
      savedPaymentCardSelected,
    },
    dispatch,
  } = useContext(CheckoutContext);
  const appDispatch = useAppDispatch();

  const [createCheckoutMutation, { loading: creatingCheckout }] = useMutation(
    CHECKOUT_CREATE
  );
  const [
    checkoutLinesUpdateMutation,
    { loading: updatingLinesCheckout },
  ] = useMutation(CHECKOUT_LINES_UPDATE);
  const [checkoutEmailUpdateMutation, { loading: updatingEmail }] = useMutation(
    CHECKOUT_EMAIL_UPDATE
  );
  const [checkoutAddPromoCodeMutation, { loading: addingCoupon }] = useMutation(
    CHECKOUT_ADD_PROMO_CODE
  );
  const [
    checkoutRemovePromoCodeMutation,
    { loading: removingCoupon },
  ] = useMutation(CHECKOUT_REMOVE_PROMO_CODE);
  const [
    checkoutPaymentCreateMutation,
    { loading: creatingPayment },
  ] = useMutation(CHECKOUT_PAYMENT_CREATE);

  const [
    checkoutCompleteMutation,
    { loading: completingCheckout },
  ] = useMutation(CHECKOUT_COMPLETE);
  const [orderAddNoteMutation, { loading: addingNote }] = useMutation(
    ORDER_ADD_NOTE
  );
  const apolloClient = useApolloClient();
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [productItems, setProductItems] = useState([]);
  const [orderItems, setOrderItems] = useState([]);
  const [deposits, setDeposits] = useState<number>();
  const [orderNote, setOrderNote] = useState<string>("");
  const [promoCodeError, setPromoCodeError] = useState<string>();
  const [checkingLines, setCheckingLines] = useState(false);
  // focus states
  const [shippingAddressFocus, setShippingAddressFocus] = useState<boolean>(
    true
  );
  const [billingAddressFocus, setBillingAddressFocus] = useState(true);

  React.useEffect(() => {
    setOrderNote(getLocalState("order-note"));
    if (CartContextState.totalQuantity === 0) {
      router.push("/cart");
    } else {
      window.scrollTo(0, 0);
      const lines = CartContextState.products?.map((p) => ({
        variantId: p.variants[0].id,
        quantity: p.quantity,
      }));
      getAvailableLines(lines).then(({ availableLines, outOfStockLines }) => {
        dispatch({
          type: "SET_AVAILABLE_LINES",
          payload: { lines: availableLines },
        });
        dispatch({
          type: "SET_OUT_OF_STOCK_LINES",
          payload: { lines: outOfStockLines },
        });
        if (!availableLines.length) {
          dispatch({
            type: "ADD_GLOBAL_ERROR",
            payload: {
              error: {
                id: "items_no_longer_available",
                type: "error",
                title: "Out of stock.",
                message:
                  "All of your items are no longer available. Your cart cannot be created.",
              },
            },
          });
        }
        if (outOfStockLines.length > 0) {
          dispatch({
            type: "ADD_GLOBAL_ERROR",
            payload: {
              error: {
                id: "items_modified",
                type: "warning",
                title: "Out of stock.",
                message:
                  "Some items are no longer available. Your cart has been updated",
              },
            },
          });
        }

        if (authenticatedFlow) {
          //createCheckout(email, []);
          createCheckout(email, availableLines);
        } else {
          const localStorageItems = [
            {
              description: "Subtotal",
              value: `$ ${Currency(CartContextState.subtotalPrice)}`,
            },
          ];
          if (CartContextState.totalDeposits)
            localStorageItems.push({
              description: "Deposits",
              value: `$ ${Currency(CartContextState.totalDeposits)}`,
            });
          setTotalPrice(Currency(CartContextState.totalPrice).value);
          setOrderItems(localStorageItems);
          setProductItems(
            CartContextState.products.map((p) => ({
              id: p.id,
              img: p.metadata
                .filter((item) => item.key.includes("image_srcset_primary"))
                .map((item) => ({
                  srcSet: item.value,
                  url: item.value.split(",\n")[0],
                }))[0],
              vintage: getProductAttribute(p, "Vintage"),
              title: p.name,
              unitPrice: p.variants[0]?.pricing?.price?.gross?.amount,
              quantity: p.quantity,
              subtotal:
                p.variants[0]?.pricing?.price?.gross?.amount * p.quantity,
              regularPrice:
                p.variants[0]?.pricing?.priceUndiscounted?.gross?.amount,
              discount: p.variants[0]?.pricing?.discount?.gross?.amount,
            }))
          );
        }
      });
    }
  }, []);

  React.useEffect(() => {
    if (checkoutServerStatus) {
      const { subtotalPrice, shippingPrice } = checkoutServerStatus;

      const subtotal = Currency(subtotalPrice?.net.amount);
      const shipping = Currency(shippingPrice?.gross.amount);
      //const currDeposits = Currency(deposits);
      const taxes = Currency(subtotalPrice?.tax.amount);
      const totalPrice = Currency(
        checkoutServerStatus.totalPrice?.gross.amount
      );
      const discount = Currency(checkoutServerStatus.discount?.amount);

      let items = [
        { description: "Subtotal", value: `$ ${subtotal}` },
        { description: "Shipping", value: `$ ${shipping}` },
        //{ description: 'Deposits', value: `$ ${currDeposits}` },
        { description: "Taxes", value: `$ ${taxes}` },
      ];

      if (totalDeposits && totalDeposits !== "0") {
        items.push({
          description: "Deposit(s)",
          value: `${CURRENCY} ${Currency(totalDeposits, { precision: 2 })}`,
        });
      }

      if (totalGrams && totalGrams !== "0") {
        items.push({
          description: "Total Grams (Equivalent)",
          value: `${totalGrams}`,
        });
      }

      if (discount.value !== 0) {
        items = [
          ...items,
          { description: "Discount", value: `-$ ${discount}` },
        ];
      }

      setOrderItems(items);

      let depositsAcum = 0;
      checkoutServerStatus.lines.forEach((line) => {
        depositsAcum =
          depositsAcum +
          Number(getProductAttribute(line.variant?.product, "Deposit"));
      });
      setDeposits(Currency(depositsAcum).value);
      // setTotalPrice(totalPrice.add(currDeposits).value);
      setTotalPrice(totalPrice.value);

      setProductItems(
        checkoutServerStatus.lines.map((line) => ({
          id: line.variant.id,
          img: {},
          vintage: getProductAttribute(line.variant?.product, "Vintage"),
          title: line.variant?.product?.name,
          unitPrice: line.variant?.pricing?.price?.gross?.amount,
          quantity: line.quantity,
          subtotal: line.totalPrice?.gross?.amount,
          regularPrice: line.variant?.pricing?.priceUndiscounted?.gross?.amount,
          discount: line.variant?.pricing?.discount?.gross?.amount,
        }))
      );
    }
  }, [checkoutServerStatus, totalDeposits, totalGrams]);

  const getAvailableLines = async (localLines: any[]) => {
    setCheckingLines(true);
    const ids = localLines
      ?.map((l) => l.variantId)
      .filter((item) => item !== undefined);

    console.log(ids);
    const {
      data: {
        productVariants: { edges: serverVariants },
      },
    } = await apolloClient.query({
      query: GET_PRODUCT_VARIANTS,
      variables: {
        ids,
        channel: process.env.API_CHANNEL,
      },
    });

    const availableLines = [];
    const outOfStockLines = [];
    localLines?.forEach((line) => {
      const variant = serverVariants.find((i) => i.node.id === line.variantId);
      if (variant && variant.node.quantityAvailable >= line.quantity) {
        availableLines.push(line);
      } else if (variant) {
        if (variant.node.quantityAvailable > 0) {
          availableLines.push({
            variantId: line.variantId,
            quantity: variant.node.quantityAvailable,
          });
          outOfStockLines.push({
            variantId: line.variantId,
            quantity: line.quantity,
            quantityAvailable: variant.node.quantityAvailable,
            name: variant.node.product.name,
          });
        }
      }
    });
    setCheckingLines(false);
    return { availableLines, outOfStockLines };
  };

  const createCheckout = async (email, lines = []) => {
    try {
      const {
        data: { checkoutCreate },
      } = await createCheckoutMutation({ variables: { email, lines: [] } });

      if (checkoutCreate.checkoutErrors.length) {
        const { message } = checkoutCreate.checkoutErrors[0];
        addToast(message, {
          appearance: "error",
          autoDismiss: true,
        });
      }
      if (checkoutCreate.checkout) {
        dispatch({
          type: "CREATE_CHECKOUT",
          payload: { ...checkoutCreate.checkout },
        });
        // Checkout is old one.
        if (!checkoutCreate.created) {
          await clearCheckoutLines(checkoutCreate.checkout);
        }
        if (lines.length) {
          // if (checkoutCreate.checkout.shippingAddress) {
          //   dispatch({
          //     type: 'UPDATE_SHIPPING_ADDRESS',
          //     payload: {
          //       checkout: checkoutCreate.checkout,
          //       selectedShippingAddressId: authenticatedFlow
          //         ? shippingAddressesAvailable.find((addr) =>
          //             areEqualAddresses(addr, checkoutCreate.checkout.shippingAddress),
          //           )?.id
          //         : checkoutCreate.checkout.shippingAddress.id,
          //     },
          //   });
          // }
          // if (checkoutCreate.checkout.shippingAddress && checkoutCreate.checkout.shippingMethod) {
          //   dispatch({
          //     type: 'UPDATE_SHIPPING_METHOD',
          //     payload: {
          //       checkout: checkoutCreate.checkout,
          //       selectedShippingMethod: checkoutCreate.checkout.shippingMethod.id,
          //     },
          //   });
          // }
          // if (checkoutCreate.checkout.shippingMethod && checkoutCreate.checkout.billingAddress) {
          //   dispatch({
          //     type: 'UPDATE_BILLING_ADDRESS',
          //     payload: {
          //       checkout: checkoutCreate.checkout,
          //       selectedBillingAddressId: authenticatedFlow
          //         ? billingAddressesAvailable.find((addr) =>
          //             areEqualAddresses(addr, checkoutCreate.checkout.billingAddress),
          //           )?.id
          //         : checkoutCreate.checkout.billingAddress.id,
          //       sameAsShipping: areEqualAddresses(
          //         checkoutCreate.checkout.billingAddress,
          //         checkoutCreate.checkout.shippingAddress,
          //       ),
          //     },
          //   });
          // }
        } else {
          dispatch({ type: "DISABLE_ALL_STEPS" });
        }
        await updateCheckoutLines(checkoutCreate.checkout, lines);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const clearCheckoutLines = async (checkout) => {
    const lines = checkout.lines.map((line) => ({
      variantId: line.variant.id,
      quantity: 0,
    }));
    if (lines.length === 0) return checkout;
    const {
      data: { checkoutLinesUpdate },
    } = await checkoutLinesUpdateMutation({
      variables: { checkoutId: checkout.id, lines },
    });

    if (checkoutLinesUpdate.checkoutErrors.length) {
      const { message } = checkoutLinesUpdate.checkoutErrors[0];
      addToast(message, {
        appearance: "error",
        autoDismiss: true,
      });
    }
    return checkoutLinesUpdate.checkout;
  };

  const updateCheckoutLines = async (checkout, lines) => {
    try {
      const {
        data: { checkoutLinesUpdate },
      } = await checkoutLinesUpdateMutation({
        variables: { checkoutId: checkout.id, lines },
      });

      if (checkoutLinesUpdate.checkoutErrors.length) {
        const { message } = checkoutLinesUpdate.checkoutErrors[0];
        addToast(message, {
          appearance: "error",
          autoDismiss: true,
        });
      } else {
        if (checkoutLinesUpdate.checkout) {
          dispatch({
            type: "UPDATE_CHECKOUT",
            payload: checkoutLinesUpdate.checkout,
          });
        }
      }
      return checkoutLinesUpdate.checkout;
    } catch (error) {
      console.error(error);
    }
  };

  const updateEmailCheckout = async (checkoutId: string, email: string) => {
    try {
      const {
        data: { checkoutEmailUpdate },
      } = await checkoutEmailUpdateMutation({
        variables: { checkoutId, email },
      });

      if (checkoutEmailUpdate.checkout) {
        dispatch({
          type: "EMAIL_CHECKOUT_UPDATE",
          payload: { checkout: checkoutEmailUpdate.checkout, email },
        });
      }
    } catch (error) {
      console.error(error);
    }
  };

  const createPaymentCheckout = async (checkoutId, gateway, token, amount) => {
    try {
      const {
        data: { checkoutPaymentCreate },
      } = await checkoutPaymentCreateMutation({
        variables: { checkoutId, gateway, token, amount },
      });
      return checkoutPaymentCreate;
    } catch (error) {
      console.error(error);
    }
  };

  const completeCheckout = async (checkoutId) => {
    try {
      const {
        data: { checkoutComplete },
      } = await checkoutCompleteMutation({
        variables: { checkoutId },
      });
      if (checkoutComplete.checkoutErrors.length) {
        const { message } = checkoutComplete.checkoutErrors[0];
        addToast(message, {
          appearance: "error",
          autoDismiss: true,
        });
      }
      return checkoutComplete.order;
    } catch (error) {
      console.error(error);
    }
  };

  const addPromoCodeCheckout = async (checkoutId, promoCode) => {
    try {
      const {
        data: { checkoutAddPromoCode },
      } = await checkoutAddPromoCodeMutation({
        variables: { checkoutId, promoCode },
      });
      setPromoCodeError(undefined);
      if (checkoutAddPromoCode.checkoutErrors.length) {
        setPromoCodeError(checkoutAddPromoCode.checkoutErrors[0].message);
      } else {
        dispatch({
          type: "ADD_VOUCHER_CODE",
          payload: {
            checkout: checkoutAddPromoCode.checkout,
            voucherCode: promoCode,
          },
        });
      }
    } catch (error) {
      console.error(error);
    }
  };

  const removePromoCodeCheckout = async (checkoutId, promoCode) => {
    try {
      const {
        data: { checkoutRemovePromoCode },
      } = await checkoutRemovePromoCodeMutation({
        variables: { checkoutId, promoCode },
      });
      setPromoCodeError(undefined);
      if (checkoutRemovePromoCode.checkoutErrors.length) {
        setPromoCodeError(checkoutRemovePromoCode.checkoutErrors[0].message);
      } else {
        dispatch({
          type: "REMOVE_VOUCHER_CODE",
          payload: { checkout: checkoutRemovePromoCode.checkout },
        });
      }
    } catch (error) {
      console.error(error);
    }
  };

  const addNoteToOrder = async (orderId, note) => {
    try {
      const {
        data: { orderAddNote },
      } = await orderAddNoteMutation({
        variables: {
          order: orderId,
          input: {
            message: note,
          },
        },
      });
      if (orderAddNote.orderErrors.length) {
        const { message } = orderAddNote.orderErrors[0];
        addToast(message, {
          appearance: "error",
          autoDismiss: true,
        });
      }
      return orderAddNote.order;
    } catch (error) {
      console.error(error);
    }
  };

  /*
   * *******************************************
   *        Contact Information Handlers
   * *******************************************
   * */
  const handleChangeEmail = () => {
    dispatch({ type: "SHOW_CONTACT_FORM" });
    setShippingAddressFocus(false);
  };

  const handleSubmitContact = async (values, isSubmiting) => {
    const { email: newEmail } = values;

    // setEmail(newEmail);
    if (!checkoutServerStatus) {
      await createCheckout(newEmail, availableLines);
    } else if (email !== newEmail) {
      await updateEmailCheckout(checkoutServerStatus.id, newEmail);
    } else {
      // TODO: review later
      dispatch({ type: "HIDE_CONTACT_FORM" });
      setShippingAddressFocus(true);
    }
    isSubmiting(false);
  };

  const handleApplyCoupon = React.useCallback(
    async (coupon) => {
      await addPromoCodeCheckout(checkoutServerStatus.id, coupon);
    },
    [checkoutServerStatus]
  );

  const handleRemoveCoupon = React.useCallback(
    async (coupon) => {
      await removePromoCodeCheckout(checkoutServerStatus.id, coupon);
    },
    [checkoutServerStatus]
  );

  const handlePay = React.useCallback(async () => {
    if (checkoutServerStatus.id) {
      // FIXME
      // @ts-ignore
      const response = await window.SquareSubmit();
      if (!paymentInformation && response) {
        if (response.complete) {
          dispatch({
            type: "SET_PAYMENT_INFORMATION",
            payload: {
              token: response.token,
            },
          });
        } else {
          dispatch({ type: "CLEAR_SAVED_PAYMENT_CARD_SELECTED" });
          addToast("Payment error.", {
            appearance: "error",
            autoDismiss: true,
          });
          return;
        }
      }

      // FIXME this is a bad implementation we should not assume there will always be 1 payment gateway
      const gateway = checkoutServerStatus.availablePaymentGateways[0].id;

      await createPaymentCheckout(
        checkoutServerStatus.id,
        gateway,
        paymentInformation ? paymentInformation.token : response.token,
        totalPrice // FIXME should totalPrice be a float?
      );
      const order = await completeCheckout(checkoutServerStatus.id);
      // apply order note
      if (orderNote) {
        await addNoteToOrder(order.id, orderNote);
      }
      if (order) {
        // clear cart & checkout
        // dispatch('CLEAR_CHECKOUT');
        appDispatch({ type: "SET_LOADING", payload: true });
        CartContextState.clearCart();
        // redirect to success page
        const { token } = order;
        window.location.href = `/checkout-success/${token}`;
      } else {
        dispatch({ type: "CLEAR_SAVED_PAYMENT_CARD_SELECTED" });
      }
    }
  }, [paymentInformation, totalPrice]);

  return (
    <CheckoutGrid>
      {(creatingCheckout ||
        checkingLines ||
        updatingLinesCheckout ||
        updatingEmail ||
        addingCoupon ||
        removingCoupon ||
        creatingPayment ||
        completingCheckout ||
        addingNote) && (
        <LoaderModal>
          <Spinner width={58} height={67} />
        </LoaderModal>
      )}
      <InformationBox noPadding>
        <Link href="/cart" passHref>
          <ReturnToCart>
            <Label
              text="Return to cart Summary"
              fontSize={14}
              fontWeight={500}
              iconName="arrowLeft"
            />
            <CartIcon width={28} height={28} />
          </ReturnToCart>
        </Link>
      </InformationBox>

      {!authenticatedFlow && (
        <AlreadyHaveAccount>
          <span>Already have an Account?</span>
          <Link
            href={{ pathname: "/account/login", query: { origin: "checkout" } }}
            passHref
          >
            <a>Login</a>
          </Link>
        </AlreadyHaveAccount>
      )}

      <ContactInformationStep
        email={email}
        isLoading={creatingCheckout || updatingEmail}
        onSubmit={handleSubmitContact}
        showForm={showContactForm}
        handleChangeEmail={!authenticatedFlow && handleChangeEmail}
      />

      <Label
        text="Complete these steps to place your order"
        fontSize={14}
        iconName="edit"
        iconHeight={25}
        iconWidth={25}
      />

      <ShippingAddressStep
        authenticatedFlow={authenticatedFlow}
        addresses={shippingAddressesAvailable}
        enabled={shippingAddressStepEnabled}
        showAddressForm={showShippingAddressForm}
        selectedShippingAddressId={selectedShippingAddressId}
        focus={shippingAddressFocus}
        checkoutId={checkoutServerStatus?.id}
        dispatch={dispatch}
      />

      <ShippingMethodStep
        enabled={shippingMethodStepEnabled}
        shippingAddress={shippingAddressesAvailable.find(
          (addr) => addr.id === selectedShippingAddressId
        )}
        shippingMethod={selectedShippingMethod}
        checkoutId={checkoutServerStatus?.id}
        shippingMethodsAvailable={shippingMethodsAvailable}
        dispatch={dispatch}
      />

      <BillingAddressStep
        enabled={billingAddressStepEnabled}
        focus={billingAddressFocus}
        authenticatedFlow={authenticatedFlow}
        addresses={billingAddressesAvailable}
        shippingAddress={shippingAddressesAvailable.find(
          (addr) => addr.id === selectedShippingAddressId
        )}
        selectedBillingAddressId={selectedBillingAddressId}
        sameAsShippingAddress={sameBillingAsShippingAddress}
        showAddressForm={showBillingAddressForm}
        checkoutId={checkoutServerStatus?.id}
        dispatch={dispatch}
      />

      <PaymentStep
        enabled={paymentStepEnabled}
        dispatch={dispatch}
        paymentInformation={paymentInformation}
        totalPrice={totalPrice}
        paymentMethods={paymentMethods}
        authenticatedFlow={authenticatedFlow}
        savedPaymentCardSelected={savedPaymentCardSelected}
      />

      <div className="summary">
        {!!checkoutServerStatus && !!globalsErrors.length && (
          <InformationBox className="checkoutErrors">
            <>
              {globalsErrors.map((error, index) => (
                <CheckoutError key={`error_${index}`}>
                  <div>
                    <AlertIcon
                      height={32}
                      width={32}
                      color={defaultTheme.primary.color}
                    />
                  </div>
                  <div className="message">
                    <div className="title">{error.title}</div>
                    <div>{error.message}</div>
                    {error.id === "items_modified" && !!outOfStockLines.length && (
                      <ul className="items">
                        {outOfStockLines.map((l) => (
                          <li key={l.variantId}>
                            <div>
                              &bull; {l.name}{" "}
                              <strong>
                                ({`${l.quantity} -> ${l.quantityAvailable}`})
                              </strong>
                            </div>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </CheckoutError>
              ))}
            </>
          </InformationBox>
        )}

        {!!productItems.length && (
          <InformationBox
            noPadding
            dark
            title="Your Products"
            className="checkoutProducts"
            collapsible
            collapsed
          >
            <ProductListSummary>
              {productItems.map((item) => (
                <OrderItem key={item.id} className="compressed" item={item} />
              ))}
              {!!deposits && (
                <DepositsInfo>
                  <div className="icon">
                    <BoxIcon width={40} height={40} />
                  </div>
                  <div className="info">
                    Container Deposit (s) <span>$ {deposits.toFixed(2)}</span>
                  </div>
                </DepositsInfo>
              )}
            </ProductListSummary>
          </InformationBox>
        )}

        <OrderBox
          title="Your Order"
          items={orderItems}
          total={totalPrice}
          currency="CAD $"
          action={`${
            creatingPayment || completingCheckout ? "Paying..." : "Pay now"
          }`}
          onAction={handlePay}
          actionDisabled={creatingPayment || completingCheckout}
          note={orderNote}
          handleNoteChange={
            canApplyNote
              ? (event) => setLocalState("order-note", event.target.value)
              : undefined
          }
          handleApplyCoupon={canApplyCoupon ? handleApplyCoupon : undefined}
          handleRemoveCoupon={handleRemoveCoupon}
          couponError={promoCodeError}
          appliedCoupon={voucherCode}
          aplyingCoupon={addingCoupon || removingCoupon || addingNote}
        />
      </div>
    </CheckoutGrid>
  );
}

export default Checkout;
