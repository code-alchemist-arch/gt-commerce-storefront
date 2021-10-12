import SearchIcon from "assets/icons/SearchIcon";
import { useState } from "react";
import { ChangeEvent } from "react";
import { SearchBoxWrapper } from "./index.styles";

export const GTInstantSearchBox = ({
  currentRefinement,
  refine,
  onChange,
  isSticky,
  placeholder,
}) => {
  const [open, setOpen] = useState(false);
  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    refine(e.target.value);

    onChange && onChange(e);
  };

  return (
    <SearchBoxWrapper isSticky={isSticky} open={open}>
      <input
        type="search"
        placeholder={placeholder}
        value={currentRefinement}
        onChange={onChangeHandler}
      />
      <button onClick={() => setOpen(!open)}>
        <SearchIcon />
      </button>
    </SearchBoxWrapper>
  );
};
