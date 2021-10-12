import React, { useReducer } from "react";
import TypesenseService from "../../utils/typesense-service";
import { TypesenseContext } from "./typesense.context";

function reducer(state: any, action: any): any {
  switch (action.type) {
    default:
      return state;
  }
}

type TypesenseProviderProps = {
  children: React.ReactElement;
};

export const TypesenseProvider: React.FunctionComponent<TypesenseProviderProps> = ({
  children,
}: TypesenseProviderProps) => {
  const typesenseService = TypesenseService.getInstance();

  const initialState = {
    typesenseService: typesenseService,
    client: typesenseService.getClient(),
    defaultIndexName: "gt_commerce_products",
  };
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <TypesenseContext.Provider value={{ state, dispatch }}>
      {children}
    </TypesenseContext.Provider>
  );
};
