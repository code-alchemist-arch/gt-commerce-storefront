export const initialState = {
  searchTerm: "",
  isSticky: false,
  isSidebarSticky: true,
  isDrawerOpen: false,
  isModalOpen: false,
  isLoading: false,
  productListView:
    process.browser && !!localStorage.getItem("productListView")
      ? localStorage.getItem("productListView")
      : undefined,
};

type ActionType =
  | { type: "SET_LOADING"; payload: boolean }
  | { type: "SET_SEARCH_TERM"; payload: string }
  | { type: "SET_STICKY" }
  | { type: "REMOVE_STICKY" }
  | { type: "SET_SIDEBAR_STICKY" }
  | { type: "REMOVE_SIDEBAR_STICKY" }
  | { type: "TOGGLE_DRAWER" }
  | { type: "TOGGLE_MODAL" }
  | { type: "SET_PRODUCT_LIST_VIEW"; payload: "grid" | "list" };

type StateType = typeof initialState;

export function appReducer(state: StateType, action: ActionType): StateType {
  switch (action.type) {
    case "SET_LOADING":
      return {
        ...state,
        isLoading: action.payload,
      };
    case "SET_SEARCH_TERM":
      return {
        ...state,
        searchTerm: action.payload,
      };
    case "SET_STICKY":
      return {
        ...state,
        isSticky: true,
      };
    case "REMOVE_STICKY":
      return {
        ...state,
        isSticky: false,
      };
    case "SET_SIDEBAR_STICKY":
      return {
        ...state,
        isSidebarSticky: true,
      };
    case "REMOVE_SIDEBAR_STICKY":
      return {
        ...state,
        isSidebarSticky: false,
      };
    case "TOGGLE_DRAWER":
      return {
        ...state,
        isDrawerOpen: !state.isDrawerOpen,
      };
    case "TOGGLE_MODAL":
      return {
        ...state,
        isModalOpen: !state.isModalOpen,
      };
    case "SET_PRODUCT_LIST_VIEW":
      localStorage.setItem("productListView", action.payload);
      return {
        ...state,
        productListView: action.payload,
      };
    default: {
      throw new Error(`Unsupported action type at App Reducer`);
    }
  }
}
