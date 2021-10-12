import styled from "styled-components";

export const GTButtonWrapper = styled.button<{
  backgroundColor?: string;
  hoverColor?: string;
  disabledColor?: string;
  variant?: "primary" | "secondary";
  size?: "small" | "medium" | "large";
  rounded?: boolean;
  fullwidth?: boolean;
}>`
  display: flex;
  justify-content: center;
  align-items: center;

  width: ${({ fullwidth }) => (fullwidth ? "100%" : "fit-content")};

  border: ${({ variant, backgroundColor }) =>
    variant === "secondary" ? `1px solid ${backgroundColor}` : "none"};
  background: ${({ backgroundColor }) => backgroundColor};

  border-radius: ${({ rounded }) => (rounded ? "4px" : 0)};
  color: white;

  opacity: 1;

  font-size: ${({ size }) => {
    return size === "large"
      ? "18px"
      : size === "medium"
      ? "14px"
      : size === "small"
      ? "12px"
      : "14px";
  }};
  padding: ${({ size }) => {
    return size === "large"
      ? "10px 30px"
      : size === "medium"
      ? "10px 20px"
      : size === "small"
      ? "5px 10px"
      : "10px 20px";
  }};

  text-transform: uppercase;

  cursor: pointer;
  transition: all 0.3s ease-in;
  &:hover {
    transition: all 0.3s ease-in;
    background: ${({ hoverColor, variant }) =>
      variant === "primary" ? hoverColor : "transparent"};
    color: ${({ variant, backgroundColor }) =>
      variant === "primary" ? "inherits" : `${backgroundColor}`};
  }

  &:disabled {
    background: ${({ disabledColor }) => disabledColor || "gray"};
  }

  img {
    width: ${({ size }) => {
      return size === "large"
        ? "26px"
        : size === "medium"
        ? "20px"
        : size === "small"
        ? "18px"
        : "20px";
    }};

    margin-right: 5px;
  }
`;
