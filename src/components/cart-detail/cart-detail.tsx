import React, { useContext, useState } from "react";
import { FormattedMessage } from "react-intl";
import { CartContext } from "../../contexts/cart/use-cart";
import { HOME_PAGE } from "../../site-settings/site-navigation";
import { CURRENCY } from "../../utils/constant";
import { setLocalState } from "../../utils/localStorage";
import { CartItem } from "../cart-item/cart-item";
import InformationBox from "../information-box/information-box";
import Label from "../label/label";
import {
  CartGrid,
  SummaryRow,
  SummaryDivisor,
  CommentsInput,
  VoucherCode,
  ProceedCheckout,
} from "./cart-detail.style";
import EmptyCart from "../../features/carts/empty-cart";
import GoToButton from "../go-to-button/go-to-button";

const productPlaceholder = "/images/product-placeholder.png";

type Props = {
  deviceType: {
    mobile: boolean;
    tablet: boolean;
    desktop: boolean;
  };
};
const CartDetail: React.FC<Props> = ({ deviceType }: Props) => {
  const {
    products,
    totalPrice,
    subtotalPrice,
    totalQuantity,
    totalDeposits,
    totalGrams,
    update,
  } = useContext(CartContext);
  const { add } = React.useContext(CartContext);
  const [enableCheckout, setEnableCheckout] = useState(false);
  const [loaded, setLoaded] = useState(false);

  const handleCheckoutClick = () => {
    window.location.href = "/checkout";
  };

  React.useEffect(() => {
    setEnableCheckout(totalQuantity ? true : false);
  }, [totalQuantity]);

  React.useEffect(() => {
    if (products) {
      setLoaded(true);
    }
  }, [products]);

  const handleAddToCart = (e) => {
    add(
      e,
      {
        id: "UHJvZHVjdDo4Mjcy",
        name: "Mystery",
        images: [{ alt: "Mistery", url: productPlaceholder }],
        variants: [
          {
            id: "UHJvZHVjdFZhcmlhbnQ6ODUwNQ==",
            pricing: {
              price: {
                gross: { amount: 20 },
              },
            },
            priceRangeUndiscounted: {
              price: {
                gross: { amount: 20 },
              },
            },
          },
        ],
      },
      1,
      false
    );
  };

  return (
    <CartGrid deviceType={deviceType}>
      {loaded && (
        <>
          <div>
            <InformationBox title="Shopping Cart" noPadding>
              <>
                {totalQuantity === 0 ? (
                  <div style={{ margin: 30 }}>
                    <EmptyCart />
                    <GoToButton
                      href={HOME_PAGE}
                      textLink="Homepage"
                      className="go-to-homepage"
                    />
                  </div>
                ) : (
                  products.map((item) => (
                    <CartItem
                      key={item.id}
                      data={item}
                      onIncrement={() => update(item.id, item.quantity + 1)}
                      onDecrement={() => update(item.id, item.quantity - 1)}
                      onRemove={() => update(item.id, 0)}
                    />
                  ))
                )}
              </>
            </InformationBox>
          </div>

          <div className="summary">
            <InformationBox title="Order Summary" primary>
              <>
                <SummaryRow>
                  <Label text="Products" fontSize={16} />
                  <Label
                    text={`${CURRENCY} ${subtotalPrice.toFixed(2)}`}
                    fontSize={16}
                  />
                </SummaryRow>
                {!!totalDeposits && (
                  <SummaryRow>
                    <Label text="Deposit(s)" fontSize={16} />
                    <Label
                      text={`${CURRENCY} ${totalDeposits.toFixed(2)}`}
                      fontSize={16}
                    />
                  </SummaryRow>
                )}
                {!!totalGrams && (
                  <SummaryRow>
                    <Label text="Gram(s)" fontSize={16} />
                    <Label text={`${totalGrams.toFixed(2)}`} fontSize={16} />
                  </SummaryRow>
                )}
                <SummaryRow className="subtotal">
                  <Label text="Subtotal" fontSize={16} fontWeight={600} />
                  <Label
                    text={`${CURRENCY} ${totalPrice.toFixed(2)}`}
                    fontSize={16}
                    fontWeight={600}
                  />
                </SummaryRow>
                <SummaryDivisor />
                <VoucherCode>
                  If you have a discount code you can enter it in the next step.
                </VoucherCode>

                <ProceedCheckout
                  onClick={handleCheckoutClick}
                  disabled={!enableCheckout}
                >
                  <FormattedMessage
                    id="proceesCheckout"
                    defaultMessage="Proceed to checkout"
                  />
                </ProceedCheckout>
              </>
            </InformationBox>
          </div>
        </>
      )}
    </CartGrid>
  );
};

export default CartDetail;
