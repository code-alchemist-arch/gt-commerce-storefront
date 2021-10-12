import React from "react";
import dynamic from "next/dynamic";

import {
  MainContentArea,
  ContentSection,
  ContentRow,
  ContentRowInner,
  BasicHomeTitle,
} from "assets/styles/pages.style";
// Static Data Import Here
import { SEO } from "components/seo";
import { GetStaticProps } from "next";
import fetcher from "../utils/fetcher";
import { GET_HOMEPAGE_CONTENT } from "../graphql/query/cms/homepage.query";
import { MainFeature } from "../components/main-feature/main-feature";
import { GET_GENERAL_OPTIONS } from "../graphql/query/cms/general_options.query";
import { TrendingNow } from "../components/trending-now/trending-now";
import { Links } from "../components/links/links";
import { OurFavourites } from "../components/our-favourites/our-favourites";
import Collections from "../components/collections/collections";
import styled from "styled-components";
import MainCarousel from "../components/embla-carousel/main-carousel";

const CartPopUp = dynamic(() => import("features/carts/cart-popup"), {
  ssr: false,
});

export const CollectionSection = styled.div`
  margin: 50px 0;
`;

type HomePageProps = {
  deviceType: {
    mobile: boolean;
    tablet: boolean;
    desktop: boolean;
  };
  homepageContent: {
    homepage: any;
    mainSlider: any;
  };
  generalSettings: {
    generalOption: {
      show_favourite: boolean;
    };
  };
};

const HomePage: React.FC<HomePageProps> = ({
  deviceType,
  homepageContent,
  generalSettings,
}) => {
  const {
    main_feature,
    urls,
    our_favourites,
    content,
    show_main_slider,
  } = homepageContent.homepage;

  const mainFeatureList =
    main_feature && main_feature.image
      ? main_feature.image.map((i) => ({
          ...i,
          imgSrc: i.file?.url,
        }))
      : [];

  const exploreLinks = urls && urls.find((url) => url.type === "explore");
  const infoLinks = urls && urls.find((url) => url.type === "info");

  const index = deviceType?.desktop
    ? "desktop"
    : deviceType?.tablet
    ? "tablet"
    : "mobile";

  const banners =
    show_main_slider && homepageContent.mainSlider
      ? homepageContent.mainSlider?.[index]
          .filter((i) => i.file && i.active)
          .map((i) => ({
            id: i.id,
            src: i.file?.url,
            alt: i.alt,
            link: i.link,
          }))
      : [];

  return (
    <>
      <SEO title={"Craft Cellars"} description={"Craft Cellars"} />
      <MainContentArea>
        {show_main_slider ? (
          <MainCarousel items={banners} mobileIndex={index} />
        ) : (
          ""
        )}
        <ContentSection fullWidth>
          <ContentRow>
            <ContentRowInner>
              {main_feature && <MainFeature items={mainFeatureList} />}
            </ContentRowInner>
          </ContentRow>
          <ContentRow background="#eeeef1">
            <ContentRowInner fullwidth={true}>
              <TrendingNow />
            </ContentRowInner>
          </ContentRow>
          <ContentRow background="#eeeef1">
            <ContentRowInner fullwidth={true}>
              <TrendingNow title={"Second Carousel Placeholder"} />
            </ContentRowInner>
          </ContentRow>
          {exploreLinks && (
            <ContentRow>
              <Links
                title={exploreLinks.title}
                links={exploreLinks.items}
                columns={exploreLinks.columns}
                linkLayout={exploreLinks.iconPosition}
                showSearch
              />
            </ContentRow>
          )}
          {our_favourites && (
            <ContentRow background="#eeeef1">
              <ContentRowInner>
                <OurFavourites
                  images={our_favourites.images}
                  products={our_favourites.products}
                  deviceType={deviceType}
                  title={our_favourites.title}
                  subtitle={our_favourites.subtitle}
                  showFavourite={generalSettings?.generalOption.show_favourite}
                />
              </ContentRowInner>
            </ContentRow>
          )}
          {infoLinks && (
            <ContentRow>
              <ContentRowInner>
                <Links
                  title={infoLinks.title}
                  links={infoLinks.items}
                  columns={infoLinks.columns}
                  linkLayout={infoLinks.iconPosition}
                />
              </ContentRowInner>
            </ContentRow>
          )}

          {content?.map((element, index) => {
            if (element.__typename === "ComponentElementsCollectionBanners") {
              return (
                <ContentRow background="#eeeef1" key={index}>
                  <BasicHomeTitle>FEATURED PRODUCTS</BasicHomeTitle>
                  <ContentRowInner>
                    <CollectionSection key={index}>
                      <Collections
                        items={element.banners
                          .filter((banner) => banner.active)
                          .map((banner) => ({
                            id: banner.id,
                            title: banner.title,
                            subtitle: banner.subtitle,
                            imgSrc: banner.image?.url,
                            iconName: banner.icon_slug,
                            color: banner.color || "taupe",
                            link: banner.link || "/",
                          }))}
                      />
                    </CollectionSection>
                  </ContentRowInner>
                </ContentRow>
              );
            }
          })}
        </ContentSection>
      </MainContentArea>
      <CartPopUp />
    </>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const homepageContent = await fetcher(GET_HOMEPAGE_CONTENT);
  const generalSettings = await fetcher(GET_GENERAL_OPTIONS);
  return {
    props: {
      homepageContent,
      generalSettings,
    },
    revalidate: 60,
  };
};

export default HomePage;
