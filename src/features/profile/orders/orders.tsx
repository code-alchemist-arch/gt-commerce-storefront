import React, { useContext, useState } from "react";
import { ProfileContext } from "contexts/profile/profile.context";
import { OrdersWrapper, ButtonWrapper } from "./orders.style";
import { useQuery } from "@apollo/client/react/hooks";
import { ME } from "graphql/query/user.query";

import EmptyState from "components/empty-state/empty-state";
import OrderDetail from "./order-detail/order-detail";
import Loader from "../../../components/loader/loader";
import { defaultTheme } from "../../../site-settings/site-theme/default";
import { Button } from "../../authentication-form/authentication-form.style";

const Orders = ({ deviceType }) => {
  const {
    state: { email, orders },
    dispatch,
  } = useContext(ProfileContext);

  const [lastOrderCursor, setLastOrderCursor] = useState(
    orders?.pageInfo?.endCursor
  );
  const [loading, setLoading] = useState(false);

  const { data, fetchMore } = useQuery(ME, { skip: true });

  const handleLoadMore = async () => {
    setLoading(true);
    fetchMore({
      variables: {
        orderAfterCursor: lastOrderCursor,
      },
      updateQuery: (previousResult, { fetchMoreResult }) => {
        const previousEntry = previousResult.entry;
        const me = fetchMoreResult.me;
        const newCursor = fetchMoreResult.me.orders.pageInfo.endCursor;

        dispatch({
          type: "ADD_ORDERS",
          payload: { orders: fetchMoreResult.me.orders },
        });
        setLastOrderCursor(newCursor);
        setLoading(false);
        return {
          // By returning `cursor` here, we update the `fetchMore` function
          // to the new cursor.
          me,
          __typename: previousEntry?.__typename || "User",
        };
      },
    });
  };

  return (
    <OrdersWrapper>
      {!orders?.edges?.length && (
        <EmptyState
          title="You haven’t placed any orders yet"
          message="When you do, their status will appear here."
          imgSrc="/images/empty-orders.png"
        />
      )}
      {orders?.edges &&
        orders.edges.map(({ node: order }) => (
          <OrderDetail key={order.id} deviceType={deviceType} order={order} />
        ))}

      {orders?.pageInfo?.hasNextPage && (
        <ButtonWrapper>
          <Button
            onClick={handleLoadMore}
            title="Load More"
            intlButtonId="loadMoreBtn"
            size="small"
            isLoading={loading}
            loader={<Loader color={defaultTheme.colors.black} />}
            style={{
              minWidth: 135,
              backgroundColor: "transparent",
              border: "none",
              color: defaultTheme.colors.black,
            }}
          />
        </ButtonWrapper>
      )}
    </OrdersWrapper>
  );
};

export default Orders;
