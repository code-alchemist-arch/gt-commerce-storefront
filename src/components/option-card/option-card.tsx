import React, { useState, SyntheticEvent } from "react";
import DotMenuIcon from "../../assets/icons/DotMenuIcon";
import { defaultTheme } from "../../site-settings/site-theme/default";
import {
  OptionWrapper,
  OptionIcon,
  OptionTitle,
  OptionPrice,
  OptionSubtitle,
  OptionMenu,
  Actions,
  OptionInfo,
  OptionTags,
  OptionsTagsWrapper,
  OptionText,
} from "./option-card.style";

type customAction = {
  name: string;
  action: React.MouseEventHandler;
};

type props = {
  title: string;
  subtitle: string;
  leftIcon?: React.ReactElement;
  tags?: string[];
  price?: string;
  confirmed?: boolean;
  customActions?: customAction[];
  text?: string;
  inactive?: boolean;
  onClick?: React.MouseEventHandler;
  editAction?: React.MouseEventHandler;
  removeAction?: React.MouseEventHandler;
};
const OptionCard: React.FC<props> = ({
  title,
  subtitle,
  leftIcon,
  tags = [],
  price,
  confirmed = false,
  onClick,
  editAction,
  removeAction,
  customActions = [],
  text,
  inactive,
}: props) => {
  const [showActionsOptions, setShowActionsOptions] = useState(false);

  const toggleActions = (event: SyntheticEvent) => {
    setShowActionsOptions(!showActionsOptions);
    event.stopPropagation();
  };

  const hideActions = (event: SyntheticEvent) => {
    setShowActionsOptions(false);
    event.stopPropagation();
  };

  const handleOnClick = (event) => {
    setShowActionsOptions(false);
    onClick && onClick(event);
  };

  return (
    <OptionWrapper
      className={`${confirmed ? "confirmed" : ""} ${
        tags.length && "with-tags"
      }`}
      inactive={inactive}
      onClick={handleOnClick}
    >
      <OptionInfo>
        {leftIcon && <OptionIcon>{leftIcon}</OptionIcon>}
        <div>
          <OptionTitle>{title}</OptionTitle>
          <OptionSubtitle>{subtitle}</OptionSubtitle>
          {text && <OptionText>{text}</OptionText>}
        </div>
      </OptionInfo>
      {tags && (
        <OptionsTagsWrapper>
          {tags.map((tag, index) => (
            <OptionTags key={`tag_${index}`}>{tag}</OptionTags>
          ))}
        </OptionsTagsWrapper>
      )}
      {price && <OptionPrice>{price}</OptionPrice>}
      {(editAction ||
        removeAction ||
        (customActions && !!customActions.length)) && (
        <>
          <OptionMenu onClick={toggleActions}>
            <DotMenuIcon color={defaultTheme.colors.gray} />
          </OptionMenu>
          <Actions
            className={`${showActionsOptions ? "visible" : ""}`}
            onMouseLeave={hideActions}
          >
            <ul>
              {customActions &&
                customActions.length &&
                customActions.map(({ name, action }, index) => (
                  <li
                    key={`custom_action_${index}`}
                    onClick={(event) => {
                      hideActions(event);
                      event.stopPropagation();
                      action(event);
                    }}
                  >
                    {name}
                  </li>
                ))}
              {editAction && (
                <li
                  onClick={(event) => {
                    event.stopPropagation();
                    hideActions(event);
                    editAction(event);
                  }}
                >
                  Edit
                </li>
              )}
              {removeAction && (
                <li
                  onClick={(event) => {
                    event.stopPropagation();
                    hideActions(event);
                    removeAction(event);
                  }}
                >
                  Remove
                </li>
              )}
            </ul>
          </Actions>
        </>
      )}
    </OptionWrapper>
  );
};

export default OptionCard;
