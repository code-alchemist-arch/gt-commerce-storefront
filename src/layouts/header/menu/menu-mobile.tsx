import React, { useContext } from "react";
import {
  StyleMobileHeader,
  StyledMobileMenu,
  StyledBackButton,
  MenuDivisor,
  StyledMobileHeaderWrapper,
  Closer,
} from "./menu.style";
import MenuItem from "./menu-item";

import { AuthContext } from "contexts/auth/auth.context";
import { MenuProps } from "./menu";
import { useAppDispatch } from "../../../contexts/app/app.provider";
import ArrowLeft from "../../../assets/icons/ArrowLeft";
import CloseIcon from "../../../assets/icons/CloseIcon";
import ProfileMenu from "../../profile/profile-menu";
import Icon from "../../../components/icon/icon";

const MenuMobile: React.FC<MenuProps> = ({ menu }: MenuProps) => {
  const dispatch = useAppDispatch();

  const {
    authState: { isAuthenticated },
  } = useContext<any>(AuthContext);

  const [activeCategory, setActiveCategory] = React.useState(null);
  const [subCategories, setSubCategories] = React.useState(null);

  const toggleHandler = React.useCallback(() => {
    dispatch({
      type: "TOGGLE_DRAWER",
    });
  }, [dispatch]);

  // eslint-disable-next-line react/display-name
  const CloseComponent = React.memo(() => (
    <Closer onClick={toggleHandler}>
      <CloseIcon width={24} />
    </Closer>
  ));

  return (
    <>
      {!activeCategory ? (
        <StyledMobileHeaderWrapper>
          <StyleMobileHeader>Menu</StyleMobileHeader>
          <CloseComponent />
        </StyledMobileHeaderWrapper>
      ) : (
        <StyledMobileHeaderWrapper>
          <StyledBackButton
            onClick={() => {
              setSubCategories(null);
              setActiveCategory(null);
            }}
          >
            <ArrowLeft />
          </StyledBackButton>
          <StyleMobileHeader>{activeCategory.label}</StyleMobileHeader>
          <CloseComponent />
        </StyledMobileHeaderWrapper>
      )}

      <StyledMobileMenu>
        {!activeCategory ? (
          menu.items.map((item) => (
            <MenuItem
              key={item.id}
              label={item.label}
              link={item.url}
              handleOnLinkClick={(event) => {
                if (item.children?.length > 0) {
                  event.preventDefault();
                }
              }}
              handleOnClick={() => {
                if (item.children?.length === 0) {
                  return toggleHandler();
                }
                if (!activeCategory) {
                  setActiveCategory(item);
                  if (item.children) {
                    setSubCategories(item.children);
                  }
                }
              }}
              showRightArrow={item.children?.length > 0}
            />
          ))
        ) : (
          <>
            {subCategories?.length > 0 && (
              <MenuItem
                className="SubcategoryItem"
                link={activeCategory.url}
                key={`${activeCategory.id}-all`}
                label="View All"
                handleOnLinkClick={toggleHandler}
              />
            )}
            {subCategories.map((subcat) => (
              <React.Fragment key={`frg-${subcat.id}`}>
                <MenuItem
                  className="SubcategoryItem"
                  key={subcat.id}
                  link={subcat.link}
                  icon={<Icon name={subcat.icon_slug} width={25} height={25} />}
                  label={subcat.label}
                  handleOnLinkClick={toggleHandler}
                />
                {subcat.children?.length > 0 &&
                  subcat.children.map((subSubCat) => (
                    <MenuItem
                      className="SubSubcategoryItem"
                      key={subSubCat.id}
                      link={subSubCat.link}
                      label={subSubCat.label}
                      handleOnLinkClick={toggleHandler}
                    />
                  ))}
              </React.Fragment>
            ))}
          </>
        )}
      </StyledMobileMenu>

      {isAuthenticated && !activeCategory && (
        <>
          <MenuDivisor />
          <ProfileMenu mobileDevice="mobile" onItemClick={toggleHandler} />
        </>
      )}
    </>
  );
};

export default MenuMobile;
