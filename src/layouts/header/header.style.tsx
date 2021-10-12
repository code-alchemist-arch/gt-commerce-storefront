import styled, { keyframes } from "styled-components";
import { themeGet } from "@styled-system/theme-get";

const pulse = keyframes`
  0% {
    -moz-box-shadow: 0 0 0 0 rgba(102, 51, 68, 0.4);
    box-shadow: 0 0 0 0 rgba(102, 51, 68, 0.4);
  }
  70% {
    -moz-box-shadow: 0 0 0 10px rgba(102, 51, 68, 0);
    box-shadow: 0 0 0 10px rgb(102, 51, 68, 0.3);
  }
  100% {
    -moz-box-shadow: 0 0 0 0 rgba(102, 51, 68, 0);
    box-shadow: 0 0 0 0 rgba(102, 51, 68, 0);
  }
`;

export const SearchWrapper = styled.div`
  padding: 5px 10px;
  cursor: pointer;
  color: ${themeGet("colors.darkBold", "#0D1136")};
  svg {
    display: block;
    width: 17px;
    height: auto;
  }

  @media only screen and (min-width: 991px) and (max-width: 1366px) {
    opacity: 0;
  }
`;

export const HeaderOuterWrapper = styled.div`
  display: flex;
  justify-content: center;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.06);
  background-color: #fff;
`;

export const StickyHeaderWrapper = styled.div<{
  showMenu?: boolean;
}>`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;

  padding: 10px;
  box-shadow: 0 1px 7px 2px rgb(0 0 0 / 19%);

  position: fixed;
  opacity: ${({ showMenu }) => (showMenu ? 0 : 1)};
  transition: all 0.2s ease-in-out;
  top: 0;
  left: 0;
  background: white;
  z-index: 99999;
`;

export const HeaderLeftSide = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-shrink: 0;
  min-width: 210px;
  flex: ${({ theme }) => (theme.headerRight?.layout === "column" ? 1 : 0)};
`;

export const HeaderMainContentWrapper = styled.div`
  background: ${themeGet("header.background")};
  background-size: cover;
  width: 100%;
  display: flex;
  justify-content: center;
  border-bottom: 1px solid ${themeGet("colors.grayBackground")};
`;

export const HeaderMainContent = styled.div`
  max-width: 1600px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 30px;
  padding: 15px 45px;
`;

export const HeaderRightSide = styled.div`
  display: flex;
  flex-direction: ${themeGet("headerRight.layout")};
  align-items: flex-end;
  flex-shrink: 0;
  justify-content: center;
  min-width: 210px;
  flex: 1;

  @media screen and (max-width: 1400px) {
    padding-left: 45px;
  }

  & > .menu {
    display: flex;
    order: ${({ theme }) => (theme.headerRight?.layout === "column" ? -1 : 0)};
    gap: 40px;
  }

  .avatar {
    width: 30px;
    height: 30px;
    border-radius: 50%;
  }

  .menu-icon {
    min-width: 14px;
    margin-right: 7px;
  }

  .menu-item {
    display: flex;
    white-space: nowrap;
    position: relative;

    cursor: pointer;

    & .cart-count {
      position: absolute;
      top: 0;
      right: -20px;
      background-color: ${themeGet("menu.hover.lightColor")};
      color: ${themeGet("colors.white")};
      width: 26px;
      height: 26px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 12px;
    }
    & .cart-count-sticky {
      position: absolute;
      top: 0;
      right: -10px;
      background-color: ${themeGet("menu.hover.lightColor")};
      color: ${themeGet("colors.white")};
      width: 21px;
      height: 21px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 12px;
    }

    & .cart-count-sticky,
    & .cart-count {
      &.animated {
        animation-name: ${pulse};
        animation-duration: 1s;
        animation-iteration-count: infinite;
        animation-direction: alternate;
        animation-play-state: paused;
        animation-play-state: running;
      }
    }

    &:hover {
      .cart,
      .delivery {
        svg path,
        svg line,
        svg polyline {
          transition: stroke 0.2s ease-in-out;
          stroke: ${themeGet("menu.hover.lightColor", "#009E7F")};
        }
      }
      .account,
      .product-cart {
        svg path,
        svg line,
        svg polyline {
          transition: fill 0.2s ease-in-out;
          fill: ${themeGet("menu.hover.lightColor", "#009E7F")};
        }
      }
      a,
      > div:not(.react-reveal) {
        transition: color 0.2s ease-in-out;
        /* color: ${themeGet("menu.hover.lightColor", "#009E7F")}; */
      }
    }

    a {
      font-size: ${themeGet("fontSizes.2", "15")}px;
      /* font-weight: ${themeGet("fontWeights.6", "700")}; */
      color: ${themeGet("menu.color")};
      line-height: 1.2em;
      display: block;
      display: flex;
      align-items: center;
      margin-right: 0px;

      @media (max-width: 1400px) {
        font-size: 15px;
      }
      &.current-page {
        color: ${themeGet("menu.hover.lightColor", "#009E7F")};
        & .account,
        & .product-card {
          svg path,
          svg line,
          svg polyline {
            transition: fill 0.2s ease-in-out;
            fill: ${themeGet("menu.hover.lightColor", "#009E7F")};
          }
        }
        & .delivery,
        & .cart {
          svg path,
          svg line,
          svg polyline {
            transition: stroke 0.2s ease-in-out;
            stroke: ${themeGet("menu.hover.lightColor", "#009E7F")};
          }
        }
      }
    }
  }

  .user-pages-dropdown {
    .popover-handler {
      width: 38px;
      height: 38px;
      border-radius: 50%;
      display: block;
      overflow: hidden;
      img {
        width: 100%;
        height: auto;
        display: block;
      }
    }

    .popover-content {
      .inner-wrap {
        padding: 0;
      }
    }
  }
