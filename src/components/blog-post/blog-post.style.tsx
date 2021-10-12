import styled from "styled-components";
import { themeGet } from "@styled-system/theme-get";

export const PostWrapper = styled.div`
  display: flex;
  border-radius: 6px;
  border: 1px solid #f3f3f3;
  cursor: pointer;
  transition: 0.3s ease-in-out;
  background-color: #fff;
  overflow: hidden;

  @media screen and (max-width: 580px) {
    flex-direction: column;
  }

  &:hover {
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.08);
    transform: translateY(-5px);
  }
`;

export const PostContent = styled.div`
  color: ${themeGet("colors.black")};
  display: flex;
  flex-direction: column;
  padding: 15px;
  flex: 1;
`;

export const PostImage = styled.div`
  position: relative;
  flex-basis: 200px;
  height: 100%;
  min-height: 200px;
  border-radius: 6px;
  background-color: ${themeGet("colors.lightGray")};
`;

export const PostAuthor = styled.div`
  font-size: 14px;
  color: ${themeGet("colors.gray")};
  margin-bottom: 15px;
`;

export const PostText = styled.div`
  display: -webkit-box;
  -webkit-line-clamp: 3;
  overflow: hidden;
  text-overflow: ellipsis;
  -webkit-box-orient: vertical;
`;

export const PostDate = styled.div`
  padding: 15px;
  font-size: 14px;
  color: ${themeGet("colors.gray")};
`;
