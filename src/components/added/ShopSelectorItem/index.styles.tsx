import Image from "next/image";
import styled from "styled-components";

export const ShoptItemWrapper = styled.div`
  width: 300px;
  height: 300px;
  //justify-content: center;
  //align-items: center;
  margin: auto;
  padding: 9px;
  //margin-bottom: 100px;
  display: grid; /* new */
  align-items: center; /* new */
  justify-items: center; /* new */
`;
export const ShopItemLink = styled.a`
  display: block;
  height: 100%;
  width: 100%;
`;
export const ShopItemImage = styled(Image)`
  object-fit: contain;
  object-position: center;
  //width: 210px;
  //height: 210px;
  width: 290px;
  height: 290px;
  text-align: center;
`;
