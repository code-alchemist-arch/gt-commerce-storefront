import React from "react";
import AddToCartIcon from "../../assets/icons/AddToCartIcon";
import { defaultTheme } from "../../site-settings/site-theme/default";
import { Button } from "../button/button";

import { AddToCartButtonWrapper } from "./add-to-cart-button.style";

type AddToCartButtonType = {
  showTitle: boolean;
  showIcon?: boolean;
  price?: string;
  disabled?: boolean;
  handleAddClick: React.EventHandler<any>;
};

const AddToCartButton: React.FC<AddToCartButtonType> = ({
  showTitle,
  showIcon,
  price,
  disabled = false,
  handleAddClick,
}: AddToCartButtonType) => {
  return (
    <AddToCartButtonWrapper className={!showTitle ? "mini" : ""}>
      <Button
        intlButtonId="addToCartButton"
        colors="primary"
        size="small"
        variant="outlined"
        className={`cart-button ${disabled ? "disabled" : ""}`}
        icon={
          showIcon && (
            <AddToCartIcon
              width={24}
              height={24}
              color={defaultTheme.menu.color}
            />
          )
        }
        onClick={handleAddClick}
        title={showTitle}
        extraTitle={price && `($${price})`}
        iconPosition="right"
      />
    </AddToCartButtonWrapper>
  );
};

AddToCartButton.defaultProps = {
  showTitle: true,
  showIcon: true,
};

export default AddToCartButton;
