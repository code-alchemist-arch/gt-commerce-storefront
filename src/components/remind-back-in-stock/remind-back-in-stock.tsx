import React, { useState } from "react";
import { FormattedMessage } from "react-intl";
import CheckCircleIcon from "../../assets/icons/CheckCircleIcon";
import { defaultTheme } from "../../site-settings/site-theme/default";
import { validateEmail } from "../../utils/utils";
import { Button } from "../button/button";
import Input from "../input/input";
import {
  RemindContainer,
  RemindInputs,
  RemindLink,
  RemindThankYou,
} from "./remind-back-in-stock.style";

type Props = {
  email?: string;
};

const RemindBackInStock: React.FC<Props> = ({ email }: Props) => {
  const [sent, setSent] = useState(false);
  const [clicked, setClicked] = useState(false);
  const [number, setEmail] = useState(email);
  const [name, setName] = useState("");
  const [submitEnabled, setSubmitEnabled] = useState(false);

  const handleLinkClick = () => {
    if (email) {
      handleSubmit();
    } else {
      setClicked(true);
    }
  };

  const handleNumberChange = (value) => {
    setEmail(value);
    setSubmitEnabled(validateEmail(value));
  };

  const handleSubmit = async (event?) => {
    if (event) {
      event.preventDefault();
    }
    //TODO: send the request
    setSent(true);
  };

  return (
    <RemindContainer>
      {sent && (
        <RemindThankYou>
          <CheckCircleIcon color={defaultTheme.colors.green} />
          <FormattedMessage
            id="notifyWhenBackInStock"
            defaultMessage="You’ll be notified as soon as this item is back in stock"
          />
        </RemindThankYou>
      )}
      {!sent && !clicked && (
        <Button onClick={handleLinkClick} style={{ width: "100%" }}>
          Notify when back in stock
        </Button>
      )}
      {!sent && clicked && !email && (
        <RemindInputs onSubmit={handleSubmit}>
          <Input
            onUpdate={(value) => setName(value)}
            placeholder="Enter your name"
            value={name}
          />
          <Input
            onUpdate={handleNumberChange}
            placeholder="Enter your email"
            value={number}
          />
          <Button title="Submit" type="submit" disabled={!submitEnabled}>
            Submit
          </Button>
        </RemindInputs>
      )}
    </RemindContainer>
  );
};

export default RemindBackInStock;
