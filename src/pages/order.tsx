import React from "react";
import { NextPage } from "next";
import { SEO } from "components/seo";
import Order from "features/user-profile/order/order";
import {
  PageWrapper,
  SidebarSection,
} from "features/user-profile/user-profile.style";
import Sidebar from "features/user-profile/sidebar/sidebar";

const OrderPage: NextPage = () => {
  return (
    <>
      <SEO title="Order - SiteName" description="Order Details" />
      <PageWrapper>
        <SidebarSection>
          <Sidebar />
        </SidebarSection>

        <Order />
      </PageWrapper>
    </>
  );
};

export default OrderPage;
