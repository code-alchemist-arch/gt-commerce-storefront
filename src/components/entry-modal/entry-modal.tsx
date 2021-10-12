import React, { useState } from "react";
import Image from "next/image";
import {
  Modal,
  ModalCloseBtn,
  ModalColumn,
  ModalContent,
  ModalHeader,
  ModalText,
  Newsletter,
} from "./entry-modal.style";
import {
  InputWrapper,
  NewsletterError,
  NewsletterInputs,
  NewsletterThankyou,
} from "../../layouts/footer/footer.style";
import Input from "../input/input";
import { Button } from "../button/button";
import { validateEmail } from "../../utils/utils";
import { CenterModal, ModalCloseTarget } from "react-spring-modal";
import { defaultTheme } from "../../site-settings/site-theme/default";
import { getLocalState, setLocalState } from "../../utils/localStorage";
import CloseIcon from "../../assets/icons/CloseIcon";

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

const EntryModal: React.FC<ModalInterface> = ({ data }) => {
  const [isOpen, setOpen] = useState(true);
  const [email, setEmail] = useState("");
  const [subscribeEnabled, setSubscribeEnabled] = useState(false);
  const [error, setError] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleEmailChange = (value) => {
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

  data.show_on_each_visit;

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
    return <></>;
  }

  return (
    <CenterModal
      isOpen={isOpen}
      onDismiss={() => closeModal()}
      contentProps={{ style: staticModalStyles }}
    >
      <Modal>
        <ModalColumn>
          {data.image?.url && <Image src={data.image?.url} layout="fill" />}
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
                  <Button
                    disabled={!subscribeEnabled}
                    type="submit"
                    style={{
                      marginTop: 15,
                      backgroundColor: defaultTheme.primary.color,
                    }}
                  >
                    Subscribe
                  </Button>
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

export default EntryModal;
