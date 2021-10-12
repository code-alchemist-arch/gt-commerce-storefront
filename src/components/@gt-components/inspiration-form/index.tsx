import { useEffect, useState, FC, FormEvent, ChangeEvent } from "react";
import { GTButton } from "../base-components/gt-button";
import {
  GTOption,
  GTSelect,
  IGTSelectProps,
} from "../base-components/gt-select";

import {
  InspirationFormWrapper,
  FormTitle,
  GTSelectWrapper,
  GTButtonWrapper,
  GTSelectsWrapper,
} from "./index.styles";

export interface IInspirationFormProps {
  /**
   * Title String of Form
   */
  title?: string;
  /**
   * Selects
   */
  selects?: Array<IGTSelectProps>;
  /**
   * Handler of Form submit
   */
  onFind?: (formData: any) => void;
}

export interface InspFormData {
  [property: string]: GTOption;
}

export const InspirationForm: FC<IInspirationFormProps> = ({
  title,
  selects,
  onFind,
}) => {
  const [formData, setFormData] = useState<InspFormData>({});
  const onSubmitHandler = (e: FormEvent) => {
    // Prevent Form Auto Reloading
    e.preventDefault();
    onFind && onFind(formData);
  };

  const onChange = (
    e: ChangeEvent<HTMLSelectElement>,
    selectItem: IGTSelectProps
  ) => {
    const selectedValue = selectItem.options.find(
      (itm) => itm.value === parseInt(e.target.value)
    );
    const newData = { [selectItem.name]: selectedValue };
    setFormData({ ...formData, ...newData });
  };

  return (
    <InspirationFormWrapper>
      {title && (
        <FormTitle>
          <span>{title}</span>
        </FormTitle>
      )}
      <form onSubmit={onSubmitHandler}>
        <GTSelectsWrapper>
          {selects?.map((selectItem) => (
            <GTSelectWrapper key={selectItem.id}>
              <GTSelect
                label={selectItem.label}
                id={selectItem.id}
                options={selectItem.options}
                name={selectItem.name}
                onChange={(e: ChangeEvent<HTMLSelectElement>) =>
                  onChange(e, selectItem)
                }
              />
            </GTSelectWrapper>
          ))}
        </GTSelectsWrapper>
        <GTButtonWrapper>
          <GTButton
            type="submit"
            backgroundColor="#562345"
            variant="secondary"
            size="medium"
            rounded={false}
          >
            Find
          </GTButton>
        </GTButtonWrapper>
      </form>
    </InspirationFormWrapper>
  );
};
