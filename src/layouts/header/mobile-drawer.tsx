import React, { useContext } from "react";
import dynamic from "next/dynamic";

import { Scrollbars } from "react-custom-scrollbars";
import { MenuContext } from "contexts/menu/menu.context";

import { useAppDispatch, useAppState } from "../../contexts/app/app.provider";
import Drawer from "../../components/drawer/drawer";
import { MenuIcon } from "../../assets/icons/MenuIcon";
import { defaultTheme } from "../../site-settings/site-theme/default";
import { DrawerContentWrapper } from "./header.style";

const MenuTablet = dynamic(() => import("layouts/header/menu/menu-tablet"));
const MenuMobile = dynamic(() => import("layouts/header/menu/menu-mobile"));

type MobileDrawerProps = {
  deviceType: string;
};

const MobileDrawer: React.FC<MobileDrawerProps> = ({
  deviceType,
}: MobileDrawerProps) => {
  const isDrawerOpen = useAppState("isDrawerOpen");
  const dispatch = useAppDispatch();
  const {
    state: { menu },
  } = useContext<any>(MenuContext);
  // Toggle drawer
  const toggleHandler = React.useCallback(() => {
    dispatch({
      type: "TOGGLE_DRAWER",
    });
  }, [dispatch]);

  return (
    <Drawer
      width={deviceType !== "desktop" ? "100%" : "715px"}
      drawerHandler={
        <div style={{ display: "flex" }}>
          <MenuIcon
            width={deviceType === "mobile" ? 25 : 35}
            height={deviceType === "mobile" ? 25 : 35}
            color={defaultTheme.menu.color}
          />
        </div>
      }
      open={isDrawerOpen}
      toggleHandler={toggleHandler}
      className={deviceType}
    >
      <Scrollbars autoHide>
        <DrawerContentWrapper deviceType={deviceType}>
          <MenuMobile menu={menu} />
        </DrawerContentWrapper>
      </Scrollbars>
    </Drawer>
  );
};

export default MobileDrawer;
