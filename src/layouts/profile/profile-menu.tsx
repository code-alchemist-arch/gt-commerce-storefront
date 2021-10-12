import React, { useContext } from "react";
import { AuthContext } from "contexts/auth/auth.context";
import { useRouter } from "next/router";
import Link from "next/link";
import { ProfileMenuWrapper } from "./profile-menu.style";
import { HOME_PAGE } from "../../site-settings/site-navigation";
import Label from "../../components/label/label";
import { useCart } from "../../contexts/cart/use-cart";
import { defaultTheme } from "../../site-settings/site-theme/default";

type ProfileMenuProps = {
  mobileDevice?: "tablet" | "mobile";
  selectedItem?: string;
  onItemClick?: React.EventHandler<any>;
};

const MenuItem = ({
  href,
  onClick,
  mobileDevice,
  className,
  iconName,
  text,
}) => (
  <Link href={href} passHref>
    <a onClick={onClick}>
      <Label
        fontSize={mobileDevice ? 13 : 13}
        fontWeight={mobileDevice ? 400 : 500}
        iconWidth={mobileDevice ? 23 : 23}
        iconHeight={mobileDevice ? 23 : 23}
        iconName={iconName}
        text={text}
        className={className}
        color={defaultTheme.primary.color}
      />
    </a>
  </Link>
);

const ProfileMenu: React.FC<ProfileMenuProps> = ({
  mobileDevice,
  selectedItem,
  onItemClick,
}: ProfileMenuProps) => {
  const { clearCart } = useCart();
  const {
    authDispatch,
    authState: { isAuthenticated, user },
  } = useContext<any>(AuthContext);
  const router = useRouter();
  const handleLogout = (event) => {
    if (typeof window !== "undefined") {
      onItemClick && onItemClick(event);
      clearCart();
      authDispatch({ type: "SIGN_OUT" });
      router.push(HOME_PAGE);
    }
  };
  return isAuthenticated ? (
    <ProfileMenuWrapper className={mobileDevice}>
      <Label
        className="title"
        text="My Account"
        fontSize={16}
        fontWeight={600}
        color={defaultTheme.primary.color}
      />
      <Label
        className="user-email"
        text={`You're logged in as ${user.email}`}
        fontSize={13}
        fontWeight={400}
        color={defaultTheme.primary.color}
      />
      <MenuItem
        href="/profile/orders"
        iconName="order"
        text="Orders"
        onClick={onItemClick}
        mobileDevice={mobileDevice}
        className={selectedItem === "orders" ? "selected" : ""}
      />
      <MenuItem
        href="/profile/payment-cards"
        iconName="price"
        text="Payment Cards"
        onClick={onItemClick}
        mobileDevice={mobileDevice}
        className={selectedItem === "payment_cards" ? "selected" : ""}
      />
      {/* 
      <MenuSpacer />
      <Link href="/profile/whislist">
        <a onClick={onItemClick}>
          <Label
            fontSize={mobileDevice ? 16 : 13}
            fontWeight={mobileDevice ? 400 : 500}
            iconWidth={mobileDevice ? 30 : 25}
            iconHeight={mobileDevice ? 30 : 25}
            iconName="favourites"
            text="Wishlist"
            className={selectedItem === 'wishlist' ? 'selected' : ''}
          />
        </a>
      </Link>
      <Link href="/profile/recently-viewed">
        <a onClick={onItemClick}>
          <Label
            fontSize={mobileDevice ? 16 : 13}
            fontWeight={mobileDevice ? 400 : 500}
            iconWidth={mobileDevice ? 30 : 25}
            iconHeight={mobileDevice ? 30 : 25}
            iconName="openEye"
            text="Recently Viewed"
            className={selectedItem === 'recently_viewed' ? 'selected' : ''}
          />
        </a>
      </Link>
      <MenuSpacer /> */}
      <MenuItem
        href="/profile/addresses"
        iconName="billing"
        text="Addresses"
        onClick={onItemClick}
        mobileDevice={mobileDevice}
        className={selectedItem === "addresses" ? "selected" : ""}
      />

      <MenuItem
        href="/profile/modify-password"
        iconName="password"
        text="Change Password"
        onClick={onItemClick}
        mobileDevice={mobileDevice}
        className={selectedItem === "modify_password" ? "selected" : ""}
      />

      {/* <MenuSpacer /> */}

      <MenuItem
        href="/"
        iconName="logout"
        text="Log out"
        onClick={handleLogout}
        mobileDevice={mobileDevice}
        className=""
      />
    </ProfileMenuWrapper>
  ) : (
    <></>
  );
};

export default ProfileMenu;
