import styled from "styled-components";
import { themeGet } from "@styled-system/theme-get";

export const StepBoxWrapper = styled.div`
  margin: 10px 0;
`;
export const StepLabel = styled.div`
  display: flex;
  align-items: baseline;
`;

export const StepNumber = styled.span<{ success: boolean }>`
  margin-right: 15px;
  font-weight: 500;
  background: ${(props) =>
    props.success ? themeGet("colors.green") : themeGet("colors.black")};
  border-radius: 50%;
  color: white;
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const StepAction = styled.div`
  color: ${themeGet("colors.gray")};
  margin-left: auto;
  font-size: 13px;
  text-decoration: underline;
  cursor: pointer;
`;

export const StepTitle = styled.div``;

export const SubTitle = styled.div`
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  color: ${themeGet("colors.gray")};
`;
