import styled from "styled-components";
import { Arrow } from "../product-carousel/product-carousel.style";

export const OurFavouritesContainer = styled.div`
  margin: 30px 0;
`;

export const OurFavouritesImage = styled.div`
  display: grid;
  grid-gap: 30px;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));

  @media screen and (max-width: 700px) {
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  }

  & img {
    object-fit: cover;
  }
`;

export const OurFavouritesImageWrapper = styled.div`
  position: relative;
  height: 300px;
  cursor: pointer;

  &:hover {
    box-shadow: 0px 2px 13px rgb(0 0 0 / 25%);
    transition: box-shadow 0.3s ease-in-out;
  }
`;

export const OurFavouritesBottomSectionImageWrapper = styled.div`
  position: relative;
  height: 300px;
  cursor: pointer;

  &:hover {
    box-shadow: 0px 2px 13px rgb(0 0 0 / 25%);
    transition: box-shadow 0.3s ease-in-out;
  }
`;

export const OurFavoritesBottomWrapper = styled.div`
  margin: 50px 0 0 -10px;
  width: calc(100% + 20px);
  position: relative;
  // background: blue;

  & .carousel-button-group {
    position: absolute;
    // top: 125px;
    top: calc(50% - 64px);
    margin: 0 0 0 -15px;
    width: calc(100% + 30px);
  }

  & .react-multi-carousel-track {
    margin: 10px 0px 25px 0px;
  }
  & .react-multi-carousel-track .product-item {
    padding: 0 6px;
    .product-card {
      height: 400px;
    }
  }
  &:hover {
    ${Arrow} {
      opacity: 1;
    }
  }
`;

export const OurFavouritesBottomImage = styled.div`
  display: grid;
  grid-gap: 10px;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));

  @media screen and (max-width: 700px) {
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  }

  & img {
    object-fit: cover;
  }
`;

export const OurFavouritesBottomImageWrapper = styled.div`
  position: relative;
  height: 400px;
  cursor: pointer;

  &:hover {
    box-shadow: 0px 2px 13px rgb(0 0 0 / 25%);
    transition: box-shadow 0.3s ease-in-out;
  }
`;
