import { useMemo } from "react";
import {
  ApolloClient,
  InMemoryCache,
  HttpLink,
  NormalizedCacheObject,
  ApolloLink,
} from "@apollo/client";
import { authFlowLink } from "./apolloAuthFlowMiddleware";

let apolloClient: ApolloClient<NormalizedCacheObject> | undefined;

const firstLink = new HttpLink({
  uri: process.env.API_URL, // Server URL (must be absolute)
  credentials: "same-origin", // Additional fetch() options like `credentials` or `headers`
});

const secondLink = new HttpLink({
  uri: `${process.env.API_CMS_URL}/graphql`,
  credentials: "same-origin",
});

function createIsomorphLink() {
  return ApolloLink.split(
    (operation) => operation.getContext().clientName === "cms",
    secondLink,
    firstLink
  );
}

function createApolloClient() {
  return new ApolloClient({
    ssrMode: typeof window === "undefined",
    link: authFlowLink.concat(createIsomorphLink()),
    cache: new InMemoryCache(),
  });
}

export function initializeApollo(initialState: any = null) {
  const _apolloClient = apolloClient ?? createApolloClient();

  // If your page has Next.js data fetching methods that use Apollo Client, the initial state
  // gets hydrated here
  if (initialState) {
    // Get existing cache, loaded during client side data fetching
    const existingCache = _apolloClient.extract();
    // Restore the cache using the data passed from getStaticProps/getServerSideProps
    // combined with the existing cached data
    _apolloClient.cache.restore({ ...existingCache, ...initialState });
  }
  // For SSG and SSR always create a new Apollo Client
  if (typeof window === "undefined") return _apolloClient;
  // Create the Apollo Client once in the client
  if (!apolloClient) apolloClient = _apolloClient;

  return _apolloClient;
}

export function useApollo(initialState) {
  const store = useMemo(() => initializeApollo(initialState), [initialState]);
  return store;
}
