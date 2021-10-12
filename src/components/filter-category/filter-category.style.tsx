import styled from "styled-components";
import { themeGet } from "@styled-system/theme-get";

export const FilterCategoryWrapper = styled.div`
  display: flex;
  align-items: center;
  width: fit-content;
  padding: 1px 10px;
  border-radius: 98px;
  cursor: pointer;
  margin: 1px 0;

  &:hover {
    background: ${themeGet("colors.lightGray")};
  }

  &.selected {
    background: ${themeGet("colors.lightGray")};
  }

  & svg {
    margin-left: 7px;
  }
`;
