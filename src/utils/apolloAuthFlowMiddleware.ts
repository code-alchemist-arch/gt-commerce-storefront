import { removeCookie } from "./session";
import { onError } from "@apollo/client/link/error";
import { setContext } from "@apollo/client/link/context";

let authToken;

export const setContextToken = async (newToken) => {
  authToken = newToken;
  return authToken;
};

const withToken = setContext((request, previousContext) => {
  const authorization = authToken ? `JWT ${authToken}` : "";

  return {
    headers: { authorization },
  };
});

const resetToken = onError(
  ({ graphQLErrors, networkError, operation, forward }) => {
    const headers = operation.getContext().headers;

    if (graphQLErrors) {
      for (const err of graphQLErrors) {
        // handle errors differently based on its error code
        switch (err.extensions.exception.code) {
          case "InvalidSignatureError":
            if (process.browser) {
              removeCookie("access_token");
            }
            // old token has expired throwing AuthenticationError,
            // one way to handle is to obtain a new token and
            // add it to the operation context
            operation.setContext({
              headers: {
                ...headers,
                authorization: "",
              },
            });
            // Now, pass the modified operation to the next link
            // in the chain. This effectively intercepts the old
            // failed request, and retries it with a new token
            return forward(operation);

          // handle other errors
          // case 'ANOTHER_ERROR_CODE':
          // ...
        }
      }
    }
  }
);

export const authFlowLink = withToken.concat(resetToken);
