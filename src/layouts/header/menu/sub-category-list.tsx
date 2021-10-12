import React from "react";
import MenuItem from "./menu-item";
import { MenuColumn, StyledSubCategoryList } from "./menu.style";
import { ItemMenu } from "./menu";
import { defaultTheme } from "../../../site-settings/site-theme/default";
import Icon from "../../../components/icon/icon";

type SubCategoryListProps = {
  subcategories: ItemMenu[];
  intlId?: any;
  handleSubCatOnClick?: React.EventHandler<any>;
  handleSubSubCatOnClick?: React.EventHandler<any>;
};

const columnIndex = {
  one: 1,
  two: 2,
  three: 3,
  four: 4,
  five: 5,
};

const SubCategoryList: React.FC<SubCategoryListProps> = ({
  subcategories = [],
  intlId,
  handleSubCatOnClick,
  handleSubSubCatOnClick,
}: SubCategoryListProps) => {
  return (
    <StyledSubCategoryList>
      {subcategories.map((subcat) => (
        <MenuColumn column={subcat.column_position} key={subcat.id}>
          {!subcat.icon_list && (
            <MenuItem
              className="SubcategoryItem"
              key={subcat.id}
              intlId={intlId}
              link={subcat.url}
              icon={
                subcat.icon_slug && (
                  <Icon
                    name={subcat.icon_slug}
                    width={25}
                    height={25}
                    color={defaultTheme.menu.color}
                  />
                )
              }
              label={subcat.label}
              col={subcat.column_position || 1}
              handleOnClick={handleSubCatOnClick}
              image={subcat.show_image && subcat.image?.url}
            />
          )}
          {subcat.children?.length > 0 &&
            subcat.children.map((subSubCat) => (
              <MenuItem
                className={
                  subcat.icon_list
                    ? "SubcategoryItem SubcategoryItemIcon"
                    : "SubSubcategoryItem"
                }
                key={subSubCat.id}
                intlId={intlId}
                link={subSubCat.url}
                icon={
                  subSubCat.icon_slug && (
                    <Icon
                      name={subSubCat.icon_slug}
                      width={25}
                      height={25}
                      color={defaultTheme.menu.color}
                    />
                  )
                }
                label={subSubCat.label}
                col={subcat.column_position || 1}
                handleOnClick={handleSubSubCatOnClick}
              />
            ))}
        </MenuColumn>
      ))}
    </StyledSubCategoryList>
  );
};

export default SubCategoryList;
