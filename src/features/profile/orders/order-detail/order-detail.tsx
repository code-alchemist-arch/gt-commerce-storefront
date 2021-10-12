import React, { useState } from "react";
import {
  OrderDetailWrapper,
  OrderMetadataItem,
  OrderMetadata,
  OrderStatus,
  OrderDetailMore,
  OrderDetailContentWrapper,
  OrderDetailAddress,
  OrderDetailPricing,
  ViewDetail,
} from "./order-detail.style";
import { dateStringToFormat, getProductAttribute } from "utils/utils";
import { Order } from "../../../../interfaces";
import ExpandIcon from "../../../../assets/icons/ExpandIcon";
import Label from "../../../../components/label/label";
import ProgressBox from "../../../../components/progress-box/progress-box";
import { CURRENCY } from "../../../../utils/constant";
import { defaultTheme } from "../../../../site-settings/site-theme/default";
import OrderItem from "./order-item/order-item";
import InformationBox from "../../../../components/information-box/information-box";

type Props = {
  order: Order;
};

const OrderDetail = ({ order }: Props) => {
  const statusOptions = ["Received", "Procesing", "Fullfilled", "Shipped"];
  const [detailExpanded, setDetailExpanded] = useState(false);

  return (
    <InformationBox>
      <>
        <OrderDetailWrapper>
          <OrderMetadata>
            <OrderMetadataItem>
              <div className="title">ORDER</div>
              <div className="value">#{order.number}</div>
            </OrderMetadataItem>
            <OrderMetadataItem>
              <div className="title">DATE</div>
              <div className="value">{dateStringToFormat(order.created)}</div>
            </OrderMetadataItem>
            <OrderMetadataItem>
              <div className="title">TOTAL ${order.total?.currency}</div>
              <div className="value">
                {CURRENCY} {order.total?.gross?.amount}
              </div>
            </OrderMetadataItem>
            <OrderMetadataItem showOnMobile>
              <div className="title">STATUS</div>
              <div className="value">{order.statusDisplay}</div>
            </OrderMetadataItem>
          </OrderMetadata>
          <OrderStatus>
            <ProgressBox
              data={statusOptions}
              status={[
                { index: 1, date: "08/22" },
                { index: 2, date: "08/24" },
              ]}
            />
          </OrderStatus>
          <OrderDetailMore
            className={detailExpanded && "expanded"}
            onClick={() => setDetailExpanded(!detailExpanded)}
          >
            <ExpandIcon width={35} height={35} />
          </OrderDetailMore>
        </OrderDetailWrapper>
        <OrderDetailContentWrapper className={detailExpanded ? "expanded" : ""}>
          {order.lines.map((item) => (
            <OrderItem
              key={item.id}
              item={{
                img: item.thumbnail,
                title: item.variant?.product.name,
                vintage: getProductAttribute(item.variant?.product, "Vintage"),
                quantity: item.quantity,
                subtotal: item.totalPrice?.gross?.amount,
                unitPrice: item.unitPrice?.gross?.amount,
              }}
            />
          ))}

          <OrderDetailPricing>
            <div className="itemPrice">
              Subtotal
              <div className="price"> ${order.subtotal?.gross?.amount}</div>
            </div>
            {!!order.discount?.amount && (
              <div className="itemPrice">
                Discount
                <div className="price">${order.discount?.amount}</div>
              </div>
            )}
            <div className="itemPrice">
              Shipping
              <div className="price">${order.shippingPrice?.gross?.amount}</div>
            </div>
            <div className="itemPrice">
              Taxes
              <div className="price">${order.total?.tax?.amount}</div>
            </div>
            <div className="total">
              Total
              <div className="price">
                {order.total?.currency} ${order.total?.gross?.amount}
              </div>
            </div>
          </OrderDetailPricing>
          <OrderDetailAddress>
            <div className="shippingAddress">
              <Label
                iconColor={defaultTheme.primary.color}
                iconName="shipping"
                text="Shipping Address"
                fontWeight={600}
              />
              <div className="description">
                {/* 711 W. Broadway @, Heather St, Vancouver, BC V5Z 3Y2, Canada */}
                {`${order.shippingAddress.streetAddress1}, ${order.shippingAddress.city}, ${order.shippingAddress.countryArea}, ${order.shippingAddress.postalCode}, ${order.shippingAddress.country?.country}`}
              </div>
            </div>
            <div className="billingAddress">
              <Label
                iconColor={defaultTheme.primary.color}
                iconName="billing"
                text="Billing Address"
                fontWeight={600}
              />
              <div className="description">
                {`${order.billingAddress.streetAddress1}, ${order.billingAddress.city}, ${order.billingAddress.countryArea}, ${order.billingAddress.postalCode}, ${order.billingAddress.country?.country}`}
              </div>
            </div>
          </OrderDetailAddress>
        </OrderDetailContentWrapper>
        <ViewDetail onClick={() => setDetailExpanded(!detailExpanded)}>
          {detailExpanded ? "Hide Details" : "View details"}
        </ViewDetail>
      </>
    </InformationBox>
  );
};

export default OrderDetail;
