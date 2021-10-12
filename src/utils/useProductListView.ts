import { useAppState } from "contexts/app/app.provider";
import React from "react";

type useProductListViewProps = {
  mobile: boolean;
  tablet: boolean;
  desktop: boolean;
};

const useProductListView = (deviceType?: useProductListViewProps): string => {
  const productListViewAppState = useAppState("productListView");
  const [productListView, setProductListView] = React.useState<string>();
  React.useEffect(() => {
    if (!productListViewAppState) {
      setProductListView(deviceType?.mobile ? "list" : "grid");
    } else {
      setProductListView(productListViewAppState);
    }
  }, [productListViewAppState]);

  return productListView;
};

export default useProductListView;
