import React, { useReducer } from "react";
import { removeLocalState } from "../../utils/localStorage";
import { removeCookie, setCookie } from "../../utils/session";
import { AuthContext } from "./auth.context";
const isBrowser = typeof window !== "undefined";
const INITIAL_STATE = {
  isAuthenticated: false,
  token: undefined,
  user: undefined,
};

function reducer(state: any, action: any) {
  switch (action.type) {
    case "SIGNIN_SUCCESS":
      setCookie("access_token", action.payload.token);
      removeLocalState("checkout_token");
      return {
        ...state,
        ...action.payload,
        isAuthenticated: true,
      };
    case "SIGN_OUT":
      removeCookie("access_token");
      removeLocalState("checkout_token");
      return {
        ...state,
        ...INITIAL_STATE,
      };
    case "REPLACE": {
      return {
        ...state,
        ...action.payload,
      };
    }
    default:
      return state;
  }
}

type AuthProviderProps = {
  authenticationState: any;
  children: React.ReactElement[] | React.ReactElement;
};

export const AuthProvider: React.FunctionComponent<AuthProviderProps> = ({
  authenticationState = INITIAL_STATE,
  children,
}) => {
  const [authState, authDispatch] = useReducer(reducer, authenticationState);

  React.useEffect(
    () => authDispatch({ type: "REPLACE", payload: authenticationState }),
    [authenticationState]
  );

  return (
    <AuthContext.Provider value={{ authState, authDispatch }}>
      {children}
    </AuthContext.Provider>
  );
};
