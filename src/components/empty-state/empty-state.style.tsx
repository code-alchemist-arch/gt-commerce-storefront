import styled from "styled-components";
import { themeGet } from "@styled-system/theme-get";

export const EmptyStateWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  margin: 50px 0;
`;

export const EmptyStateTitle = styled.div`
  font-size: 19px;
  font-weight: 700;
  color: ${themeGet("colors.black")};
  margin: 10px 0;
  text-align: center;
  @media screen and (max-width: 464px) {
    font-size: 17px;
    margin: 10px 0;
  }
`;
export const EmptyStateMessage = styled.div`
  font-size: 15px;
  font-weight: 400;

  color: ${themeGet("colors.gray")};
  text-align: center;
  margin: 20px;

  @media screen and (max-width: 464px) {
    font-size: 14px;
    margin: 10px;
  }
`;
