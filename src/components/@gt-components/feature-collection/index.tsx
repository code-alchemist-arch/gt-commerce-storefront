import { FC } from "react";
import Image from "next/image";

import {
  ContentDescription,
  ContentHeader,
  ContentWrapper,
  DesktopImageWrapper,
  MobileImageWrapper,
  SingleFeatureWrapper,
  RewardsWrapper,
  CollectionImageWrapper,
} from "./index.styles";
import { GTButton } from "../base-components/gt-button";

export interface Reward {
  title: string;
  alt?: string;
  imageUrl: string;
}

export interface SingleFeature {
  imagePosition: "right" | "left";
  imageUrl: string;
  content: string;
  componentTitle: string;
  buyButtonUrl?: string;
  rewards?: Reward[];
}

export const FeatureCollectionComponent: FC<SingleFeature> = ({
  imagePosition = "left",
  imageUrl,
  componentTitle,
  content,
  rewards,
  buyButtonUrl = "",
}: SingleFeature) => {
  return (
    <SingleFeatureWrapper imagePosition={imagePosition}>
      <CollectionImageWrapper>
        <Image layout="fill" src={imageUrl} alt={componentTitle} />
      </CollectionImageWrapper>
      <ContentWrapper>
        <ContentHeader>{componentTitle}</ContentHeader>
        <ContentDescription>{content}</ContentDescription>
        <RewardsWrapper>
          {rewards?.map((reward) => (
            <Image
              layout="fill"
              key={reward.title}
              src={reward.imageUrl}
              alt={reward.alt}
            />
          ))}
        </RewardsWrapper>
        {buyButtonUrl !== "" && (
          <GTButton backgroundColor="#C7AD9D" hoverColor="#5C4135">
            BUY NOW
          </GTButton>
        )}
      </ContentWrapper>
    </SingleFeatureWrapper>
  );
};
