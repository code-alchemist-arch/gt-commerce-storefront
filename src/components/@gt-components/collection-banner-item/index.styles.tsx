import styled from "styled-components";

export const ItemWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  max-width: 300px;
  a {
    display: block;
    width: 100%;

    figure {
      position: relative;
      width: 100%;

      margin: 0;

      overflow: hidden;

      img {
        width: 100%;
      }

      figcaption {
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;

        height: 4rem;

        text-align: center;

        background: var(--main-color, #351527);

        h3 {
          margin: 10px 0;

          font-size: 1.1rem;
          color: white;
          font-weight: 600;
          text-transform: uppercase;

          @media (max-width: 767px) {
            font-size: 0.9rem;
          }
        }

        p {
          margin: 10px 0;

          font-size: 1rem;
          color: var(--secondary-color, #785d5b);
          @media (max-width: 767px) {
            font-size: 0.8rem;
          }
        }
      }
    }
  }
`;
