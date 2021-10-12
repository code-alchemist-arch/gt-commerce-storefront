import React from "react";
import Drawer from "rc-drawer";
import {
  FilterContent,
  FilterHeader,
  HeaderLeftSide,
  HeaderRightSide,
} from "./filters-drawer.style";
import FiltersMobile from "./filters-mobile";
import ArrowLeft from "../../assets/icons/ArrowLeft";
import Filters from "./../filters/filters";
import { GTButton } from "components/@gt-components/base-components/gt-button";

const FiltersDrawer = ({ isOpen = false, onClose }) => {
  return (
    <Drawer
      open={isOpen}
      width={"100%"}
      height={"100%"}
      handler={false}
      level={null}
      placement="left"
    >
      <FilterHeader>
        <HeaderLeftSide>
          <div onClick={onClose}>
            <ArrowLeft />
          </div>
          <div>Filter by</div>
        </HeaderLeftSide>
      </FilterHeader>
      <FilterContent>
        {/* <FiltersMobile isDrawerOpen={isOpen} /> */}
        <Filters />
        <div
          style={{
            background: "white",
            margin: "auto",
            padding: "0 20px",
          }}
        >
          <GTButton
            backgroundColor="#eee"
            color="black"
            size="small"
            rounded={true}
            variant="primary"
            onClick={onClose}
            style={{
              maxWidth: "fit-content",
            }}
          >
            <span style={{ color: "black" }}>Done</span>
          </GTButton>
        </div>
      </FilterContent>
    </Drawer>
  );
};

export default FiltersDrawer;
