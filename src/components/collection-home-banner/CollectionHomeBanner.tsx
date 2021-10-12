import React from "react";
import {
  CollectionHomeBannerWrapper,
  CollectionInfo,
  CollectionSubtitle,
} from "./CollectionHomeBanner.style";
import Label from "components/label/label";
import Image from "next/image";

type CollectionProps = {
  title: string;
  subtitle: string;
  imgSrc: string;
  iconName: string;
  color?: "orange" | "yellow" | "gray" | "taupe";
  labelPosition?: "top" | "bottom";
  showLabel?: boolean;
};

const CollectionHomeBanner: React.FC<CollectionProps> = ({
  imgSrc,
  title,
  subtitle,
  iconName,
  color = "taupe",
  labelPosition = "top",
  showLabel = false,
}: CollectionProps) => {
  return (
    <>
      <CollectionHomeBannerWrapper
        className={labelPosition === "bottom" ? "labelBottom" : ""}
      >
        {showLabel && (
          <CollectionInfo className={color}>
            <Label
              color="#fff"
              fontSize={18}
              fontWeight={600}
              text={title}
              iconName={iconName}
            />
            <CollectionSubtitle>{subtitle}</CollectionSubtitle>
          </CollectionInfo>
        )}
        {imgSrc && (
          <Image src={imgSrc} alt={title} layout="fill" quality="99" />
        )}
      </CollectionHomeBannerWrapper>
    </>
  );
};

export default CollectionHomeBanner;
