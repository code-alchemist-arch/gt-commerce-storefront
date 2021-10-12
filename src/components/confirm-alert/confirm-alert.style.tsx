import styled from "styled-components";
import { themeGet } from "@styled-system/theme-get";

export const ConfirmAlertWrapper = styled.div`
  background: white;
  padding: 30px;
  border-radius: ${themeGet("borderRadius")};
  overflow: hidden;
`;

export const AlertTitle = styled.h1`
  font-style: normal;
  font-weight: 600;
  font-size: 18px;
`;
export const AlertMessage = styled.p`
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  margin: 20px 0;
`;

export const AlertActions = styled.div`
  display: flex;
  min-width: 300px;
  justify-content: space-between;
  align-items: center;
  margin-top: 30px;
`;
export const AlertButton = styled.button`
  outline: none;
  background: #818693;
  border: none;
  border-radius: ${themeGet("borderRadius")};
  flex: 1;
  padding: 10px;
  color: white;
  font-weight: 500;
  cursor: pointer;

  &.primary {
    background: #c7ad9d;
  }

  &:not(:last-child) {
    margin-right: 5px;
  }

  &:hover {
    box-shadow: 0px 4px 11px rgba(0, 0, 0, 0.2);
  }
`;
