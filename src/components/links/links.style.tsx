import styled from "styled-components";
import { themeGet } from "@styled-system/theme-get";

export const LinksContainer = styled.div`
  padding: 20px 0;
`;

export const LinksGrid = styled.div<{ columns: number }>`
  column-count: ${(props) => props.columns};
  width: fit-content;
  margin: 30px auto;
  column-gap: 60px;

  & > div {
    break-inside: avoid;
    page-break-inside: avoid;
    will-change: transform;
  }

  & a {
    margin-bottom: 15px;
    color: ${themeGet("colors.black")};
  }

  & svg {
    width: 70px;
  }

  @media screen and (max-width: 612px) {
    column-count: 2;
  }

  @media screen and (max-width: 382px) {
    column-count: 1;
  }
`;

export const ResultsSection = styled.div`
  padding: 20px 0;
`;
