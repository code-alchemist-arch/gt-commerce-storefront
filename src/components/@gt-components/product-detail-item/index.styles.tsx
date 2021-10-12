import styled from "styled-components";

export const GTProductDetailItemWrapper = styled.div`
  display: flex;
  flex: 1;
  align-items: center;

  @media screen and (max-width: 767px) {
    width: 33.333%;
    flex-basis: 33.333%;
    max-width: 33.333%;

    margin: 5px 0;
  }

  @media screen and (max-width: 425px) {
    width: 100%;
    flex-basis: 100%;
    max-width: 100%;
  }
`;

export const IconWrapper = styled.div`
  padding: 5px;
`;

export const Details = styled.div`
  h4 {
    font-family: lato, arial, sans-serif;
    font-weight: 400;
    font-size: 12px;
    letter-spacing: 0.06em;
    line-height: 1.5;
    margin-bottom: 5px;
    line-height: 1;
    text-transform: uppercase;
  }
  p {
    font-family: "droid serif", times, serif;
    font-weight: 400;
    font-size: 22px;
    font-style: italic;
    letter-spacing: normal;
    line-height: 1.2;
    color: gray;
    width: max-content;
  }
`;
