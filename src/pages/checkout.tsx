import React, { useContext, useEffect } from "react";
import Head from "next/head";
import { NextPage } from "next";

import { useQuery } from "@apollo/client";
import { GET_CHECKOUT } from "graphql/query/checkout.query";

import { CheckoutProvider } from "contexts/checkout/checkout.provider";
import { getLocalState } from "../utils/localStorage";
import { MainContentArea, ContentSection } from "../assets/styles/pages.style";
import Checkout from "../features/checkout/checkout";
import { setContextToken } from "../utils/apolloAuthFlowMiddleware";
import fetcher from "../utils/fetcher";
import { GET_GENERAL_OPTIONS } from "../graphql/query/cms/general_options.query";
import { AuthContext } from "../contexts/auth/auth.context";
import { isObjectEmpty } from "../utils/utils";
import { useAppDispatch } from "../contexts/app/app.provider";

type Props = {
  error: any;
  checkoutSession: any;
};
const CheckoutPage: NextPage<Props> = ({ error }: Props) => {
  const dispatch = useAppDispatch();

  const { authState } = useContext<any>(AuthContext);
  useEffect(() => {
    setContextToken(authState?.token);
  }, [authState]);

  // Need to look into local store because user can have a checkout session started before.
  const token = process.browser && getLocalState("checkout_token");
  console.log(token);
  const { data: checkoutData, loading } = useQuery(GET_CHECKOUT, {
    skip: !token,
    variables: { token },
    fetchPolicy: "no-cache",
  });

  useEffect(() => {
    dispatch({
      type: "SET_LOADING",
      payload: loading || isObjectEmpty(authState),
    });
  }, [loading, dispatch, authState]);

  return (
    <>
      <Head>
        <title>Checkout - Craft Cellars</title>
      </Head>
      <MainContentArea>
        <ContentSection>
          {!loading && !isObjectEmpty(authState) && (
            <CheckoutProvider
              user={authState?.user}
              serverStatus={checkoutData?.checkout}
            >
              <Checkout />
            </CheckoutProvider>
          )}
        </ContentSection>
      </MainContentArea>
    </>
  );
};

export async function getStaticProps() {
  const generalSettings = await fetcher(GET_GENERAL_OPTIONS);
  return {
    props: {
      generalSettings,
    },
  };
}

export default CheckoutPage;
