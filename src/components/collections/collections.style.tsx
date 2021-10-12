import styled from "styled-components";

export const CollectionsWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-auto-rows: 322px;
  grid-gap: 20px;

  &.col-2 {
    grid-template-columns: 1fr 1fr;
    grid-auto-rows: 326px;
  }
  &.col-3 {
    grid-template-columns: 1fr 1fr 1fr;
    grid-auto-rows: 326px;

    @media screen and (max-width: 812px) {
      grid-template-columns: 1fr 1fr;
      grid-auto-rows: 200px;

      & > a:first-child {
        grid-column: 1 / span 2;
      }
    }
  }
  &.col-4 {
    grid-template-columns: 1fr 1fr 1fr 1fr;
    grid-auto-rows: 424px;

    @media screen and (max-width: 812px) {
      grid-template-columns: 1fr 1fr;
      grid-auto-rows: 300px;
    }
  }

  @media screen and (max-width: 464px) {
    grid-template-columns: 1fr !important;
    grid-auto-rows: 350px !important;
    & > a {
      grid-column: 1 !important;
    }
  }
`;

export const CollectionsSmallWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: 326px;
  grid-gap: 20px;
  margin: 25px 0;
`;

export const CollectionsBigWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 326px;
  grid-gap: 25px;
  margin: 25px 0;
`;
