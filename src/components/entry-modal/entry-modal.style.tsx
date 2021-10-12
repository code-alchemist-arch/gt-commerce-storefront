import styled from "styled-components";
import { themeGet } from "@styled-system/theme-get";

export const Modal = styled.div`
  display: flex;
  flex-wrap: wrap;
`;
export const ModalColumn = styled.div`
  flex: 1;
  position: relative;

  min-width: 360px;
  @media screen and (max-width: 700px) {
    &:first-child {
      display: none;
    }
    min-width: auto;
  }
`;
export const ModalContent = styled.div`
  background: ${themeGet("secondary.color")};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  padding: 30px;
`;
export const ModalHeader = styled.div`
  text-transform: uppercase;
  font-size: 30px;
  font-weight: 600;
  text-align: center;
`;
export const ModalText = styled.div`
  margin-bottom: 30px;
  text-align: center;
`;
export const Newsletter = styled.form``;
export const ModalCloseBtn = styled.div`
  position: absolute;
  top: 5px;
  right: 5px;
  cursor: pointer;
`;
