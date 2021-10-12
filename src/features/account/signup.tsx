import React, { useContext, useState } from "react";
import {
  Button,
  Wrapper,
  Container,
  Heading,
  SubHeading,
  Anchor,
  TextLabel,
  ForgotPassword,
  FormInput,
  PasswordToggleButton,
  ErrorMessageComponent,
  InteractiveErrorMessageComponent,
  ErrorBox,
  SignUpMessage,
  BackToLoginMessage,
} from "./signinout-form";
import { AuthContext } from "contexts/auth/auth.context";
import { FormattedMessage } from "react-intl";
import Link from "next/link";
import HeadShake from "react-reveal/HeadShake";

import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useMutation } from "@apollo/client";
import { ACCOUNT_REGISTER } from "graphql/mutation/user";
import AlertIcon from "../../assets/icons/AlertIcon";
import ArrowRightIcon from "../../assets/icons/ArrowRightIcon";
import CheckCircleIcon from "../../assets/icons/CheckCircleIcon";
import EmailIcon from "../../assets/icons/EmailIcon";
import ErrorCircleIcon from "../../assets/icons/ErrorCircleIcon";
import HideEyeIcon from "../../assets/icons/HideEyeIcon";
import PasswordIcon from "../../assets/icons/PasswordIcon";
import ShowEyeIcon from "../../assets/icons/ShowEyeIcon";

const SignUp = () => {
  const { authDispatch } = useContext<any>(AuthContext);
  const [showPassword, setShowPassword] = useState(false);
  const [registeredUser, setRegisteredUser] = useState(null);
  const [serverValidationErrors, setServerValidationErrors] = useState([]);

  const serverErrorCodes = {
    email: {
      UNIQUE: "Email is already registered",
    },
    password: {
      PASSWORD_TOO_SHORT: "password is too short",
    },
  };
  const [
    accountRegister,
    { loading: mutationLoading, error: mutationError },
  ] = useMutation(ACCOUNT_REGISTER);
  const loginCallback = async (values, { setErrors }) => {
    if (!mutationLoading) {
      setServerValidationErrors([]);
      const { data } = await accountRegister({
        variables: { email: values.email, password: values.password },
      });
      const { user, accountErrors } = data.accountRegister;

      if (user) {
        // localStorage.setItem('access_token', `${values.email}.${values.password}`);
        // authDispatch({ type: 'SIGNIN_SUCCESS' });
        setRegisteredUser(user);
      } else {
        const mailFieldError = accountErrors.find(
          (error) => error.field === "email"
        );
        if (mailFieldError) {
          setErrors({ email: serverErrorCodes.email[mailFieldError.code] });
        } else {
          setServerValidationErrors(accountErrors);
        }
      }
    }
  };

  const validationMessages = {
    email: {
      required: "Email is required.",
      invalid: "Invalid email.",
    },
    password: {
      min: "Must contain more than 6 characters.",
      // lowercase: 'At least one lowercase char',
      // uppercase: 'At least one uppercase char',
      // number: 'At least one number',
      required: "Password is required",
    },
  };

  const [passwordErrors, setPasswordErrors] = useState(
    Object.values(validationMessages.password)
  );

  const SignUpSchema = Yup.object().shape({
    email: Yup.string()
      .required(validationMessages.email.required)
      .email(validationMessages.email.invalid),
    password: Yup.string()
      .min(6, validationMessages.password.min)
      // .matches(/[a-z]/, validationMessages.password.lowercase)
      // .matches(/[A-Z]/, validationMessages.password.uppercase)
      // .matches(/[0-9]/, validationMessages.password.number)
      .required(validationMessages.password.required),
  });

  const handlePasswordChange = (event, { setTouched }) => {
    try {
      SignUpSchema.validateSync(
        { password: event.target.value },
        { abortEarly: false }
      );
    } catch (error) {
      const { errors } = error;
      setPasswordErrors(errors);
      setTouched({ password: true });
    }
  };

  if (registeredUser) {
    return (
      <Wrapper>
        <Container>
          <Heading>
            <FormattedMessage
              id="registrationSent"
              defaultMessage="Thank you for signing up!"
            />
          </Heading>

          <TextLabel>{`We have sent a confirmation email to ${registeredUser.email}.`}</TextLabel>
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
        <Heading>
          <FormattedMessage
            id="createAccount"
            defaultMessage="Create Account"
          />
        </Heading>

        <SubHeading>
          <FormattedMessage
            id="signUpText"
            defaultMessage="Please sign up to continue"
          />
        </SubHeading>

        <Formik
          initialValues={{ password: "", email: "" }}
          validationSchema={SignUpSchema}
          onSubmit={loginCallback}
        >
          {({ errors, touched, setTouched }) => (
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
                      <AlertIcon />
                      <TextLabel>{msg}</TextLabel>
                    </ErrorMessageComponent>
                  </HeadShake>
                )}
              />
              <FormInput
                className={
                  errors.password && touched.password ? "hasErrors" : "noMargin"
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
                      onKeyUp={(e) => handlePasswordChange(e, { setTouched })}
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
              <ErrorBox className="with-margin">
                {!!serverValidationErrors &&
                  serverValidationErrors.map(({ field, code }, index) => {
                    if (serverErrorCodes[field][code]) {
                      return (
                        <HeadShake key={index}>
                          <ErrorMessageComponent>
                            <ErrorCircleIcon />
                            <TextLabel>{`${serverErrorCodes[field][code]}`}</TextLabel>
                          </ErrorMessageComponent>
                        </HeadShake>
                      );
                    }
                    return (
                      <HeadShake key={index}>
                        <ErrorMessageComponent>
                          <ErrorCircleIcon />
                          <TextLabel>{`Unexpected Error`}</TextLabel>
                        </ErrorMessageComponent>
                      </HeadShake>
                    );
                  })}

                {Object.values(validationMessages.password)
                  .filter(
                    (message) =>
                      message !== validationMessages.password.required
                  )
                  .map((message, index) => (
                    <InteractiveErrorMessageComponent
                      key={index}
                      touched={!!touched.password}
                      success={!passwordErrors.includes(message)}
                    >
                      {touched.password && passwordErrors.includes(message) ? (
                        <ErrorCircleIcon />
                      ) : (
                        <CheckCircleIcon />
                      )}
                      <TextLabel>{message}</TextLabel>
                    </InteractiveErrorMessageComponent>
                  ))}
              </ErrorBox>

              <Button type="submit">
                {!mutationLoading ? (
                  <FormattedMessage
                    id="signUpBtnText"
                    defaultMessage="Sign Up"
                  />
                ) : (
                  "Registering account..."
                )}
                <ArrowRightIcon color={"#FFF"} />
              </Button>
            </Form>
          )}
        </Formik>

        <SignUpMessage>
          <TextLabel>
            <FormattedMessage
              id="alreadyHaveAccount"
              defaultMessage="Already have an account?"
            />
          </TextLabel>
          <Link href="/account/login" passHref>
            <Anchor>
              <FormattedMessage id="loginBtnText" defaultMessage="Login" />
            </Anchor>
          </Link>
        </SignUpMessage>
      </Container>
    </Wrapper>
  );
};

export default SignUp;
