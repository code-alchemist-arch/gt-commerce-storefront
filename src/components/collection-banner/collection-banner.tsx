import React, { useState } from "react";
import {
  BannerWrapper,
  BannerName,
  BannerShortDescription,
  BannerDescription,
  ExpandAction,
  BannerImg,
  ShowLess,
  Division,
} from "./collection-banner.style";

import { Expand } from "./icons.svg";
import Image from "next/image";
import Breadcrumb from "../breadcrumb/breadcrumb";

const CollectionBanner = ({ name, shortDescription, description }) => {
  const [collapsed, setCollapsed] = useState(true);

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  React.useEffect(() => {
    if (collapsed) {
      window.scroll({
        top: 0,
        left: 0,
        behavior: "smooth",
      });
    }
  }, [collapsed]);
  return (
    <>
      <BannerWrapper className={`${!collapsed && "expanded"}`}>
        <BannerImg>
          <Image
            src="/images/wine-banner.jpg"
            layout="fill"
            quality={95}
            priority
          />
        </BannerImg>
        <BannerName>{name}</BannerName>
        <BannerShortDescription>{shortDescription}</BannerShortDescription>
        {!collapsed && <Division />}
        {collapsed && (
          <ExpandAction onClick={toggleCollapsed}>
            <Expand />
          </ExpandAction>
        )}
        {!collapsed && (
          <>
            <BannerDescription>{description}</BannerDescription>
            <ShowLess onClick={toggleCollapsed}>Show Less</ShowLess>
          </>
        )}
      </BannerWrapper>
    </>
  );
};

export default CollectionBanner;
