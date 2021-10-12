import React, { useContext, useState } from "react";
import {
  Button,
  Wrapper,
  Container,
  Heading,
  Anchor,
  TextLabel,
  FormInput,
  ErrorMessageComponent,
  BackToLoginMessage,
} from "./signinout-form";
import { AuthContext } from "contexts/auth/auth.context";
import { FormattedMessage } from "react-intl";
import Link from "next/link";
import HeadShake from "react-reveal/HeadShake";

import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useMutation } from "@apollo/client";
import { REQUEST_PASSWORD_RESET } from "graphql/mutation/user";
import ErrorCircleIcon from "../../assets/icons/ErrorCircleIcon";
import ArrowRightIcon from "../../assets/icons/ArrowRightIcon";
import EmailIcon from "../../assets/icons/EmailIcon";

const ResetPassword = () => {
  const { authDispatch } = useContext<any>(AuthContext);
  const [emailSent, setEmailSent] = useState(null);
  const [userMail, setUserMail] = useState(null);

  const [
    requestPasswordReset,
    { loading: mutationLoading, error: mutationError },
  ] = useMutation(REQUEST_PASSWORD_RESET);
  const resetPasswordCallback = async (values) => {
    if (!mutationLoading) {
      const { data } = await requestPasswordReset({
        variables: { email: values.email },
      });

      const { accountErrors } = data.requestPasswordReset;

      if (accountErrors.length === 0) {
        setEmailSent(true);
      } else {
        setEmailSent(false);
      }
      setUserMail(values.email);
    }
  };

  const ResetPasswordSchema = Yup.object().shape({
    email: Yup.string().required("Required").email("Invalid email."),
  });

  if (userMail) {
    return (
      <Wrapper>
        <Container>
          <Heading>
            {emailSent ? (
              <FormattedMessage
                id="passwordResetSent"
                defaultMessage="Perfect!"
              />
            ) : (
              <FormattedMessage
                id="passwordResetSent"
                defaultMessage="Oops! Something went wrong!"
              />
            )}
          </Heading>

          {emailSent ? (
            <TextLabel>{`We have sent a confirmation email to ${userMail}.`}</TextLabel>
          ) : (
            <TextLabel>{`We cannot reset your password.`}</TextLabel>
          )}
          <BackToLoginMessage>
            <TextLabel>
              <FormattedMessage id="backToLogin" defaultMessage="Back to" />
            </TextLabel>
            <Link href="/account/login" passHref>
              <Anchor>
                <FormattedMessage id="loginBtnText" defaultMessage="Login" />
              </Anchor>
            </Link>
          </BackToLoginMessage>
        </Container>
      </Wrapper>
    );
  }

  return (
    <Wrapper>
      <Container>
        <Heading style={{ marginBottom: 50 }}>
          <FormattedMessage
            id="resetPassword"
            defaultMessage="Reset Password"
          />
        </Heading>

        <Formik
          initialValues={{ email: "" }}
          validationSchema={ResetPasswordSchema}
          onSubmit={resetPasswordCallback}
        >
          {({ errors, touched }) => (
            <Form>
              <FormInput
                className={errors.email && touched.email ? "hasErrors" : ""}
              >
                <EmailIcon />
                <FormattedMessage
                  id="emailAddressPlaceholder"
                  defaultMessage="Email Address."
                >
                  {(placeholder) => (
                    <Field
                      name="email"
                      type="email"
                      placeholder={placeholder}
                    />
                  )}
                </FormattedMessage>
              </FormInput>
              <ErrorMessage
                name="email"
                render={(msg) => (
                  <HeadShake>
                    <ErrorMessageComponent>
                      <ErrorCircleIcon />
                      <TextLabel>Email: {msg}</TextLabel>
                    </ErrorMessageComponent>
                  </HeadShake>
                )}
              />

              <Button type="submit">
                {!mutationLoading ? (
                  <FormattedMessage
                    id="resetPasswordBtnText"
                    defaultMessage="Reset Password"
                  />
                ) : (
                  "Reseting password..."
                )}
                <ArrowRightIcon color={"#FFF"} />
              </Button>
            </Form>
          )}
        </Formik>

        <BackToLoginMessage>
          <TextLabel>
            <FormattedMessage id="backToLogin" defaultMessage="Back to" />
          </TextLabel>
          <Link href="/account/login" passHref>
            <Anchor>
              <FormattedMessage id="loginBtnText" defaultMessage="Login" />
            </Anchor>
          </Link>
        </BackToLoginMessage>
      </Container>
    </Wrapper>
  );
};

export default ResetPassword;
