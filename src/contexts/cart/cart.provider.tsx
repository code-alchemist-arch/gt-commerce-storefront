import Currency from "currency.js";
import React, { useState, useReducer } from "react";
import { getLocalState, setLocalState } from "utils/localStorage";
import { Product, Coupon } from "interfaces";
import { CartContext } from "./use-cart";
import { getValueFromMetadata } from "../../utils/utils";

const initialState = {
  isOpen: false,
};

function reducer(cartState: any, action: any) {
  switch (action.type) {
    case "OPEN":
      return {
        ...cartState,
        isOpen: true,
      };
    case "CLOSE":
      return {
        ...cartState,
        isOpen: false,
      };
    case "TOGGLE":
      return {
        ...cartState,
        isOpen: !cartState.isOpen,
      };
    default:
      return cartState;
  }
}

const getCartProducts = () => {
  const products = getLocalState("cartProducts");
  return products ? products : [];
};

const getTotalPrice = () => {
  const price = getLocalState("totalPrice");
  return price ? price : 0;
};

const getSubTotalPrice = () => {
  const price = getLocalState("subTotalPrice");
  return price ? price : 0;
};

const getTotalQuantity = () => {
  const quantity = getLocalState("totalQuantity");
  return quantity ? quantity : 0;
};

const getTotalDeposits = () => {
  const quantity = getLocalState("totalDeposits");
  return quantity ? quantity : 0;
};

const getTotalGrams = () => {
  const quantity = getLocalState("totalGrams");
  return quantity ? quantity : 0;
};

const getCoupon = () => {
  const coupon = getLocalState("coupon");

  if (coupon) return coupon;

  return {
    id: 0,
    code: "DEFAULT_COUPON",
    discountInPercent: 0,
  };
};
const getDiscount = () => {
  const discount = getLocalState("discount");
  return discount ? discount : 0;
};

