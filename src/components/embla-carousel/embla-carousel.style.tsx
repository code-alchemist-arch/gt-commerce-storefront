import styled from "styled-components";
import { themeGet } from "@styled-system/theme-get";

export const CarouselContainer = styled.div`
  width: 100%;
`;

export const Embla = styled.div`
  position: relative;
  background-color: #ffffff;
  max-width: 1800px;
  margin-left: auto;
  margin-right: auto;
`;

export const EmblaViewport = styled.div`
  overflow: hidden;
  width: 100%;

  .is-draggable {
    cursor: move;
    cursor: grab;
  }

  .is-dragging {
    cursor: grabbing;
  }
`;

export const EmblaContainer = styled.div`
  display: flex;
  user-select: none;
  -webkit-touch-callout: none;
  -webkit-tap-highlight-color: transparent;
  margin-left: -10px;
`;

export const EmblaSlide = styled.div`
  position: relative;
  min-width: 100%;
`;

export const EmblaSlideInner = styled.div`
  position: relative;
  overflow: hidden;
`;

export const EmblaButton = styled.button`
  outline: 0;
  cursor: pointer;
  background-color: transparent;
  touch-action: manipulation;
  position: absolute;
  z-index: 1;
  top: 50%;
  transform: translateY(-50%);
  border: 0;
  width: 30px;
  height: 30px;
  justify-content: center;
  align-items: center;
  fill: ${themeGet("colors.red")};
  padding: 0;

  :disabled {
    cursor: default;
    opacity: 0.3;
  }
`;

export const EmblaButtonSvg = styled.svg`
  width: 100%;
  height: 100%;
`;

export const EmblaButtonPrev = styled(EmblaButton)`
  left: 27px;
`;

export const EmblaButtonNext = styled(EmblaButton)`
  right: 27px;
`;
