import React, { Dispatch } from "react";
import { useMutation } from "@apollo/client";
import { CHECKOUT_SHIPPING_METHOD_UPDATE } from "../../graphql/mutation/checkout";
import StepBox from "components/step-box/step-box";
import { StepContentWrapper } from "./checkout.style";
import OptionCard from "../../components/option-card/option-card";
import PickUpIcon from "../../assets/icons/PickUpIcon";
import ShippingIcon from "../../assets/icons/ShippingIcon";

type Props = {
  enabled: boolean;
  shippingAddress: any;
  shippingMethod: string;
  checkoutId: string;
  shippingMethodsAvailable: any[];
  dispatch: Dispatch<{ type: string; payload?: any }>;
};

const ShippingMethodStep: React.FC<Props> = ({
  enabled,
  shippingAddress,
  shippingMethod,
  checkoutId,
  shippingMethodsAvailable,
  dispatch,
}: Props) => {
  const [checkoutShippingMethodUpdateMutation] = useMutation(
    CHECKOUT_SHIPPING_METHOD_UPDATE
  );

  const updateShippingMethodCheckout = async (checkoutId, shippingMethodId) => {
    try {
      const {
        data: { checkoutShippingMethodUpdate },
        errors,
      } = await checkoutShippingMethodUpdateMutation({
        variables: { checkoutId, shippingMethodId },
      });

      const { checkout } = checkoutShippingMethodUpdate;
      dispatch({
        type: "UPDATE_SHIPPING_METHOD",
        payload: { checkout, selectedShippingMethod: shippingMethodId },
      });
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmitShippingMethod = React.useCallback(
    (methodId) => {
      console.log(methodId);
      if (methodId !== shippingMethod) {
        updateShippingMethodCheckout(checkoutId, methodId);
      }
    },
    [checkoutId, shippingMethod]
  );

  return (
    <StepBox
      className="checkoutStep"
      stepNumber={2}
      title="Shipping method"
      subtitle={enabled ? "Select your desired shipping method" : undefined}
      disabled={!enabled}
      success={!!shippingMethod}
    >
      {!!enabled && (
        <StepContentWrapper>
          {shippingMethodsAvailable.map((sm) => {
            if (sm.name === "Free Local Pickup") {
              return (
                <OptionCard
                  key={sm.id}
                  title={`${sm.name} (Inglewood)`}
                  subtitle="1543 17th Avenue SE Calgary AB"
                  price={sm.price === 0 ? "Free" : sm.price}
                  leftIcon={<PickUpIcon />}
                  confirmed={shippingMethod === sm.id}
                  onClick={() => handleSubmitShippingMethod(sm.id)}
                />
              );
            } else {
              return (
                <OptionCard
                  key={sm.id}
                  title={`Shipping (${sm.name})`}
                  subtitle={`${shippingAddress.city}, ${shippingAddress.countryArea}, ${shippingAddress.postalCode}, ${shippingAddress.country?.country}`}
                  text={sm.description}
                  confirmed={shippingMethod === sm.id}
                  price={`$ ${sm.price}`}
                  leftIcon={<ShippingIcon />}
                  onClick={() => handleSubmitShippingMethod(sm.id)}
                />
              );
            }
          })}
        </StepContentWrapper>
      )}
    </StepBox>
  );
};

export default ShippingMethodStep;
