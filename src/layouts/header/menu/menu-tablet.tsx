import React, { useContext } from "react";
import {
  StyleMobileHeader,
  StyledTabletMenu,
  MenuDivisor,
  Closer,
  StyledMobileHeaderWrapper,
} from "./menu.style";
import Collapse, { Panel } from "rc-collapse";
import styled from "styled-components";
import { themeGet } from "@styled-system/theme-get";
import { AuthContext } from "contexts/auth/auth.context";
import { useAppDispatch } from "../../../contexts/app/app.provider";
import CloseIcon from "../../../assets/icons/CloseIcon";
import MenuItem from "./menu-item";
import Icon from "../../../components/icon/icon";
import SubCategoryList from "./sub-category-list";
import ProfileMenu from "../../profile/profile-menu";
import { MenuProps } from "./menu";
const Arrow = styled.button`
  border: 0;
  width: 25px;
  opacity: 1;
  background: transparent;
  transform: rotate(90deg);
  transition: all 0.5s ease-out;
  &::before {
    font-size: 17px;
    font-weight: 700;
    color: ${themeGet("colors.black")};
    font-family: revicons;
    z-index: 2;
  }

  &::before {
    content: "\\E825";
  }
`;

const MenuTablet: React.FC<MenuProps> = ({ menu, intlId }: MenuProps) => {
  const dispatch = useAppDispatch();
  const {
    authState: { isAuthenticated },
  } = useContext<any>(AuthContext);

  const toggleHandler = React.useCallback(() => {
    dispatch({
      type: "TOGGLE_DRAWER",
    });
  }, [dispatch]);

  // eslint-disable-next-line react/display-name
  const CloseComponent = React.memo(() => (
    <Closer onClick={toggleHandler}>
      <CloseIcon width={30} />
    </Closer>
  ));

  return (
    <StyledTabletMenu>
      <StyledMobileHeaderWrapper>
        <StyleMobileHeader>Menu</StyleMobileHeader>
        <CloseComponent />
      </StyledMobileHeaderWrapper>
      <Collapse
        accordion={true}
        className="MenuTablet"
        defaultActiveKey="active"
        expandIcon={() => <Arrow className="styledArrow" />}
      >
        {menu.items.map((category) => (
          <Panel
            key={category.id}
            header={
              <MenuItem
                className="CategoryItem"
                icon={<Icon name={category.icon_slug} width={30} height={30} />}
                label={category.label}
                link={category.link}
                // handleOnClick={toggleHandler}
                handleOnLinkClick={(event) => event.preventDefault()}
              />
            }
          >
            <SubCategoryList
              subcategories={category.children}
              intlId={intlId}
              handleSubCatOnClick={toggleHandler}
              handleSubSubCatOnClick={toggleHandler}
            />
          </Panel>
        ))}
      </Collapse>
      {isAuthenticated && (
        <>
          <MenuDivisor />
          <ProfileMenu mobileDevice="tablet" onItemClick={toggleHandler} />
        </>
      )}
    </StyledTabletMenu>
  );
};

export default MenuTablet;
