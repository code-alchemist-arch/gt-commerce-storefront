import React, { useContext } from "react";
import Head from "next/head";
import { GetStaticProps, NextPage } from "next";
import dynamic from "next/dynamic";
import {
  InstantSearch as TypesenseInstantSearch,
  Configure,
  SearchBox,
  connectInfiniteHits,
  connectSortBy,
  connectCurrentRefinements,
} from "react-instantsearch-dom";

import { DeviceType } from "../../interfaces";
import {
  MainContentArea,
  ContentSection,
  ContentRow,
  ContentRowInner,
} from "../../assets/styles/pages.style";
// import CollectionBanner from "../../components/collection-banner/collection-banner";
import {
  CollectionTeaser,
  CollectionTeaserContent,
  CollectionTeasers,
  CollectionWrapper,
  ContentControls,
  DesktopFilters,
  FilterTagsContainer,
  FilterTagsWrapper,
  Tag,
  FiltersWrapper,
} from "../../layouts/layout.style";
import Products from "../../components/products/products";
import { initializeApollo } from "../../utils/apollo";
import { GET_COLLECTION_BY_SLUG } from "../../graphql/query/collection.query";
import { TypesenseContext } from "../../contexts/typesense/typesense.context";
import { ButtonWrapper } from "../../components/products/products.style";
import { Button } from "../../components/button/button";
import { FormattedMessage } from "react-intl";
import { GET_GENERAL_OPTIONS } from "../../graphql/query/cms/general_options.query";
import fetcher from "../../utils/fetcher";
import SortBySelect from "../../components/sort-by-select/sort-by-select";
import ProductViewSwitch from "../../components/product-view-switch/product-view-switch";
import useProductListView from "../../utils/useProductListView";
import Breadcrumb from "../../components/breadcrumb/breadcrumb";
import { GET_PRODUCT_GENERAL } from "../../graphql/query/cms/product_general.query";
import Image from "next/image";
import { GET_HOMEPAGE_CONTENT } from "graphql/query/cms/homepage.query";
import { MainFeature } from "components/main-feature/main-feature";
import { ProductGallery } from "components/@gt-components/ProductsGallery";
import { TrendingNow } from "components/trending-now/trending-now";
import CloseIcon from "assets/icons/CloseIcon";
import Filters from "../../components/filters/filters";
import MainCarousel from "components/embla-carousel/main-carousel";
import { ShopSelector } from "components/@gt-components/shop-selector";

const CartPopUp = dynamic(() => import("../../features/carts/cart-popup"), {
  ssr: true,
});

type CollectionPageProps = {
  deviceType?: DeviceType;
  collection: any;
  statusCode?: number;
  homepageContent: {
    homepage: any;
    mainSlider: any;
  };
  teasers?: {
    title: string;
    background_image: {
      url: string;
    };
    image: {
      url: string;
    };
    link: string;
  }[];
  error: any;
};

const sortItems = [
  {
    value: "gt_commerce_products/sort/product_name_order:asc",
    label: "Name asc.",
  },
  {
    value: "gt_commerce_products/sort/product_name_order:desc",
    label: "Name desc.",
  },
];

const SortBy = ({ items, currentRefinement, refine, deviceType }) => (
  <SortBySelect
    options={items}
    value={currentRefinement}
    deviceType={deviceType}
    onChange={(item) => refine(item.value)}
  />
);

const CustomSortBy = connectSortBy(SortBy);

const InfiniteHits = ({ hits, hasMore, refineNext, productListView }) => {
  if (!hits) return <></>;
  return (
    <div style={{ flex: 1, width: "100%" }}>
      <Products
        products={hits}
        productListView={productListView}
        itemsPerRow={6}
      />
      {hasMore && (
        <ButtonWrapper>
          <Button
            onClick={refineNext}
            variant="secondary"
            style={{
              fontSize: 14,
              display: "inline-flex",
            }}
            border="1px solid #f1f1f1"
          >
            <FormattedMessage id="loadMoreButton" defaultMessage="Load More" />
          </Button>
        </ButtonWrapper>
      )}
    </div>
  );
};

const ConnectedHits = connectInfiniteHits(InfiniteHits);

export type RefineItem = {
  attribute: string;
  items: Array<any>;
};
const CurrentRefinements = ({ items, refine }) => {
  console.log(items);
  const customLabels = {
    in_stock: "in stock",
    on_sale_flag: "on sale",
  };

  const uniqueItems: any[] = [
    ...new Map(items.map((item) => [item["attribute"], item])).values(),
  ];

  const handleClickItem = (nested) => {
    refine(nested.value);
  };

  return (
    <FilterTagsContainer>
      <FilterTagsWrapper>
        {uniqueItems
          .filter((item) => item.attribute !== "product_category")
          .map((item, index: number) => (
            <div key={index}>
              {item.items ? (
                <React.Fragment>
                  <ul>
                    {item.items.map((nested) => (
                      <li key={nested.label}>
                        <Tag
                          key={nested.label}
                          onClick={() => handleClickItem(nested)}
                        >
                          {customLabels[item.attribute] || nested.label}
                          <CloseIcon width={12} height={12} />
                        </Tag>
                      </li>
                    ))}
                  </ul>
                </React.Fragment>
              ) : (
                <Tag key={item.label} onClick={() => refine(item.value)}>
                  {customLabels[item.attribute] || item.label}
                  <CloseIcon width={12} height={12} />
                </Tag>
              )}
            </div>
          ))}
      </FilterTagsWrapper>
    </FilterTagsContainer>
  );
};

const CustomCurrentRefinements = connectCurrentRefinements(CurrentRefinements);

