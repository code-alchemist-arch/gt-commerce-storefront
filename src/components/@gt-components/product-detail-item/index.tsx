import { FC, ReactElement } from "react";
import {
  Details,
  GTProductDetailItemWrapper,
  IconWrapper,
} from "./index.styles";

export interface IGTProductDetailProps {
  title: string;
  value: any;
  icon?: string | ReactElement;
}

export const GTProductDetailItem: FC<IGTProductDetailProps> = ({
  title,
  value,
  icon,
}) => {
  if (!value) return null;
  return (
    <GTProductDetailItemWrapper>
      {icon && (
        <IconWrapper>
          {typeof icon === "string" ? (
            <img src={icon} alt="product detail item icon" />
          ) : (
            icon
          )}
        </IconWrapper>
      )}
      <Details>
        <h4>{title}</h4>
        <p>{value}</p>
      </Details>
    </GTProductDetailItemWrapper>
  );
};
