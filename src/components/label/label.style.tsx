import styled from "styled-components";
import { themeGet } from "@styled-system/theme-get";

export const Text = styled.div``;
export const SubText = styled.div`
  font-size: 12px;
  font-weight: 400;
  line-height: 12px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  width: 100%;
`;

export const LabelStyle = styled.div<{
  iconWidth: number;
  fontWeight: number;
  fontSize: number;
}>`
  display: flex;
  align-items: stretch;

  svg {
    margin-right: 10px;
    min-width: ${(props) => props.iconWidth}px;

    @media screen and (max-width: 450px) {
      margin-right: 5px;
    }
  }

  ${Text} {
    color: ${(props) => props.color};
    font-weight: ${(props) => props.fontWeight};
    font-size: ${(props) => props.fontSize}px;
    line-height: 21px;
    margin: 5px 0;
  }
`;

export const IconWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;
export const TextWrapper = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: center;
  flex-direction: column;
  overflow: hidden;
`;
