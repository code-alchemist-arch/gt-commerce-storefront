import { GET_GENERAL_OPTIONS } from "graphql/query/cms/general_options.query";
import React from "react";
import { useRouter } from "next/router";
import marked from "marked";
import fetcher from "../../utils/fetcher";
import Breadcrumb from "../../components/breadcrumb/breadcrumb";
import {
  MainContentArea,
  ContentSection,
} from "../../assets/styles/pages.style";
import { SEO } from "../../components/seo";
import Error from "../../components/error/error";
import { GET_BLOGPOSTS } from "../../graphql/query/cms/blogpost.query";
import { Banner } from "../../components/banner/banner";
import styled from "styled-components";

marked.setOptions({ baseUrl: process.env.API_CMS_URL, breaks: true, });

const BlogContent = styled.div`
  & p {
    margin-bottom: 30px;
  }
  img, blockquote {
    display: block;
    margin-left: auto;
    margin-right: auto;
    width: 50%;
    text-align: center;
  }
  
`;

const BlogPost = ({ page }) => {
  const { isFallback } = useRouter();

  if (isFallback) {
    return <div>Loading Page...</div>;
  }

  if (!page) {
    return <Error statusCode={404}></Error>;
  }
  const { slug, title, content, header_image, seo } = page;

  return (
    <>
      <SEO
        title={seo?.seo_title}
        description={seo?.seo_description}
        image={seo?.seo_image}
      />
      <MainContentArea>
        <Breadcrumb
          items={[{ name: "Blog", link: "/blog" }, { name: title }]}
        />
        {header_image?.url && (
          <Banner
            imageUrl={header_image?.url}
            intlTitleId="voucherApply"
            intlDescriptionId="voucherApply"
          />
        )}
        <ContentSection>
          <>
            <h1 className="title">{title}</h1>
            {content && (
              <BlogContent
                dangerouslySetInnerHTML={{ __html: marked(content, {breaks: true}) }}
              ></BlogContent>
            )}
          </>
        </ContentSection>
      </MainContentArea>
    </>
  );
};

export async function getStaticPaths() {
  const { blogPosts } = await fetcher(GET_BLOGPOSTS);
  const paths = blogPosts.map((page) => ({
    params: { slug: page.slug },
  }));

  return { paths, fallback: true };
}

export async function getStaticProps({ params }) {
  const { blogPosts } = await fetcher(GET_BLOGPOSTS, { slug: params.slug });
  const generalSettings = await fetcher(GET_GENERAL_OPTIONS);

  return {
    props: blogPosts[0] ? { page: blogPosts[0], generalSettings } : {},
    revalidate: 60,
  };
}

export default BlogPost;