`;

export const Logo = styled.span`
  color: ${themeGet("colors.darkBold", "#0D1136")};
  font-size: 26px;
  font-weight: bold;
  cursor: pointer;

  a {
    color: ${themeGet("colors.darkBold", "#0D1136")};
    font-size: 26px;
    font-weight: bold;
    display: flex;
  }

  span {
    color: #029e7f;
  }

  img {
    display: block;
    backface-visibility: hidden;
    object-fit: contain;
  }
`;

export const MainMenu = styled.div`
  padding: 0 15px 0 15px;
  display: flex;
  width: 100%;
  justify-content: center;
  height: 56px;
  transition: max-height 0.2s ease;
  align-items: center;
`;

export const HeaderWrapper = styled.header`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  transition: all 0.3s ease;
  background-color: ${themeGet("headerWrapper.backgroundColor")};

  .headerSearch {
    margin: 0 15px 0 30px;

    @media only screen and (min-width: 991px) and (max-width: 1200px) {
      input {
        width: 80%;
      }

      .buttonText {
        display: none;
      }
    }
  }

  &.sticky {
    &.hasTopMessage {
      top: 32px;
    }
    position: sticky;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.06);

    .headerSearch {
      display: flex;

      form {
        background-color: ${themeGet("colors.lightMediumColor", "#F3F3F3")};

        input {
          background-color: transparent;
        }
      }
    }

    @media only screen and (min-width: 991px) and (max-width: 1200px) {
      .buttonText {
        display: none;
      }
    }
  }

  .headerSearch {
    input {
      @media (max-width: 1400px) {
        padding: 0 15px;
        font-size: 15px;
      }

      @media only screen and (min-width: 991px) and (max-width: 1200px) {
      }
    }
    button {
      @media (max-width: 1400px) {
        padding: 0 15px;
        font-size: 15px;
      }
    }
  }
`;

export const MobileHeaderWrapper = styled.div`
  background: ${themeGet("header.background")};
  background-size: cover;

  .headerSearch {
    &.mobile {
      input {
        height: 50px;
        font-size: 14px;
        padding-right: 0px;
      }
    }
  }
`;

export const SelectedType = styled.button`
  width: auto;
  height: 38px;
  display: flex;
  align-items: center;
  background-color: ${themeGet("colors.white", "#ffffff")};
  border: 1px solid ${themeGet("colors.borderColor", "#f1f1f1")};
  padding-top: 0;
  padding-bottom: 0;
  padding-left: ${themeGet("space.4", "15")}px;
  padding-right: ${themeGet("space.4", "15")}px;
  border-radius: ${themeGet("radius.3", "6")}px;
  outline: 0;
  min-width: 150px;
  cursor: pointer;

  span {
    display: flex;
    align-items: center;

    font-size: ${themeGet("fontSizes.2", "15")}px;
    font-weight: ${themeGet("fontWeights.6", "700")};
    color: ${themeGet("primary.color", "#009E7F")};
    text-decoration: none;

    &:first-child {
      margin-right: auto;
    }
  }
