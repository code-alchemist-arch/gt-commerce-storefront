import styled from "styled-components";
import { themeGet } from "@styled-system/theme-get";

export const MainCarouselWrapper = styled.div`
  .main-carousel:hover {
    cursor: pointer;
  }

  .main-carousel:hover > .left,
  .main-carousel:hover > .right {
    opacity: 1;
  }

  .main-carousel .react-multi-carousel-dot-list {
    bottom: 15px;

    @media screen and (max-width: 767px) {
      justify-content: flex-end;
      margin-right: 10px;
    }
  }

  .main-carousel .react-multi-carousel-dot button {
    transition: all 0.25s ease-in-out;
    background: #c4c4c4;
    /* border: 1px solid #00000012; */
    border: none;
    width: 9px;
    height: 9px;
  }

  .main-carousel .react-multi-carousel-dot--active {
    margin-top: 1px;
  }
  .main-carousel .react-multi-carousel-dot--active button {
    background: white;
    width: 20px;
    border-radius: 15px;
    height: 12px;
  }
`;

export const CarouselItemWrapper = styled.div`
  min-height: 150px;
  height: 350px;

  & > div {
    height: 100%;
    img {
      height: 100% !important;
    }
  }
  @media screen and (max-width: 767px) {
    height: 150px;
  }
`;

export const Arrow = styled.button`
  position: absolute;
  outline: 0;
  transition: all 0.5s;
  z-index: 500;
  border: 0;
  background: rgba(0, 0, 0, 0.5);
  background: #ffffff;
  width: 41px;
  height: 64px;
  opacity: 0;
  cursor: pointer;
  box-shadow: 1px 4px 12px rgba(0, 0, 0, 0.09);

  &:hover {
    box-shadow: 1px 4px 12px rgba(0, 0, 0, 0.54);
  }

  &::before {
    font-size: 20px;
    font-weight: 600;
    color: ${themeGet("colors.gray")};
    display: block;
    font-family: revicons;
    text-align: center;
    z-index: 2;
    position: relative;
  }

  &.left {
    &::before {
      content: "\\E824";
    }
    left: 0px;
    border-radius: 0px 4px 4px 0px;
  }

  &.right {
    &::before {
      content: "\\E825";
    }
    right: 0px;
    border-radius: 4px 0px 0px 4px;
  }
`;
