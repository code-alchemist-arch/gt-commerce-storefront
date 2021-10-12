import styled from "styled-components";
import { themeGet } from "@styled-system/theme-get";

export const InstantSearchWrapper = styled.div<{ centered?: boolean }>`
  width: 100%;
  display: flex;
  position: relative;
  justify-content: ${({ centered }) => (centered ? "center" : "flex-start")};
  align-items: center;

  .ais-SearchBox-form {
    display: flex;
    width: 100%;
    height: 50px;
    align-items: stretch;
    border: 1px solid transparent;
    border-radius: ${themeGet("search.borderRadius")};
    background-color: ${themeGet("colors.lightGray")};
    padding: 0 20px;
    overflow: hidden;
    transition: all 0.5s ease;
    position: relative;
    input {
      width: 100%;
      height: 100%;
      display: flex;
      border: 0;
      background-color: transparent;
      font-size: 13px;
      letter-spacing: 1px;
      padding: 0 15px;
      outline: 0;
      box-shadow: none;

      &::placeholder {
        font-weight: 400;
        color: ${themeGet("colors.gray")};
      }
      &.focus-visible {
        background: #fff;
        box-shadow: 1px -1px 0px 10000px white;
        color: ${themeGet("colors.black")};
        font-weight: 500;
      }

      ::-webkit-search-cancel-button {
        display: none;
      }
    }

    .ais-SearchBox-reset,
    .ais-SearchBox-submit {
      background: transparent;
      outline: none;
      cursor: pointer;
      border: none;
    }

    .ais-SearchBox-reset {
      height: 25px;
      width: 45px;
      position: absolute;
      right: 60px;
      top: 15px;
      border-right: 1px solid ${themeGet("colors.lightGray")};
      svg {
        width: 18px;
        height: 18px;
      }
    }
  }

  .ais-SearchBox {
    flex: 1;
    max-width: 400px;
    min-width: 300px;
  }

  &.mobile {
    &.active {
      background: ${themeGet("menu.backgroundColor")};
      position: fixed;
      top: 0px;
      right: 0px;
      bottom: 0px;
      padding: 20px;
      height: calc(100vh + 0px);
      width: 100vw;
    }
    .ais-SearchBox-form {
      height: 45px;
      padding: 0 20px;
      input {
        padding: 0;
        font-size: 15px;
      }

      .ais-SearchBox-reset {
        top: 10px;
        right: 50px;
        width: 40px;
        svg {
          width: 20px;
          height: 20px;
        }
      }
      .ais-SearchBox-submit {
        width: 30px;
        svg {
          width: 20px;
          height: 20px;
        }
      }
    }
  }
`;

export const Suggestions = styled.div`
  width: 25%;
  @media screen and (max-width: 1600px) {
    width: 20%;
  }
`;
export const Results = styled.div`
  flex: 1;
`;

export const ResultsContainer = styled.div`
  display: flex;
  width: 100%;
  flex-wrap: wrap;
`;

export const SearchResults = styled.div`
  overflow-y: scroll;
  background: #fff;
  display: flex;
  position: absolute;
  top: 65px;
  border-radius: ${themeGet("borderRadius")};
  padding: 20px;
  width: 100%;
  max-height: 500px;
  box-shadow: 2px 0px 5px 0px rgba(189, 189, 189, 0.37);
  overscroll-behavior: none;
  z-index: 1;
  width: 900px;

  @media screen and (max-width: 1200px) {
    width: auto;
  }

  &.mobile {
    top: 100px;
    left: 0px;
    z-index: 10000;
    padding-top: 20px;
    flex-direction: column;
    height: calc(100vh - 80px);
    max-height: none;
    border-radius: 0px;
    box-shadow: none;
    padding-bottom: 200px;
    ${Suggestions}, ${Results} {
      width: 100%;
    }
  }
`;

export const InstantSearchResultWrapper = styled.a`
  display: flex;
  color: ${themeGet("colors.black")};

  border-radius: ${themeGet("borderRadius")};
  background: #fff;
  margin: 8px 5px;
  width: calc(50% - 10px);
  cursor: pointer;
  box-shadow: 0px 4px 22px rgba(0, 0, 0, 0.05);

  &:hover {
    box-shadow: 0px 4px 22px rgba(0, 0, 0, 0.1);
  }

  @media screen and (max-width: 1400px) {
    width: calc(100%);
  }

  @media screen and (max-width: 460px) {
    margin: 5px 0;
  }
`;

export const ResultImage = styled.div`
  padding: 5px;
  & img {
    width: 83px;
    height: 92px;
    object-fit: contain;
  }
`;

export const ResultContent = styled.div`
  padding: 17px 10px 17px 10px;
  font-style: normal;
  font-weight: normal;
  font-size: 13px;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;
export const ResultName = styled.div``;
export const ResultPrice = styled.div`
  color: ${themeGet("primary.color")};
  font-weight: 600;
  font-size: 15px;
`;

export const ResultVintage = styled.div`
  padding: 10px 15px 10px 10px;
  span {
    color: ${themeGet("colors.gray")} !important;
  }

  svg {
    margin-right: 5px !important;
    path {
      fill: ${themeGet("colors.gray")};
    }
  }
`;

export const SearchTitle = styled.div`
  color: #818693b3;
  font-size: 13px;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 1px;
  margin-bottom: 5px;
`;

export const NotFoundWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;

  .title {
    color: ${themeGet("colors.black")};
    font-style: normal;
    font-weight: bold;
    font-size: 17px;
    margin: 20px 0;
  }

  .message {
    text-align: center;
    color: ${themeGet("colors.gray")};
    font-weight: 400;
    font-size: 14px;
    margin-bottom: 20px;
  }
`;

export const SuggestionsList = styled.ul`
  margin-top: 15px;
  font-weight: 500;
  font-size: 15px;
`;
export const SuggestionsItem = styled.li`
  & a {
    color: ${themeGet("colors.black")};
    &:hover {
      color: ${themeGet("primary.color")};
      text-decoration: none;
    }
  }

  & {
    margin-bottom: 15px;
  }
`;

export const LoadingSearch = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
`;

export const BackMobileButton = styled.button`
  outline: none;
  background: none;
  border: none;
  height: 50px;
  padding: 0px;
  margin-right: 5px;

  cursor: pointer;
`;
