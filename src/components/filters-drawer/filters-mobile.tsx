import React from "react";
import {
  ApplyButton,
  ButtonsWrapper,
  ClearButton,
  FiltersMobileWrapper,
  HeaderLabel,
} from "./filters-drawer.style";
import Collapse, { Panel } from "rc-collapse";
import ArrowRightIcon from "../../assets/icons/ArrowRightIcon";
import ExpandIcon from "../../assets/icons/ExpandIcon";
import { filterIcons } from "../filters/filters";
import Label from "../label/label";
import { defaultTheme } from "../../site-settings/site-theme/default";
import {
  FilterOptionsWrapper,
  OptionsListWrapper,
} from "../filters/filters.style";
import { connectRefinementList } from "react-instantsearch-dom";

const CRefinementList = ({ items, currentRefinement, refine }) => (
  <OptionsListWrapper>
    {!!items.length && (
      <ul>
        {items
          .sort((a, b) => (a.label < b.label ? -1 : 1))
          .map((item) => {
            const selected = item.isRefined;
            return (
              <li key={item.label} onClick={() => refine(item.value)}>
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
    )}
  </OptionsListWrapper>
);

const CustomRefinementList = connectRefinementList(CRefinementList);

function expandIcon({ isActive }: { isActive: boolean }) {
  return (
    <i className={!isActive ? "" : "active"}>
      <ExpandIcon width={22} height={22} />
    </i>
  );
}

const FilterHeaderLabel = ({ text, subtext, iconName, isSelected }) => {
  return (
    <HeaderLabel>
      <Label
        text={text}
        subtext={subtext}
        fontWeight={500}
        iconName={iconName}
        iconHeight={30}
        iconWidth={30}
        iconColor={
          isSelected ? defaultTheme.primary.color : defaultTheme.colors.black
        }
      />
    </HeaderLabel>
  );
};

const filters = ["country", "region", "varietal", "subregion", "vintage"];

const FiltersMobile = ({ isDrawerOpen }) => {
  return (
    <FiltersMobileWrapper>
      <Collapse accordion={true} expandIcon={expandIcon}>
        {filters.map((filter) => {
          return (
            <Panel
              key={filter}
              forceRender
              header={
                <FilterHeaderLabel
                  text={filter}
                  subtext=""
                  isSelected={false}
                  iconName={filterIcons[filter]}
                />
              }
            >
              <FilterOptionsWrapper>
                <CustomRefinementList attribute={filter} operator="and" />
              </FilterOptionsWrapper>
            </Panel>
          );
        })}
      </Collapse>
    </FiltersMobileWrapper>
  );
};

export default FiltersMobile;
