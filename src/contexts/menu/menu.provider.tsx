import React, { useReducer } from "react";
import { CATEGORY_MENU_ITEMS } from "../../site-settings/site-navigation";
import { MenuContext } from "./menu.context";

const initialState = {
  menu: CATEGORY_MENU_ITEMS,
};

function reducer(state: any, action: any) {
  switch (action.type) {
    case "SET_DATA":
      return {
        ...state,
        data: !action.payload,
      };
    default:
      return state;
  }
}

interface MenuProviderProps {
  children: React.ReactNode;
  items: any[];
}

export const MenuProvider: React.FunctionComponent<MenuProviderProps> = ({
  children,
  items,
}) => {
  const newState = { ...initialState };
  if (items && items.length > 0) {
    newState["menu"] = {
      items,
    };
  }
  const [state, dispatch] = useReducer(reducer, newState);
  return (
    <MenuContext.Provider value={{ state, dispatch }}>
      {children}
    </MenuContext.Provider>
  );
};
