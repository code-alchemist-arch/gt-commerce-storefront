import styled from "styled-components";

export const ShopSelectorWrapper = styled.div``;

export const ShopSelectorHeader = styled.div`
  position: relative;

  display: flex;
  justify-content: center;
  align-items: center;
  &::before {
    content: " ";
    width: 100%;
    height: 1px;
    background: #a88336;

    position: absolute;
    top: 50%;
    left: 0;

    z-index: 0;
  }

  h3 {
    display: block;

    padding: 5px 10px;
    background: white;

    z-index: 1;
  }
`;

export const ShopsGridWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  column-gap: 5px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr 1fr;
    row-gap: 5px;
  }
`;

export const ShopItemsWrapper = styled.div<{
  layoutType: "anchor" | "grid";
  anchorPosition: "left" | "right";
}>`
  display: grid;
  grid-template-rows: 1fr 1fr 1fr;
  grid-template-columns: ${({ layoutType }) =>
    layoutType === "anchor" ? "auto" : "1fr 1fr 1fr"};
  grid-column-start: ${({ layoutType, anchorPosition }) =>
    layoutType === "anchor" ? (anchorPosition === "left" ? 3 : 1) : 1};
  grid-column-end: ${({ layoutType, anchorPosition }) =>
    layoutType === "anchor" ? (anchorPosition === "left" ? 4 : 2) : 4};
  gap: 5px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    grid-template-rows: 1fr;
    grid-column-start: 1;
    grid-column-end: 4;
  }
`;
export const ShopMap = styled.div<{
  anchorPosition: "left" | "right";
}>`
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
