import Image from "next/image";
import { ProductCharacterInterface } from "./interface";
import styled from "styled-components";

export const ProductCharacterItem = styled.div`
  text-align: center;
  max-width: 100px;
  max-height: 80px;
  margin: 10px 20px;

  @media screen and (max-width: 767px) {
    display: flex;
    flex-direction: column;
    align-items: center;

    flex-basis: 25%;
    max-width: 25%;
    width: 25%;

    margin: 0;
  }
`;

export const ProductCharacterDisplayText = styled.span`
  color: #808080;
  font-size: 12px;
  line-height: 14px;
  text-transform: uppercase;
  font-family: Lato, sans-serif;

  max-width: 100%;
  display: block;
`;

export const ProductChar = ({
  characterName,
  characterImage,
  displayText,
}: ProductCharacterInterface): JSX.Element => (
  <ProductCharacterItem>
    <div className="product-char-img">
      <Image src={characterImage} alt={characterName} width={63} height={63} />
    </div>
    <ProductCharacterDisplayText>{displayText}</ProductCharacterDisplayText>
  </ProductCharacterItem>
);

export default ProductChar;
