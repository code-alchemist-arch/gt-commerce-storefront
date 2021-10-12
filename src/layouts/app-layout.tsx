import React, { useRef, useState } from "react";
import dynamic from "next/dynamic";
import { useRouter, Router } from "next/router";
import Sticky from "react-stickynode";
import { useAppState, useAppDispatch } from "contexts/app/app.provider";
import Header from "./header/header";
import { LayoutWrapper } from "./layout.style";
import { isHomePage as isHP } from "./is-home-page";
import useScrollPosition from "@react-hook/window-scroll";
import useSWR from "swr";
import { GET_GENERAL_OPTIONS } from "../graphql/query/cms/general_options.query";
import fetcher from "../utils/fetcher";
import MessageBar from "../components/message-bar/message-bar";
import AnimateHeight from "react-animate-height";
import styled from "styled-components";
import DOMPurify from "dompurify";
import marked from "marked";
import Footer from "./footer/footer";
import Spinner from "../spinner/spinner";
import { DeviceType } from "../interfaces";
import { EntryModalNew as EntryModal } from "../components/@gt-components/entry-modal-new";

import HeaderSecond from "./header/header-second";
import MobileHeaderSecond from "./header/mobile-header-second";
import { AddCartModal } from "components/@gt-components/add-cart-modal";
import { useCart } from "contexts/cart/use-cart";

const MobileHeader = dynamic(() => import("./header/mobile-header"), {
  ssr: false,
});

export const StickyHeader = styled.div`
  position: sticky;
  top: 0;
`;

export const LoaderModal = styled.div`
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0px;
  left: 0px;
  background: #ffffffdb;
  z-index: 100000;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
`;

const FooterOuterWrapper = styled.div`
  width: 100%;
  background: #fff;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  box-shadow: 0px -1px 2px rgba(0, 0, 0, 0.06);
`;

const HeaderWrapper = styled.div`
  display: none;
  @media only screen and (min-width: 1200px) {
    display: block;
  }
`;

const MobileHeaderWrapper = styled.div`
  display: none;
  @media only screen and (max-device-width: 767px) {
    display: block;
  }

  /* Portrait */
  @media only screen and (min-device-width: 768px) and (max-device-width: 1024px) and (orientation: portrait) and (-webkit-min-device-pixel-ratio: 1) {
    display: block;
  }

  /* Landscape */
  @media only screen and (min-device-width: 768px) and (max-device-width: 1024px) and (orientation: landscape) and (-webkit-min-device-pixel-ratio: 1) {
    display: block;
  }

  /* ----------- iPad 3, 4 and Pro 9.7" ----------- */

  /* Portrait */
  @media only screen and (min-device-width: 768px) and (max-device-width: 1024px) and (orientation: portrait) and (-webkit-min-device-pixel-ratio: 2) {
    display: block;
  }

  /* Landscape */
  @media only screen and (min-device-width: 768px) and (max-device-width: 1024px) and (orientation: landscape) and (-webkit-min-device-pixel-ratio: 2) {
    display: block;
  }

  /* ----------- iPad Pro 10.5" ----------- */

  /* Portrait */
  /* Declare the same value for min- and max-width to avoid colliding with desktops */
  /* Source: https://medium.com/connect-the-dots/css-media-queries-for-ipad-pro-8cad10e17106*/
  @media only screen and (min-device-width: 834px) and (max-device-width: 834px) and (orientation: portrait) and (-webkit-min-device-pixel-ratio: 2) {
    display: block;
  }

  /* Landscape */
  /* Declare the same value for min- and max-width to avoid colliding with desktops */
  /* Source: https://medium.com/connect-the-dots/css-media-queries-for-ipad-pro-8cad10e17106*/
  @media only screen and (min-device-width: 1112px) and (max-device-width: 1112px) and (orientation: landscape) and (-webkit-min-device-pixel-ratio: 2) {
    display: block;
  }

  /* ----------- iPad Pro 12.9" ----------- */

  /* Portrait */
  /* Declare the same value for min- and max-width to avoid colliding with desktops */
  /* Source: https://medium.com/connect-the-dots/css-media-queries-for-ipad-pro-8cad10e17106*/
  @media only screen and (min-device-width: 1024px) and (max-device-width: 1024px) and (orientation: portrait) and (-webkit-min-device-pixel-ratio: 2) {
    display: block;
  }

  /* Landscape */
  /* Declare the same value for min- and max-width to avoid colliding with desktops */
  /* Source: https://medium.com/connect-the-dots/css-media-queries-for-ipad-pro-8cad10e17106*/
  @media only screen and (min-device-width: 1366px) and (max-device-width: 1366px) and (orientation: landscape) and (-webkit-min-device-pixel-ratio: 2) {
    display: block;
  }

  @media only screen and (max-width: 1199px) {
    display: block;
  }
`;

