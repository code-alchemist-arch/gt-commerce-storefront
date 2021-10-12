import styled from "styled-components";
import { themeGet } from "@styled-system/theme-get";

export const ShopByTypesWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: auto;

  gap: 15px;

  @media screen and (max-width: 767px) {
    grid-template-columns: 1fr;
  }
`;

export const ShopByTypeItem = styled.div`
  min-height: 300px;
  position: relative;

  img {
    width: 100%;
    object-fit: cover;
  }

  @media screen and (max-width: 767px) {
    min-height: 400px;
  }
`;

export const ShopByTypeContainer = styled.div``;

export const Title = styled.div`
  display: flex;
  align-items: center;
  text-align: center;
  hr {
    flex-grow: 1;
    height: 2px;
    border: 0;
    background: ${themeGet("colors.taupe")};
    margin: 0;
  }

  span {
    color: ${themeGet("colors.brown")};
    font-weight: 600;
    font-size: 2rem;

    margin: 0 10px;
  }

  margin-bottom: 15px;
`;
