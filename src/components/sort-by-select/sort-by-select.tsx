import React from "react";
import Select from "react-select";
import { DeviceType } from "interfaces";
import { SortBySelectWrapper } from "./sort-by-select.style";
import { defaultTheme } from "../../site-settings/site-theme/default";
import ExpandIcon from "../../assets/icons/ExpandIcon";

const defaultOptions = [
  { value: "price_asc", label: "Price - Low to High" },
  { value: "price_dsc", label: "Price - High to Low" },
  { value: "name_asc", label: "Alphabetically - A-Z" },
  { value: "name_dsc", label: "Alphabetically - Z-A" },
  { value: "date_asc", label: "Date - Old to New" },
  { value: "date_dsc", label: "Date - New to Old" },
];
const customStyles = {
  option: (provided, state) => {
    return {
      // ...provided,
      fontSize: 14,
      fontWeight: state.isSelected ? 500 : 400,
      maxWidht: 180,
      cursor: "pointer",
      color: state.isSelected
        ? defaultTheme.primary.color
        : defaultTheme.colors.black,
      margin: "10px 0",
      ":hover": { color: defaultTheme.primary.color },
      ":active": { color: defaultTheme.primary.color, fontWeight: 500 },
    };
  },
  control: (provided, state) => ({
    minWidth: state.hasValue ? 190 : 90,
    fontSize: 14,
    fontWeight: 500,
    cursor: "pointer",
    display: "flex",
  }),
  container: (provided, state) => {
    return {
      display: "flex",
      alignItems: "center",
      margin: "0 5px",
      position: "relative",
      background: state.className !== "desktop" ? "#fff" : "transparent",
      borderRadius: state.className !== "desktop" ? "24.5px" : "0",
      height: "45px",
      padding: state.className !== "desktop" ? "0 7px" : 0,
      zIndex: 2,
      boxShadow:
        state.className !== "desktop"
          ? "0px 1px 4px rgba(0, 0, 0, 0.07)"
          : "none",
    };
  },
  placeholder: () => ({
    color: defaultTheme.colors.black,
  }),
  menu: (provided) => ({
    ...provided,
    width: 200,
    padding: "5px 15px",
  }),
  singleValue: (provided, state) => {
    // const opacity = state.isDisabled ? 0.5 : 1;
    // const transition = 'opacity 300ms';

    // return { ...provided, opacity, transition };
    return { ...provided };
  },
};

type Props = {
  options?: any[];
  value: string;
  onChange: Function;
  deviceType: DeviceType;
};

const SortBySelect: React.FC<Props> = ({
  options,
  value,
  onChange,
  deviceType,
}: Props) => {
  let className = "desktop";
  if (deviceType?.mobile) {
    className = "mobile";
  } else if (deviceType?.tablet) {
    className = "tablet";
  }

  const ExpIc = () => <ExpandIcon />;
  ExpIc.displayName = "ExpIc";
  return (
    <SortBySelectWrapper>
      <Select
        className={className}
        isSearchable={false}
        // menuPlacement="bottom"
        placeholder="Sort by"
        styles={customStyles}
        options={options || defaultOptions}
        value={value}
        components={{
          IndicatorSeparator: () => null,
          IndicatorsContainer: ExpIc,
        }}
        onChange={onChange}
      />
    </SortBySelectWrapper>
  );
};

export default SortBySelect;
