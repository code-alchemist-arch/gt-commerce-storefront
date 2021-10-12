import { createContext, Dispatch } from "react";
import TypesenseService from "../../utils/typesense-service";

type TypesenseState = {
  typesenseService: TypesenseService;
  client: any;
  defaultIndexName: string;
};
interface ContextProps {
  state: TypesenseState;
  dispatch: Dispatch<{ type: string; payload?: any }>;
}
export const TypesenseContext = createContext({} as ContextProps);
