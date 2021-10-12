import React, { useContext } from "react";
import {
  Wrapper,
  Container,
  Heading,
  SubHeading,
  Input,
  Button,
  Offer,
} from "./signinout-form";
import { FormattedMessage } from "react-intl";
import { AuthContext } from "contexts/auth/auth.context";

import Link from "next/link";

export default function ForgotPassModal() {
  const { authDispatch } = useContext<any>(AuthContext);
  const toggleSignInForm = () => {
    authDispatch({
      type: "SIGNIN",
    });
  };
  return (
    <Wrapper>
      <Container style={{ paddingBottom: 30 }}>
        {/* <LogoWrapper>
          <Image url={PickBazar} />
        </LogoWrapper> */}

        <Heading>
          <FormattedMessage
            id="forgotPassText"
            defaultMessage="Forgot Password"
          />
        </Heading>

        <SubHeading>
          <FormattedMessage
            id="sendResetPassText"
            defaultMessage="We'll send you a link to reset your password"
          />
        </SubHeading>

        <FormattedMessage
          id="emailAddressPlaceholder"
          defaultMessage="Email Address or Contact No."
        >
          {(placeholder) => <Input type="text" />}
        </FormattedMessage>

        <Button title={"Reset Password"} style={{ color: "#fff" }} />
        <Offer style={{ padding: "20px 0 0" }}>
          <FormattedMessage id="backToSign" defaultMessage="Back to" />{" "}
          <Link href="/account/login" passHref>
            <FormattedMessage id="loginBtnText" defaultMessage="Login" />
          </Link>
        </Offer>
      </Container>
    </Wrapper>
  );
}
