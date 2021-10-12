import React, { FC, useState, useEffect } from "react";
import NavLink from "components/nav-link/nav-link";
import DeliveryIcon from "assets/icons/DeliveryIcon";
import { defaultTheme } from "site-settings/site-theme/default";
import UserIcon from "../../assets/icons/UserIcon";
import CartIcon from "../../assets/icons/CartIcon";

interface HeaderMenuProps {
  cartItemsCount: number;
  isAuthenticated: boolean;
}

const HeaderMenu: FC<HeaderMenuProps> = ({
  cartItemsCount,
  isAuthenticated,
}) => {
  const [cartItemAdded, setCartItemAdded] = useState<boolean>(false);
  useEffect(() => {
    setCartItemAdded(true);

    const timeoutD = setTimeout(() => {
      setCartItemAdded(false);
    }, 1000);

    return () => clearTimeout(timeoutD);
  }, [cartItemsCount]);
  return (
    <div className="menu">
      <div className="menu-item">
        <NavLink
          icon={
            <DeliveryIcon
              height={30}
              width={50}
              color={defaultTheme.menu.color}
            />
          }
          href="/"
          label="Delivery"
          iconClass="delivery"
        />
      </div>
      {isAuthenticated ? (
        <NavLink
          className="menu-item"
          href="/profile/addresses"
          label="My Account"
          intlId=""
          icon={
            <UserIcon height={30} width={30} color={defaultTheme.menu.color} />
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
            <UserIcon height={30} width={30} color={defaultTheme.menu.color} />
          }
          iconClass="account"
        />
      )}
      <div className="menu-item">
        <NavLink
          icon={
            <CartIcon height={30} width={50} color={defaultTheme.menu.color} />
          }
          href="/cart"
          label="Cart"
          iconClass="cart"
        />
        <div
          suppressHydrationWarning={true}
          className={`cart-count ${cartItemAdded && "animated"}`}
        >
          {cartItemsCount > 99 ? "99+" : cartItemsCount}
        </div>
      </div>
    </div>
  );
};

export default HeaderMenu;
