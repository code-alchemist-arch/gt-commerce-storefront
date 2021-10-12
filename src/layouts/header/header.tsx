import React, { useContext } from "react";
import { AuthContext } from "contexts/auth/auth.context";
import HeaderWrapper, {
  HeaderLeftSide,
  HeaderMainContent,
  HeaderMainContentWrapper,
  HeaderOuterWrapper,
  HeaderRightSide,
  Logo,
  MainMenu,
} from "./header.style";
import Image from "next/image";
import Link from "next/link";
import DeliveryIcon from "../../assets/icons/DeliveryIcon";
import UserIcon from "../../assets/icons/UserIcon";
import { HOME_PAGE } from "../../site-settings/site-navigation";
import NavLink from "components/nav-link/nav-link";
import AnimateHeight from "react-animate-height";
import { defaultTheme } from "../../site-settings/site-theme/default";
import Menu from "./menu/menu";
import { MenuContext } from "../../contexts/menu/menu.context";
import InstantSearch from "../../components/instant-search/InstantSearch";
import CartIcon from "../../assets/icons/CartIcon";
import { useCart } from "../../contexts/cart/use-cart";
type Props = {
  className?: string;
  showMenu?: boolean;
};

const Header: React.FC<Props> = ({ className, showMenu }) => {
  const {
    authState: { isAuthenticated },
  } = useContext<any>(AuthContext);

  const { cartItemsCount } = useCart();

  return (
    <header>
      <HeaderOuterWrapper>
        <HeaderWrapper className={className}>
          <HeaderMainContentWrapper>
            <HeaderMainContent>
              <HeaderLeftSide>
                <Logo>
                  <Link href={HOME_PAGE} passHref>
                    <a>
                      <Image
                        src={"/images/logo.svg"}
                        alt="Craft Cellars"
                        width={400}
                        height={100}
                        quality={100}
                        priority
                      />
                    </a>
                  </Link>
                </Logo>
              </HeaderLeftSide>

              <HeaderRightSide>
                <InstantSearch />
                <div className="menu">
                  <div className="menu-item">
                    <NavLink
                      icon={
                        <DeliveryIcon
                          height={30}
                          width={50}
                          color={defaultTheme.colors.white}
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
                        <UserIcon
                          height={30}
                          width={30}
                          color={defaultTheme.colors.white}
                        />
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
                        <UserIcon
                          height={30}
                          width={30}
                          color={defaultTheme.colors.white}
                        />
                      }
                      iconClass="account"
                    />
                  )}
                  <div className="menu-item">
                    <NavLink
                      icon={
                        <CartIcon
                          height={30}
                          width={50}
                          color={defaultTheme.colors.white}
                        />
                      }
                      href="/cart"
                      label="Cart"
                      iconClass="cart"
                    />
                    <div suppressHydrationWarning={true} className="cart-count">
                      {cartItemsCount > 99 ? "99+" : cartItemsCount}
                    </div>
                  </div>
                </div>
              </HeaderRightSide>
            </HeaderMainContent>
          </HeaderMainContentWrapper>
          <AnimateHeight
            duration={200}
            height={showMenu ? 56 : 0}
            style={{
              width: "100%",
              marginLeft: -25,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              maxWidth: "1600px",
            }}
          >
            <MainMenu>
              <Menu />
            </MainMenu>
          </AnimateHeight>
        </HeaderWrapper>
      </HeaderOuterWrapper>
    </header>
  );
};

export default Header;
