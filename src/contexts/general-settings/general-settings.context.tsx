import { createContext } from "react";

interface ContextProps {
  generalSettingsState: any;
  settingsDispatch: React.Dispatch<any>;
}

export const GeneralSettingsContext = createContext({} as ContextProps);
