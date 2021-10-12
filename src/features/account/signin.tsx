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
  ErrorBox,
  SignUpMessage,
} from "./signinout-form";
import { AuthContext } from "contexts/auth/auth.context";
import { FormattedMessage } from "react-intl";
import Link from "next/link";
import HeadShake from "react-reveal/HeadShake";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useMutation } from "@apollo/client";
import { TOKEN_CREATE } from "graphql/mutation/user";
import ArrowRightIcon from "../../assets/icons/ArrowRightIcon";
import EmailIcon from "../../assets/icons/EmailIcon";
import ErrorCircleIcon from "../../assets/icons/ErrorCircleIcon";
import HideEyeIcon from "../../assets/icons/HideEyeIcon";
import PasswordIcon from "../../assets/icons/PasswordIcon";
import ShowEyeIcon from "../../assets/icons/ShowEyeIcon";

const SignIn = () => {
  const { authDispatch } = useContext<any>(AuthContext);
  const [showPassword, setShowPassword] = useState(false);
  const [serverValidationErrors, setServerValidationErrors] = useState([]);

  const [
    tokenCreate,
    { loading: mutationLoading, error: mutationError },
  ] = useMutation(TOKEN_CREATE);

  const loginCallback = async (values) => {
    if (!mutationLoading) {
      setServerValidationErrors([]);
      const { data } = await tokenCreate({
        variables: { email: values.email, password: values.password },
      });
      const { token, user, errors } = data.tokenCreate;
      if (token) {
        authDispatch({
          type: "SIGNIN_SUCCESS",
          payload: {
            token,
            user,
          },
        });
      } else {
        setServerValidationErrors(errors);
      }
    }
  };

  const SignInSchema = Yup.object().shape({
    email: Yup.string().required("Required").email("Invalid email."),
    password: Yup.string().required("Required"),
  });

  return (
    <Wrapper>
      <Container>
        <Heading>
          <FormattedMessage id="login" defaultMessage="Login" />
        </Heading>
        <SubHeading>
          <FormattedMessage
            id="loginText"
            defaultMessage="Please sign in to continue"
          />
        </SubHeading>

        <Formik
          initialValues={{ password: "", email: "" }}
          validationSchema={SignInSchema}
          onSubmit={loginCallback}
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
              <ForgotPassword>
                <Link href="/account/reset-password" passHref>
                  <TextLabel>
                    <FormattedMessage
                      id="forgotPasswordText"
                      defaultMessage="Forgot your Password?"
                    />
                  </TextLabel>
                </Link>
              </ForgotPassword>
              <ErrorBox>
                {!!serverValidationErrors &&
                  serverValidationErrors.map(({ message }, index) => (
                    <HeadShake key={index}>
                      <ErrorMessageComponent>
                        <ErrorCircleIcon />
                        <TextLabel>{message}</TextLabel>
                      </ErrorMessageComponent>
                    </HeadShake>
                  ))}
              </ErrorBox>

              <Button type="submit" data-testid="login-submit">
                {!mutationLoading ? (
                  <FormattedMessage id="login" defaultMessage="Login" />
                ) : (
                  "Sending credentials..."
                )}
                <ArrowRightIcon color={"#FFF"} />
              </Button>
            </Form>
          )}
        </Formik>

        <SignUpMessage>
          <TextLabel>
            <FormattedMessage
              id="dontHaveAccount"
              defaultMessage="Don’t have an account?"
            />
          </TextLabel>
          <Link href="/account/register" passHref>
            <Anchor>
              <FormattedMessage id="signUpBtnText" defaultMessage="Sign Up" />
            </Anchor>
          </Link>
        </SignUpMessage>
      </Container>
    </Wrapper>
  );
};

export default SignIn;
