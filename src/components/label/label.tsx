import React, { MouseEvent } from "react";
import {
  LabelStyle,
  Text,
  SubText,
  TextWrapper,
  IconWrapper,
} from "./label.style";
import dynamic from "next/dynamic";
import { defaultTheme } from "../../site-settings/site-theme/default";

const Icon = dynamic(() => import("components/icon/icon"));

type LabelProps = {
  className?: string;
  iconName?: string;
  iconWidth?: number;
  iconHeight?: number;
  color?: string;
  iconColor?: string;
  fontSize?: number;
  fontWeight?: number;
  text: string;
  subtext?: string;
  onClick?: (event: MouseEvent<HTMLDivElement>) => void;
};
const Label: React.FC<LabelProps> = ({
  className,
  iconName,
  iconWidth,
  iconHeight,
  text,
  subtext,
  color = defaultTheme.colors.black,
  iconColor,
  fontSize = 14,
  fontWeight = 400,
  onClick,
}: LabelProps) => {
  return (
    <LabelStyle
      className={className}
      color={color}
      fontSize={fontSize}
      fontWeight={fontWeight}
      iconWidth={iconWidth}
      onClick={onClick}
    >
      {!!iconName && (
        <IconWrapper>
          <Icon
            color={iconColor ? iconColor : color}
            name={iconName}
            width={iconWidth}
            height={iconHeight}
          />
        </IconWrapper>
      )}
      <TextWrapper>
        <Text>{text}</Text>
        <SubText>{subtext}</SubText>
      </TextWrapper>
    </LabelStyle>
  );
};

export default Label;
