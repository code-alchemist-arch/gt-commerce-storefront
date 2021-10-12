import React, { FC, ReactElement } from "react";
import { render, RenderOptions } from "@testing-library/react";
import { ThemeProvider } from "styled-components";
import { LanguageProvider } from "contexts/language/language.provider";
import { messages } from "site-settings/site-translation/messages";
import "@testing-library/jest-dom";
import * as jestFetchMock from "jest-fetch-mock";
import { CartProvider } from "contexts/cart/cart.provider";
import { ApolloProvider } from "@apollo/client";
import { useApollo } from "../utils/apollo";
import { AuthProvider } from "../contexts/auth/auth.provider";

jestFetchMock.enableFetchMocks();

const AllTheProviders: FC = ({ children }) => {
  const apolloClient = useApollo({});
  return (
    <ApolloProvider client={apolloClient}>
      <ThemeProvider theme={{}}>
        <LanguageProvider messages={messages}>
          <AuthProvider authenticationState={{}}>
            <CartProvider>{children}</CartProvider>
          </AuthProvider>
        </LanguageProvider>
      </ThemeProvider>
    </ApolloProvider>
  );
};

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, "queries">
) => render(ui, { wrapper: AllTheProviders, ...options });

export * from "@testing-library/react";

export { customRender as render };
