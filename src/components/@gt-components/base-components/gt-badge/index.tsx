import { FC, ReactChildren } from "react";

import {
  GTBadgeWrapper,
  BagdeAmount,
  BadgeText,
  BadgeTextOnly,
  BadgeContainer,
} from "./index.styles";

export interface IGTBadgeProps {
  name: string;
  variant?: "textonly" | "withAmount";
  text?: string;
  amount?: string | number;
  bgColor?: string;
  children?: ReactChildren;
}

export const GTBadge: FC<IGTBadgeProps> = ({
  name,
  bgColor,
  amount,
  text,
  variant = "textonly",
  children,
}) => {
  if (children) return <GTBadgeWrapper>{children}</GTBadgeWrapper>;

  if (variant === "withAmount" && !amount) return null;

  return (
    <GTBadgeWrapper>
      <BadgeContainer bgColor={bgColor}>
        {variant === "textonly" && <BadgeTextOnly>{text}</BadgeTextOnly>}
        {variant === "withAmount" && (
          <>
            <BagdeAmount
              style={{
                fontSize: name === "points" && "28px",
                lineHeight: name === "points" && "30px",
              }}
            >
              {amount}
            </BagdeAmount>
            <BadgeText>{text}</BadgeText>
          </>
        )}
      </BadgeContainer>
    </GTBadgeWrapper>
  );
};
