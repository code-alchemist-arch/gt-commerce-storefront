import styled from "styled-components";
import { themeGet } from "@styled-system/theme-get";

export const MobileCarouselDropdown = styled.div`
  @media (min-width: 990px) {
    display: none;
  }
`;

const OfferPageWrapper = styled.div`
  width: 100%;
  height: auto;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: ${themeGet("colors.gray.200", "#f7f7f7")};
  position: relative;
  padding: 100px 60px 60px;
  justify-content: space-between;

  @media (max-width: 768px) {
    padding: 100px 30px 60px;
  }

  @media (max-width: 1199px) {
    padding: 100px 30px 60px;
  }
`;

const HeaderSection = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  min-height: 400px;
  background-color: ${themeGet("colors.gray.300", "#f4f4f4")};
`;

const MainContentArea = styled.main`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  background-color: ${themeGet("colors.lightGray", "#f7f7f7")};
  padding-right: 0;
  transition: padding-right 0.35s ease-in-out;

  @media (max-width: 990px) {
    background-color: ${themeGet("colors.white", "#ffffff")};
  }
`;

const SidebarSection = styled.div`
  background-color: ${themeGet("colors.white", "#ffffff")};
  width: 280px;

  @media (max-width: 990px) {
    display: none;
  }
`;

const ContentSection = styled.div<{
  noPadding?: boolean;
  noPaddingTop?: boolean;
  fullWidth?: boolean;
  fullWidthWithPaddings?: boolean;
}>`
  width: calc(100% - 80px);
  max-width: 1600px;
  height: auto;
  min-height: 100vh;
  margin: 0 auto;
  padding: ${(props) =>
    props.noPadding ? `0px !important` : "30px 150px 50px"};
  ${(props) => props.noPaddingTop && "padding-top: 0px !important"};
  ${({ fullWidth }) => fullWidth && "max-width: none"};
  ${({ fullWidth }) => fullWidth && "width: 100%"};
  ${({ fullWidth }) => fullWidth && "padding: 0"};
  ${({ fullWidth }) => fullWidth && "margin: 0"};
  ${({ fullWidthWithPaddings }) => fullWidthWithPaddings && "padding: 30px"};

  @media (max-width: 1199px) and (min-width: 991px) {
    ${({ fullWidth }) => !fullWidth && "padding: 15px 30px 50px"};
  }

  @media (max-width: 1367px) and (min-width: 1200px) {
    ${({ fullWidth }) => !fullWidth && "padding: 15px 30px 50px"};
  }

  @media (max-width: 990px) {
    width: 100%;
    max-width: 990px;
    ${({ fullWidth }) => !fullWidth && "padding: 15px 20px 50px"};
  }

  @media (max-width: 768px) {
    min-height: auto;
  }

  .offer-slider {
    padding: 0 0 30px 30px;
  }
`;

export const ContentSectionPagesContent = styled(ContentSection)`
  h4 {
    padding-top: 30px;
  }
  p {
    padding-bottom: 10px;
  }
`;

export const ContentSectionTwo = styled.div<{
  noPadding?: boolean;
  noPaddingTop?: boolean;
  fullWidth?: boolean;
  fullWidthWithPaddings?: boolean;
}>`
  width: calc(100% - 80px);
  max-width: 1600px;
  height: auto;
  //min-height: 100vh;
  margin: 0 auto;
  padding: ${(props) =>
    props.noPadding ? `0px !important` : "30px 150px 50px"};
  ${(props) => props.noPaddingTop && "padding-top: 0px !important"};
  ${({ fullWidth }) => fullWidth && "max-width: none"};
  ${({ fullWidth }) => fullWidth && "width: 100%"};
  ${({ fullWidth }) => fullWidth && "padding: 0"};
  ${({ fullWidth }) => fullWidth && "margin: 0"};
  ${({ fullWidthWithPaddings }) => fullWidthWithPaddings && "padding: 30px"};

  @media (max-width: 1199px) and (min-width: 991px) {
    ${({ fullWidth }) => !fullWidth && "padding: 15px 30px 50px"};
  }

  @media (max-width: 1367px) and (min-width: 1200px) {
    ${({ fullWidth }) => !fullWidth && "padding: 15px 30px 50px"};
  }

  @media (max-width: 990px) {
    width: 100%;
    max-width: 990px;
    ${({ fullWidth }) => !fullWidth && "padding: 15px 20px 50px"};
  }

  @media (max-width: 768px) {
    min-height: auto;
  }

  .offer-slider {
    padding: 0 0 30px 30px;
  }
