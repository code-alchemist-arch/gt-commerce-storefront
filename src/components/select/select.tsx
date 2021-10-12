import { FieldProps } from "formik";
import React from "react";
import Select from "react-select";

type props = {
  options: any;
  placeholder?: string;
  onChange: (option: any) => void;
};

type SelectProps = props & FieldProps;

const SelectField: React.FC<SelectProps> = ({
  options,
  placeholder = "Select",
  field,
  form,
  onChange,
}: SelectProps) => (
  <Select
    className="react-select-container"
    classNamePrefix="react-select"
    options={options}
    name={field.name}
    value={
      options
        ? options.find((option) => option.value === field.value)
        : undefined
    }
    onChange={(option) => {
      if (onChange) {
        onChange(option);
      }
      form.setFieldValue(field.name, option.value);
    }}
    onBlur={field.onBlur}
    placeholder={placeholder}
  />
);

export default SelectField;