`;

export const DropDownArrow = styled.span`
  width: 12px;
  margin-left: 16px;
`;

export const SelectedLang = styled.button`
  width: auto;
  height: 38px;
  display: flex;
  align-items: center;
  background-color: ${themeGet("colors.white", "#ffffff")};
  border: 1px solid ${themeGet("colors.borderColor", "#f1f1f1")};
  padding-top: 0;
  padding-bottom: 0;
  padding-left: 10px;
  padding-right: 10px;
  border-radius: ${themeGet("radius.3", "6")}px;
  outline: 0;
  cursor: pointer;

  span {
    display: flex;
    align-items: center;

    font-size: ${themeGet("fontSizes.2", "15")}px;
    font-weight: ${themeGet("fontWeights.6", "700")};
    color: ${themeGet("primary.color", "#009E7F")};
    text-decoration: none;

    &:first-child {
      margin-right: auto;
    }
  }
`;

export const MobileHeaderInnerWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding: 25px 60px 25px;
  width: 100%;

  transition: margin-top 0.4s ease-in-out;
  opacity: 1;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.06);

  &.hideHeader {
    margin-top: -250px;
  }

  // smartphone portrait
  @media only screen and (max-device-width: 480px) {
    padding: 15px 25px 15px 20px;
  }
`;

export const MobileHeaderMainContent = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  gap: 10px;

  & .drawer__handler {
    cursor: pointer;
  }

  & .menu-item {
    display: flex;
    margin-left: 60px;

    cursor: pointer;

    @media only screen and (max-device-width: 768px) {
      margin-left: 25px;
    }
    @media only screen and (max-device-width: 415px) {
      margin-left: 10px;
    }
    .cartIcons {
      padding-right: 20px;
    }
    .avatar {
      width: 30px;
      height: 30px;
      border-radius: 50%;
    }
  }
`;

export const DrawerWrapper = styled.div`
  display: flex;
`;

export const LogoWrapper = styled.div`
  margin-left: auto;
  margin-right: auto;
  /* @media only screen and (max-device-width: 768px) {
    margin-left: 25px;
  }
  @media only screen and (max-device-width: 415px) {
    margin-left: 19px;
  } */
  img {
    display: block;
  }
`;

export const HamburgerIcon = styled.div`
  width: 26px;
  cursor: pointer;
  display: block;
  position: relative;
  > span {
    display: block;
    background-color: ${themeGet("colors.darkBold", "#0D1136")};
    border-radius: 6px;
    height: 2px;
    margin-bottom: 6px;

    transition: 0.2s ease-in-out;
    &:nth-child(1) {
      width: 26px;
    }
    &:nth-child(2) {
      width: 12px;
    }
    &:nth-child(3) {
      width: 22px;
    }
    &:last-child {
      margin-bottom: 0;
    }
  }
  &:hover {
    > span {
      &:nth-child(1) {
        width: 12px;
      }
      &:nth-child(2) {
        width: 22px;
      }
      &:nth-child(3) {
        width: 26px;
      }
    }
  }
`;

export const DrawerContentWrapper = styled.div<{ deviceType?: string }>`
  padding: ${(props) => (props.deviceType === "tablet" ? "50px" : "30px")};
  min-height: 100%;
  background-color: ${themeGet("menu.backgroundColor")};
`;

export const DrawerClose = styled.div`
  display: block;
  position: absolute;
  right: 20px;
  top: 25px;
  color: ${themeGet("colors.darkRegular", "#77798C")};
  cursor: pointer;
  z-index: 1;
  svg {
    display: block;
    height: auto;
  }
`;

export const DrawerProfile = styled.div`
  background-color: ${themeGet("colors.lightColor", "#F7F7F7")};
  padding: 45px;
`;

export const LogoutView = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  .sign_in {
    /* background: transparent; */
    border: 0;
    padding-left: 0;
    padding-right: 25px;
  }
  .sign_in,
  .sign_up {
    height: 36px;
    padding-left: 15px;
    padding-right: 15px;
  }
`;

