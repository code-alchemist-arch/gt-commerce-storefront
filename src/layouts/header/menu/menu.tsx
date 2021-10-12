import React, { useContext } from "react";
import { StyledSubCategoryContainer, StyledMenu } from "./menu.style";
import MenuItem from "./menu-item";
import SubCategoryList from "./sub-category-list";
import { MenuContext } from "../../../contexts/menu/menu.context";

export type ItemMenu = {
  id: number;
  label: string;
  icon_slug: string;
  url?: string;
  col?: number;
  column_position?: number;
  children?: ItemMenu[];
  show_image?: boolean;
  image: {
    url: string;
  };
  icon_list?: boolean;
};

export type MenuProps = {
  intlId?: any;
};

const Menu: React.FC<MenuProps> = ({ intlId }: MenuProps) => {
  const [activeCategory, setActiveCategory] = React.useState(null);
  const {
    state: { menu },
  } = useContext<any>(MenuContext);

  return (
    <StyledMenu>
      {menu?.items.map((category) => (
        <MenuItem
          key={category.id}
          intlId={intlId}
          label={category.label}
          link={category.url}
          className={`CategoryItem ${
            activeCategory === category.label ? "active" : ""
          }`}
          handleOnClick={() => setActiveCategory(null)}
          handleOnMouseOver={() => {
            if (activeCategory === null) {
              setActiveCategory(category.label);
            }
          }}
          handleOnMouseLeave={() => {
            setActiveCategory(null);
          }}
        >
          {category.children.length > 0 && (
            <StyledSubCategoryContainer
              onMouseEnter={() => setActiveCategory(category.label)}
              onMouseLeave={() => setActiveCategory(null)}
            >
              <div className="Container">
                <div className="Content">
                  <SubCategoryList
                    subcategories={category.children}
                    intlId={intlId}
                    handleSubCatOnClick={() => setActiveCategory(null)}
                    handleSubSubCatOnClick={() => setActiveCategory(null)}
                  />
                </div>
              </div>
            </StyledSubCategoryContainer>
          )}
        </MenuItem>
      ))}
    </StyledMenu>
  );
};

export default React.memo(Menu);
