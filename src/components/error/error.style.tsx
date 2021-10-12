import styled from "styled-components";
import { themeGet } from "@styled-system/theme-get";

export const ErrorImageWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
  position: relative;
  width: 100%;
  min-height: 550px;

  img {
    object-fit: contain;
    width: 550px !important;
    height: 550px !important;
  }

  @media screen and (max-width: 768px) {
    min-height: 400px;

    img {
      width: 400px !important;
      height: 400px !important;
    }
  }

  @media screen and (max-width: 460px) {
    margin-top: 0px;
    min-height: 320px;
    flex: 1;
    img {
      width: 258px;
      height: 258px;
    }
  }
`;

export const ErrorInformation = styled.div``;

export const ErrorWrapper = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  padding: 0 200px;

  margin: 30px 0 70px;
  & a {
    margin-top: 60px;
    width: 200px;
  }

  @media screen and (max-width: 1024px) {
    padding: 0 60px;
  }

  @media screen and (max-width: 464px) {
    flex-wrap: wrap-reverse;
    padding: 5px 25px;
    margin-top: 0px;
  }
`;

export const ErrorTitle = styled.div`
  font-style: normal;
  font-weight: 600;
  font-size: 40px;
  line-height: 49px;
  color: ${themeGet("colors.black")};
  margin-top: 100px;

  @media screen and (max-width: 1024px) {
    margin-top: 60px;
  }

  @media screen and (max-width: 464px) {
    margin-top: 20px;
    font-size: 30px;
  }
`;

export const ErrorMessage = styled.div`
  font-style: normal;
  font-weight: 400;
  font-size: 23px;
  color: ${themeGet("colors.black")};
  margin: 60px 0px;

  @media screen and (max-width: 1024px) {
    margin: 20px 0;
    font-size: 18px;
    line-height: 25px;
  }

  @media screen and (max-width: 464px) {
    margin: 20px 0;
    font-size: 16px;
  }
`;

export const ErrorCode = styled.div`
  font-style: normal;
  font-weight: 600;
  font-size: 19px;
  color: ${themeGet("colors.black")};
`;
