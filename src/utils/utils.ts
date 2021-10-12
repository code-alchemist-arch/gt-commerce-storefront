import { CartProduct } from "../interfaces";
import Currency from "currency.js";

export const validateEmail = (email: string): boolean => {
  if (/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
    return true;
  }
  return false;
};

export const validatePhoneNumber = (number: string): boolean => {
  if (
    /^\+?(1[-. ]?)?(([2-9]\d{2})|[2-9]\d{2})[-. ]?[2-9]\d{2}[-. ]?\d{4}$/.test(
      number
    )
  ) {
    return true;
  }
  return false;
};

export const getProductAttribute = (product, attrName: string) => {
  const attribute = product?.attributes.find(
    ({ attribute }) => attribute.name === attrName
  )?.values[0]?.name;
  return attribute;
};

export const getProductAttributeValues = (product, attrName: string) => {
  const attribute = product?.attributes
    .find(({ attribute }) => attribute.name === attrName)
    ?.values?.map((item) => item.name);
  return attribute;
};

export const getDiscountPercentage = (product) => {
  const priceUndiscounted =
    product.variants[0]?.pricing?.priceUndiscounted?.gross?.amount;
  const discount = product.variants[0]?.pricing?.discount?.gross?.amount;
  return discount
    ? ((discount * 100) / priceUndiscounted).toFixed(0)
    : undefined;
};

export const dateStringToFormat = (string: string): string => {
  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const date = new Date(string);

  const day = date.getDate();
  const monthIndex = date.getMonth();
  const year = date.getFullYear();

  return `${monthNames[monthIndex]} ${day}, ${year}`;
};

export const upsert = (array, item) => {
  const arr = [...array];
  const i = arr.findIndex((_item) => _item.id === item.id);
  if (i > -1) {
    arr[i] = item;
  } else {
    arr.push(item);
  }
  return arr;
};

export const scrollToRef = (ref, deviceType) => {
  let offset = 230; // default to desktop
  if (deviceType.mobile) {
    offset = 230;
  } else if (deviceType.tablet) {
    offset = 260;
  }

  window.scrollTo(0, ref.current.offsetTop - offset);
};

export const calculateItemPrice = (product: CartProduct): number => {
  const quantity = product.quantity ? product.quantity : 1;
  const itemPrice = Currency(quantity).multiply(product.price);
  const itemPriceValue: number = Number(itemPrice.value);
  return itemPriceValue;
};

export const getValueFromMetadata = (
  key?: string,
  metadata?: { key: string; value: string }[]
) => {
  if (!key || !metadata || metadata.length === 0) {
    return null;
  }
  return metadata.find((item) => item.key === key)?.value;
};

export const isObjectEmpty = (object) => {
  return Object.keys(object).length === 0 && object.constructor === Object;
};

export const getPaymentMethods = (
  metadata?: { key: string; value: string }[]
) => {
  const cardNumbers = metadata
    ?.filter((item) => /card_[0-9]{4}_last4/.test(item.key))
    .map((item) => item.value);
  const cards = cardNumbers?.map((number) => {
    const cardType = getValueFromMetadata(`card_${number}_brand`, metadata);
    const id = getValueFromMetadata(`card_${number}_id`, metadata);
    return {
      id,
      cardType,
      lastFourDigit: number,
    };
  });
  return cards;
};
