import styled from "styled-components";
import { themeGet } from "@styled-system/theme-get";
import { BreadcrumbWrapper } from "components/breadcrumb/breadcrumb.style";

export const BannerImg = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  will-change: filter;
  transition: filter 0.1s ease;
  height: 1200;

  & img {
    object-fit: cover;
  }
`;

export const BannerWrapper = styled.div`
  height: 240px;
  max-height: 240px;
  margin: 0 auto;
  background: ${themeGet("colors.black")};
  width: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;

  color: #fff;
  padding: 40px 25px;
  position: relative;
  overflow: hidden;

  transition: max-height 0.3s ease-out;
  will-change: height, max-height;
  transition: max-height 0.3s ease;
  &.expanded {
    height: auto;
    max-height: 1400px;
    ${BannerImg} {
      filter: blur(5px) opacity(0.4);
    }
  }

  ${BreadcrumbWrapper} {
    position: absolute;
    top: 0px;
    left: 60px;
  }

  @media screen and (max-width: 460px) {
    ${BreadcrumbWrapper} {
      left: 24px;
    }
  }
`;
export const BannerName = styled.div`
  font-style: normal;
  font-weight: 600;
  font-size: 39px;
  line-height: 48px;
  z-index: 10;
`;
export const BannerShortDescription = styled.div`
  margin-top: 20px;
  font-style: normal;
  font-weight: normal;
  font-size: 24px;
  line-height: 29px;
  text-align: center;
  letter-spacing: 0.02em;
  z-index: 10;

  @media screen and (max-width: 464px) {
    font-size: 18px;
    line-height: 20px;
  }
`;
export const BannerDescription = styled.div`
  column-count: 2;
  column-gap: 40px;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 21px;
  margin: 30px 65px;
  z-index: 10;

  @media screen and (max-width: 768px) {
    margin: 30px 20px;
  }

  @media screen and (max-width: 450px) {
    margin: 30px 0px;
    column-count: 1;
  }
`;

export const ExpandAction = styled.div`
  position: absolute;
  bottom: 0;
  cursor: pointer;
  z-index: 10;

  @media screen and (max-width: 460px) {
    svg {
      width: 72px;
      height: 62px;
    }
  }
`;

export const ShowLess = styled.div`
  z-index: 10;
  cursor: pointer;
  font-style: normal;
  font-weight: 600;
  font-size: 15px;
  line-height: 15px;
  text-align: center;
  letter-spacing: 0.1em;
  margin-top: 10px;
`;

export const Division = styled.div`
  margin: 30px 0;
  border-top: 2px solid #fff;
  border-radius: 200px;
  width: 60px;
  z-index: 10;
`;
