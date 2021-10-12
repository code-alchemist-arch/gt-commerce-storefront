import React, { useContext, useState } from "react";
import {
  Button,
  Wrapper,
  Container,
  Heading,
  Anchor,
  TextLabel,
  FormInput,
  PasswordToggleButton,
  ErrorMessageComponent,
  ErrorBox,
  BackToLoginMessage,
} from "./signinout-form";
import { FormattedMessage } from "react-intl";
import Link from "next/link";
import HeadShake from "react-reveal/HeadShake";

import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useMutation } from "@apollo/client";
import { SET_PASSWORD } from "graphql/mutation/user";
import { useRouter } from "next/router";
import PasswordIcon from "../../assets/icons/PasswordIcon";
import ArrowRightIcon from "../../assets/icons/ArrowRightIcon";
import ErrorCircleIcon from "../../assets/icons/ErrorCircleIcon";
import HideEyeIcon from "../../assets/icons/HideEyeIcon";
import ShowEyeIcon from "../../assets/icons/ShowEyeIcon";

const ResetPasswordConfirm = () => {
  const router = useRouter();
  const [passwordChanged, setPasswordChanged] = useState(null);

  const [showPassword, setShowPassword] = useState(false);

  const [
    setPassword,
    { loading: mutationLoading, error: mutationError },
  ] = useMutation(SET_PASSWORD);
  const resetPasswordCallback = async (values) => {
    const { email, token } = router.query;
    if (!mutationLoading) {
      const { data } = await setPassword({
        variables: { password: values.password, email, token },
      });

      const { accountErrors } = data.setPassword;

      if (accountErrors.length === 0) {
        setPasswordChanged(true);
      } else {
        setPasswordChanged(false);
      }
    }
  };

  const ResetPasswordSchema = Yup.object().shape({
    password: Yup.string()
      .min(6, "Must contain more than 6 characters.")
      // .matches(/[a-z]/, 'at least one lowercase char')
      // .matches(/[A-Z]/, 'at least one uppercase char')
      // .matches(/[0-9]/, 'at least one number')
      .required("Required"),
  });

  if (passwordChanged !== null) {
    return (
      <Wrapper>
        <Container>
          <Heading>
            {passwordChanged ? (
              <FormattedMessage id="passwordReset" defaultMessage="Perfect!" />
            ) : (
              <FormattedMessage
                id="passwordResetFailed"
                defaultMessage="Oops! Something went wrong!"
              />
            )}
          </Heading>

          {passwordChanged ? (
            <TextLabel>{`You can now login with your credentials`}</TextLabel>
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
                className={
                  errors.password && touched.password ? "hasErrors" : ""
                }
              >
                <PasswordIcon />
                <FormattedMessage
                  id="passwordPlaceholder"
                  defaultMessage="Password (min 6 characters)"
                >
                  {(placeholder) => (
                    <Field
                      name="password"
                      type={showPassword ? "" : "password"}
                      placeholder={placeholder}
                    />
                  )}
                </FormattedMessage>
                <PasswordToggleButton
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <HideEyeIcon height={25} width={25} />
                  ) : (
                    <ShowEyeIcon height={25} width={25} />
                  )}
                </PasswordToggleButton>
              </FormInput>

              <ErrorBox style={{ minHeight: 40 }}>
                <ErrorMessage
                  name="password"
                  render={(msg) => (
                    <HeadShake>
                      <ErrorMessageComponent>
                        <ErrorCircleIcon />
                        <TextLabel>Password: {msg}</TextLabel>
                      </ErrorMessageComponent>
                    </HeadShake>
                  )}
                />
              </ErrorBox>

              <Button type="submit">
                {!mutationLoading ? (
                  <FormattedMessage
                    id="confirmPasswordBtnText"
                    defaultMessage="Confirm Password"
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

export default ResetPasswordConfirm;
