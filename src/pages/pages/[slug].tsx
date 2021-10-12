import React from "react";
import { GET_PAGES } from "graphql/query/cms/pages.query";
import { GET_GENERAL_OPTIONS } from "graphql/query/cms/general_options.query";
import { useRouter } from "next/router";
import marked from "marked";
import fetcher from "../../utils/fetcher";
import Breadcrumb from "../../components/breadcrumb/breadcrumb";
import {
  MainContentArea,
  ContentSectionPagesContent,
} from "../../assets/styles/pages.style";
import { SEO } from "../../components/seo";
import Error from "../../components/error/error";

marked.setOptions({ baseUrl: process.env.API_CMS_URL });

const PageIndex = ({ page }) => {
  const { isFallback } = useRouter();

  if (isFallback) {
    return <div>Loading Page...</div>;
  }

  if (!page) {
    return <Error statusCode={404}></Error>;
  }
  const {
    slug,
    title,
    content,
    cover_image,
    seo_information = {},
  } = page;

  return (
    <>
      <SEO title={seo_information?.seo_title} description={seo_information?.seo_description} image={seo_information?.seo_image} />
      <MainContentArea>
        <Breadcrumb items={[{ name: title }]} />
        <ContentSectionPagesContent>
          {!!content && (
            <>
              <h1 className="title">{title}</h1>
              <div dangerouslySetInnerHTML={{ __html: marked(content) }}></div>
            </>
          )}
        </ContentSectionPagesContent>
      </MainContentArea>
    </>
  );
};

export async function getStaticPaths() {
  const { pages } = await fetcher(GET_PAGES);
  const paths = pages.map((page) => ({
    params: { slug: page.slug },
  }));

  return { paths, fallback: true };
}

export async function getStaticProps({ params }) {
  const { pages } = await fetcher(GET_PAGES, { slug: params.slug });
  const generalSettings = await fetcher(GET_GENERAL_OPTIONS);

  return {
    props: pages[0] ? { page: pages[0], generalSettings } : {},
    revalidate: 60,
  };
}

export default PageIndex;
