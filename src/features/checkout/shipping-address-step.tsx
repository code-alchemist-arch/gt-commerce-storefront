import React, { useState, SyntheticEvent, Dispatch, useRef } from "react";
import StepBox from "components/step-box/step-box";
import AddressForm from "./address-form";
import { StepContentWrapper } from "./checkout.style";
import { useMutation } from "@apollo/client";
import { DeviceType } from "interfaces";
import { useToasts } from "react-toast-notifications";
import Label from "../../components/label/label";
import OptionCard from "../../components/option-card/option-card";
import { CHECKOUT_SHIPPING_ADDRESS_UPDATE } from "../../graphql/mutation/checkout";
import {
  ADDRESS_CREATE,
  ADDRESS_DELETE,
  ADDRESS_UPDATE,
} from "../../graphql/mutation/address";
import { scrollToRef } from "../../utils/utils";
import { defaultTheme } from "../../site-settings/site-theme/default";

type Props = {
  authenticatedFlow: boolean;
  addresses: any[];
  enabled: boolean;
  showAddressForm: boolean;
  focus: boolean;
  checkoutId: string;
  selectedShippingAddressId: string;
  dispatch: Dispatch<{ type: string; payload?: any }>;
};

const ShippingAddressStep: React.FC<Props> = ({
  authenticatedFlow,
  addresses,
  enabled,
  showAddressForm,
  focus,
  checkoutId,
  selectedShippingAddressId,
  dispatch,
}: Props) => {
  const { addToast } = useToasts();

  const [currentShippingAddress, setCurrentShippingAddress] = useState<
    any | undefined
  >();
  // Refs
  const stepRef = useRef(null);
  const [
    checkoutShippingAddressUpdateMutation,
    { loading: updatingShippingAddress },
  ] = useMutation(CHECKOUT_SHIPPING_ADDRESS_UPDATE);
  const [
    accountAddressCreateMutation,
    { loading: addingShippingAddressToUser },
  ] = useMutation(ADDRESS_CREATE);
  const [
    accountAddressUpdateMutation,
    { loading: updatingShippingAddressToUser },
  ] = useMutation(ADDRESS_UPDATE);
  const [
    accountAddressDeleteMutation,
    { loading: deletingShippingAddressToUser },
  ] = useMutation(ADDRESS_DELETE);

  // const scrollToShipping = React.useCallback(
  //   () => scrollToRef(stepRef, deviceType),
  //   [stepRef]
  // );

  const updateShippingAddressCheckout = async (
    shippingAddressInput,
    checkoutId
  ) => {
    let selectedId;
    const shippingAddress = { ...shippingAddressInput };
    if (shippingAddress.id) {
      selectedId = shippingAddress.id;
      delete shippingAddress.id;
    }

    if (shippingAddress.__typename !== undefined) {
      delete shippingAddress.__typename;
    }

    if (shippingAddress.isDefaultShippingAddress !== undefined) {
      delete shippingAddress.isDefaultShippingAddress;
    }

    if (shippingAddress.isDefaultBillingAddress !== undefined) {
      delete shippingAddress.isDefaultBillingAddress;
    }

    if (typeof shippingAddress.country === "object") {
      shippingAddress.country = shippingAddress.country.code;
    }

    const {
      data: { checkoutShippingAddressUpdate },
    } = await checkoutShippingAddressUpdateMutation({
      variables: { checkoutId: checkoutId, shippingAddress },
    });

    if (checkoutShippingAddressUpdate.checkoutErrors.length) {
      throw checkoutShippingAddressUpdate.checkoutErrors;
      // const message = checkoutShippingAddressUpdate.checkoutErrors[0].message;
      // addToast(message, {
      //   appearance: 'error',
      //   autoDismiss: true,
      // });
    } else {
      const checkout = checkoutShippingAddressUpdate.checkout;
      dispatch({
        type: "UPDATE_SHIPPING_ADDRESS",
        payload: {
          checkout,
          selectedShippingAddressId: authenticatedFlow
            ? selectedId
            : checkout.shippingAddress.id,
        },
      });
    }
  };
  const userAddShippingAddress = React.useCallback(async (shippingAddress) => {
    const {
      data: { accountAddressCreate },
    } = await accountAddressCreateMutation({
      variables: {
        input: shippingAddress,
        type: "SHIPPING",
      },
    });

    if (accountAddressCreate.accountErrors.length) {
      throw accountAddressCreate.accountErrors;
    }

    dispatch({
      type: "ADD_USER_SHIPPING_ADDRESS",
      payload: {
        address: accountAddressCreate.address,
      },
    });

    return accountAddressCreate.address;
  }, []);

  const userUpdateShippingAddress = React.useCallback(
    async (id, shippingAddress) => {
      const {
        data: { accountAddressUpdate },
      } = await accountAddressUpdateMutation({
        variables: {
          id,
          input: shippingAddress,
        },
      });

      if (accountAddressUpdate.accountErrors.length) {
        throw accountAddressUpdate.accountErrors;
      }

      dispatch({
        type: "EDIT_USER_SHIPPING_ADDRESS",
        payload: {
          address: accountAddressUpdate.address,
        },
      });
    },
    []
  );

  const userDeleteShippingAddress = React.useCallback(async (id) => {
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
      type: "REMOVE_USER_SHIPPING_ADDRESS",
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
          if (currentShippingAddress) {
            await userUpdateShippingAddress(currentShippingAddress.id, values);
            if (currentShippingAddress.id === selectedShippingAddressId) {
              await updateShippingAddressCheckout(
                { id: currentShippingAddress.id, ...values },
                checkoutId
              );
            }
          } else {
            const address = await userAddShippingAddress(values);
            if (addresses.length === 0) {
              await updateShippingAddressCheckout(
                { id: address.id, ...values },
                checkoutId
              );
            }
          }
        } else {
          await updateShippingAddressCheckout(values, checkoutId);
        }
      } catch (error) {
        console.error(error);
        if (Array.isArray(error)) {
          const errors = {};
          error.forEach((err) => {
            errors[err.field] = err.message;
          });
          setErrors(errors);
        }
      }
      // scrollToShipping();
    },
    [currentShippingAddress, addresses, checkoutId]
  );

  const handleAddShippingAddress = () => {
    setCurrentShippingAddress(undefined);
    dispatch({ type: "SHOW_SHIPPING_ADDRESS_FORM" });
  };

  const handleEditShippingAddress = (event: SyntheticEvent, address) => {
    setCurrentShippingAddress(address);
    dispatch({ type: "SHOW_SHIPPING_ADDRESS_FORM" });
  };

  const handleRemoveShippingAddress = async (
    event: SyntheticEvent,
    addressId
  ) => {
    try {
      if (authenticatedFlow) {
        await userDeleteShippingAddress(addressId);
      }
      dispatch({
        type: "REMOVE_SHIPPING_ADDRESS",
        payload: { shippingAddressId: addressId },
      });
      setCurrentShippingAddress(undefined);
    } catch (error) {
      console.error(error);
    }
  };

  const handleCancelShippingAddress = () => {
    dispatch({ type: "HIDE_SHIPPING_ADDRESS_FORM" });
    // scrollToShipping();
  };

  const handleSelectShippingAddressOption = async (values) => {
    await updateShippingAddressCheckout(values, checkoutId);
    // scrollToShipping();
  };

  return (
    <StepBox
      className="checkoutStep"
      stepNumber={1}
      title="Shipping Address"
      disabled={!enabled}
      action={
        authenticatedFlow && !showAddressForm ? "+Add address" : undefined
      }
      onAction={handleAddShippingAddress}
      success={!!selectedShippingAddressId}
      ref={stepRef}
    >
      {showAddressForm ? (
        <>
          <Label
            text="You can choose FREE pickup at the store in the next step"
            fontSize={14}
            fontWeight={500}
            iconName="pickup"
            color={defaultTheme.colors.yellow}
            className="checkoutLabel"
          ></Label>
          <AddressForm
            initialValues={currentShippingAddress}
            onSubmit={handleSubmitForm}
            onCancel={
              !!currentShippingAddress ||
              (authenticatedFlow && addresses.length)
                ? handleCancelShippingAddress
                : undefined
            }
            focus={focus}
            loadingState={
              updatingShippingAddress ||
              updatingShippingAddressToUser ||
              addingShippingAddressToUser
            }
            mode="shippingAddress"
          />
        </>
      ) : (
        <StepContentWrapper>
          {/* {JSON.stringify(addresses)} */}
          {enabled &&
            addresses.map((address) => (
              <OptionCard
                key={address.id}
                title={address.streetAddress1}
                subtitle={`${address.city}, ${address.countryArea}, ${address.postalCode}, ${address.country?.country}`}
                editAction={
                  !authenticatedFlow
                    ? (event) => handleEditShippingAddress(event, address)
                    : undefined
                }
                removeAction={
                  !authenticatedFlow
                    ? (event) => handleRemoveShippingAddress(event, address.id)
                    : undefined
                }
                confirmed={address.id === selectedShippingAddressId}
                onClick={() => {
                  authenticatedFlow &&
                    address.id !== selectedShippingAddressId &&
                    handleSelectShippingAddressOption(address);
                }}
              />
            ))}
        </StepContentWrapper>
      )}
    </StepBox>
  );
};

export default ShippingAddressStep;
