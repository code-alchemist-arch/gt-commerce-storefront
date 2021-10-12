import { FieldProps } from "formik";
import React from "react";
import AsyncSelect from "react-select/async";

interface props {
  defaultOptions: any;
  defaultValue: any;
  placeholder?: string;
  loadFunction(): Promise<{ value: string; label: string }>;
}

type SelectProps = props & FieldProps;

const AsyncSelectField: React.FC<SelectProps> = ({
  defaultOptions,
  defaultValue,
  loadFunction,
  placeholder = "Select",
  field,
  form,
}: SelectProps) => {
  return (
    <AsyncSelect
      className="react-select-container"
      classNamePrefix="react-select"
      cacheOptions
      defaultOptions={defaultOptions}
      loadOptions={loadFunction}
      defaultValue={defaultValue}
      name={field.name}
      onChange={(option) => form.setFieldValue(field.name, option.value)}
      onBlur={field.onBlur}
      placeholder={placeholder}
      noOptionsMessage={() => "Type an option..."}
    />
  );
};

export default AsyncSelectField;
