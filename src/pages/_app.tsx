import dynamic from "next/dynamic";
import { ApolloProvider } from "@apollo/client";
import { ThemeProvider } from "styled-components";
import { defaultTheme } from "site-settings/site-theme/default";
import { AppProvider } from "contexts/app/app.provider";
import { AuthProvider } from "contexts/auth/auth.provider";
import { LanguageProvider } from "contexts/language/language.provider";
import { CartProvider } from "contexts/cart/cart.provider";
import { useApollo } from "utils/apollo";
import { useMedia } from "utils/use-media";
import { MenuProvider } from "../contexts/menu/menu.provider";
import { GeneralSettingsProvider } from "../contexts/general-settings/general-settings.provider";
import { ToastProvider } from "react-toast-notifications";

// External CSS import here
import "rc-drawer/assets/index.css";
import "rc-table/assets/index.css";
import "rc-collapse/assets/index.css";
import "react-multi-carousel/lib/styles.css";
import "components/multi-carousel/multi-carousel.style.css";
import "react-spring-modal/styles.css";
import "overlayscrollbars/css/OverlayScrollbars.css";
import "components/scrollbar/scrollbar.css";
import "@redq/reuse-modal/lib/index.css";
import "swiper/swiper-bundle.min.css";
import "react-confirm-alert/src/react-confirm-alert.css";
import { GlobalStyle } from "assets/styles/global.style";

// Language translation messages
import { messages } from "site-settings/site-translation/messages";
import "typeface-lato";
import "typeface-poppins";
import {
  LOGIN_PAGE,
  REGISTER_PAGE,
  RESET_PASSWORD_PAGE,
  RESET_PASSWORD_CONFIRM_PAGE,
  CONFIRM_ACCOUNT_PAGE,
} from "../site-settings/site-navigation";
import { useRouter } from "next/router";
import { TypesenseProvider } from "../contexts/typesense/typesense.provider";
import * as Sentry from "@sentry/browser";
import { Integrations } from "@sentry/tracing";
import { useEffect, useState } from "react";
import { auth } from "../utils/auth";
import { Modal } from "@redq/reuse-modal";

const AppLayout = dynamic(() => import("layouts/app-layout"));
const AccountLayout = dynamic(() => import("layouts/account-layout"));

if (process.env.NODE_ENV === "production") {
  Sentry.init({
    dsn: process.env.SENTRY_URL,
    // FIXME Sentry gives back HTTP 429 with this enabled, might be related to our Sentry plan
    // integrations: [new Integrations.BrowserTracing()],
    // tracesSampleRate: 1.0,
  });
}

export default function ExtendedApp({ Component, pageProps }) {
  const [authentication, setAuthentication] = useState({});
  useEffect(() => {
    const getAuth = async () => {
      const authRes = await auth();
      setAuthentication(authRes);
    };
    getAuth();
  }, []);
  const { generalSettings, deviceType: initialDeviceType } = pageProps;
  const { pathname } = useRouter();
  const mobile = useMedia("(max-width: 580px)");
  const tablet = useMedia("(max-width: 991px)");
  const desktop = useMedia("(min-width: 992px)");
  const apolloClient = useApollo(pageProps.initialApolloState);
  const accountPages = [
    LOGIN_PAGE,
    REGISTER_PAGE,
    RESET_PASSWORD_PAGE,
    RESET_PASSWORD_CONFIRM_PAGE,
    CONFIRM_ACCOUNT_PAGE,
  ];
  const isAccountPage = accountPages.includes(pathname);
  const deviceType = initialDeviceType || { desktop, tablet, mobile };

  return (
    <ApolloProvider client={apolloClient}>
      <ThemeProvider theme={defaultTheme}>
        <GlobalStyle />
        <LanguageProvider messages={messages}>
          <GeneralSettingsProvider initialState={generalSettings}>
            <AuthProvider authenticationState={authentication}>
              <ToastProvider
                placement={
                  deviceType?.mobile ? "bottom-center" : "bottom-right"
                }
              >
                <CartProvider>
                  <TypesenseProvider>
                    <AppProvider>
                      <Modal>
                        <MenuProvider items={generalSettings?.menu?.items}>
                          {isAccountPage ? (
                            <AccountLayout deviceType={deviceType}>
                              <Component
                                {...pageProps}
                                deviceType={deviceType}
                              />
                            </AccountLayout>
                          ) : (
                            <AppLayout
                              deviceType={deviceType}
                              data={generalSettings}
                            >
                              <Component
                                {...pageProps}
                                deviceType={deviceType}
                              />
                            </AppLayout>
                          )}
                        </MenuProvider>
                      </Modal>
                    </AppProvider>
                  </TypesenseProvider>
                </CartProvider>
              </ToastProvider>
            </AuthProvider>
          </GeneralSettingsProvider>
        </LanguageProvider>
      </ThemeProvider>
    </ApolloProvider>
  );
}
