import React, { useState, useContext } from "react";
import Link from "next/link";

import MobileDrawer from "./mobile-drawer";
import { AuthContext } from "contexts/auth/auth.context";

import {
  MobileHeaderWrapper,
  MobileHeaderInnerWrapper,
  DrawerWrapper,
  LogoWrapper,
  Logo,
  MobileHeaderMainContent,
} from "./header.style";

import Image from "next/image";
import Drawer from "rc-drawer";
import { HOME_PAGE } from "../../site-settings/site-navigation";
import SearchIcon from "../../assets/icons/SearchIcon";
import UserIcon from "../../assets/icons/UserIcon";
import { defaultTheme } from "../../site-settings/site-theme/default";
import NavLink from "../../components/nav-link/nav-link";
import InstantSearch from "../../components/instant-search/InstantSearch";
import CartIcon from "../../assets/icons/CartIcon";

type MobileHeaderProps = {
  className?: string;
  pathname?: string;
  closeSearch?: any;
  deviceType?: string;
};

const MobileHeaderSecond: React.FC<MobileHeaderProps> = ({
  className,
  deviceType,
}: MobileHeaderProps) => {
  const {
    authState: { isAuthenticated },
  } = useContext<any>(AuthContext);

  const [showSearch, setShowSearch] = useState(false);
  return (
    <MobileHeaderWrapper>
      <MobileHeaderInnerWrapper className={className}>
        <MobileHeaderMainContent>
          <DrawerWrapper>
            <MobileDrawer deviceType={deviceType} />
          </DrawerWrapper>

          <div className="menu-item" onClick={() => setShowSearch(true)}>
            <SearchIcon
              height={deviceType === "mobile" ? 25 : 31}
              width={deviceType === "mobile" ? 25 : 31}
              color={defaultTheme.menu.color}
            />
          </div>
          <LogoWrapper>
            <Logo className={deviceType}>
              <Link href={HOME_PAGE} passHref>
                <a>
                  <Image
                    src="/images/logo.svg"
                    alt="SiteName"
                    width={deviceType === "mobile" ? 76 : 160}
                    height={deviceType === "mobile" ? 27 : 40}
                    quality={95}
                    priority
                  />
                </a>
              </Link>
            </Logo>
          </LogoWrapper>

          {isAuthenticated ? (
            <>
              {/* <NavLink
                  className="menu-item"
                  href="#"
                  label=""
                  intlId=""
                  icon={
                    <Icon
                      name="favourites"
                      height={deviceType === 'mobile' ? 25 : 30}
                      width={deviceType === 'mobile' ? 25 : 30}
                    />
                  }
                />*/}
              <NavLink
                className="menu-item"
                href="/profile/addresses"
                label=""
                intlId=""
                icon={
                  <UserIcon
                    height={30}
                    width={30}
                    color={defaultTheme.menu.color}
                  />
                }
              />
            </>
          ) : (
            <NavLink
              className="menu-item"
              href="/account/login"
              label=""
              intlId=""
              icon={
                <UserIcon
                  height={deviceType === "mobile" ? 25 : 30}
                  width={deviceType === "mobile" ? 25 : 30}
                  color={defaultTheme.menu.color}
                />
              }
            />
          )}
          <NavLink
            icon={
              <CartIcon
                height={30}
                width={50}
                color={defaultTheme.menu.color}
              />
            }
            href="/cart"
            iconClass="cart"
          />
        </MobileHeaderMainContent>

        <Drawer
          handler={false}
          open={showSearch}
          placement="right"
          duration=".01s"
          level={null}
          ease="ease"
          width="100%"
        >
          <InstantSearch
            mobile
            openResults={showSearch}
            onHideResult={() => {
              setShowSearch(false);
            }}
            showSearchBox={showSearch}
          />
        </Drawer>
      </MobileHeaderInnerWrapper>
    </MobileHeaderWrapper>
  );
};

export default MobileHeaderSecond;
