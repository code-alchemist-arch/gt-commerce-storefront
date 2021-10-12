import dynamic from "next/dynamic";
import React from "react";
import { initializeApollo } from "utils/apollo";
import ProductSingleWrapper, {
  ProductSingleContainer,
} from "assets/styles/product-single.style";
import { GET_PRODUCT } from "../../graphql/query/products.query";
import {
  MainContentArea,
  ContentSection,
} from "../../assets/styles/pages.style";
import Breadcrumb from "../../components/breadcrumb/breadcrumb";
import Error from "../../components/error/error";
import Head from "next/head";
import { Product } from "../../interfaces";
import fetcher from "../../utils/fetcher";
import { GET_GENERAL_OPTIONS } from "../../graphql/query/cms/general_options.query";

const ProductDetails = dynamic(
  () =>
    import(
      "components/product-details/product-details-four/product-details-four"
    )
);

const CartPopUp = dynamic(() => import("features/carts/cart-popup"), {
  ssr: false,
});
interface Props {
  data: {
    product: Product;
  };
  deviceType: any;
  statusCode: number;
  authentication: any;
}

const ProductDetailsPage = ({ data, deviceType, statusCode }: Props) => {
  const { product } = data;

  const image = product?.metadata
    .filter((item) => item.key.includes("image_srcset"))
    .map((item) => ({
      srcSet: item.value,
      url: item.value.split(" ")[0],
    }))[0]?.url;

  let content = <ProductDetails product={product} deviceType={deviceType} />;
  return (
    <>
      <Head>
        <title>
          Buy {product?.name || "Product not found"} &ndash; Craft Cellars
        </title>

        {product && (
          <>
            <meta name="description" content={product.seoDescription} />

            <meta
              property="og:url"
              content={`https://${process.env.VERCEL_URL}/products/${product.slug}`}
            />
            <meta property="og:title" content={product.seoTitle} />
            <meta property="og:type" content="product" />
            <meta property="og:description" content={product.seoDescription} />

            <meta
              property="og:price:amount"
              content={product.variants[0]?.pricing?.price?.gross?.amount}
            />
            <meta property="og:price:currency" content="CAD" />

            <meta property="og:image" content={image} />
            <meta property="og:image:secure_url" content={image} />

            <meta name="twitter:site" content="@Craftcellars" />

            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={product.seoTitle} />
            <meta name="twitter:description" content={product.seoDescription} />

            <meta name="twitter:card" content="product" />
            <meta name="twitter:title" content={product.seoTitle} />
            <meta name="twitter:description" content={product.seoDescription} />
            <meta name="twitter:image" content={image} />
            <meta name="twitter:image:width" content="240" />
            <meta name="twitter:image:height" content="240" />
            <meta name="twitter:label1" content="Price" />
            <meta
              name="twitter:data1"
              content={`$${product.variants[0]?.pricing?.price?.gross?.amount}`}
            />

            <meta name="twitter:label2" content="Brand" />
            <meta name="twitter:data2" content="Craft Cellars" />

            <link
              rel="canonical"
              href={`https://${process.env.VERCEL_URL}/products/${product.slug}`}
            />
          </>
        )}
      </Head>
      {!product ? (
        <Error statusCode={statusCode} />
      ) : (
        <MainContentArea>
          <Breadcrumb items={[{ name: data?.product?.name }]} />
          <ContentSection noPadding>
            <ProductSingleWrapper>
              <ProductSingleContainer>
                {content}
                <CartPopUp />
              </ProductSingleContainer>
            </ProductSingleWrapper>
          </ContentSection>
        </MainContentArea>
      )}
    </>
  );
};

// Uncomment for SSR
// export async function getServerSideProps(ctx) {
//   const generalSettings = await fetcher(GET_GENERAL_OPTIONS);
//   const apolloClient = initializeApollo();
//   try {
//     const { data, error, errors } = await apolloClient.query({
//       query: GET_PRODUCT,
//       variables: {
//         slug: ctx.params.slug,
//         channel: process.env.API_CHANNEL,
//       },
//     });
//     if (error) {
//       console.log("product page error", error);
//     }
//     if (errors) {
//       console.log("product page error", errors);
//     }
//     if (data) {
//       console.log("data", data);
//     }
//     if (data.product) {
//       return {
//         props: {
//           data,
//           generalSettings,
//         },
//       };
//     } else {
//       return {
//         props: {
//           generalSettings,
//           data: { product: null },
//           statusCode: 404,
//         },
//       };
//     }
//   } catch (err) {
//     console.log("err", err);
//   }
// }

// Uncomment for SSG
export async function getStaticProps(ctx) {
  const generalSettings = await fetcher(GET_GENERAL_OPTIONS);
  const apolloClient = initializeApollo();
  try {
    const { data, error, errors } = await apolloClient.query({
      query: GET_PRODUCT,
      variables: {
        slug: ctx.params.slug,
        channel: process.env.API_CHANNEL,
      },
    });
    if (error) {
    }
    if (errors) {
    }

    if (data.product) {
      return {
        props: {
          data,
          generalSettings,
        },
        revalidate: 60,
      };
    } else {
      return {
        props: {
          generalSettings,
          data: { product: null },
          statusCode: 404,
        },
      };
    }
  } catch (err) {}
}

// This will statically generate all pages at build time
// export async function getStaticPaths() {
//   const headers = new Headers();
//   headers.append("Authorization", process.env.GT_TOKEN);
//   try {
//     const data = await fetch(
//       `${process.env.GT_URL}products/web/slugs/?limit=3000&format=json`,
//       {
//         headers,
//       }
//     ).then((r) => r.json());
//
//     const paths = data
//       ?.filter((item) => item.slug)
//       .map((item) => ({
//         params: { slug: item.slug },
//       }));
//
//     return {
//       paths: paths,
//       fallback: false,
//     };
//   } catch (err) {
//     return {
//       paths: [],
//       fallback: false,
//     };
//   }
// }

// This will statically generate no pages at build time
export async function getStaticPaths() {
  const paths = [];
  return {
    paths: paths,
    fallback: "blocking",
  };
}

export default ProductDetailsPage;
