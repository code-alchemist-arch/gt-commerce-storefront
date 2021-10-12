import React from "react";
import Head from "next/head";
import { NextPage } from "next";
import { ContentSection, MainContentArea } from "../assets/styles/pages.style";
import CartDetail from "../components/cart-detail/cart-detail";
import fetcher from "../utils/fetcher";
import { GET_GENERAL_OPTIONS } from "../graphql/query/cms/general_options.query";

type Props = {
  deviceType: {
    mobile: boolean;
    tablet: boolean;
    desktop: boolean;
  };
};
const CartPage: NextPage<Props> = ({ deviceType }: Props) => {
  return (
    <>
      <Head>
        <title>Cart - Craft Cellars</title>
      </Head>
      <MainContentArea>
        <ContentSection>
          <CartDetail deviceType={deviceType} />
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

export default CartPage;