type LayoutProps = {
  className?: string;
  token?: string;
  deviceType?: DeviceType;
  data?: any;
};

const Layout: React.FunctionComponent<LayoutProps> = ({
  className,
  children,
  deviceType: { mobile, tablet, desktop },
  data,
  token,
}) => {
  const { pathname, query } = useRouter();
  const isSticky = useAppState("isSticky") || true;

  const isHomePage = isHP(pathname);
  const [showHeader, setShowHeader] = useState(true);
  const [showMenu, setShowMenu] = useState(true);
  const isLoading = useAppState("isLoading");
  const dispatch = useAppDispatch();

  const { cartItemsCount, addedProduct } = useCart();

  const footerMessage = data?.generalOption?.footer_copy;
  const footer = data?.footer;
  const scrollY = useScrollPosition(10 /*fps*/);

  React.useEffect(() => {
    if (data?.generalOption?.keep_menu_on_scroll) {
      return;
    }

    if (scrollY > 187) {
      setShowMenu(false);
      setShowHeader(false);
    } else {
      setShowMenu(true);
    }
  }, [data?.generalOption?.keep_menu_on_scroll, scrollY]);

  React.useEffect(() => {
    Router.events.on("routeChangeStart", (url) => {
      dispatch({ type: "SET_LOADING", payload: true });
    });
    Router.events.on("routeChangeComplete", () => {
      window.scrollTo(0, 0);
      dispatch({ type: "SET_LOADING", payload: false });
    });
  }, []);

  return (
    <LayoutWrapper className={`layoutWrapper ${className}`}>
      {isLoading && (
        <LoaderModal>
          <Spinner width={58} height={67} />
        </LoaderModal>
      )}
      <HeaderWrapper>
        <HeaderSecond
          className={`${isHomePage ? "home" : ""}`}
          showMenu={showMenu}
          header_top_link={data?.generalOption?.header_top_link}
          header_top_text={data?.generalOption?.header_top_text}
          display_header_top={data?.generalOption?.display_header_top}
        />
      </HeaderWrapper>
      <MobileHeaderWrapper>
        <MobileHeaderSecond
          className={`${isSticky ? "sticky" : "unSticky"} ${
            isHomePage ? "home" : ""
          } desktop`}
        />
      </MobileHeaderWrapper>
      {data?.generalOption?.display_header_bottom && (
        <AnimateHeight duration={800} height={showMenu ? 38 : 0}>
          <MessageBar
            link={data?.generalOption?.header_bottom_link}
            message={data?.generalOption?.header_bottom_text}
          />
        </AnimateHeight>
      )}

      {children}

      {data?.generalOption?.display_footer_top && (
        <MessageBar
          link={data?.generalOption?.footer_top_link}
          message={data?.generalOption?.footer_top_text}
        />
      )}
      <FooterOuterWrapper>
        {footer && footer.columns.length > 0 && (
          <Footer
            footerMessage={footerMessage}
            columns={footer.columns}
            address={footer.address}
            phone={footer.phone}
            copy={footer.copy}
            socialLinks={data?.generalOption?.social_links}
            show_company_info={footer.show_company_info}
            show_newsletter={footer.show_newsletter}
            newsletter_background={footer.newsletter_background?.url}
            operation_hours={footer.operation_hours}
          />
        )}
      </FooterOuterWrapper>
      <EntryModal data={data?.generalOption?.modal} />
      <AddCartModal
        addedProduct={addedProduct}
        cartItemsCount={cartItemsCount}
      />
    </LayoutWrapper>
  );
};

export default Layout;
