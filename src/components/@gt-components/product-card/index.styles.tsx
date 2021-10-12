import styled from "styled-components";
import { themeGet } from "@styled-system/theme-get";

export const ProductCardWrapper = styled.div<{
  variant: "grid" | "list" | string;
}>`
  display: flex;
  flex-direction: ${({ variant }) => (variant === "grid" ? "column" : "row")};
  align-items: center;
  justify-content: ${({ variant }) =>
    variant === "grid" ? "flex-start" : "space-between"};

  position: relative;
  overflow: hidden;

  max-width: ${({ variant }) => (variant === "grid" ? "220px" : "100%")};
  padding: ${({ variant }) =>
    variant === "grid" ? "10px 0 10px 0" : "10px 60px 10px 50px"};
  background-color: rgb(255, 255, 255);

  border-radius: 6px;
  border: 1px solid rgb(243, 243, 243);

  cursor: pointer;

  transition: all 0.3s ease-in-out 0s;

  margin: auto;

  &:hover {
    box-shadow: rgb(0 0 0 / 8%) 0px 2px 4px;
    transform: translateY(-5px);
  }

  @media (max-width: 767px) {
    padding: ${({ variant }) => (variant === "grid" ? "10px 0" : "10px 20px")};
  }
`;

export const Favourite = styled.span<{ position: "left" | "right" }>`
  z-index: 1;
  position: absolute;
  ${({ position }) => (position === "right" ? "left: 20px" : "right: 20px")};
  top: 15px;

  svg > path {
    fill: #818693;
  }

  @media (max-width: 767px) {
    top: 10px;
    ${({ position }) => (position === "right" ? "left: 10px" : "right: 10px")};
  }
`;

export const Tag = styled.div`
  position: absolute;
  top: 0px;
  left: 0px;

  display: inline-block;
  width: auto;
  padding: 7px 10px;

  font-size: 12px;
  font-weight: 500;
  color: rgb(255, 255, 255);
  text-transform: uppercase;

  background-color: rgb(255, 178, 56);
  border-radius: 5px 0px;
  opacity: 0.9;
  z-index: 1;
`;

export const ImageWrapper = styled.div<{
  variant?: string;
}>`
  position: relative;
  max-height: 400px;
  height: ${({ variant }) => (variant === "grid" ? "250px" : "150px")};

  max-width: ${({ variant }) => (variant === "grid" ? "100%" : "200px")};
  width: ${({ variant }) => (variant === "grid" ? "100%" : "100%")};
  flex-shrink: 0;

  margin-top: ${({ variant }) => (variant === "grid" ? "15px;" : 0)};

  display: flex;
  flex-grow: 1;

  align-items: center;
  justify-content: center;

  img {
    object-fit: contain;
    transform: ${({ variant }) =>
      variant === "grid" ? "scale(1.1)" : "scale(1)"};
  }

  @media (max-width: 767px) {
    height: ${({ variant }) => (variant === "grid" ? "180px" : "200px")};

    & > div {
      height: 100%;
      max-height: 200px;
    }
  }
`;

export const SubAttr = styled.div`
  border: 1px solid rgb(102, 51, 68);
  font-size: 12px;

  border-top-left-radius: 99px;
  border-bottom-left-radius: 99px;

  border-top-right-radius: 99px;
  border-bottom-right-radius: 99px;

  padding: 2px 8px;

  display: flex;
  align-items: center;
  justify-content: space-between;

  span {
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    max-width: 100%;
  }
`;

export const Description = styled.div`
  display: flex;
  padding: 0 20px;

  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2; /* number of lines to show */
  -webkit-box-orient: vertical;

  @media (max-width: 767px) {
    display: none;
  }
`;

export const DescriptionReadMore = styled.div`
  //text-align: right;
`;

export const InfoWrapper = styled.div<{
  variant?: string;
}>`
  display: flex;
  flex-shrink: 0;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;

  width: 100%;
  max-width: ${({ variant }) => (variant === "grid" ? "auto" : "200px")};

  margin-top: ${({ variant }) => (variant === "grid" ? "10px" : 0)};

  @media (max-width: 767px) {
    flex-shrink: 1;
    ${({ variant }) => (variant === "grid" ? "width: 100%" : "width: 50%")};
  }
`;

export const Title = styled.h3<{
  variant?: string;
}>`
  color: rgb(102, 51, 68);
  font-size: 16px;
  font-weight: 600;
  text-align: center;
  font-family: Poppins, sans-serif;
  line-height: 1.5;

  height: 3rem;
  margin: 0;

  max-width: ${({ variant }) => (variant === "grid" ? "90%" : "100%")};

  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2; /* number of lines to show */
  -webkit-box-orient: vertical;
`;

export const SubText = styled.div`
  font-size: 14px;
  line-height: 1.5;
  font-weight: 400;
  color: rgb(76, 76, 76);
  text-align: center;

  padding: 15px 0;
`;

export const Price = styled.div`
  color: rgb(86, 86, 86);
  font-size: 18px;
  font-weight: 600;
  line-height: 1.5;
`;

export const OnSalePrice = styled.div`
  color: ${themeGet("colors.gray")};
  text-decoration: line-through;
`;

export const PriceWrapper = styled.div`
  position: relative;
  z-index: 0;

  width: 100%;
  text-align: center;
  margin: 10px 0;
  button {
    position: absolute;
    top: 50%;
    left: 50%;

    max-width: fit-content;

    transform: translate(-50%, -50%);
    opacity: 0;
    z-index: 3;

    transition: opacity 0.3s ease-in;
  }

  &:hover {
    button {
      transition: opacity 0.3s ease-in;
      opacity: 1;
    }
  }
`;

export const ProdBadges = styled.div<{
  position: "left" | "right";
}>`
  position: absolute;
  top: 10px;
  ${({ position }) => (position === "left" ? "left: 10px;" : "right: 10px;")}
`;
