import React from "react";
import {
  StyledMenuItem,
  StyledLabel,
  StyledIcon,
  MenuItemLabel,
} from "./menu.style";
import { FormattedMessage } from "react-intl";
import Link from "next/link";
import ExpandIcon from "../../../assets/icons/ExpandIcon";
import { defaultTheme } from "../../../site-settings/site-theme/default";
import Image from "next/image";

type MenuItemProps = {
  intlId?: string;
  label?: string;
  link?: string;

  icon?: any;
  className?: string;
  children?: any;
  showRightArrow?: boolean;
  image?: string;
  handleOnMouseOver?: React.EventHandler<any>;
  handleOnMouseEnter?: React.EventHandler<any>;
  handleOnMouseLeave?: React.EventHandler<any>;
  handleOnClick?: React.EventHandler<any>;
  handleOnLinkClick?: React.EventHandler<any>;
};

const MenuItem: React.FC<MenuItemProps> = ({
  intlId,
  label,
  link,
  icon,
  className,
  children,
  showRightArrow = false,
  image,
  handleOnMouseOver,
  handleOnMouseEnter,
  handleOnMouseLeave,
  handleOnLinkClick,
  handleOnClick,
}: MenuItemProps) => {
  return (
    <StyledMenuItem
      className={className}
      onMouseOver={handleOnMouseOver}
      onMouseLeave={handleOnMouseLeave}
      onMouseEnter={handleOnMouseEnter}
      onClick={handleOnClick}
    >
      <Link href={link || "/"} passHref>
        <a onClick={handleOnLinkClick}>
          <MenuItemLabel>
            {icon && <StyledIcon>{icon}</StyledIcon>}
            <StyledLabel>
              {intlId ? (
                <FormattedMessage
                  id={intlId ? intlId : "defaultMenuCategoryId"}
                  defaultMessage={label}
                />
              ) : (
                label
              )}
            </StyledLabel>
          </MenuItemLabel>
          {image && (
            <div style={{ position: "relative", height: 300 }}>
              <Image
                src={image}
                alt={label}
                layout="fill"
                objectFit="contain"
                objectPosition="left"
              />
            </div>
          )}
        </a>
      </Link>

      {showRightArrow && (
        <div className="expand-icon">
          <ExpandIcon color={defaultTheme.menu.color} />
        </div>
      )}
      {children}
    </StyledMenuItem>
  );
};

export default MenuItem;