`;

const ContentRow = styled.div<{ background?: string }>`
  background: ${({ background }) => background || "#fff"};
`;

const ContentRowInner = styled.div<{
  background?: string;
  fullwidth?: boolean;
}>`
  max-width: ${({ fullwidth }) => (fullwidth ? "1600px" : "960px")};
  margin: 0 auto;
  padding: 30px 30px 50px;

  @media (max-width: 1199px) and (min-width: 991px) {
    padding: 15px 30px 50px;
  }

  @media (max-width: 1367px) and (min-width: 1200px) {
    padding: 15px 30px 50px;
  }

  @media (max-width: 990px) {
    padding: 15px 20px 50px;
  }

  @media (max-width: 767px) {
    max-width: ${({ fullwidth }) => (fullwidth ? "100%" : "450px")};
  }
`;

export const ContentRowInnerTwo = styled.div<{ background?: string }>`
  max-width: 1600px;
  margin: 0 auto;
  padding: 30px 30px 0px;
`;

const OfferSection = styled.div`
  width: 100%;
  display: block;
  padding: 60px;
  background-color: ${themeGet("colors.white", "#ffffff")};
  position: relative;
  border-bottom: 1px solid ${themeGet("colors.gray.500", "#f1f1f1")};

  @media (max-width: 1199px) and (min-width: 991px) {
    padding: 20px 15px;
    .prevButton {
      left: 0;
    }

    .nextButton {
      right: 0;
    }
  }
  @media (max-width: 990px) {
    padding: 15px;
    border-bottom: 0;

    .prevButton {
      left: 5px;
    }

    .nextButton {
      right: 5px;
    }
  }
`;

const Heading = styled.h2`
  font-size: ${themeGet("fontSizes.xl", "24")}px;
  font-weight: ${themeGet("fontWeights.bold", "700")};
  color: ${themeGet("colors.primary.regular", "#009e7f")};
  padding: 0px 20px 20px;
  margin: 50px 10px 20px;
  border-bottom: 2px solid ${themeGet("colors.primary.regular", "#009e7f")};
  width: auto;
  display: inline-block;
`;

export const ProductsRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-top: 30px;
  background-color: ${themeGet("colors.gray.200", "#f7f7f7")};

  @media (max-width: 768px) {
    margin-left: -7.5px;
    margin-right: -7.5px;
    margin-top: 15px;
  }
`;

const ProductsCol = styled.div`
  flex: 0 0 20%;
  max-width: 20%;
  padding-left: 15px;
  padding-right: 15px;
  margin-bottom: 30px;

  @media (max-width: 1650px) {
    flex: 0 0 25%;
    max-width: 25%;
  }
  @media (max-width: 1300px) {
    flex: 0 0 33.3333333%;
    max-width: 33.3333333%;
  }
  @media (max-width: 1199px) and (min-width: 900px) {
    padding-left: 10px;
    padding-right: 10px;
    margin-bottom: 20px;
  }
  @media (max-width: 899px) and (min-width: 769px) {
    flex: 0 0 50%;
    max-width: 50%;
  }
  @media (max-width: 768px) {
    padding-left: 7.5px;
    padding-right: 7.5px;
    margin-bottom: 15px;
    flex: 0 0 50%;
    max-width: 50%;
  }

  @media (max-width: 490px) {
    flex: 0 0 100%;
    max-width: 100%;
  }
`;

const BasicHomeTitle = styled.h2`
  text-align: center;
  position: relative;
  white-space: nowrap;
  padding-top: 40px;
  margin-bottom: -30px;
  text-transform: uppercase;
  font-size: 30px;
  font-weight: 600;
`;

export {
  OfferPageWrapper,
  HeaderSection,
  MainContentArea,
  SidebarSection,
  ContentSection,
  OfferSection,
  Heading,
  ProductsCol,
  ContentRow,
  ContentRowInner,
  BasicHomeTitle,
};
