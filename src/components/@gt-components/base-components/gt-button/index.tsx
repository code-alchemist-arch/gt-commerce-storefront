import { FC, ButtonHTMLAttributes } from "react";

import { GTButtonWrapper } from "./index.styles";

export interface IGTButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon?: React.ReactElement | SVGElement | string;
  text?: string;
  backgroundColor?: string;
  hoverColor?: string;
  disabledColor?: string;
  size?: "large" | "medium" | "small";
  variant?: "primary" | "secondary";
  rounded?: boolean;
  fullwidth?: boolean;
}

export const GTButton: FC<IGTButtonProps> = ({
  icon,
  text,
  backgroundColor,
  hoverColor,
  disabledColor,
  size = "medium",
  variant = "primary",
  rounded = true,
  fullwidth = true,
  ...props
}) => {
  const { type, onClick, children, disabled } = props;
  return (
    <GTButtonWrapper
      backgroundColor={backgroundColor}
      hoverColor={hoverColor}
      disabledColor={disabledColor}
      type={type}
      onClick={onClick}
      size={size}
      variant={variant}
      rounded={rounded}
      disabled={disabled}
      fullwidth={fullwidth}
    >
      {children ? (
        children
      ) : (
        <>
          {typeof icon === "string" ? (
            <img src={icon} alt="button icon" />
          ) : typeof icon === undefined ? null : (
            icon
          )}
          {text}
        </>
      )}
    </GTButtonWrapper>
  );
};