export const CartProvider = (props: any) => {
  const [cartState, dispatch] = useReducer(reducer, initialState);
  const [products, setProducts] = useState(getCartProducts() as Product[]);
  const [addedProduct, setAddedProduct] = useState<Product>(null);
  const [totalPrice, setTotalPrice] = useState(getTotalPrice() as number);
  const [totalQuantity, setTotalQuantity] = useState(
    getTotalQuantity() as number
  );
  const [totalDeposits, setTotalDeposits] = useState(
    getTotalDeposits() as number
  );
  const [totalGrams, setTotalGrams] = useState(getTotalGrams() as number);
  const [subtotalPrice, setSubTotalPrice] = useState(
    getSubTotalPrice() as number
  );
  const [coupon, setCoupon] = useState(getCoupon() as Coupon);
  const [discount, setDiscount] = useState(getDiscount() as number);

  const setPrice = (
    coupon = getCoupon(),
    totalDeposits = getTotalDeposits()
  ) => {
    const price = calculateTotalPrice(products, totalDeposits, coupon);
    setLocalState("totalPrice", price);
    setTotalPrice(price);
  };

  const setQuantity = () => {
    const quantity = products.reduce(
      (accumulator, item) => item.quantity + accumulator,
      0
    );
    setLocalState("totalQuantity", quantity);
    setTotalQuantity(quantity);
  };

  const setDeposits = () => {
    const deposits = products.reduce((accumulator, item) => {
      const deposit = getValueFromMetadata(
        "deposit",
        item.variants[0]?.metadata
      );
      return deposit
        ? Currency(deposit, { precision: 2 })
            .multiply(item.quantity)
            .add(accumulator).value
        : 0;
    }, 0);
    setLocalState("totalDeposits", deposits);
    setTotalDeposits(deposits);
  };

  const setGrams = () => {
    const totalGrams = products.reduce((accumulator, item) => {
      const grams = getValueFromMetadata(
        "equivalent_g",
        item.variants[0]?.metadata
      );
      return grams
        ? Currency(grams, { precision: 2 })
            .multiply(item.quantity)
            .add(accumulator).value
        : 0;
    }, 0);
    setLocalState("totalGrams", totalGrams);
    setTotalGrams(totalGrams);
  };

  const calculateTotalPrice = (
    products: Product[],
    totalDeposits: number,
    coupon: Coupon
  ): number => {
    let total = Currency(0);
    let finalTotal;
    products.forEach((product) => {
      const productPrice = product.variants[0]?.pricing?.price?.gross?.amount;
      const productSalePrice =
        product.variants[0]?.priceUndiscounted?.price?.gross?.amount;
      const quantity = product.quantity ? product.quantity : 1;
      const price = productSalePrice ? productSalePrice : productPrice;
      const itemPrice = Currency(quantity).multiply(price);
      total = Currency(total).add(itemPrice);
    });
    finalTotal = Number(total.value);
    setLocalState("subTotalPrice", finalTotal);
    setSubTotalPrice(finalTotal);
    if (coupon.discountInPercent) {
      const discount = (finalTotal * Number(coupon.discountInPercent)) / 100;
      setLocalState("discount", discount);
      setDiscount(discount);
      finalTotal = finalTotal - discount;
    }
    if (totalDeposits) {
      finalTotal = finalTotal + totalDeposits;
    }
    return finalTotal;
  };

  const add = (item: Product, addQuantity = 1, animation = true) => {
    setAddedProduct(item);
    // TODO: cookie storage
    if (products.length) {
      const index = products.findIndex((product) => product.id === item.id);
      if (index !== -1) {
        // if product already available in the cart
        const product = products[index];
        const quantity = product.quantity ? product.quantity : 0;
        products[index] = {
          ...product,
          ...item,
          quantity: quantity + addQuantity,
        }; // just increase the quantity
      } else {
        // if this product is not available in the cart
        products.push({ ...item, quantity: addQuantity });
      }
    } else {
      // if the cart is empty
      products.push({ ...item, quantity: addQuantity });
    }

    setLocalState("cartProducts", products);
    setProducts([...products]);
    setQuantity();
    setDeposits();
    setGrams();
    setPrice();
  };

  const addCoupon = (coupon: Coupon) => {
    setLocalState("coupon", coupon);
    setCoupon(coupon);
    setPrice(coupon);
  };

  const removeCoupon = () => {
    setLocalState("coupon", {
      id: 0,
      code: "DEFAULT_COUPON",
      discountInPercent: 0,
    });
    setLocalState("discount", 0);
    setCoupon({
      id: 0,
      code: "DEFAULT_COUPON",
      discountInPercent: 0,
    });
    setPrice({
      id: 0,
      code: "DEFAULT_COUPON",
      discountInPercent: 0,
    });
  };

  const update = (itemId: any, quantity: number) => {
    const index = products.findIndex((product) => product.id === itemId);
    if (quantity < 1 && index > -1) {
      // delete if quantity, 0
      products.splice(index, 1);
    } else {
      // update quantity
      const product = products[index];
      products[index] = { ...product, quantity };
    }

    setLocalState("cartProducts", products);
    setProducts([...products]);
    if (!products.length) {
      setLocalState("coupon", {
        id: 0,
        code: "DEFAULT_COUPON",
        discountInPercent: 0,
      });
      setLocalState("discount", 0);
      setDiscount(0);
      setCoupon({
        id: 0,
        code: "DEFAULT_COUPON",
        discountInPercent: 0,
      });
    }
    setQuantity();
    setDeposits();
    setGrams();
    setPrice();
  };

  const clearCart = () => {
    setLocalState("cartProducts", []);
    setProducts([]);
    setLocalState("discount", 0);
    setDiscount(0);
    setCoupon({
      id: 0,
      code: "DEFAULT_COUPON",
      discountInPercent: 0,
    });
    setLocalState("coupon", {
      id: 0,
      code: "DEFAULT_COUPON",
      discountInPercent: 0,
    });
    // setPrice();
    setLocalState("totalPrice", 0);
    setTotalPrice(0);
    setLocalState("totalQuantity", 0);
    setTotalQuantity(0);
    setLocalState("subTotalPrice", 0);
    setSubTotalPrice(0);
    setLocalState("totalDeposits", 0);
    setTotalDeposits(0);
  };

  const isInCartHandler = (id) => {
    return products?.some((item) => item.id === id);
  };

  const getItemHandler = (id) => {
    return products?.find((item) => item.id === id);
  };

  const toggleCartHandler = () => {
    dispatch({ type: "TOGGLE" });
  };

  return (
    <CartContext.Provider
      value={{
        isOpen: cartState.isOpen,
        cartState,
        dispatch,
        addedProduct,
        setAddedProduct,
        products,
        add,
        update,
        totalPrice,
        totalQuantity,
        totalDeposits,
        totalGrams,
        addCoupon,
        coupon,
        discount,
        removeCoupon,
        subtotalPrice,
        clearCart,
        isInCart: isInCartHandler,
        getItem: getItemHandler,
        toggleCart: toggleCartHandler,
        cartItemsCount: products?.reduce((a, b) => a + b.quantity || 0, 0),
      }}
    >
      {props.children}
    </CartContext.Provider>
  );
};
