import React, { useState } from "react";
import Image from "next/image";
import { CenterModal, ModalCloseTarget } from "react-spring-modal";

import Input from "../../input/input";

import { validateEmail } from "utils/utils";
import { getLocalState, setLocalState } from "utils/localStorage";
import { defaultTheme } from "site-settings/site-theme/default";

import CloseIcon from "assets/icons/CloseIcon";

import {
  Modal,
  ModalCloseBtn,
  ModalColumn,
  ModalContent,
  ModalHeader,
  ModalText,
  Newsletter,
  InputWrapper,
} from "./index.styles";

import {
  NewsletterError,
  NewsletterInputs,
  NewsletterThankyou,
} from "../../../layouts/footer/footer.style";
import { GTButton } from "../base-components/gt-button";

interface ModalInterface {
  data: {
    image: {
      url: string;
    };
    header: string;
    text: string;
    newsletter: boolean;
    image_position: "left" | "right";
    link_url: string;
    link_label: string;
    show_on_each_visit: boolean;
  };
}

export const EntryModalNew: React.FC<ModalInterface> = ({ data }) => {
  const [isOpen, setOpen] = useState(true);
  const [email, setEmail] = useState("");
  const [subscribeEnabled, setSubscribeEnabled] = useState(false);
  const [error, setError] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleEmailChange = (value: string) => {
    setEmail(value);
    setSubscribeEnabled(validateEmail(value));
  };

  const handleSubscribeClick = async (event) => {
    event.preventDefault();
    try {
      const res = await fetch("/api/subscribe", {
        body: JSON.stringify({
          email: email,
        }),
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
      });

      const { error } = await res.json();

      if (error) {
        setError(error);
        return;
      }
      setSubscribed(true);
    } catch (err) {
      console.error(err);
    }
  };

  if (!data) {
    return <></>;
  }

  const modalSeen = getLocalState("modalSeen");

  const staticModalStyles = {
    backgroundColor: defaultTheme.secondary.color,
    width: "auto",
    maxWidth: "100vw",
    padding: 0,
    borderRadius: 0,
    margin: 15,
    position: "relative",
  } as const;

  const closeModal = () => {
    setLocalState("modalSeen", true);
    setOpen(false);
  };

  if (!data.show_on_each_visit && modalSeen) {
    return null;
  }

  return (
    <CenterModal
      isOpen={isOpen}
      onDismiss={() => closeModal()}
      contentProps={{ style: staticModalStyles }}
    >
      <Modal>
        <ModalColumn>
          {data.image?.url ? (
            <Image
              alt="Join our newsletter!"
              src={data.image?.url}
              layout="fill"
            />
          ) : (
            <Image
              alt="Join our newsletter!"
              src="https://via.placeholder.com/360x520.png"
              layout="fill"
            />
          )}
        </ModalColumn>
        <ModalColumn>
          <ModalContent>
            <ModalHeader>{data.header}</ModalHeader>
            <ModalText>{data.text}</ModalText>
            {data.newsletter && (
              <Newsletter onSubmit={(e) => handleSubscribeClick(e)}>
                <NewsletterInputs layout="column">
                  <InputWrapper>
                    <Input
                      onUpdate={handleEmailChange}
                      placeholder="Enter your email address"
                      value={email}
                    />
                    <NewsletterError>{error}</NewsletterError>
                  </InputWrapper>
                  <GTButton
                    disabled={!subscribeEnabled}
                    type="submit"
                    variant="primary"
                    color={defaultTheme.primary.color}
                    backgroundColor="#5C4135"
                    hoverColor="#C7AD9D"
                  >
                    Subscribe
                  </GTButton>
                </NewsletterInputs>
                {subscribed && (
                  <NewsletterThankyou>Thank you!</NewsletterThankyou>
                )}
              </Newsletter>
            )}
          </ModalContent>
        </ModalColumn>
      </Modal>
      <ModalCloseTarget>
        <ModalCloseBtn>
          <CloseIcon />
        </ModalCloseBtn>
      </ModalCloseTarget>
    </CenterModal>
  );
};
