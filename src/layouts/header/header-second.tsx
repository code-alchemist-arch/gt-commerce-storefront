import React, { useContext } from "react";
import Image from "next/image";
import Link from "next/link";

import { HOME_PAGE } from "../../site-settings/site-navigation";
import Menu from "./menu/menu";
import InstantSearch from "../../components/instant-search/InstantSearch";
import { useCart } from "../../contexts/cart/use-cart";
import { AuthContext } from "contexts/auth/auth.context";

import HeaderMenu from "./header-menu";
import HeaderMenuSticky from "./header-menu-sticky";
import MessageBar from "../../components/message-bar/message-bar";

import HeaderWrapper, {
  HeaderLeftSide,
  HeaderMainContent,
  HeaderMainContentWrapper,
  HeaderOuterWrapper,
  HeaderRightSide,
  Logo,
  MainMenu,
  StickyHeaderWrapper,
} from "./header.style";

type Props = {
  className?: string;
  showMenu?: boolean;
  header_top_link?: string;
  header_top_text?: string;
  display_header_top?: boolean;
};

const HeaderSecond: React.FC<Props> = ({
  className,
  showMenu,
  header_top_link,
  header_top_text,
  display_header_top,
}) => {
  const {
    authState: { isAuthenticated },
  } = useContext<any>(AuthContext);

  const { cartItemsCount } = useCart();

  return (
    <header>
      <HeaderOuterWrapper
        style={{
          visibility: showMenu ? "visible" : "hidden",
          opacity: showMenu ? 1 : 0,
          transition: "all 0.2s ease-in-out",
        }}
      >
        <HeaderWrapper className={className}>
          {display_header_top && (
            <MessageBar link={header_top_link} message={header_top_text} top />
          )}
          <HeaderMainContentWrapper>
            <HeaderMainContent>
              <HeaderLeftSide>
                <InstantSearch />
              </HeaderLeftSide>
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
              <HeaderRightSide>
                <HeaderMenu
                  isAuthenticated={isAuthenticated}
                  cartItemsCount={cartItemsCount}
                />
              </HeaderRightSide>
            </HeaderMainContent>
          </HeaderMainContentWrapper>

          <div
            style={{
              width: "100%",
              marginLeft: -25,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              maxWidth: "1600px",
              paddingBottom: 10,
              paddingTop: 10,
            }}
          >
            <MainMenu>
              <Menu />
            </MainMenu>
          </div>
        </HeaderWrapper>
      </HeaderOuterWrapper>

      <StickyHeaderWrapper showMenu={showMenu}>
        <MainMenu>
          <div
            style={{
              marginLeft: 180,
              marginRight: 25,
            }}
          >
            <InstantSearch isSticky={!showMenu} />
          </div>

          <Logo
            style={{
              position: "absolute",
              left: 0,
              top: "50%",
              transform: "translateY(-50%)",
            }}
          >
            <Link href={HOME_PAGE} passHref>
              <a>
                <Image
                  src={"/images/logo.svg"}
                  alt="Craft Cellars"
                  width={160}
                  height={40}
                  quality={100}
                  priority
                />
              </a>
            </Link>
          </Logo>

          <Menu />
          <HeaderRightSide>
            <HeaderMenuSticky
              isAuthenticated={isAuthenticated}
              cartItemsCount={cartItemsCount}
            />
          </HeaderRightSide>
        </MainMenu>
      </StickyHeaderWrapper>
    </header>
  );
};

export default HeaderSecond;
