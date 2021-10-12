import React, { useState, SyntheticEvent, Dispatch, useRef } from "react";
import StepBox from "components/step-box/step-box";
import { StepContentWrapper } from "./checkout.style";
import AddressForm from "./address-form";
import { useMutation } from "@apollo/client";
import { DeviceType } from "interfaces";
import Label from "../../components/label/label";
import OptionCard from "../../components/option-card/option-card";
import { CHECKOUT_BILLING_ADDRESS_UPDATE } from "../../graphql/mutation/checkout";
import { scrollToRef } from "../../utils/utils";
import {
  ADDRESS_CREATE,
  ADDRESS_DELETE,
  ADDRESS_UPDATE,
} from "../../graphql/mutation/address";
import { defaultTheme } from "../../site-settings/site-theme/default";

type Props = {
  authenticatedFlow: boolean;
  addresses: any[];
  enabled: boolean;
  showAddressForm: boolean;
  focus: boolean;
  shippingAddress: any;
  checkoutId: string;
  selectedBillingAddressId: string;
  sameAsShippingAddress?: boolean;
  dispatch: Dispatch<{ type: string; payload?: any }>;
};

const BillingAddressStep: React.FC<Props> = ({
  authenticatedFlow,
  addresses,
  enabled,
  showAddressForm,
  focus,
  shippingAddress,
  checkoutId,
  selectedBillingAddressId,
  sameAsShippingAddress,
  dispatch,
}: Props) => {
  const [currentBillingAddress, setCurrentBillingAddress] = useState<
    any | undefined
  >();

  const stepRef = useRef(null);

  // const scrollToBilling = React.useCallback(
  //   () => scrollToRef(stepRef, deviceType),
  //   [stepRef]
  // );
  const [
    checkoutBillingAddressUpdateMutation,
    { loading: updatingBillingAddress },
  ] = useMutation(CHECKOUT_BILLING_ADDRESS_UPDATE);
  const [
    accountAddressCreateMutation,
    { loading: addingBillingAddressToUser },
  ] = useMutation(ADDRESS_CREATE);
  const [
    accountAddressUpdateMutation,
    { loading: updatingBillingAddressToUser },
  ] = useMutation(ADDRESS_UPDATE);
  const [
    accountAddressDeleteMutation,
    { loading: deletingBillingAddressToUser },
  ] = useMutation(ADDRESS_DELETE);

  const updateBillingAddressCheckout = async (
    billingAddressInput,
    sameAsShipping = false
  ) => {
    let selectedId;
    const billingAddress = { ...billingAddressInput };

    if (billingAddress.id) {
      selectedId = billingAddress.id;
      delete billingAddress.id;
    }

    if (billingAddress.__typename !== undefined) {
      delete billingAddress.__typename;
    }

    if (billingAddress.isDefaultShippingAddress !== undefined) {
      delete billingAddress.isDefaultShippingAddress;
    }

    if (billingAddress.isDefaultBillingAddress !== undefined) {
      delete billingAddress.isDefaultBillingAddress;
    }

    if (typeof billingAddress.country === "object") {
      billingAddress.country = billingAddress.country.code;
    }

    const {
      data: { checkoutBillingAddressUpdate },
    } = await checkoutBillingAddressUpdateMutation({
      variables: { checkoutId: checkoutId, billingAddress },
    });

    if (checkoutBillingAddressUpdate.checkoutErrors.length) {
      throw checkoutBillingAddressUpdate.checkoutErrors;
    }

    const { checkout } = checkoutBillingAddressUpdate;

    dispatch({
      type: "UPDATE_BILLING_ADDRESS",
      payload: {
        checkout,
        sameAsShipping,
        selectedBillingAddressId: authenticatedFlow
          ? selectedId
          : checkout.billingAddress.id,
      },
    });
  };

  const userAddBillingAddress = React.useCallback(async (billingAddress) => {
    const {
      data: { accountAddressCreate },
    } = await accountAddressCreateMutation({
      variables: {
        input: billingAddress,
        type: "BILLING",
      },
    });

    if (accountAddressCreate.accountErrors.length) {
      throw accountAddressCreate.accountErrors;
    }

    dispatch({
      type: "ADD_USER_BILLING_ADDRESS",
      payload: {
        address: accountAddressCreate.address,
      },
    });

    return accountAddressCreate.address;
  }, []);

  const userUpdateBillingAddress = React.useCallback(
    async (id, billingAddress) => {
      const {
        data: { accountAddressUpdate },
      } = await accountAddressUpdateMutation({
        variables: {
          id,
          input: billingAddress,
        },
      });

      if (accountAddressUpdate.accountErrors.length) {
        throw accountAddressUpdate.accountErrors;
      }

      dispatch({
        type: "EDIT_USER_BILLING_ADDRESS",
        payload: {
          address: accountAddressUpdate.address,
        },
      });
    },
    []
  );

  const userDeleteBillingAddress = React.useCallback(async (id) => {
    const {
      data: { accountAddressDelete },
    } = await accountAddressDeleteMutation({
      variables: {
        id,
      },
    });

    if (accountAddressDelete.accountErrors.length) {
      throw accountAddressDelete.accountErrors;
    }

    dispatch({
      type: "REMOVE_USER_BILLING_ADDRESS",
      payload: {
        address: accountAddressDelete.address,
      },
    });
  }, []);

  const handleSubmitForm = React.useCallback(
    async (values, { setErrors }) => {
      try {
        if (authenticatedFlow) {
          // is editing
          if (currentBillingAddress) {
            await userUpdateBillingAddress(currentBillingAddress.id, values);
            if (currentBillingAddress.id === selectedBillingAddressId) {
              await updateBillingAddressCheckout({
                id: currentBillingAddress.id,
                ...values,
              });
            }
          } else {
            const address = await userAddBillingAddress(values);
            if (addresses.length === 0) {
              await updateBillingAddressCheckout({ id: address.id, ...values });
            }
          }
        } else {
          await updateBillingAddressCheckout(values);
        }
      } catch (error) {
        console.error(error);
        const errors = {};
        if (Array.isArray(error)) {
          error.forEach((err) => {
            errors[err.field] = err.message;
          });
          setErrors(errors);
        }
      }
      // scrollToBilling();
    },
    [currentBillingAddress, addresses]
  );

  const handleSameAsShippingAddressClick = React.useCallback(
    async (value) => {
      if (value) {
        const checkout = await updateBillingAddressCheckout(
          { ...shippingAddress },
          true
        );
        // scrollToBilling();
      } else {
        // if (authenticatedFlow && addresses.length === 0) {
        if (addresses.length === 0) {
          dispatch({ type: "SHOW_BILLING_ADDRESS_FORM" });
          setCurrentBillingAddress(undefined);
        } else {
          dispatch({
            type: "HIDE_BILLING_ADDRESS_FORM",
            payload: { sameAsShipping: false },
          });
        }

        // setBillingAddressFocus(true);
      }
    },
    [addresses, shippingAddress]
  );

  const handleCancelBillingAddress = () => {
    dispatch({
      type: "HIDE_BILLING_ADDRESS_FORM",
      payload: { sameAsShipping: false },
    });
    // scrollToBilling();
  };

  const handleAddBillingAddress = () => {
    setCurrentBillingAddress(undefined);
    dispatch({ type: "SHOW_BILLING_ADDRESS_FORM" });
  };

  const handleEditBillingAddress = (event: SyntheticEvent, address) => {
    setCurrentBillingAddress(address);
    dispatch({ type: "SHOW_BILLING_ADDRESS_FORM" });
    event.stopPropagation();
  };

  const handleRemoveBillingAddress = async (
    event: SyntheticEvent,
    addressId
  ) => {
    try {
      if (authenticatedFlow) {
        const address = await userDeleteBillingAddress(addressId);
      }
      dispatch({
        type: "REMOVE_BILLING_ADDRESS",
        payload: { billingAddressId: addressId },
      });
    } catch (error) {
      console.error(error);
    }

    event.stopPropagation();
  };

  const handleSelectBillingAddressOption = async (values) => {
    await updateBillingAddressCheckout(values);
    // scrollToShipping();
  };

  return (
    <StepBox
      className="checkoutStep"
      stepNumber={3}
      title="Billing address"
      disabled={!enabled}
      success={!!selectedBillingAddressId}
      ref={stepRef}
      action={
        enabled &&
        authenticatedFlow &&
        !showAddressForm &&
        !sameAsShippingAddress
          ? "+Add address"
          : undefined
      }
      onAction={enabled && !sameAsShippingAddress && handleAddBillingAddress}
    >
      {!!enabled && (
        <>
          <Label
            text="The billing address must match the address registered on your credit card"
            fontSize={14}
            fontWeight={500}
            color={
              !sameAsShippingAddress
                ? defaultTheme.colors.yellow
                : defaultTheme.colors.black
            }
            className="checkoutLabel"
          />
          <Label
            text="Tell us if the billing address is the same as the shipping address"
            fontSize={14}
            fontWeight={500}
            className="checkoutLabel"
          />
          <Label
            iconName={`${sameAsShippingAddress ? "checkCircle" : "circle"}`}
            className={`radioButton ${sameAsShippingAddress ? "selected" : ""}`}
            text="Same as shipping address"
            fontSize={14}
            fontWeight={500}
            iconWidth={24}
            iconHeight={24}
            onClick={() => handleSameAsShippingAddressClick(true)}
          />
          <Label
            iconName={`${
              sameAsShippingAddress === false ? "checkCircle" : "circle"
            }`}
            className={`radioButton ${
              sameAsShippingAddress === false ? "selected" : ""
            }`}
            text="Use a different billing address"
            fontSize={14}
            fontWeight={500}
            iconWidth={24}
            iconHeight={24}
            onClick={() => handleSameAsShippingAddressClick(false)}
          />
          <StepContentWrapper>
            {showAddressForm ? (
              <AddressForm
                onSubmit={handleSubmitForm}
                focus={focus}
                initialValues={currentBillingAddress}
                onCancel={
                  !!currentBillingAddress ||
                  (authenticatedFlow && addresses.length)
                    ? handleCancelBillingAddress
                    : undefined
                }
                loadingState={
                  updatingBillingAddress ||
                  addingBillingAddressToUser ||
                  updatingBillingAddressToUser
                }
              />
            ) : sameAsShippingAddress === false ? (
              addresses.map((address) => (
                <OptionCard
                  key={address.id}
                  title={address.streetAddress1}
                  subtitle={`${address.city}, ${address.countryArea}, ${address.postalCode}, ${address.country?.country}`}
                  editAction={
                    !authenticatedFlow
                      ? (event) => handleEditBillingAddress(event, address)
                      : undefined
                  }
                  removeAction={
                    !authenticatedFlow
                      ? (event) => handleRemoveBillingAddress(event, address.id)
                      : undefined
                  }
                  confirmed={address.id === selectedBillingAddressId}
                  onClick={() => {
                    handleSelectBillingAddressOption(address);
                  }}
                />
              ))
            ) : (
              sameAsShippingAddress && (
                <OptionCard
                  key={shippingAddress.id}
                  title={shippingAddress.streetAddress1}
                  subtitle={`${shippingAddress.city}, ${shippingAddress.countryArea}, ${shippingAddress.postalCode}, ${shippingAddress.country?.country}`}
                  confirmed={true}
                />
              )
            )}
          </StepContentWrapper>
        </>
      )}
    </StepBox>
  );
};

export default BillingAddressStep;
