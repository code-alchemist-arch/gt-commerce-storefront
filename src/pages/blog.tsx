import React, { useState } from "react";
import dynamic from "next/dynamic";

import { MainContentArea, ContentSection } from "assets/styles/pages.style";
// Static Data Import Here
import { SEO } from "components/seo";
import { GetStaticProps } from "next";
import fetcher from "../utils/fetcher";
import { GET_GENERAL_OPTIONS } from "../graphql/query/cms/general_options.query";
import styled from "styled-components";
import { GET_BLOGPOSTS } from "../graphql/query/cms/blogpost.query";
import BlogPost from "../components/blog-post/blog-post";
import Link from "next/link";
import { Box } from "../components/box";
import { Button } from "../components/button/loadmore-button";
import { FormattedMessage } from "react-intl";
import { useQuery } from "@apollo/client";
import Breadcrumb from "../components/breadcrumb/breadcrumb";
const CartPopUp = dynamic(() => import("features/carts/cart-popup"), {
  ssr: false,
});

export const PostsList = styled.ul`
  margin: 30px 0;
`;

type BlogProps = {};

const Blog: React.FC<BlogProps> = () => {
  const [limit, setLimit] = useState(10);
  const [start, setStart] = useState(0);
  const [skip, setSkip] = useState(10);
  const [showLoadMore, setShowLoadMore] = useState(true);
  const { data, loading, fetchMore } = useQuery(GET_BLOGPOSTS, {
    context: { clientName: "cms" },
    variables: {
      limit: limit,
      start: start,
    },
    fetchPolicy: "network-only",
  });

  const loadMore = () => {
    fetchMore({
      variables: {
        limit: 10,
        start: skip,
      },
      updateQuery: (prevResult, { fetchMoreResult }) => {
        if (fetchMoreResult.blogPosts.length < limit) {
          setShowLoadMore(false);
        }
        setSkip(skip + limit);
        fetchMoreResult.blogPosts = [
          ...prevResult.blogPosts,
          ...fetchMoreResult.blogPosts,
        ];
        return fetchMoreResult;
      },
    });
  };

  return (
    <>
      <SEO title={"Craft Cellars"} description={"Craft Cellars"} />
      <MainContentArea>
        <Breadcrumb items={[{ name: "Blog" }]} />
        <ContentSection>
          <h1 className="title">Blog</h1>
          <PostsList>
            {data?.blogPosts.map((post) => (
              <li key={post.slug} style={{ marginBottom: 15 }}>
                <Link href={`/blog/${post.slug}`} passHref>
                  <a>
                    <BlogPost data={post} />
                  </a>
                </Link>
              </li>
            ))}
          </PostsList>
          <Box style={{ textAlign: "center" }} mt={"2rem"}>
            {showLoadMore ||
              (data?.blogPosts?.length < 10 && (
                <Button
                  onClick={loadMore}
                  loading={loading}
                  variant="secondary"
                  style={{
                    fontSize: 14,
                    display: "inline-flex",
                  }}
                  border="1px solid #f1f1f1"
                >
                  <FormattedMessage
                    id="loadMoreButton"
                    defaultMessage="Load More"
                  />
                </Button>
              ))}
          </Box>
        </ContentSection>
      </MainContentArea>
      <CartPopUp />
    </>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const generalSettings = await fetcher(GET_GENERAL_OPTIONS);
  return {
    props: {
      generalSettings,
    },
  };
};

export default Blog;
