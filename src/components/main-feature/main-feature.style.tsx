import styled from "styled-components";

export const MainFeatureGrid = styled.div`
  margin: 30px 0;
  display: grid;
  grid-template-columns: [left-start] 1fr [center-start] 2fr [center-end] 1fr [right-end];
  grid-template-rows: [top-start] 1fr [bottom-start] 1fr [bottom-end];
  grid-gap: 0.8rem;

  & > div {
    background: black;
    position: relative;
  }

  & > div::before {
    content: "";
    padding-bottom: 100%;
    display: block;
  }

  & > .leftTop {
    grid-column-start: left-start;
    grid-column-end: center-start;
    grid-row-start: top-start;
    grid-row-end: bottom-start;
  }
  & > .leftBottom {
    grid-column-start: left-start;
    grid-column-end: center-start;
    grid-row-start: bottom-start;
    grid-row-end: bottom-end;
  }
  & > .middle {
    grid-column-start: center-start;
    grid-column-end: center-end;
    grid-row-start: top-start;
    grid-row-end: bottom-end;
  }

  @media screen and (max-width: 767px) {
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 1fr 1fr 1fr 1fr;

    & > .leftTop {
      grid-column-start: 1;
      grid-column-end: 1;
      grid-row-start: 1;
      grid-row-end: 1;
    }
    & > .leftBottom {
      grid-column-start: 2;
      grid-column-end: 3;
      grid-row-start: 1;
      grid-row-end: 1;
    }

    & > .middle {
      grid-column: 1 / 3;
      grid-row: 3 / 5;
    }

    & > .rightTop {
      grid-column: 1 / 2;
      grid-row: 2 / 3;
    }

    & > .rightBottom {
      grid-column: 2 / 3;
      grid-row: 2 / 3;
    }
  }
`;
