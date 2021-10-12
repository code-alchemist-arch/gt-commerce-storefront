import Link from "next/link";
import styled from "styled-components";

export const FavouritesWrapper = styled.div`
  position: relative;

  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 250px;
  column-gap: 10px;

  margin-bottom: 20px;

  @media screen and (max-width: 767px) {
    grid-template-columns: 1fr;
    grid-template-rows: repeat(2, 250px);
    row-gap: 10px;
  }
`;

export const FavItem = styled.div`
  position: relative;

  img {
    width: 100%;
    object-fit: cover;
  }

  @media screen and (max-width: 767px) {
    flex: 1 0 100%;
    max-width: 100%;
    width: 100%;
  }
`;
