import styled from "styled-components";

export const SortBySelectWrapper = styled.div`
  & .mobile > div {
    min-width: 148px;
    @media screen and (max-width: 320px) {
      min-width: 113px;
    }
  }
`;
