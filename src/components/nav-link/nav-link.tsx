import React from "react";
import styled from "styled-components";
import Link from "next/link";
import { withRouter } from "next/router";
import { FormattedMessage } from "react-intl";
import IconComponent from "../icon/icon";

type NavLinkProps = {
  router: any;
  href: string;
  label?: string;
  intlId?: string;
  icon?: React.ReactNode;
  className?: string;
  iconClass?: string;
  iconName?: string;
  iconSpacing?: string;
  dynamic?: boolean;
  iconPosition?: "vertical" | "horizontal";
  iconColor?: string;
  onClick?: () => void;
};

const Icon = styled.span`
  min-width: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const NavLink: React.FunctionComponent<NavLinkProps> = ({
  href,
  label,
  intlId,
  router,
  icon,
  className,
  iconSpacing,
  iconName,
  onClick,
  iconClass,
  dynamic,
  iconPosition = "vertical",
  iconColor,
}) => {
  const isCurrentPath = router.pathname === href || router.asPath === href;
  return (
    <div onClick={onClick} className={className ? className : ""}>
      {dynamic ? (
        <Link href={"/[type]"} as={href} passHref>
          <a
            className={isCurrentPath ? " current-page" : ""}
            style={{ display: "flex", alignItems: "center" }}
          >
            {icon ? (
              <Icon className={iconClass} color={iconColor}>
                {icon}
              </Icon>
            ) : (
              ""
            )}

            <span className="label">
              {intlId ? (
                <FormattedMessage
                  id={intlId ? intlId : "defaultNavLinkId"}
                  defaultMessage={label}
                />
              ) : (
                label
              )}
            </span>
          </a>
        </Link>
      ) : (
        <Link href={href} passHref>
          <a
            className={isCurrentPath ? " current-page" : ""}
            style={{
              display: "flex",
              alignItems: "center",
              flexDirection: iconPosition === "vertical" ? "column" : "row",
              gap: 10,
            }}
          >
            {icon ? (
              <Icon className={iconClass} color={iconColor}>
                {icon}
              </Icon>
            ) : (
              ""
            )}
            {iconName ? (
              <IconComponent name={iconName} color={iconColor} />
            ) : (
              ""
            )}

            {intlId ||
              (label && (
                <span
                  className="label"
                  style={{
                    textAlign: iconPosition === "vertical" ? "center" : "left",
                    marginTop: iconPosition === "vertical" ? iconSpacing : 0,
                  }}
                >
                  {intlId ? (
                    <FormattedMessage
                      id={intlId ? intlId : "defaultNavLinkId"}
                      defaultMessage={label}
                    />
                  ) : (
                    label
                  )}
                </span>
              ))}
          </a>
        </Link>
      )}
    </div>
  );
};

export default withRouter(NavLink);
