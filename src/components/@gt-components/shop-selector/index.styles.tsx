import styled from "styled-components";

export const ShopSelectorWrapper = styled.div`
  margin: auto;
  margin-bottom: 20px;
`;

export const ShopSelectorHeader = styled.div`
  position: relative;

  display: flex;
  justify-content: center;
  align-items: center;

  margin-bottom: 20px;

  h3 {
    position: relative;
    display: block;
    padding: 5px 10px;

    z-index: 1;
    &::before,
    &::after {
      content: " ";
      width: 100%;
      height: 1px;
      background: #a88336;

      position: absolute;
      top: 50%;

      z-index: 0;
    }

    &::before {
      left: 100%;
    }

    &::after {
      right: 100%;
    }
  }
`;

export const ShopsGridWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: repeat(3, 250px);
  column-gap: 5px;
  row-gap: 5px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    grid-template-rows: 300px;
  }
`;

export const ShopItemsWrapper = styled.div<{
  layoutType: "anchor" | "grid" | string;
  anchorPosition: "left" | "right" | string;
}>`
  display: grid;
  grid-template-rows: 1fr 1fr 1fr;
  grid-template-columns: ${({ layoutType }) =>
    layoutType === "anchor" ? "auto" : "1fr 1fr 1fr"};
  grid-column-start: ${({ layoutType, anchorPosition }) =>
    layoutType === "anchor" ? (anchorPosition === "left" ? 3 : 1) : 1};
  grid-column-end: ${({ layoutType, anchorPosition }) =>
    layoutType === "anchor" ? (anchorPosition === "left" ? 4 : 2) : 4};
  row-gap: 5px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    grid-template-rows: 1fr;
    grid-column-start: 1;
    grid-column-end: 4;
  }
`;
export const ShopMap = styled.div<{
  anchorPosition: "left" | "right" | string;
}>`
  position: relative;
  grid-column-start: ${({ anchorPosition }) =>
    anchorPosition === "left" ? 1 : 2};
  grid-column-end: ${({ anchorPosition }) =>
    anchorPosition === "left" ? 3 : 4};
  grid-row-start: 1;
  grid-row-end: 4;

  display: flex;

  background: #eeeeee;

  overflow: hidden;

  img {
    object-position: center;
    object-fit: cover;

    height: 100%;
    width: 100%;
  }

  @media (max-width: 768px) {
    grid-column-start: 1;
    grid-column-end: 4;
    grid-row-start: 1;
    grid-row-end: 3;
  }
`;
