export const HOME_PAGE = "/";
export const CHECKOUT_PAGE = "/checkout";
export const CHECKOUT_PAGE_TWO = "/checkout-alternative";
export const PROFILE_PAGE = "/profile/addresses";
export const YOUR_ORDER_PAGE = "/order";
export const ORDER_RECEIVED_PAGE = "/order-received";
export const OFFER_PAGE = "/offer";
export const HELP_PAGE = "/help";
export const TERMS_AND_SERVICES_PAGE = "/terms";
export const PRIVACY_POLICY_PAGE = "/privacy";
export const LOGIN_PAGE = "/account/login";
export const REGISTER_PAGE = "/account/register";
export const RESET_PASSWORD_PAGE = "/account/reset-password";
export const RESET_PASSWORD_CONFIRM_PAGE = "/account/reset-password-confirm";
export const CONFIRM_ACCOUNT_PAGE = "/account/confirm";
// Mobile Drawer Menus

export const HOME_MENU_ITEM = {
  id: "nav.home",
  defaultMessage: "Home",
  href: HOME_PAGE,
};

export const HELP_MENU_ITEM = {
  id: "nav.help",
  defaultMessage: "Help",
  href: HELP_PAGE,
};
export const OFFER_MENU_ITEM = {
  id: "nav.offer",
  defaultMessage: "Offer",
  href: OFFER_PAGE,
};
export const ORDER_MENU_ITEM = {
  id: "nav.order",
  href: YOUR_ORDER_PAGE,
  defaultMessage: "Order",
};
export const PROFILE_MENU_ITEM = {
  id: "nav.profile",
  defaultMessage: "Profile",
  href: PROFILE_PAGE,
};
export const AUTHORIZED_MENU_ITEMS = [
  PROFILE_MENU_ITEM,
  {
    id: "nav.checkout",
    defaultMessage: "Checkout",
    href: CHECKOUT_PAGE,
  },
  {
    id: "alternativeCheckout",
    href: CHECKOUT_PAGE_TWO,
    defaultMessage: "Checkout Alternative",
  },
  ORDER_MENU_ITEM,
  {
    id: "nav.order_received",
    href: ORDER_RECEIVED_PAGE,
    defaultMessage: "Order invoice",
  },
  {
    id: "nav.terms_and_services",
    defaultMessage: "Terms and Services",
    href: TERMS_AND_SERVICES_PAGE,
  },
  {
    id: "nav.privacy_policy",
    defaultMessage: "Privacy Policy",
    href: PRIVACY_POLICY_PAGE,
  },
];

export const MOBILE_DRAWER_MENU = [
  HOME_MENU_ITEM,
  ...AUTHORIZED_MENU_ITEMS,
  HELP_MENU_ITEM,
  OFFER_MENU_ITEM,
];

export const PROFILE_SIDEBAR_TOP_MENU = [ORDER_MENU_ITEM, HELP_MENU_ITEM];
export const PROFILE_SIDEBAR_BOTTOM_MENU = [PROFILE_MENU_ITEM];

export const LANGUAGE_MENU = [
  {
    id: "ar",
    defaultMessage: "Arabic",
    icon: "SAFlag",
  },
  {
    id: "zh",
    defaultMessage: "Chinese",
    icon: "CNFlag",
  },
  {
    id: "en",
    defaultMessage: "English",
    icon: "USFlag",
  },
  {
    id: "de",
    defaultMessage: "German",
    icon: "DEFlag",
  },
  {
    id: "he",
    defaultMessage: "Hebrew",
    icon: "ILFlag",
  },
  {
    id: "es",
    defaultMessage: "Spanish",
    icon: "ESFlag",
  },
];

export const CATEGORY_MENU_ITEMS = {
  items: [
    {
      id: "1",
      label: "Wine",
      url: "/collections/wine",
      icon_slug: "menu-wine",
      children: [
        {
          id: "1",
          label: "Red",
          url: "collections/wine",
          icon_slug: "varietal",
          show_image: null,
          image: null,
          icon_list: null,
          column_position: 1,
          children: [
            {
              id: "1",
              label: "Cabernet Sauvignon",
              url: "https://www.google.com",
              icon_slug: null,
            },
            {
              id: "2",
              label: "Montepulciano",
              url: null,
              icon_slug: null,
            },
          ],
        },
        {
          id: "2",
          label: "White",
          url: null,
          icon_slug: "varietal",
          show_image: true,
          image: null,
          icon_list: null,
          column_position: 3,
          children: [],
        },
        {
          id: "3",
          label: " Rosé",
          url: null,
          icon_slug: "varietal",
          show_image: false,
          image: null,
          icon_list: null,
          column_position: 2,
          children: [],
        },
        {
          id: "4",
          label: "New collections",
          url: null,
          icon_slug: "varietal",
          show_image: null,
          image: null,
          icon_list: true,
          column_position: null,
          children: [
            {
              id: "3",
              label: "Check it out",
              url: null,
              icon_slug: "varietal",
            },
            {
              id: "4",
              label: "Superb quality",
              url: null,
              icon_slug: "varietal",
            },
          ],
        },
      ],
    },
    {
      id: "2",
      label: "Beer",
      url: "/collections/beer",
      icon_slug: "menu-beer",
      children: [],
    },
    {
      id: "3",
      label: "Spirits",
      url: "/collections/spirits",
      icon_slug: "others-spirits",
      children: [
        {
          id: "5",
          label: "All Spirits",
          url: "/collections/spirits",
          icon_slug: "spirits",
          show_image: false,
          image: null,
          icon_list: false,
          column_position: 1,
          children: [],
        },
      ],
    },
  ],
};
