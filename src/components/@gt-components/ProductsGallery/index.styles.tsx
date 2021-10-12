import styled from "styled-components";

export const ProductGalleryWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: auto;

  gap: 15px;

  @media screen and (max-width: 767px) {
    grid-template-columns: 1fr 1fr;
  }
`;

export const GalleryItem = styled.div`
  display: flex;
  position: relative;
  min-height: 250px;
  height: 300px;

  img {
    width: 100%;
    object-fit: cover;
  }
`;
