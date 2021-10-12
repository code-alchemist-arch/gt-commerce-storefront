import React from "react";
import { NextPage } from "next";
import Head from "next/head";
import { CONFIRM_ACCOUNT } from "graphql/mutation/user";

import { FormattedMessage } from "react-intl";

import Link from "next/link";
import { initializeApollo } from "../../utils/apollo";
import {
  Anchor,
  BackToLoginMessage,
  Heading,
  TextLabel,
} from "../../features/account/signinout-form";

interface Props {
  confirmAccount: any;
}

const RegisterPage: NextPage<Props> = ({ confirmAccount }) => {
  const { accountErrors } = confirmAccount;

  const confirmed = !accountErrors.length;
  return (
    <>
      <Head>
        <title>Account Confirm – Craft Cellars</title>
      </Head>
      <>
        {confirmed ? (
          <>
            <Heading>
              <FormattedMessage
                id="confirmationSuccess"
                defaultMessage="Perfect! Your Account is now verified!"
              />
            </Heading>
            <TextLabel>{`You can now login with your credentials.`}</TextLabel>
          </>
        ) : (
          <>
            <Heading>
              <FormattedMessage
                id="confirmationFailed"
                defaultMessage="Oops something went wrong!"
              />
            </Heading>
            <TextLabel>{`We cannot validate your account.`}</TextLabel>
          </>
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
      </>
    </>
  );
};

export async function getServerSideProps({ query }) {
  const { email, token } = query;
  const apolloClient = initializeApollo();

  const {
    data: { confirmAccount },
  } = await apolloClient.mutate({
    mutation: CONFIRM_ACCOUNT,
    variables: { email, token },
  });

  return {
    props: {
      confirmAccount,
    },
  };
}

export default RegisterPage;
