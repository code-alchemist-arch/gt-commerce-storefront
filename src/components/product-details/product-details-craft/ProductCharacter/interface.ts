export interface ProductCharacterInterface {
  characterName: string;
  characterImage: string;
  displayText: string;
}

export interface ProductCharacterContainerInterface {
  characterComponents: Array<ProductCharacterInterface>;
  fontColor: string;
}
