import React from "react";
import Image from "next/image";
import { MainFeatureGrid } from "./main-feature.style";

interface MainFeatureInterface {
  imgSrc: string;
  alt: string;
  imgPosition: "leftTop" | "leftBottom" | "middle" | "rightTop" | "rightBottom";
}

type Props = {
  items?: MainFeatureInterface[];
};

export const MainFeature: React.FC<Props> = ({ items = [] }: Props) => {
  return (
    <MainFeatureGrid>
      {items.map(({ alt, imgSrc, imgPosition }, i) => (
        <div className={imgPosition} key={i}>
          {imgSrc && (
            <Image src={imgSrc} alt={alt} layout="fill" quality="99" />
          )}
        </div>
      ))}
    </MainFeatureGrid>
  );
};
