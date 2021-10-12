import React, { useContext } from "react";
import Head from "next/head";
import { AuthContext } from "contexts/auth/auth.context";
import { useRouter } from "next/router";
import { NextPage } from "next";
import { CHECKOUT_PAGE, HOME_PAGE } from "../../site-settings/site-navigation";
import SignInForm from "features/account/signin";

const LoginPage: NextPage = () => {
  const { authState } = useContext<any>(AuthContext);
  const router = useRouter();
  const origin = router?.query?.origin;

  const allowedOrigins = {
    checkout: CHECKOUT_PAGE,
  };

  if (authState.isAuthenticated) {
    const originUrl = allowedOrigins[origin as string];
    const url = originUrl ? originUrl : HOME_PAGE;

    // ensure is running on client
    if (typeof window !== "undefined") {
      window.location.href = url;
    }
  }
  return (
    <>
      <Head>
        <title>Craft Cellars</title>
      </Head>
      <SignInForm />
    </>
  );
};

export async function getStaticProps() {
  return {
    props: {},
  };
}

export default LoginPage;
