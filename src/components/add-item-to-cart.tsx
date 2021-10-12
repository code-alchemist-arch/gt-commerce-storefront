import React, { useState } from "react";
import styled from "styled-components";
import css from "@styled-system/css";
import { useCart } from "contexts/cart/use-cart";
import { Counter } from "./counter/counter";
import { variant as _variant } from "styled-system";
import { Box } from "./box";
import { initializeApollo } from "../utils/apollo";
import { GET_PRODUCT } from "../graphql/query/products.query";
const Icon = styled.span<any>(
  _variant({
    variants: {
      full: {
        px: 3,
        height: 36,
        backgroundColor: "#e6e6e6",
        display: "flex",
        transition: "0.35s ease-in-out",
        alignItems: "center",
      },
    },
  })
);
const Button = styled.button<any>(
  css({
    width: 36,
    height: 36,
    borderRadius: 6,
    transition: "0.35s ease-in-out",
    backgroundColor: "#fff",
    border: "1px solid",
    borderColor: "#e6e6e6",
    cursor: "pointer",
    ":hover": {
      backgroundColor: "primary.regular",
      borderColor: "primary.regular",
      color: "#fff",
    },
  }),
  _variant({
    variants: {
      full: {
        width: "100%",
        display: "flex",
        alignItems: "center",
        backgroundColor: "#f3f3f3",
        padding: 0,
        border: "none",
        overflow: "hidden",
        ":hover": {
          backgroundColor: "primary.hover",
          borderColor: "primary.hover",
          color: "#fff",
          [Icon]: {
            backgroundColor: "primary.regular",
            color: "#fff",
          },
        },
      },
      disabled: {
        color: "white",
        backgroundColor: "disabled",
        borderColor: "disabled",
        cursor: "not-allowed",
        ":hover": {
          color: "white",
          backgroundColor: "disabled",
          borderColor: "disabled",
        },
      },
    },
  })
);

interface Props {
  data?: any;
  slug?: string;
  variant?: string;
  buttonText?: string;
  disabled?: boolean;
}

export const AddItemToCart = ({
  data,
  variant,
  buttonText,
  slug,
  disabled,
}: Props) => {
  const { add, update, getItem, isInCart } = useCart();
  const [product, setProduct] = useState(null);

  const getProductData = async (slug: string) => {
    const apolloClient = initializeApollo();

    const { data } = await apolloClient.query({
      query: GET_PRODUCT,
      variables: {
        slug,
        channel: process.env.API_CHANNEL,
      },
    });
    const { product: p } = data;
    setProduct(p);
    return p;
  };

  const handleAddClick = async (e) => {
    e.stopPropagation();
    e.preventDefault();
    if (disabled) {
      return;
    }
    if (slug) {
      if (product) {
        add(product);
      } else {
        const p = await getProductData(slug);
        add(p);
      }
    } else {
      add(data);
    }
    // if (!isInCart(data.id)) {
    //   cartAnimation(e);
    // }
  };
  const handleRemoveClick = async (e) => {
    e.stopPropagation();
    e.preventDefault();
    let p;
    if (slug) {
      if (product) {
        p = product;
      } else {
        p = await getProductData(slug);
      }
    } else {
      p = data;
    }
    const item = getItem(p.id);
    update(item.id, item?.quantity - 1);
  };
  return !isInCart(data.gtc_product || data.id) ? (
    <Button
      aria-label="add item to cart"
      onClick={handleAddClick}
      variant={disabled ? "disabled" : variant}
      disabled={disabled}
    >
      {!!buttonText && <Box flexGrow={1}>{buttonText}</Box>}
      <Icon variant={variant}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="10"
          height="10"
          viewBox="0 0 10 10"
        >
          <path
            data-name="Path 9"
            d="M143.407,137.783h-1.25v4.375h-4.375v1.25h4.375v4.375h1.25v-4.375h4.375v-1.25h-4.375Z"
            transform="translate(-137.782 -137.783)"
            fill="currentColor"
          />
        </svg>
      </Icon>
    </Button>
  ) : (
    <Counter
      value={getItem(data.gtc_product || data.id).quantity}
      onDecrement={handleRemoveClick}
      onIncrement={handleAddClick}
      className="card-counter"
      variant={variant || "altHorizontal"}
    />
  );
};
