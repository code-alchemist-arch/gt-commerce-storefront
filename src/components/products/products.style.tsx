import styled from "styled-components";
import { themeGet } from "@styled-system/theme-get";

export const ProductsGrid = styled.div<{
  mode: string;
  itemsPerRow: number;
  condensed: boolean;
}>`
  display: grid;
  grid-template-columns: ${(props) =>
    props.mode === "list" ? `100%` : `repeat(6, minmax(0, 1fr))`};
  //grid-auto-rows: ${(props) => (props.mode === "list" ? `200px` : `500px`)};
  grid-gap: 15px;
  justify-content: space-between;

  /* TABLET LANDSCAPE / DESKTOP */
  @media only screen and (max-width: 1200px) {
    grid-template-columns: ${(props) =>
      props.mode === "list" ? `100%` : `repeat(4, minmax(0, 1fr))`};
  }

  @media only screen and (max-width: 960px) {
    grid-template-columns: ${(props) =>
      props.mode === "list" ? `100%` : `repeat(3, minmax(0, 1fr))`};
  }

  @media only screen and (max-width: 660px) {
    grid-template-columns: ${(props) =>
      props.mode === "list" ? `100%` : `repeat(2, minmax(0, 1fr))`};
    grid-gap: 10px;
    grid-auto-rows: ${(props) => (props.mode === "list" ? `200px` : `350px`)};
  }
`;

export const ProductItem = styled.a``;

export const ButtonWrapper = styled.div`
  text-align: center;
  margin-top: 30px;
`;

export const ProductsCol = styled.div`
  flex: 0 0 20%;
  max-width: 20%;
  padding-left: 15px;
  padding-right: 15px;
  margin-bottom: 30px;

  @media (min-width: 1501px) {
    &:nth-child(5n + 1) {
      .book-card {
        border-radius: 6px 0 0 6px;
      }
    }

    &:nth-child(5n) {
      .book-card {
        border-radius: 0 6px 6px 0;
      }
    }
  }

  @media (min-width: 1301px) and (max-width: 1500px) {
    flex: 0 0 25%;
    max-width: 25%;

    &:nth-child(4n + 1) {
      .book-card {
        border-radius: 6px 0 0 6px;
      }
    }

    &:nth-child(4n) {
      .book-card {
        border-radius: 0 6px 6px 0;
      }
    }
  }

  @media (min-width: 768px) and (max-width: 1300px) {
    flex: 0 0 33.3333333%;
    max-width: 33.3333333%;

    &:nth-child(3n + 1) {
      .book-card {
        border-radius: 6px 0 0 6px;
      }
    }

    &:nth-child(3n) {
      .book-card {
        border-radius: 0 6px 6px 0;
      }
    }
  }
  @media (max-width: 1199px) and (min-width: 991px) {
    padding-left: 10px;
    padding-right: 10px;
    margin-bottom: 20px;
  }
  @media (max-width: 768px) {
    padding-left: 7.5px;
    padding-right: 7.5px;
    margin-bottom: 15px;
  }
  @media (max-width: 767px) {
    flex: 0 0 50%;
    max-width: 50%;

    &:nth-child(2n + 1) {
      .book-card {
        border-radius: 6px 0 0 6px;
      }
    }

    &:nth-child(2n) {
      .book-card {
        border-radius: 0 6px 6px 0;
      }
    }
  }
`;

export const NoResult = styled.div`
  width: 100%;
  padding: 100px 30px;
  display: flex;
  justify-content: center;
  align-items: center;

  font-size: ${themeGet("fontSizes.4", "21")}px;
  font-weight: ${themeGet("fontWeights.6", "700")};
  color: ${themeGet("colors.darkBold", "#0D1136")};
`;

export const LoaderWrapper = styled.div`
  width: 100%;
  height: 100vh;
`;

export const LoaderItem = styled.div`
  & > svg {
    height: 100%;
    width: 100%;

    rect {
      width: 300%;
      @media (max-width: 768px) {
        width: 200%;
      }
    }
  }
`;

export const ProductCardWrapper = styled.div`
  height: 100%;

  > div {
    height: 100%;
  }
`;
