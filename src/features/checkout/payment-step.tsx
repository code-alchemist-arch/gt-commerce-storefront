import StepBox from "components/step-box/step-box";
import React, { Dispatch, useState, useRef } from "react";
import { PaymentCardList } from "../../components/payment-group/payment-group.style";
import Carousel from "../../components/carousel/carousel";
import SquarePaymentForm from "./square-payment";
import PaymentCard from "../../components/payment-card/payment-card";
import { useMutation } from "@apollo/client";
import { DELETE_PAYMENT } from "../../graphql/mutation/user";
import ConfirmAlert from "../../components/confirm-alert/confirm-alert";

const responsive = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 1440 },
    items: 4,
    slidesToSlide: 4,
  },
  desktop: {
    breakpoint: { max: 1440, min: 1240 },
    items: 4,
    slidesToSlide: 4,
  },
  tablet: {
    breakpoint: { max: 1240, min: 768 },
    items: 4,
    slidesToSlide: 4,
  },
  minitablet: {
    breakpoint: { max: 768, min: 464 },
    items: 3,
    slidesToSlide: 3,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 2,
    slidesToSlide: 2,
    // partialVisibilityGutter: 40,
  },
};

type Props = {
  enabled: boolean;
  paymentInformation?: any;
  dispatch: Dispatch<{ type: string; payload?: any }>;
  totalPrice: number;
  paymentMethods: any[];
  authenticatedFlow?: boolean;
  savedPaymentCardSelected: boolean;
};

interface FormData {
  name: string;
  number: number;
  expiry: string;
  cvc: string;
}

const PaymentStep: React.FC<Props> = ({
  enabled,
  paymentInformation,
  dispatch,
  totalPrice,
  paymentMethods,
  authenticatedFlow,
  savedPaymentCardSelected,
}: Props) => {
  const [cvc, setCVC] = useState("");
  const [name, setName] = useState("");
  const [expiry, setExpiry] = useState("");
  const [number, setNumber] = useState("");
  const cardSave = useRef(false);
  const [token, setToken] = useState("");
  const [focused, setFocused] = useState("");
  const [formData, setFormData] = useState<FormData | {}>({});
  const [deletePaymentMutation, { loading }] = useMutation(DELETE_PAYMENT);

  React.useEffect(() => {
    if (paymentInformation) {
      const { name, number, month, year, cvc } = paymentInformation;
      setFormData({
        name,
        number,
        expiry: `${month}/${year}`,
        cvc,
      });
    }
  }, [paymentInformation]);

  const handleDataChange = (key, value) => {
    switch (key) {
      case "number":
        setNumber(value);
        setFocused("number");
        break;
      case "name":
        setName(value);
        setFocused("name");
        break;
      case "expiry":
        setExpiry(value);
        setFocused("expiry");
        break;
      case "cvc":
        setCVC(value);
        setFocused("cvc");
        break;
      case "token":
        setToken(value);
        break;
      case "saveCard":
        cardSave.current = value;
        break;
      default:
        break;
    }
  };

  const handleOnChange = async (data) => {
    const { complete, error } = data;
    // console.log(data);
    if (!complete) {
      dispatch({
        type: "CLEAR_PAYMENT_INFORMATION",
      });
    } else {
      const token = cardSave.current ? `${data.token},,,save` : data.token;
      dispatch({
        type: "SET_PAYMENT_INFORMATION",
        payload: {
          token: token,
        },
      });
    }
  };

  React.useEffect(() => {
    if (cvc.length === 3 && name && expiry && number.length === 16) {
      // console.log({ cvc, name, expiry, number });
      const expiryDate = expiry.split("/");
      dispatch({
        type: "SET_PAYMENT_INFORMATION",
        payload: {
          number,
          name,
          month: expiryDate[0],
          year: expiryDate[1],
          cvc,
        },
      });
    }
  }, [cvc, name, expiry, number]);

  const handleChange = (card) => {
    if (savedPaymentCardSelected) {
      handleOnChange({ complete: false, token: undefined });
      dispatch({ type: "CLEAR_SAVED_PAYMENT_CARD_SELECTED" });
    } else {
      handleOnChange({ complete: true, token: card.id });
      dispatch({ type: "SET_SAVED_PAYMENT_CARD_SELECTED" });
    }
  };

  const handleDeleteCardClick = (card) => {
    ConfirmAlert({
      title: "Are you sure?",
      message: "Card information will be deleted permanently.",
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
          onClick: () => handleDelete(card),
        },
      ],
    });
  };

  const handleDelete = async (card) => {
    try {
      await deletePaymentMutation({
        variables: {
          savedPaymentInput: {
            cardKey: card.lastFourDigit,
          },
        },
      });
      dispatch({ type: "DELETE_CARD", payload: card.lastFourDigit });
      dispatch({ type: "CLEAR_SAVED_PAYMENT_CARD_SELECTED" });
    } catch (err) {
      console.error(err);
    }
  };

  const paymentMethodsElements = paymentMethods?.map((item) => (
    <PaymentCard
      key={item.id}
      onChange={() => handleChange(item)}
      onDelete={() => handleDeleteCardClick(item)}
      active={!!savedPaymentCardSelected}
      {...item}
    />
  ));

  return (
    <StepBox
      className="checkoutStep"
      stepNumber={4}
      title="Payment options"
      disabled={!enabled}
      success={!!paymentInformation}
    >
      <>
        {enabled &&
          paymentMethodsElements &&
          paymentMethodsElements.length > 0 && (
            <PaymentCardList>
              <Carousel
                autoPlay={false}
                infinite={false}
                responsive={responsive}
                data={paymentMethodsElements}
              />
            </PaymentCardList>
          )}
        <SquarePaymentForm
          visible={!savedPaymentCardSelected}
          handleOnChange={handleOnChange}
          handleDataChange={handleDataChange}
          totalPrice={totalPrice}
          hidden={!enabled}
          showSaveCardInfo={authenticatedFlow}
        />
      </>
    </StepBox>
  );
};

export default PaymentStep;
