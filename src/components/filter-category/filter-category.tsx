import React from "react";
import { connectRefinementList, connectMenu } from "react-instantsearch-dom";

import ExpandIcon from "../../assets/icons/ExpandIcon";
import Label from "../label/label";
import { FilterCategoryWrapper } from "./filter-category.style";

type Props = {
  text: string;
  iconName: string;
  selected?: boolean;
  onClick?: () => void;
  attribute: string;
  items?: any[];
};

const FilterCategory: React.FC<Props> = ({
  text,
  iconName,
  selected = false,
  onClick,
  items,
}: Props) => {
  return (
    <FilterCategoryWrapper
      className={`${selected ? "selected" : ""}`}
      onClick={onClick}
      style={{
        display: items.length < 1 && "none",
      }}
    >
      <Label
        text={text}
        iconName={iconName}
        iconWidth={26}
        iconHeight={26}
        fontWeight={500}
      />
      <ExpandIcon />
    </FilterCategoryWrapper>
  );
};

export default connectRefinementList(FilterCategory);
