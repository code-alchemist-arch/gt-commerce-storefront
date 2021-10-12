import styled from "styled-components";

export const FavouritesGalleryWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: 225px;
  column-gap: 10px;

  @media screen and (max-width: 767px) {
    grid-template-columns: 1fr 1fr;
    grid-template-rows: repeat(2, 225px);
    row-gap: 10px;
  }
`;

export const FavItem = styled.div`
  position: relative;

  img {
    width: 100%;
    object-fit: cover;
  }
`;
