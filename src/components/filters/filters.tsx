import React, { useRef, useState } from "react";
import {
  FilterOptionsWrapper,
  FiltersCategories,
  FiltersInnerWrapper,
  FiltersPopover,
  FiltersPopoverWrapper,
  FiltersWrapper,
  OptionsListWrapper,
  ToggleIcon,
} from "./filters.style";
import { connectRefinementList, connectMenu } from "react-instantsearch-dom";
import FilterCategory from "../filter-category/filter-category";
import Label from "../label/label";
import { defaultTheme } from "../../site-settings/site-theme/default";
import { useOutsideAlerter } from "../../utils/useOutsideAlerter";
import { FC } from "react";

export const filterIcons = {
  country: "countries",
  region: "region",
  varietal: "varietal",
  price: "price",
  size: "size",
  subregion: "region",
  vintage: "vintage",
  in_stock: "box",
  on_sale_flag: "price",
  product_category: "countries",
  product_subcategory: "countries",
};

const filters = [
  "country",
  "region",
  "varietal",
  // "subregion",
  "vintage",
  "age",
  "in_stock",
  "product_category",
  "product_subcategory",
  "on_sale_flag",
  "product_size",
  "rating",
  "price_range_bucket",
];

const filterLabels = {
  country: "Country",
  region: "Region",
  varietal: "Varietal",
  price: "Price",
  size: "Size",
  subregion: "Subregion",
  vintage: "Vintage",
  age: "Age",
  in_stock: "In stock",
  product_category: "Category",
  product_subcategory: "Subcategory",
  on_sale_flag: "On sale",
  product_size: "Size",
  rating: "Rating",
  price_range_bucket: "Price Range",
};

const CRefinementList = ({ items, refine, setActiveFilter, attribute }) => {
  if (items.length === 0) {
    return <div>No facets available</div>;
  }

  if (attribute === "in_stock" || attribute === "on_sale_flag") {
    items = items
      .filter((item) => item.label === "true" || item.label === "false")
      .map((item) => ({
        ...item,
        label: item.label === "true" ? "Yes" : "No",
      }));
  }

  if (attribute === "price_range_bucket") {
    const getValueFromLabel = (label) => {
      const newLabel = label[0] === "$" ? label.substr(1) : label;
      return newLabel.split("-")[0].trim();
    };

    items = items
      .map((item: any) => ({
        ...item,
        sortVal: getValueFromLabel(item.label),
      }))
      .sort((prv, nxt) => prv.sortVal - nxt.sortVal);
  } else {
    items = items.sort((a, b) => (a.label < b.label ? -1 : 1));
  }

  return (
    <OptionsListWrapper>
      <ul>
        {items.map((item) => {
          const selected = item.isRefined;
          return (
            <li
              key={item.label}
              onClick={() => {
                refine(item.value);
                setActiveFilter(null);
              }}
            >
              <Label
                iconName={selected ? "checkSquare" : "square"}
                color={
                  selected
                    ? defaultTheme.secondary.color
                    : defaultTheme.colors.black
                }
                text={item.label}
                fontSize={13}
                iconWidth={20}
                iconHeight={20}
              />
            </li>
          );
        })}
      </ul>
    </OptionsListWrapper>
  );
};

const CustomRefinementList = connectRefinementList(CRefinementList);

interface FilterProps {
  filter: string;
  activeFilter: string;
  setActiveFilter: (filter: string) => void;
  collection: string;
  subcategory: string;
  showIcon?: boolean;
}

const Filter: FC<FilterProps> = ({
  filter,
  activeFilter,
  setActiveFilter,
  collection,
  subcategory,
  showIcon = true,
}: FilterProps) => {
  const filterRef = useRef(null);
  const [isOutside, setIsOutside] = useOutsideAlerter(filterRef);

  React.useEffect(() => {
    if (isOutside) {
      setActiveFilter(null);
    }
  }, [isOutside]);

  const handleFocus = (event: React.MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
    if (activeFilter !== filter) {
      (setIsOutside as React.Dispatch<React.SetStateAction<boolean>>)(false);
    } else {
      (setIsOutside as React.Dispatch<React.SetStateAction<boolean>>)(true);
    }
  };

  return (
    <FiltersPopoverWrapper
      key={filter}
      onClick={handleFocus}
      ref={filterRef}
      className={filter === "product_category" ? "hidden" : ""}
    >
      <FiltersPopover className={activeFilter === filter ? "visible" : ""}>
        <FilterOptionsWrapper>
          {filter === "in_stock" ? (
            <CustomRefinementList
              attribute={filter}
              operator="and"
              setActiveFilter={setActiveFilter}
              defaultRefinement={["true"]}
            />
          ) : filter === "product_category" && collection ? (
            <CustomRefinementList
              attribute={filter}
              operator="and"
              setActiveFilter={setActiveFilter}
              defaultRefinement={[collection]}
            />
          ) : filter === "product_subcategory" && subcategory ? (
            <CustomRefinementList
              attribute={filter}
              operator="and"
              setActiveFilter={setActiveFilter}
              defaultRefinement={[subcategory]}
            />
          ) : (
            <CustomRefinementList
              attribute={filter}
              operator="and"
              setActiveFilter={setActiveFilter}
            />
          )}
        </FilterOptionsWrapper>
      </FiltersPopover>
      <FilterCategory
        attribute={filter}
        text={filterLabels[filter]}
        iconName={showIcon && filterIcons[filter]}
        onClick={() => setActiveFilter(filter)}
      />
    </FiltersPopoverWrapper>
  );
};

