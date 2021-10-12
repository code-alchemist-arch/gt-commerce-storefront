import React, { useContext } from "react";
import Head from "next/head";
import { NextPage } from "next";

import { ProfileProvider } from "contexts/profile/profile.provider";

import dynamic from "next/dynamic";
import {
  MainContentArea,
  ContentSection,
} from "../../assets/styles/pages.style";
import ProfileLayout from "../../layouts/profile/profile-layout";
import Orders from "../../features/profile/orders/orders";
import fetcher from "../../utils/fetcher";
import { GET_GENERAL_OPTIONS } from "../../graphql/query/cms/general_options.query";
import { useAppDispatch } from "../../contexts/app/app.provider";
import { AuthContext } from "../../contexts/auth/auth.context";
import { isObjectEmpty } from "../../utils/utils";

const CartPopUp = dynamic(() => import("../../features/carts/cart-popup"), {
  ssr: false,
});

type Props = {
  deviceType: {
    mobile: boolean;
    tablet: boolean;
    desktop: boolean;
  };
  children: React.FunctionComponent;
  error: any;
};
const MyOrdersPage: NextPage<Props> = ({
  deviceType,
  children,
  error,
}: Props) => {
  const { authState } = useContext<any>(AuthContext);
  const dispatch = useAppDispatch();
  dispatch({ type: "SET_LOADING", payload: true });
  if (error) return <div>{error.message}</div>;

  if (!isObjectEmpty(authState)) {
    dispatch({ type: "SET_LOADING", payload: false });
  }
  return (
    <>
      <Head>
        <title>Checkout - Craft Cellars</title>
      </Head>
      <MainContentArea>
        <ContentSection noPadding>
          {!isObjectEmpty(authState) && (
            <ProfileProvider initData={authState?.user}>
              <ProfileLayout
                deviceType={deviceType}
                selectedItem="orders"
                withBox={false}
              >
                <Orders deviceType={deviceType} />
              </ProfileLayout>
            </ProfileProvider>
          )}
        </ContentSection>
      </MainContentArea>
      {deviceType.desktop && <CartPopUp />}
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

export default MyOrdersPage;
