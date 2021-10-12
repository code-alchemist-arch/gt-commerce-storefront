import React from "react";

import {
  ProductCardWrapper,
  ProductsGrid,
  ProductItem,
} from "./products.style";
import Fade from "react-reveal/Fade";
import { ProductCard as GTProductCard } from "components/@gt-components/product-card";
import { useCart } from "contexts/cart/use-cart";

type ProductsProps = {
  productListView?: string;
  itemsPerRow?: number;
  products: any[];
};

export const Products: React.FC<ProductsProps> = ({
  productListView,
  itemsPerRow,
  products,
}: ProductsProps) => {
  const { add } = useCart();
  /**
   * Product Card Add Cart Handler
   *
   * @param {Any} product Product to add to cart
   */
  const onClickCartHandler = (product: any) => {
    // Cart Product Type is Product Type
    const productItem = {
      ...product,
      metadata: [
        {
          __typeName: "MetadataItem",
          key: "image_srcset_primary",
          value: product?.image_srcset,
        },
      ],
      variants: [
        {
          pricing: {
            priceUndiscounted: {
              gross: {
                amount: product.retail_price,
              },
            },
            price: {
              gross: {
                amount: product.retail_price,
              },
            },
          },
        },
        {
          __typeName: "ProductVariants",
          id: product.id,
          metadata: [
            {
              __typeName: "MetadataItem",
              key: "deposit",
              value: "0.1",
            },
          ],
        },
      ],
    };

    add(productItem, 1);
  };

  return (
    <ProductsGrid mode={productListView} itemsPerRow={itemsPerRow} condensed>
      {products.map((item: any, index: number) => (
        <ProductItem key={item.id}>
          <ProductCardWrapper>
            <Fade
              spy={productListView}
              duration={800}
              delay={index * 10}
              style={{ height: "100%" }}
            >
              <GTProductCard
                link={`/products/${item.slug}`}
                data={item}
                // subTextAttribute="product_size"
                status={
                  !item.in_stock
                    ? {
                        name: "sold_out",
                        text: "Sold Out",
                      }
                    : undefined
                }
                attribute={{
                  name: "points",
                  text: "points",
                  amount: item?.rating.replace(/[^\d.]/g, ""),
                }}
                subComponentAttrIcon={false}
                subComponentAttribute="region"
                subComponentHoverAttribute="vintage"
                variant={productListView}
                onClickCartButton={() => onClickCartHandler(item)}
              />
            </Fade>
          </ProductCardWrapper>
        </ProductItem>
      ))}
    </ProductsGrid>
  );
};
export default Products;
