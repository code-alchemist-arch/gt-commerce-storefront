import React, { useReducer } from "react";
import { GeneralSettingsContext } from "./general-settings.context";

const INITIAL_STATE = {};

function reducer(state: any, action: any) {
  switch (action.type) {
    case "SET_DATA":
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
}

type GeneralSettingsProviderProps = {
  initialState: any;
  children: React.ReactElement;
};

export const GeneralSettingsProvider: React.FunctionComponent<GeneralSettingsProviderProps> = ({
  initialState = INITIAL_STATE,
  children,
}: GeneralSettingsProviderProps) => {
  const [generalSettingsState, settingsDispatch] = useReducer(
    reducer,
    initialState
  );
  return (
    <GeneralSettingsContext.Provider
      value={{ generalSettingsState, settingsDispatch }}
    >
      {children}
    </GeneralSettingsContext.Provider>
  );
};
