import React, { FC } from "react";
import NavLink from "components/nav-link/nav-link";
import DeliveryIcon from "assets/icons/DeliveryIcon";
import { defaultTheme } from "site-settings/site-theme/default";
import UserIcon from "../../assets/icons/UserIcon";
import CartIcon from "../../assets/icons/CartIcon";
import { useEffect } from "react";
import { useState } from "react";

interface HeaderMenuProps {
  cartItemsCount: number;
  isAuthenticated: boolean;
}

const HeaderMenuSticky: FC<HeaderMenuProps> = ({
  cartItemsCount,
  isAuthenticated,
}) => {
  const [cartItemAdded, setCartItemAdded] = useState<boolean>(false);
  useEffect(() => {
    setCartItemAdded(true);

    const timeoutD = setTimeout(() => {
      setCartItemAdded(false);
    }, 3000);

    return () => clearTimeout(timeoutD);
  }, [cartItemsCount]);

  return (
    <div className="menu">
      {isAuthenticated ? (
        <NavLink
          className="menu-item"
          href="/profile/addresses"
          label="My Account"
          intlId=""
          icon={
            <UserIcon height={25} width={25} color={defaultTheme.menu.color} />
          }
          // alt={`You're logged in as ${user.email}`}
          iconClass="account"
        />
      ) : (
        <NavLink
          className="menu-item"
          href="/account/login"
          label="My Account"
          intlId=""
          icon={
            <UserIcon height={25} width={25} color={defaultTheme.menu.color} />
          }
          iconClass="account"
        />
      )}
      <div className="menu-item cartIcons">
        <NavLink
          icon={
            <CartIcon height={25} width={50} color={defaultTheme.menu.color} />
          }
          href="/cart"
          label="Cart"
          iconClass="cart"
        />
        <div
          suppressHydrationWarning={true}
          className={`cart-count-sticky ${cartItemAdded && "animated"}`}
        >
          {cartItemsCount > 99 ? "99+" : cartItemsCount}
        </div>
      </div>
    </div>
  );
};

export default HeaderMenuSticky;
