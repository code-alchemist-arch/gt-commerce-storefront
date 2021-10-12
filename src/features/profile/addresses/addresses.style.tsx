import styled from "styled-components";
import { OptionWrapper } from "components/option-card/option-card.style";
import { themeGet } from "@styled-system/theme-get";
import { EmptyStateWrapper } from "components/empty-state/empty-state.style";
import { FormWrapper } from "../../../layouts/layout.style";

export const AddressWrapper = styled.div`
  ${FormWrapper} {
    margin-top: 15px;
  }
  ${OptionWrapper} {
    margin: 15px 0;
    &:hover {
      box-shadow: none !important;
    }
  }

  ${EmptyStateWrapper} {
    margin-top: 25px;
  }
`;

export const TitleSection = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  & .title-action {
    cursor: pointer;
    text-decoration: underline;
    font-size: 13px;

    &:hover {
      color: ${themeGet("secondary.color")};
    }
  }
`;
