import React, { useCallback } from "react";
import { useAppDispatch } from "contexts/app/app.provider";
import {
  ProductViewSwitchWrapper,
  DivisorLine,
} from "./product-view-switch.style";
import { DeviceType } from "interfaces";
import GridIcon from "../../assets/icons/GridIcon";
import ListIcon from "../../assets/icons/ListIcon";

type ProductViewSwitchProps = {
  productListView: string;
};

const ProductViewSwitch: React.FC<ProductViewSwitchProps> = ({
  productListView = "grid",
}: ProductViewSwitchProps) => {
  const dispatchProductListView = useAppDispatch();

  const setView = useCallback(
    (mode) => {
      dispatchProductListView({
        type: "SET_PRODUCT_LIST_VIEW",
        payload: mode,
      });
    },
    [productListView]
  );

  return (
    <ProductViewSwitchWrapper>
      <button
        onClick={() => setView("grid")}
        className={productListView === "grid" ? "disabled" : ""}
        title="View as Grid"
      >
        <GridIcon />
      </button>

      <DivisorLine />
      <button
        onClick={() => setView("list")}
        className={productListView === "list" ? "disabled" : ""}
        title="View as List"
      >
        <ListIcon />
      </button>
    </ProductViewSwitchWrapper>
  );
};

export default ProductViewSwitch;