const CollectionPage: NextPage<CollectionPageProps> = ({
  collection,
  teasers,
  homepageContent,
  deviceType,
}: CollectionPageProps) => {
  const {
    main_feature,
    urls,
    our_favourites,
    content,
    show_main_slider,
  } = homepageContent.homepage;

  const mainFeatureList =
    homepageContent?.homepage?.main_feature &&
    homepageContent?.homepage?.main_feature.image
      ? homepageContent?.homepage?.main_feature.image.map((i) => ({
          ...i,
          imgSrc: i.file?.url,
        }))
      : [];
  const productListView = useProductListView();

  const productList = Array(6).fill({
    imgSrc: "https://via.placeholder.com/400x400.png",
  });

  const {
    state: { client, defaultIndexName },
  } = useContext(TypesenseContext);

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

  const shopSelectorContainerAnchorExample = {
    layoutType: "anchor",
    anchorPosition: "left",
    headerText: "SHOP BY TYPE",
    anchorItem: {
      imageSrc:
        "https://www.thewhiskyexchange.com/c/40/single-malt-scotch-whisky",
      imageAlt: "Map of Scotland",
      url: "https://www.thewhiskyexchange.com/c/40/single-malt-scotch-whisky",
    },
    items: [
      {
        imageSrc:
          "https://via.placeholder.com/210x210.png?text=Placeholder+210x210",
        imageAlt: "Item 1",
        url: "https://www.thewhiskyexchange.com/c/40/single-malt-scotch-whisky",
      },
      {
        imageSrc:
          "https://via.placeholder.com/210x210.png?text=Placeholder+210x210",
        imageAlt: "Item 2",
        url: "https://www.google.com",
      },
      {
        imageSrc:
          "https://via.placeholder.com/210x210.png?text=Placeholder+210x210",
        imageAlt: "Item 3",
        url: "https://www.google.com",
      },
    ],
  };

  return (
    <>
      <Head>
        <title>
          {collection?.name || "Collection Not Found"} – Craft Cellars
        </title>
        {collection && (
          <>
            <meta name="description" content={collection.seoDescription} />

            <meta
              property="og:url"
              content={`https://www.SiteName.com/collections/${collection.slug}`}
            />
            <meta property="og:title" content={collection.seoTitle} />
            <meta
              property="og:description"
              content={collection.seoDescription}
            />
            <meta property="og:type" content="product.group" />
            <meta
              property="og:image"
              content={collection.backgroundImage?.url}
            />
            <meta
              property="og:image:secure_url"
              content={collection.backgroundImage?.url}
            />

            <meta name="twitter:site" content="@SiteName" />

            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={collection.seoTitle} />
            <meta
              name="twitter:description"
              content={collection.seoDescription}
            />

            <link
              rel="canonical"
              href={`https://www.SiteName.com/collections/${collection.slug}`}
            />
          </>
        )}
      </Head>
      <MainContentArea>
        {show_main_slider ? (
          <MainCarousel items={banners} mobileIndex={index} />
        ) : (
          ""
        )}
        <TypesenseInstantSearch
          searchClient={client}
          indexName={defaultIndexName}
        >
          <Configure
            hitsPerPage={24}
            facetFilters={[`product_category:${collection?.name}`]}
          />
          <Breadcrumb items={[{ name: collection?.name }]} />

          <ContentSection noPaddingTop fullWidth fullWidthWithPaddings>
            <ContentRow background="#f5f5f5">
              <ContentRowInner>
                {mainFeatureList && mainFeatureList.length > 0 && (
                  <MainFeature items={mainFeatureList} />
                )}
              </ContentRowInner>
            </ContentRow>

            <ContentRow background="#f5f5f5">
              <ContentRowInner>
                <ShopSelector {...shopSelectorContainerAnchorExample} />
              </ContentRowInner>
            </ContentRow>

            <ContentRow background="#f5f5f5">
              <ContentRowInner fullwidth={true}>
                <TrendingNow />
              </ContentRowInner>
            </ContentRow>
          </ContentSection>
          <CartPopUp />
        </TypesenseInstantSearch>
      </MainContentArea>
    </>
  );
};

export const getStaticProps: GetStaticProps = async (ctx) => {
  const generalSettings = await fetcher(GET_GENERAL_OPTIONS);
  const homepageContent = await fetcher(GET_HOMEPAGE_CONTENT);
  const { collection: collectionSlug } = ctx.params;
  const productGeneralData = await fetcher(GET_PRODUCT_GENERAL);

  const teasers = productGeneralData?.productGeneral?.teasers.filter(
    (teaser) => teaser.category_slug === collectionSlug
  );

  const apolloClient = initializeApollo();

  try {
    const { data } = await apolloClient.query({
      query: GET_COLLECTION_BY_SLUG,
      variables: {
        collectionSlug,
        withProducts: false,
        channel: process.env.API_CHANNEL,
      },
    });

    const { collection } = data;

    return {
      props: {
        collection,
        generalSettings,
        homepageContent,
        teasers,
      },
      revalidate: 60,
    };
  } catch (error) {
    return {
      props: {
        collection: null,
        generalSettings,
        error: JSON.stringify(error),
      },
    };
  }
};

export async function getStaticPaths() {
  const headers = new Headers();
  headers.append("Authorization", process.env.GT_TOKEN);
  try {
    const data = await fetch(
      `${process.env.GT_URL}products/web/collections/?format=json&limit=1000`,
      {
        headers,
      }
    ).then((r) => r.json());

    const paths = data
      ?.filter((item) => item.slug)
      .map((item) => ({
        params: { collection: item.slug },
      }));

    return {
      paths: paths,
      fallback: false,
    };
  } catch (err) {
    return {
      paths: [],
      fallback: false,
    };
  }
}

export default CollectionPage;
