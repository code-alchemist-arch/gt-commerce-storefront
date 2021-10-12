import styled from "styled-components";
import { themeGet } from "@styled-system/theme-get";

export const CollectionInfo = styled.div`
  display: flex;
  flex-direction: column;
  width: 250px;
  border-radius: 30px 0px;
  padding: 5px 15px 12px 15px;
  color: #fff;
  z-index: 2;

  &.orange {
    background: #ff4f42cc;
  }

  &.yellow {
    background: #ffb238cc;
  }

  &.gray {
    background: #818693cc;
  }

  &.taupe {
    background: #b79777cc;
  }
`;

export const CollectionHomeBannerWrapper = styled.div`
  min-height: 300px;
  width: 100%;
  height: 100%;

  cursor: pointer;
  background: ${themeGet("colors.lightGray")};
  position: relative;

  padding: 20px;
  border-radius: ${themeGet("borderRadius")};
  overflow: hidden;

  display: flex;
  flex-direction: column;

  transition: box-shadow 0.3s ease-in-out;

  &:hover {
    box-shadow: 0px 2px 13px rgba(0, 0, 0, 0.25);
  }

  &.labelBottom {
    flex-direction: column-reverse;
    ${CollectionInfo} {
      width: 250px;
    }
  }

  & img {
    position: absolute;
    top: 0px;
    left: 0px;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

export const CollectionSubtitle = styled.div`
  font-size: 13px;
  font-weight: 400;
`;
