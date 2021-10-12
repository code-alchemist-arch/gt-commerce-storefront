import React from "react";
import { confirmAlert } from "react-confirm-alert";
import {
  ConfirmAlertWrapper,
  AlertTitle,
  AlertMessage,
  AlertButton,
  AlertActions,
} from "./confirm-alert.style";

type ButtonItem = {
  label: string;
  primary?: boolean;
  onClick(): void;
};

type ConfirmAlert = {
  title: string;
  message: string;
  buttons: ButtonItem[];
};

const defaultOptions = {
  title: "Confirm to submit",
  message: "Are you sure to do this.",
  buttons: [
    {
      label: "No",
      onClick: () => alert("Click No"),
    },
    {
      label: "Yes",
      primary: true,
      onClick: () => alert("Click Yes"),
    },
  ],
};

const ConfirmAlert = (options: ConfirmAlert) => {
  const { title, message, buttons } = { ...defaultOptions, ...options };
  confirmAlert({
    title,
    message,
    buttons,
    // eslint-disable-next-line react/display-name
    customUI: ({ onClose }) => {
      return (
        <ConfirmAlertWrapper>
          <AlertTitle>{title}</AlertTitle>
          <AlertMessage>{message}</AlertMessage>
          <AlertActions>
            {buttons.map((btn, index) => (
              <AlertButton
                key={`modal_btn_${index}`}
                className={btn.primary ? "primary" : ""}
                onClick={() => {
                  onClose();
                  btn.onClick();
                }}
              >
                {btn.label}
              </AlertButton>
            ))}
          </AlertActions>
        </ConfirmAlertWrapper>
      );
    },
  });
};

export default ConfirmAlert;
