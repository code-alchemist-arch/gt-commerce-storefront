import styled from "styled-components";

export const ModalCloseBtn = styled.div`
  position: absolute;
  top: 5px;
  right: 5px;
  cursor: pointer;
`;

export const ModalContent = styled.div`
  display: flex;
  padding: 10px;
  width: 100%;

  text-align: center;

  flex-direction: column;
  align-items: center;
`;

export const ProductTitle = styled.h2`
  text-align: center;
  font-size: 18px;
`;

export const DescriptionWrapper = styled.p`
  padding: 10px 0;
  height: 40px;
  line-height: 40px;
  color: #5f943c;
  padding: 0 10px 0 40px;
  margin-bottom: 20px;
  border-bottom: 1px solid #dde8d6;

  font-size: 18px;

  @media screen only and (max-width: 767px) {
    font-size: 12px;
  }
`;

export const ProductImageWrapper = styled.div`
  position: relative;
`;

export const Buttons = styled.div`
  display: flex;
  column-gap: 30px;

  width: 100%;

  justifiy-content: space-between;
`;
