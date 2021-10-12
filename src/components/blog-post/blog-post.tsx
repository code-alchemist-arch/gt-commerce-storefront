import Image from "next/image";
import React from "react";
import {
  PostAuthor,
  PostContent,
  PostDate,
  PostImage,
  PostText,
  PostWrapper,
} from "./blog-post.style";

type Prop = {
  data: {
    slug: string;
    title: string;
    author: string;
    content: string;
    excerpt: string;
    header_image: {
      url: string;
    };
    preview_image: {
      url: string;
    };
    date_published: string;
  };
};

const BlogPost: React.FC<Prop> = ({ data }: Prop) => {
  return (
    <PostWrapper>
      <PostImage>
        {data.preview_image?.url && (
          <Image src={data.preview_image?.url} layout="fill" />
        )}
      </PostImage>
      <PostContent>
        <h3>{data.title}</h3>
        <PostAuthor>
          written by <b>{data.author}</b>
        </PostAuthor>
        <PostText>{data.excerpt}</PostText>
      </PostContent>
      <PostDate>{data.date_published}</PostDate>
    </PostWrapper>
  );
};

export default BlogPost;
