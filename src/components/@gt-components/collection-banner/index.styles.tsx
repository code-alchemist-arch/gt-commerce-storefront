import styled from "styled-components";

export const ShopBannerWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: repeat(2, 300px);
  grid-gap: 5px;

  @media (max-width: 767px) {
    grid-template-columns: 1fr 1fr;
    grid-template-rows: repeat(2, 250px);
  }
`;

export const CenterMap = styled.div`
  grid-column: 2 / 4;
  grid-row: 1 / 3;
  a {
    display: block;
    width: 100%;
    height: 100%;

    img {
      width: 100%;
      height: 100%;
    }
  }

  @media (max-width: 767px) {
    grid-column: 1 / 3;
    grid-row: 3 / 5;
  }
`;
