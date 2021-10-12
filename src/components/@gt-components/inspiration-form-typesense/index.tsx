import { TypesenseContext } from "contexts/typesense/typesense.context";
import next from "next";
import { useEffect } from "react";
import { useContext } from "react";
import { useState, FC, FormEvent, ChangeEvent } from "react";
import {
  InstantSearch as TypesenseInstantSearch,
  connectRefinementList,
} from "react-instantsearch-dom";
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
  InspirationForm,
} from "./index.styles";

export interface IGTInspirationFormProps {
  /**
   * Title String of Form
   */
  title?: string;
  /**
   * Selects
   */
  attributes?: Array<{
    label: string;
    name: string;
    isMain: boolean;
  }>;
  /**
   * Handler of Form submit
   */
  onFind?: (formData: any) => void;
}

export interface InspFormData {
  [property: string]: GTOption;
}

const ConnectedRefinementSelects = ({
  items,
  refine,
  attribute = "product_category",
  onChange,
  label,
  isMain = false,
  disabled = false,
}) => {
  const [options, setOptions] = useState<any>([]);
  useEffect(() => {
    if (items && items.length > 0) {
      if (attribute === "price_range_bucket") {
        const getValueFromLabel = (label) => {
          const newLabel = label[0] === "$" ? label.substr(1) : label;
          return newLabel.split("-")[0].trim();
        };
        const res = items
          .map((item: any) => ({
            ...item,
            sortVal: getValueFromLabel(item.label),
          }))
          .sort((prv, nxt) => prv.sortVal - nxt.sortVal);
        setOptions([
          ...res.map((item: any) => ({
            value: item.label,
            text: item.label,
          })),
        ]);
      } else {
        setOptions([
          ...items.map((item: any) => ({
            value: item.label,
            text: item.label,
          })),
        ]);
      }
    }
  }, [attribute, items]);

  const onChangeHandler = (e: ChangeEvent<HTMLSelectElement>) => {
    if (isMain) {
      refine(e.target.value);
    }

    onChange(e);
  };

  return (
    <GTSelectWrapper>
      <GTSelect
        label={label}
        id={attribute}
        options={options}
        name={attribute}
        disabled={disabled}
        onChange={(e: ChangeEvent<HTMLSelectElement>) => onChangeHandler(e)}
      />
    </GTSelectWrapper>
  );
};

const GTConnectedSelect = connectRefinementList(ConnectedRefinementSelects);

export const GTInspirationForm: FC<IGTInspirationFormProps> = ({
  title,
  attributes,
  onFind,
}) => {
  const {
    state: { client, defaultIndexName },
  } = useContext(TypesenseContext);

  const [formData, setFormData] = useState<any>({});
  const onSubmitHandler = (e: FormEvent) => {
    // Prevent Form Auto Reloading
    e.preventDefault();
    onFind && onFind(formData);
  };

  const [mainSelected, setMainSelected] = useState<boolean>(false);
  const onChangeHandler = (
    attr: {
      label: string;
      name: string;
      isMain: boolean;
    },
    selectedValue: ChangeEvent<HTMLSelectElement>
  ) => {
    attr.isMain && setMainSelected(selectedValue.target.value !== undefined);
    setFormData({
      ...formData,
      [attr.name]: selectedValue.target.value,
    });
  };

  return (
    <TypesenseInstantSearch searchClient={client} indexName={defaultIndexName}>
      <InspirationFormWrapper>
        {title && (
          <FormTitle>
            <span>{title}</span>
          </FormTitle>
        )}
        <InspirationForm onSubmit={onSubmitHandler}>
          <GTSelectsWrapper>
            {attributes?.map((attr) => (
              <GTConnectedSelect
                key={attr.name}
                attribute={attr.name}
                label={attr.label}
                isMain={attr.isMain}
                disabled={!attr.isMain && !mainSelected}
                onChange={(selectedValue) =>
                  onChangeHandler(attr, selectedValue)
                }
              />
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
        </InspirationForm>
      </InspirationFormWrapper>
    </TypesenseInstantSearch>
  );
};
