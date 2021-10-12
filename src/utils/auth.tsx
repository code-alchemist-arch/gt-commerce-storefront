import { getCookie } from "./session";
import { TOKEN_VERIFY } from "graphql/mutation/user";
import { initializeApollo } from "./apollo";
import { ME } from "../graphql/query/user.query";
import { setContextToken } from "./apolloAuthFlowMiddleware";

let cachedVerification;

export const auth = async (ctx?) => {
  const apolloClient = initializeApollo();

  const token = getCookie("access_token", ctx);
  let tokenProps;
  if (!token) {
    tokenProps = {
      isAuthenticated: false,
      user: null,
      token: null,
      error: null,
    };
    cachedVerification = null;
  } else {
    if (!cachedVerification) {
      const { data, errors = null } = await apolloClient.mutate({
        mutation: TOKEN_VERIFY,
        variables: { token },
      });

      const { tokenVerify } = data;
      if (tokenVerify.user) {
        await setContextToken(token);
        const {
          data: { me: userData },
        } = await apolloClient.query({
          query: ME,
          fetchPolicy: "no-cache",
        });
        tokenProps = {
          isAuthenticated: true,
          user: userData,
          token,
          errors,
        };
      } else {
        tokenProps = {
          isAuthenticated: false,
          token,
          errors,
        };
      }
      // store token cache if it's on the browser side
      if (process.browser) {
        cachedVerification = tokenProps;
      }
    } else {
      console.log("fetching verification from cache", { cachedVerification });
      tokenProps = cachedVerification;
    }
  }
  return tokenProps;
};
