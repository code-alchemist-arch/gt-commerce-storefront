import React, { FC } from "react";
import { GetStaticPaths, GetStaticProps } from "next";
import Head from "next/head";

import {
  FeatureCollectionComponent,
  SingleFeature,
} from "components/@gt-components/feature-collection";
import { MainContentArea } from "assets/styles/pages.style";
import fetcher from "utils/fetcher";
import { GET_GENERAL_OPTIONS } from "graphql/query/cms/general_options.query";

interface IFeaturesCollectionPageProps {
  collection: any;
  collectionData: {
    featureImage: string;
    features: SingleFeature[];
  };
}

const FeaturesCollectionPage: FC<IFeaturesCollectionPageProps> = ({
  collection,
  collectionData,
}) => {
  return (
    <>
      <Head>
        <title>{collection || "Collection Not Found"} – Craft Cellars</title>
        {collection && (
          <>
            <meta name="description" content={collection?.seoDescription} />

            <meta
              property="og:url"
              content={`https://www.SiteName.com/collections/${collection?.slug}`}
            />
            <meta property="og:title" content={collection?.seoTitle} />
            <meta
              property="og:description"
              content={collection?.seoDescription}
            />
            <meta property="og:type" content="product.group" />
            <meta
              property="og:image"
              content={collection?.backgroundImage?.url}
            />
            <meta
              property="og:image:secure_url"
              content={collection?.backgroundImage?.url}
            />

            <meta name="twitter:site" content="@SiteName" />

            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={collection?.seoTitle} />
            <meta
              name="twitter:description"
              content={collection?.seoDescription}
            />

            <link
              rel="canonical"
              href={`https://www.SiteName.com/collections/${collection?.slug}`}
            />
          </>
        )}
      </Head>
      <MainContentArea>
        {collectionData.features.map((featItm) => (
          <FeatureCollectionComponent
            key={featItm.componentTitle}
            {...featItm}
          />
        ))}
      </MainContentArea>
    </>
  );
};

export const getStaticProps: GetStaticProps = async (ctx) => {
  const generalSettings = await fetcher(GET_GENERAL_OPTIONS);
  const { collection } = ctx.params;

  // Mock Data
  const data: IFeaturesCollectionPageProps = {
    collection: "taliser",
    collectionData: {
      featureImage: "",
      features: [
        {
          imagePosition: "right",
          imageUrl: "https://via.placeholder.com/874x680.png",
          content:
            "Fresh green apples, toffee and a hint of nuttiness. This is the taste of distilling slower than anyone else in Scotland, of barley we dry by air â€“ never peat â€“ and of hand-selected sherry casks crafted from European and American oak. \n On the nose sweet, with toffee and popcorn aromas. Slightly nutty, with fresh green apples. To taste, green apples, grass, soft oak and a hint of sweet liquorice. Add a drop of water and discover notes of linseed oil and almonds.",
          componentTitle: "Glengoyne 10 Year Old (40% abv)",
          buyButtonUrl:
            "https://www.thewhiskyexchange.com/p/59262/talisker-43-year-old-xpedition-oak",
          rewards: [
            {
              title: "reward_1",
              alt: "reward_1",
              imageUrl: "/images/Glengoyne12awards.png",
            },
          ],
        },
        {
          imagePosition: "left",
          imageUrl: "https://via.placeholder.com/874x680.png",
          content: `Lemon zest, toffee apples â€“ and a scent of coconut. Hand-selected sherry casks help create this paradise of flavours and rich, golden colour. Itâ€™s the taste of Scotlandâ€™s slowest distillation, and our insistence on barley dried by air â€“ never peat.

            On the nose Coconut oil, honey, lemon zest, and dried oak. To taste, toffee apples, cinnamon spice, ginger, orange, and shortbread and finishes with a hint of sherry and soft oak. A very well balanced whisky.`,
          componentTitle: "Glengoyne 12 Year Old (43% abv)",
          buyButtonUrl:
            "https://www.thewhiskyexchange.com/p/59262/talisker-43-year-old-xpedition-oak",
          rewards: [
            {
              title: "reward_1",
              alt: "reward_1",
              imageUrl: "/images/Glengoyne12awards.png",
            },
          ],
        },
        {
          imagePosition: "right",
          imageUrl: "https://via.placeholder.com/874x680.png",
          content: `Bottled at the strength it emerges from the cask, this delicious amber gold dram is un-chillfiltered, unfussed and untamed; the closest youâ€™ll get to opening the cask yourself. A peppery tingle gives way to rich flavours of ripe banana, digestive biscuits and cinnamon.

            Matured in one third sherry casks, two thirds refill casks and a smattering of bourbon barrels. Big and bold with a gloriously thick mouthfeel and a delightful, lingering, oak-infused finish.`,
          componentTitle: "Glengoyne Cask Strength Batch 8 (59.2% abv)",
          buyButtonUrl:
            "https://www.thewhiskyexchange.com/p/59262/talisker-43-year-old-xpedition-oak",
        },
        {
          imagePosition: "left",
          imageUrl: "https://via.placeholder.com/874x680.png",
          content: `Christmas cake, honey, and rich fruit â€“ with a long cinnamon finish. Matured exclusively in hand-selected sherry casks for 21 years. Perfect after dinner or, frankly, anytime.

          On the nose, red apples, spicy strudel, toffee, sherry and dried fruits. Christmas cake in a glass. To taste, lots of Sherry, honey, oak with a developing aromatic sensation and ends with a heavenly cinnamon nip. Long, sherry, spicy, warm and dry finish.`,
          componentTitle: "Glengoyne 21 Year Old (43% abv)",
          buyButtonUrl:
            "https://www.thewhiskyexchange.com/p/59262/talisker-43-year-old-xpedition-oak",
        },
      ],
    },
  };

  // Get Collection data from the API
  return {
    props: {
      collection,
      generalSettings,
      ...data,
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const headers = new Headers();
  headers.append("Authorization", process.env.GT_TOKEN);

  return {
    paths: [
      {
        params: {
          collection: "test",
        },
      },
    ],
    fallback: false,
  };
};

export default FeaturesCollectionPage;
