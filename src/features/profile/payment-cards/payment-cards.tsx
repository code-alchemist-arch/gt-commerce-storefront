import { useMutation } from "@apollo/client";
import React, { useContext, useState } from "react";
import ConfirmAlert from "../../../components/confirm-alert/confirm-alert";
import PaymentCard from "../../../components/payment-card/payment-card";
import { PaymentCardList } from "../../../components/payment-group/payment-group.style";
import { ProfileContext } from "../../../contexts/profile/profile.context";
import { DELETE_PAYMENT } from "../../../graphql/mutation/user";
import Carousel from "components/carousel/carousel";
import { PaymentCardsWrapper } from "./payment-cards.style";
import EmptyState from "../../../components/empty-state/empty-state";

const responsive = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 1440 },
    items: 5,
    slidesToSlide: 5,
  },
  desktop: {
    breakpoint: { max: 1440, min: 1240 },
    items: 4,
    slidesToSlide: 4,
  },
  tablet: {
    breakpoint: { max: 1240, min: 768 },
    items: 3,
    slidesToSlide: 3,
  },
  minitablet: {
    breakpoint: { max: 768, min: 464 },
    items: 2,
    slidesToSlide: 2,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
    slidesToSlide: 1,
    // partialVisibilityGutter: 40,
  },
};

type Props = {};

const PaymentCards: React.FC<Props> = ({}: Props) => {
  const { state, dispatch } = useContext(ProfileContext);
  const [deletePaymentMutation, { loading }] = useMutation(DELETE_PAYMENT);

  const paymentMethods = state.paymentMethods;

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
      onDelete={() => handleDeleteCardClick(item)}
      {...item}
    />
  ));

  return (
    <PaymentCardsWrapper>
      {paymentMethods?.length > 0 ? (
        <PaymentCardList>
          <Carousel
            autoPlay={false}
            infinite={false}
            responsive={responsive}
            data={paymentMethodsElements}
          />
          <div style={{ marginTop: 15, marginLeft: 10 }}>
            To add a card on file, you must checkout and select "Save my card
            for later"
          </div>
        </PaymentCardList>
      ) : (
        <EmptyState
          title="You haven't added any cards yet"
          message='To add a card on file, you must checkout and select "Save my card for later"'
          imgSrc="/images/empty-orders.png"
        />
      )}
    </PaymentCardsWrapper>
  );
};

export default PaymentCards;
