import React from "react";
import {
  BreadcrumbItemSeparator,
  BreadcrumbItem,
  BreadcrumbWrapper,
  BreadcrumbContainer,
} from "./breadcrumb.style";
import Link from "next/link";
import ExpandIcon from "../../assets/icons/ExpandIcon";
import { defaultTheme } from "../../site-settings/site-theme/default";

type BreadcrumItem = {
  name: string;
  link?: string;
};

type Prop = {
  items: BreadcrumItem[];
  color?: string;
  backgroundColor?: string;
};

const Breadcrumb: React.FC<Prop> = ({
  items = [],
  color = defaultTheme.colors.black,
  backgroundColor = defaultTheme.colors.lightGray,
}: Prop) => {
  return (
    <BreadcrumbContainer backgroundColor={backgroundColor}>
      <BreadcrumbWrapper color={color}>
        <BreadcrumbItem>
          <Link href="/" passHref>
            <a>Home</a>
          </Link>
        </BreadcrumbItem>
        {items.map((item) => (
          <React.Fragment key="item.name">
            <BreadcrumbItemSeparator>
              <ExpandIcon color={color} width={15} height={15} />
            </BreadcrumbItemSeparator>

            <BreadcrumbItem>
              {item.link ? (
                <Link href={item.link} passHref>
                  <a>{item.name}</a>
                </Link>
              ) : (
                item.name
              )}
            </BreadcrumbItem>
          </React.Fragment>
        ))}
      </BreadcrumbWrapper>
    </BreadcrumbContainer>
  );
};

export default Breadcrumb;
