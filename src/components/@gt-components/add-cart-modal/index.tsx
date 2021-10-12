import CloseIcon from "assets/icons/CloseIcon";
import { Product } from "interfaces";
import { useState, FC, useEffect } from "react";
import { themeGet } from "@styled-system/theme-get";
import { useRouter } from "next/router";
import Image from "next/image";
import { CenterModal, ModalCloseTarget } from "react-spring-modal";
import {
  ModalCloseBtn,
  ModalContent,
  ProductTitle,
  ProductImageWrapper,
  DescriptionWrapper,
  Buttons,
} from "./index.styles";
import { GTButton } from "../base-components/gt-button";

export interface IAddCartModalProp {
  addedProduct: Product;
  cartItemsCount: number;
}

export const AddCartModal: FC<IAddCartModalProp> = ({
  addedProduct,
  cartItemsCount,
}): React.ReactElement => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (addedProduct) {
      setIsOpen(true);
    }

    const timeOutId = setTimeout(() => {
      setIsOpen(false);
    }, 3000);

    return () => clearTimeout(timeOutId);
  }, [cartItemsCount, addedProduct]);

  const router = useRouter();

  const onClickCheckout = () => {
    setIsOpen(false);
    router.push("/cart");
  };

  const images = addedProduct?.metadata
    .filter((item) => item.key.includes("image_srcset"))
    .map((item) => ({
      srcSet: item.value,
      url: item.value.split(" ")[0],
    }));

  return (
    <CenterModal
      contentProps={{
        style: {
          position: "relative",
        },
      }}
      isOpen={isOpen}
      onDismiss={() => setIsOpen(false)}
    >
      <ModalContent>
        <ProductTitle>{addedProduct?.name}</ProductTitle>
        <ProductImageWrapper>
          {images && (
            <Image
              src={images[0]?.url}
              alt="Product Image"
              width={200}
              height={200}
            />
          )}
        </ProductImageWrapper>

        <DescriptionWrapper>is added to your shopping cart.</DescriptionWrapper>

        <Buttons>
          <GTButton
            backgroundColor={themeGet("secondary.color")}
            hoverColor={"rgb(102, 51, 68)"}
            disabledColor={"gray"}
            size="medium"
            onClick={() => setIsOpen(false)}
          >
            Continue Shopping
          </GTButton>
          <GTButton
            backgroundColor={themeGet("secondary.color")}
            hoverColor={"rgb(102, 51, 68)"}
            disabledColor={"gray"}
            size="medium"
            onClick={onClickCheckout}
          >
            Go to Checkout
          </GTButton>
        </Buttons>
      </ModalContent>
      <ModalCloseTarget>
        <ModalCloseBtn>
          <CloseIcon />
        </ModalCloseBtn>
      </ModalCloseTarget>
    </CenterModal>
  );
};
