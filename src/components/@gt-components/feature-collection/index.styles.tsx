import styled, { css } from "styled-components";

export const SingleFeatureWrapper = styled.div<{
  imagePosition: "right" | "left";
}>`
  display: flex;
  flex-direction: ${({ imagePosition }) =>
    imagePosition === "right" ? "row-reverse" : "row"};
  color: #999;

  @media (max-width: 768px) {
    flex-direction: column;

    margin: 10px 0;
  }
`;

const commonImgWrapperStyles = css`
  flex: 1;
  flex-basis: 50%;
  max-width: 50%;
  width: 50%;
`;

export const DesktopImageWrapper = styled.div<{ image: string }>`
  ${commonImgWrapperStyles}

  display: flex;
  align-items: center;

  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  background-image: url(${({ image }) => image});
`;

export const CollectionImageWrapper = styled.div`
  position: relative;
  ${commonImgWrapperStyles}

  @media screen and (max-width: 767px) {
    flex-basis: 100%;
    max-width: 100%;
    width: 100%;

    min-height: 450px;
  }
`;

export const MobileImageWrapper = styled.div`
  ${commonImgWrapperStyles}
  display: none;

  @media (max-width: 768px) {
    display: block;
    width: 100%;
    max-width: 100%;
    img {
      width: 100%;
    }
  }
`;

export const ContentWrapper = styled.div`
  flex: 1;

  display: flex;
  flex-direction: column;
  align-items: center;

  padding: 50px 20px;

  @media (max-width: 798px) {
    padding: 0 10px;
    padding-top: 30px;
  }
`;

export const ContentHeader = styled.h2`
  font-size: 30px;

  line-height: 1.2;
  padding: 20px 0;
  color: #101010;

  margin: 0;
  font-family: pt sans, Arial, Helvetica, sans-serif;
  text-align: center;
`;

export const ContentDescription = styled.p`
  font-weight: 400;
  font-size: 15px;
  letter-spacing: 0.01em;

  text-transform: none;
  line-height: 1.75;
  margin: 20px 0;

  text-align: center;
`;

export const ContentDivider = styled.hr`
  width: 90%;
  border: 0;
  height: 1px;
  background-image: linear-gradient(
    to right,
    rgba(0, 0, 0, 0),
    rgba(0, 0, 0, 0.75),
    rgba(0, 0, 0, 0)
  );
  margin: 0;
  margin-bottom: 20px;
`;

export const RewardsWrapper = styled.div`
  margin: 10px 0;
  display: flex;
  align-items: center;
  justify-content: center;

  position: relative;

  height: 80px;
  width: 100%;

  img {
    object-fit: contain;
  }
`;

export const RewardItem = styled.div``;

export const BuyButton = styled.button`
  display: inline-flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  align-content: center;

  font-weight: 400;
  font-size: 12px;
  font-style: normal;
  line-height: 1;
  letter-spacing: 0.15em;
  text-transform: uppercase;

  height: 40px;
  padding: 0 20px;
  margin: 0 auto;
  border: none;

  white-space: nowrap;
  cursor: pointer;

  background: #c59e4c;
  color: #fff;
  &:hover {
    background-color: #a88336;
  }
`;
