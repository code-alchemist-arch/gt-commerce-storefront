import React, { useContext, useState } from "react";

import Head from "next/head";

import { GetStaticProps, NextPage } from "next";
import Image from "next/image";
import { useRouter } from "next/router";
import { DeviceType } from "../../interfaces";
import {
  MainContentArea,
  ContentSection,
} from "../../assets/styles/pages.style";
import CollectionBanner from "../../components/collection-banner/collection-banner";
import {
  CollectionTeaser,
  CollectionTeaserContent,
  CollectionTeasers,
  CollectionWrapper,
  ContentControls,
  DesktopFilters,
  DesktopRefinements,
  FilterTagsWrapper,
  FilterTagsContainer,
  MobileControlButton,
  Tag,
} from "../../layouts/layout.style";
import Products from "../../components/products/products";
import Filters from "../../components/filters/filters";

import {
  InstantSearch as TypesenseInstantSearch,
  Configure,
  SearchBox,
  connectInfiniteHits,
  connectSortBy,
  connectCurrentRefinements,
} from "react-instantsearch-dom";
import { initializeApollo } from "../../utils/apollo";
import { GET_COLLECTION_BY_SLUG } from "../../graphql/query/collection.query";
import { TypesenseContext } from "../../contexts/typesense/typesense.context";
import { ButtonWrapper } from "../../components/products/products.style";
import { Button } from "../../components/button/button";
import { FormattedMessage } from "react-intl";
import FiltersDrawer from "../../components/filters-drawer/filters-drawer";
import { GET_GENERAL_OPTIONS } from "../../graphql/query/cms/general_options.query";
import fetcher from "../../utils/fetcher";
import dynamic from "next/dynamic";
import ExpandIcon from "../../assets/icons/ExpandIcon";
import CloseIcon from "../../assets/icons/CloseIcon";
import SortBySelect from "../../components/sort-by-select/sort-by-select";
import ProductViewSwitch from "../../components/product-view-switch/product-view-switch";
import useProductListView from "../../utils/useProductListView";
import Breadcrumb from "../../components/breadcrumb/breadcrumb";
import { GET_PRODUCT_GENERAL } from "../../graphql/query/cms/product_general.query";

const CartPopUp = dynamic(() => import("../../features/carts/cart-popup"), {
  ssr: true,
});

type CollectionPageProps = {
  deviceType?: DeviceType;
  collection: any;
  statusCode?: number;
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

const longDesc = `Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin
literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia,
looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in 
classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum 
et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular
during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.

The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from "de 
Finibus Bonorum et Malorum" by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 
translation by H. Rackham.`;

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

  const onClickClearAll = () => {
    const itemsToClear = items.filter(
      (item) =>
        item.attribute !== "in_stock" && item.attribute !== "product_category"
    );

    refine(itemsToClear);
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
      {items && items.length > 0 && (
        <button onClick={onClickClearAll}>Clear All</button>
      )}
    </FilterTagsContainer>
  );
};

const CustomCurrentRefinements = connectCurrentRefinements(CurrentRefinements);

const CollectionPage: NextPage<CollectionPageProps> = ({
  collection,
  teasers,
}: CollectionPageProps) => {
  const productListView = useProductListView();
  const {
    state: { client, defaultIndexName },
  } = useContext(TypesenseContext);
  const [filterDrawerOpen, setFilterDrawerOpen] = useState(false);
  const router = useRouter();
  const subcategory = router?.query?.subcategory as string;

  const handleCloseFilterDrawer = React.useCallback(() => {
    setFilterDrawerOpen(false);
  }, []);

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
        <TypesenseInstantSearch
          searchClient={client}
          indexName={defaultIndexName}
        >
          <Configure
            hitsPerPage={24}
            facetFilters={[`product_category:${collection?.name}`]}
          />
          <Breadcrumb items={[{ name: collection?.name }]} />
          <CollectionBanner
            name={collection?.name}
            shortDescription="Cabernet Sauvignon from Napa Valley, California..."
            description={longDesc}
          />
          <DesktopFilters>
            <Filters collection={collection?.slug} subcategory={subcategory} />
          </DesktopFilters>
          <FiltersDrawer
            isOpen={filterDrawerOpen}
            onClose={handleCloseFilterDrawer}
          />
          <ContentSection noPaddingTop fullWidth fullWidthWithPaddings>
            <ContentControls>
              <DesktopRefinements>
                <CustomCurrentRefinements />
              </DesktopRefinements>
              <MobileControlButton
                className="control"
                onClick={() => setFilterDrawerOpen(true)}
              >
                Filter by <ExpandIcon />
              </MobileControlButton>
              <CustomSortBy
                defaultRefinement="gt_commerce_products/sort/product_name_order:asc"
                items={sortItems}
              />
              <ProductViewSwitch productListView={productListView} />
            </ContentControls>

            <div style={{ display: "none" }}>
              <SearchBox defaultRefinement="" />
            </div>
            <CollectionWrapper>
              {teasers && teasers.length > 0 && (
                <CollectionTeasers>
                  {teasers.map((teaser) => (
                    <a href={teaser.link} key={teaser.title}>
                      <CollectionTeaser>
                        <Image
                          src={teaser.background_image.url}
                          layout="fill"
                          objectFit="cover"
                          objectPosition="center"
                          className="image"
                          alt="teaser"
                        />
                        <CollectionTeaserContent>
                          <h5 style={{ marginBottom: 20 }}>{teaser.title}</h5>
                          <Image
                            src={teaser.image.url}
                            width={200}
                            height={250}
                            objectFit="cover"
                            objectPosition="center"
                            alt="teaser"
                          />
                        </CollectionTeaserContent>
                      </CollectionTeaser>
                    </a>
                  ))}
                </CollectionTeasers>
              )}
              <ConnectedHits productListView={productListView} />
            </CollectionWrapper>
          </ContentSection>
          <CartPopUp />
        </TypesenseInstantSearch>
      </MainContentArea>
    </>
  );
};

export const getStaticProps: GetStaticProps = async (ctx) => {
  const generalSettings = await fetcher(GET_GENERAL_OPTIONS);
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
