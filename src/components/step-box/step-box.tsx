import React, { forwardRef } from "react";
import { defaultTheme } from "../../site-settings/site-theme/default";
import InformationBox from "../information-box/information-box";
import Label from "../label/label";
import {
  StepBoxWrapper,
  StepLabel,
  StepNumber,
  StepAction,
  StepTitle,
  SubTitle,
} from "./step-box.style";

type StepBoxProps = {
  disabled: boolean;
  success?: boolean;
  title?: string;
  subtitle?: string;
  stepNumber: number;
  className?: string;
  action?: string;
  onAction?: Function;
  children?: React.ReactElement;
};

const StepBox = (
  {
    disabled = true,
    success = false,
    title = "",
    subtitle = "",
    stepNumber = 0,
    className,
    action,
    onAction,
    children,
  }: StepBoxProps,
  ref: React.RefObject<HTMLInputElement>
) => {
  const handleAction = () => {
    onAction && onAction();
  };
  return (
    <InformationBox overflow className={className}>
      <StepBoxWrapper ref={ref}>
        <StepLabel>
          <StepNumber success={success}>{stepNumber}</StepNumber>
          <StepTitle>
            <Label
              text={title}
              fontSize={17}
              fontWeight={500}
              color={disabled ? defaultTheme.colors.gray : undefined}
            ></Label>
            {subtitle && <SubTitle>{subtitle}</SubTitle>}
          </StepTitle>

          {action && <StepAction onClick={handleAction}>{action}</StepAction>}
        </StepLabel>
        {children}
      </StepBoxWrapper>
    </InformationBox>
  );
};

export default forwardRef(StepBox);
