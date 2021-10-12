import styled from "styled-components";

export const GTCarouselWrapper = styled.div`
  margin: 5px 0;

  position: relative;
`;

export const ButtonNext = styled.button`
  position: absolute;
  right: calc(4% + 1px);

  display: flex;
  justify-content: center;
  align-items: center;

  padding: 10px;
  width: 40px;
  height: 40px;

  border: none;
  background: rgba(0, 0, 0, 0.5);
  color: white;
  font-size: 20px;
  font-weight: medium;

  border-radius: 50px;

  cursor: pointer;

  &:hover {
    background: rgba(0, 0, 0, 0.7);
    transition: background 0.3s ease-in;
  }

  &::before {
    content: " ";
    display: block;
    width: 15px;
    height: 15px;
    border-right: 2px solid white;
    border-top: 2px solid white;
    transform: translate(-2.5px, 0px) rotate(45deg);
    transform-origin: center;
  }
`;

export const LoadMoreWrapper = styled.div`
  position: absolute;
  right: 0;
  width: 40px;
  height: 40px;
  border-radius: 50px;
  background: rgba(0, 0, 0, 0.5);
  top: 50%;
  transform: translateY(-50%);
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const GTCarouselArrowButton = styled.button<{
  direction: "prev" | "next";
}>`
  position: absolute;
  outline: 0;
  transition: all 0.5s;
  border-radius: 35px;
  z-index: 1000;
  border: 0;
  background: rgba(0, 0, 0, 0.5);
  min-width: 43px;
  min-height: 43px;
  opacity: 1;
  cursor: pointer;
  top: 50%;
  transform: translateY(-50%);
  ${({ direction }) => (direction === "prev" ? "left: 0;" : "right: 0;")}
  transition: all 0.3s ease-in;
  &:hover {
    background: rgba(0, 0, 0, 0.8);
  }
`;

export const CarouselButtonGroupWrapper = styled.div``;
