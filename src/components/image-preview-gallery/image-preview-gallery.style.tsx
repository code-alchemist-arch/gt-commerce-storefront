import styled from "styled-components";
import { variant } from "styled-system";

export const ImageGallery = styled.div<{ layout?: string }>`
  height: 100%;
  width: 100%;
  margin: 0 40px;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  flex-direction: ${({ layout }) => layout};

  & .no-image-placeholder {
    width: 350px;
  }
`;

export const ImagePreview = styled.div`
  display: none;
  align-self: center;

  & img {
    object-fit: contain;
  }

  &.active {
    display: block;

    img {
      cursor: pointer;
    }
  }
`;

export const ThumbList = styled("ul")<{ layout?: string }>(
  {
    width: "77px",
    paddingRight: "30px",
    zIndex: 999,
  },
  variant({
    variants: {
      row: {
        marginTop: "15px",
        display: "block",
      },
      column: {
        marginTop: "-15px",
        display: "flex",
        width: "100%",
        order: 1,
      },
    },
  })
);

export const ThumbItem = styled.li`
  cursor: pointer;
  width: 70px;
  height: 70px;
  background: #ffffff;
  box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.07);
  border-radius: 6px;
  overflow: hidden;
  padding: 5px;
  margin-bottom: 7px;
  margin-right: 7px;

  &.active {
    img {
      opacity: 1;
    }
  }

  & img {
    width: auto;
    height: 60px;
    margin: auto;
    opacity: 0.5;
    transition: opacity 0.3s ease-in-out;
    &:hover {
      opacity: 1;
    }
  }
`;

export const NoImagePlaceHolder = styled.div`
  img {
    width: 350px;
    height: 350px;
    object-fit: none;
  }
`;
