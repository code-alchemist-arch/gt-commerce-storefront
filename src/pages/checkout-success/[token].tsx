import React from "react";
import { NextPage } from "next";
import { SEO } from "components/seo";
import { GET_ORDER_BY_TOKEN } from "graphql/query/order.query";
import { initializeApollo } from "utils/apollo";
import OrderReceived from "features/order-received/order-received";

type Props = {
  deviceType?: {
    mobile: boolean;
    tablet: boolean;
    desktop: boolean;
  };
  data: any;
  [key: string]: any;
};

const OrderPage: NextPage<Props> = ({ data, deviceType }) => {
  const { orderByToken } = data;

  return (
    <>
      <SEO title="Invoice - SiteName" description="Invoice Details" />
      <OrderReceived order={orderByToken} />
      <span>hi</span>
    </>
  );
};

export async function getServerSideProps({ params }) {
  try {
    const apolloClient = initializeApollo();

    const { data } = await apolloClient.query({
      query: GET_ORDER_BY_TOKEN,
      variables: {
        token: params.token,
      },
    });
    return {
      props: {
        data,
      },
    };
  } catch (err) {
    console.log("err", err);
  }
}
export default OrderPage;
