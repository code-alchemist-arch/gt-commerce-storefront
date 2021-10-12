import React, { useContext, useState } from "react";
import { ProfileContext } from "contexts/profile/profile.context";
import { AddressWrapper, TitleSection } from "./addresses.style";
import { useMutation } from "@apollo/client";
import { useToasts } from "react-toast-notifications";

import {
  ADDRESS_CREATE,
  ADDRESS_DELETE,
  ADDRESS_SET_DEFAULT,
  ADDRESS_UPDATE,
} from "graphql/mutation/address";
import Label from "../../../components/label/label";
import { defaultTheme } from "../../../site-settings/site-theme/default";
import OptionCard from "../../../components/option-card/option-card";
import EmptyState from "../../../components/empty-state/empty-state";
import ConfirmAlert from "../../../components/confirm-alert/confirm-alert";
import AddressForm from "../../checkout/address-form";

type Props = { deviceType: any };

const Addresses: React.FC<Props> = ({ deviceType }: Props) => {
  const {
    state: { email, addresses },
    dispatch,
  } = useContext(ProfileContext);
  const { addToast } = useToasts();

  const [showAddressForm, setShowAddressForm] = useState(false);
  const [currentAddress, setCurrentAddress] = useState(null);

  const [
    accountAddressCreateMutation,
    { loading: addingAddressToUser },
  ] = useMutation(ADDRESS_CREATE);
  const [
    accountAddressUpdateMutation,
    { loading: updatingAddressToUser },
  ] = useMutation(ADDRESS_UPDATE);
  const [
    accountSetDefaultAddressMutation,
    { loading: updatingDefaultAddressToUser },
  ] = useMutation(ADDRESS_SET_DEFAULT);

  const [accountAddressDeleteMutation] = useMutation(ADDRESS_DELETE);

  const userAddAddress = React.useCallback(async (address) => {
    const {
      data: { accountAddressCreate },
    } = await accountAddressCreateMutation({
      variables: {
        input: address,
        // type: 'SHIPPING',
      },
    });

    if (accountAddressCreate.accountErrors.length) {
      throw accountAddressCreate.accountErrors;
    }

    return accountAddressCreate;
  }, []);

  const userUpdateAddress = React.useCallback(async (id, address) => {
    const {
      data: { accountAddressUpdate },
    } = await accountAddressUpdateMutation({
      variables: {
        id,
        input: address,
      },
    });

    if (accountAddressUpdate.accountErrors.length) {
      throw accountAddressUpdate.accountErrors;
    }

    return accountAddressUpdate;
  }, []);

  const userDeleteAddress = React.useCallback(async (id) => {
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

    return accountAddressDelete.address;
  }, []);

  const userSetDefaultAddress = React.useCallback(
    async (id, type: "SHIPPING" | "BILLING") => {
      const {
        data: { accountSetDefaultAddress },
      } = await accountSetDefaultAddressMutation({
        variables: {
          id,
          type,
        },
      });

      if (accountSetDefaultAddress.accountErrors.length) {
        throw accountSetDefaultAddress.accountErrors;
      }

      return accountSetDefaultAddress.user.addresses;
    },
    []
  );

  const handleAddAddresClick = (addresId) => {
    setCurrentAddress(undefined);
    setShowAddressForm(true);
    console.log(addresId);
  };

  const handleEditAddressClick = (addresId) => {
    const editAddress = addresses.find((addr) => addr.id === addresId);
    setCurrentAddress(editAddress);
    setShowAddressForm(true);
    console.log(addresId);
  };

  const handleRemoveAddressClick = (addresId) => {
    ConfirmAlert({
      title: "Are you sure?",
      message: "Address will be deleted permanently.",
      buttons: [
        {
          label: "Cancel",
          onClick: () => {
            console.log("cancel click");
          },
        },
        {
          label: "Yes",
          primary: true,
          onClick: () => removeConfirmed(addresId),
        },
      ],
    });
  };

  const handleSetAsDefaultShippingAddressClick = async (addresId) => {
    try {
      const addresses = await userSetDefaultAddress(addresId, "SHIPPING");
      dispatch({ type: "UPDATE_ALL_ADDRESSES", payload: { addresses } });
      addToast("Your address was updated successfully.", {
        appearance: "success",
        autoDismiss: true,
      });
    } catch (error) {
      addToast("There was an error trying to remove address.", {
        appearance: "error",
        autoDismiss: true,
      });
    }
  };

  const handleSetAsDefaultBillingAddressClick = async (addresId) => {
    try {
      const addresses = await userSetDefaultAddress(addresId, "BILLING");
      dispatch({ type: "UPDATE_ALL_ADDRESSES", payload: { addresses } });
      addToast("Your address was updated successfully.", {
        appearance: "success",
        autoDismiss: true,
      });
    } catch (error) {
      addToast("There was an error trying to remove address.", {
        appearance: "error",
        autoDismiss: true,
      });
    }
  };

  const handleCancelForm = () => {
    setShowAddressForm(false);
    window.scrollTo(0, 0);
  };

  const removeConfirmed = React.useCallback(async (addressId) => {
    try {
      const address = await userDeleteAddress(addressId);
      dispatch({ type: "DELETE_ADDRESS", payload: { address } });
      addToast("Your address was removed successfully.", {
        appearance: "success",
        autoDismiss: true,
      });
    } catch (error) {
      addToast("There was an error trying to remove address.", {
        appearance: "error",
        autoDismiss: true,
      });
    }
  }, []);

  const handleSubmitForm = React.useCallback(
    async (values, { setErrors }) => {
      const isDefaultShippingAddress = values.isDefaultShippingAddress;
      const isDefaultBillingAddress = values.isDefaultBillingAddress;
      delete values.isDefaultShippingAddress;
      delete values.isDefaultBillingAddress;
      try {
        let addresses;
        let address;
        if (currentAddress) {
          const data = await userUpdateAddress(currentAddress?.id, values);
          address = data.address;
          addresses = data.user.addresses;
        } else {
          const data = await userAddAddress(values);
          address = data.address;
          addresses = data.user.addresses;
        }
        if (isDefaultShippingAddress) {
          addresses = await userSetDefaultAddress(address.id, "SHIPPING");
        }
        if (isDefaultBillingAddress) {
          addresses = await userSetDefaultAddress(address.id, "BILLING");
        }

        const message = currentAddress
          ? "Your address was updated successfully."
          : "Your address was added successfully.";

        dispatch({ type: "UPDATE_ALL_ADDRESSES", payload: { addresses } });
        setShowAddressForm(false);
        addToast(message, {
          appearance: "success",
          autoDismiss: true,
        });
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
      window.scrollTo(0, 0);
    },
    [currentAddress]
  );

  return (
    <AddressWrapper>
      <TitleSection>
        <Label
          iconName="newsletter"
          text="My Addresses"
          fontSize={16}
          fontWeight={500}
          iconColor={defaultTheme.secondary.color}
        />
        {!showAddressForm && (
          <span className="title-action" onClick={handleAddAddresClick}>
            + Add Address
          </span>
        )}
      </TitleSection>

      {showAddressForm ? (
        <>
          <AddressForm
            onSubmit={handleSubmitForm}
            columns={deviceType.mobile ? "one" : "two"}
            onCancel={handleCancelForm}
            initialValues={currentAddress}
            loadingState={
              addingAddressToUser ||
              updatingAddressToUser ||
              updatingDefaultAddressToUser
            }
            setDefaultUsage
          />
        </>
      ) : addresses.length === 0 ? (
        <EmptyState
          title="You haven't added any addresses yet"
          message="When you do, they will appear here."
          imgSrc="/images/empty-address.png"
        />
      ) : (
        addresses.map((addr) => {
          const tags = [];
          const customActions = [
            {
              name: "Set as default Shipping Address",
              action: () => handleSetAsDefaultShippingAddressClick(addr.id),
            },
            {
              name: "Set as default Billing Address",
              action: () => handleSetAsDefaultBillingAddressClick(addr.id),
            },
          ];
          if (addr.isDefaultShippingAddress) {
            tags.push("Shipping");
            delete customActions[0];
          }
          if (addr.isDefaultBillingAddress) {
            tags.push("Billing");
            delete customActions[1];
          }
          return (
            <OptionCard
              key={addr.id}
              title={`${addr.firstName} ${addr.lastName} - ${addr.streetAddress1}`}
              subtitle={`${addr.city}, ${addr.countryArea}, ${addr.postalCode}, ${addr.country?.country}`}
              tags={tags}
              editAction={() => handleEditAddressClick(addr.id)}
              removeAction={() => handleRemoveAddressClick(addr.id)}
              customActions={customActions}
              inactive
            />
          );
        })
      )}
    </AddressWrapper>
  );
};

export default Addresses;
