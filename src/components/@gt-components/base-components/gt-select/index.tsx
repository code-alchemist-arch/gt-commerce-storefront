import { HTMLProps, ReactElement, FC } from "react";

import { GTSelectWrapper } from "./index.styles";

export type GTOption = {
  value: string | number | undefined;
  text: string;
};

export interface IGTSelectProps extends HTMLProps<HTMLSelectElement> {
  label?: string;
  disabled_text?: string;
  options?: GTOption[];
}

export const GTSelect: FC<IGTSelectProps> = ({
  label,
  options = [],
  disabled_text,
  value,
  ...props
}): ReactElement => {
  const { id, name, disabled, onChange } = props;
  return (
    <GTSelectWrapper>
      <label htmlFor={id}>{label}</label>
      <select
        id={id}
        value={value}
        name={name}
        disabled={disabled}
        onChange={onChange}
      >
        {disabled && <option>{disabled_text || "Select Item First"}</option>}
        <option disabled selected>
          Please select item
        </option>
        {options &&
          options.length > 0 &&
          options.map((opt) => (
            <option value={opt.value} key={opt.value}>
              {opt.text}
            </option>
          ))}
      </select>
    </GTSelectWrapper>
  );
};
