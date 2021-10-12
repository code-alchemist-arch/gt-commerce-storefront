import Image from "next/image";
import styled from "styled-components";

export const ShoptItemWrapper = styled.div``;
export const ShopItemLink = styled.a`
  display: block;
  height: 100%;
`;
export const ShopItemImage = styled(Image)`
  object-fit: cover;
  object-position: center;
`;
