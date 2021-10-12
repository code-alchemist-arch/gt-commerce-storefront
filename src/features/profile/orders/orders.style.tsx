import { EmptyStateWrapper } from "components/empty-state/empty-state.style";
import styled from "styled-components";
import { Box } from "../../../components/box";

export const OrdersWrapper = styled.div`
  ${Box} {
    margin-bottom: 25px;
    &:first-child {
      margin-top: 20px;
    }
  }

  ${EmptyStateWrapper} {
    margin-top: 25px;
  }
`;

export const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
`;