export const LoginView = styled.div`
  display: flex;
  align-items: center;
`;

export const UserAvatar = styled.div`
  width: 50px;
  height: 50px;
  flex-shrink: 0;
  display: block;
  border-radius: 50%;
  overflow: hidden;
  margin-right: 15px;
  img {
    width: 100%;
    height: auto;
    display: block;
  }
`;

export const UserDetails = styled.div`
  h3 {
    font-size: 14px;
    font-weight: 700;
    color: ${themeGet("colors.darkBold", "#0D1136")};
    margin-bottom: 10px;
    line-height: 1.2;
  }
  span {
    display: block;
    font-size: 12px;
    font-weight: 400;
    color: ${themeGet("colors.darkBold", "#0D1136")};
  }
`;

export const DrawerMenu = styled.div`
  padding: 40px 0;
`;

export const DrawerMenuItem = styled.div`
  &:last-child {
    .drawer_menu_item {
      margin-bottom: 0;
    }
  }
  .drawer_menu_item {
    a,
    .logoutBtn {
      display: block;
      padding: 5px 45px;
      font-size: 14px;
      font-weight: 400;
      color: ${themeGet("colors.darkBold", "#0D1136")};
      margin-bottom: 19px;
      position: relative;
      transition: 0.15s ease-in-out;

      &:hover {
        color: ${themeGet("primary.color", "#009E7F")};
      }
      &:before {
        content: "";
        display: block;
        position: absolute;
        top: 0;
        left: 0;
        width: 5px;
        height: 100%;
        background: transparent;
      }
      &.current-page {
        color: ${themeGet("secondary.color", "#009E7F")};
        font-weight: 700;
        &:before {
          background-color: ${themeGet("secondary.color", "#009E7F")};
        }
      }
    }
  }
`;

export const UesrOptionMenu = styled.div`
  padding: 45px 0;
  border-top: 1px solid ${themeGet("colors.lightDarkColor", "#E6E6E6")};
`;

export const SearchModalWrapper = styled.div`
  padding-top: 25px;
  padding-bottom: 25px;
  background-color: #ffffff;
  display: flex;
  width: 100%;

  .header-modal-search {
    width: calc(100% - 60px);

    @media (max-width: 420px) {
      input {
        width: 150px;
      }
    }

    button {
      background: transparent;
      color: ${themeGet("colors.darkBold", "#0D1136")};
      padding-left: 15px;
      padding-right: 15px;
    }
    input {
      color: ${themeGet("colors.darkBold", "#0D1136")};
      padding-left: 5px;
      padding-right: 5px;
    }
  }
`;

export const SearchModalClose = styled.button`
  border: 0;
  background: transparent;
  display: block;
  padding: 0 15px;
  color: ${themeGet("colors.darkBold", "#0D1136")};
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  svg {
    display: block;
    width: 20px;
    height: auto;
  }
`;

export const LanguageItem = styled.button`
  width: 100%;
  font-size: 15px;
  font-weight: 700;
  color: ${themeGet("colors.darkBold", "#0D1136")};
  line-height: 1.2em;
  display: block;
  padding: 15px 30px;
  border-radius: 6px;
  transition: 0.15s ease-in-out;
  display: flex;
  align-items: center;
  border: 0;
  border-bottom: 1px solid ${themeGet("colors.borderColor", "#f1f1f1")};
  border-radius: 0;
  background-color: transparent;
  outline: 0;
  cursor: pointer;

  &:last-child {
    border-bottom: 0;
  }

  @media (max-width: 1400px) {
    margin-right: 10px;
    font-size: 15px;
  }

  @media only screen and (min-width: 991px) and (max-width: 1200px) {
    padding: 15px 30px;
  }

  span {
    box-shadow: 0 0 3px rgba(0, 0, 0, 0.2);
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 2px;
    overflow: hidden;
    margin-right: 15px;

    svg {
      display: block;
      width: 20px;
      height: auto;
    }
  }
`;

export const Flag = styled.div`
  margin-right: 7px;
  box-shadow: 0 0 3px rgba(0, 0, 0, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 2px;
  overflow: hidden;
  svg {
    width: 20px;
    height: auto;
  }
`;

export const TypeIcon = styled.div`
  margin-right: 7px;
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 16px;
`;

export const HeaderCartIcon = styled.div``;

export default HeaderWrapper;