const MenuSelect = ({
  items,
  currentRefinement,
  refine,
  filter,
  activeFilter,
  setActiveFilter,
  showIcon,
}) => {
  const filterRef = useRef(null);
  const [isOutside, setIsOutside] = useOutsideAlerter(filterRef);

  const handleFocus = (event: React.MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();

    if (activeFilter !== filter) {
      (setIsOutside as React.Dispatch<React.SetStateAction<boolean>>)(false);
    }
  };

  React.useEffect(() => {
    if (isOutside) {
      setActiveFilter(null);
    }
  }, [isOutside]);

  const onClickFilter = (): void => {
    setActiveFilter(filter);
  };
  return (
    <FiltersPopoverWrapper key={filter} onClick={handleFocus} ref={filterRef}>
      <FilterCategory
        attribute={filter}
        text={currentRefinement || filterLabels[filter]}
        iconName={showIcon && filterIcons[filter]}
        onClick={onClickFilter}
      />
      <FiltersPopover
        className={activeFilter && activeFilter === filter ? "visible" : ""}
      >
        <FilterOptionsWrapper>
          <OptionsListWrapper>
            <ul>
              {items
                .sort((a, b) => (a.label < b.label ? -1 : 1))
                .map((item) => {
                  const selected = item.isRefined;
                  return (
                    <li
                      key={item.label}
                      onClick={() => {
                        refine(item.value);
                        setActiveFilter(null);
                      }}
                    >
                      <Label
                        iconName={selected ? "checkSquare" : "square"}
                        color={
                          selected
                            ? defaultTheme.secondary.color
                            : defaultTheme.colors.black
                        }
                        text={item.label}
                        fontSize={13}
                        iconWidth={20}
                        iconHeight={20}
                      />
                    </li>
                  );
                })}
            </ul>
          </OptionsListWrapper>
        </FilterOptionsWrapper>
      </FiltersPopover>
    </FiltersPopoverWrapper>
  );
};

const CustomMenuSelect = connectMenu(MenuSelect);

type Props = {
  collection?: string;
  subcategory?: string;
  singleValue?: boolean;
  centered?: boolean;
};

const Filters: React.FC<Props> = ({
  collection,
  singleValue,
  centered,
  subcategory,
}: Props) => {
  const [activeFilter, setActiveFilter] = useState(null);
  // const [showIcon, setShowIcon] = useState(true);

  return (
    <FiltersWrapper centered={centered}>
      <FiltersInnerWrapper>
        <FiltersCategories>
          {!singleValue
            ? filters.map((filter) => (
                <Filter
                  filter={filter}
                  activeFilter={activeFilter}
                  setActiveFilter={setActiveFilter}
                  key={filter}
                  collection={collection}
                  subcategory={subcategory}
                  showIcon={process.env.SHOW_FACET_ICONS === "true"}
                />
              ))
            : ["product_category", "product_subcategory"].map((filter) => (
                <CustomMenuSelect
                  filter={filter}
                  key={filter}
                  attribute={filter}
                  activeFilter={activeFilter}
                  setActiveFilter={setActiveFilter}
                  showIcon={process.env.SHOW_FACET_ICONS === "true"}
                />
              ))}
        </FiltersCategories>
        {/*<ToggleIcon onClick={() => setShowIcon(!showIcon)}>*/}
        {/*  <Label*/}
        {/*    iconName={showIcon ? "checkSquare" : "square"}*/}
        {/*    color={*/}
        {/*      showIcon*/}
        {/*        ? defaultTheme.secondary.color*/}
        {/*        : defaultTheme.colors.black*/}
        {/*    }*/}
        {/*    text={showIcon ? "Hide Icon" : "Show Icon"}*/}
        {/*    fontSize={13}*/}
        {/*    iconWidth={20}*/}
        {/*    iconHeight={20}*/}
        {/*  />*/}
        {/*</ToggleIcon>*/}
      </FiltersInnerWrapper>
    </FiltersWrapper>
  );
};

export default React.memo(Filters);
