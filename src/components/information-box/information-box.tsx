import React, { useState } from "react";
import ExpandIcon from "../../assets/icons/ExpandIcon";
import Label from "../label/label";
import { BoxContent, BoxTitle, Box, BoxExpand } from "./information-box.style";

type Props = {
  className?: string;
  title?: string;
  primary?: boolean;
  dark?: boolean;
  collapsed?: boolean;
  collapsible?: boolean;
  noPadding?: boolean;
  overflow?: boolean;
  children: React.ReactElement;
};

const InformationBox: React.FC<Props> = ({
  className,
  title,
  primary = false,
  dark = false,
  collapsed = false,
  collapsible = false,
  noPadding = false,
  overflow,
  children,
}: Props) => {
  const [currentCollapsed, setCurrentCollapsed] = useState(
    collapsible && collapsed
  );
  return (
    <Box
      className={`${className} ${currentCollapsed && "collapsed"}`}
      boxOverflow={overflow}
    >
      {!!title && (
        <BoxTitle primary={primary} dark={dark}>
          <Label
            text={title}
            fontWeight={600}
            fontSize={13}
            color={primary || dark ? "white" : undefined}
          />
          {collapsible && (
            <BoxExpand
              className={currentCollapsed && "collapsed"}
              onClick={() => setCurrentCollapsed(!currentCollapsed)}
            >
              <ExpandIcon width={30} height={30} color={"#fff"} />
            </BoxExpand>
          )}
        </BoxTitle>
      )}
      {!currentCollapsed && (
        <BoxContent
          noPadding={noPadding}
          className={currentCollapsed && "collapsed"}
        >
          {children}
        </BoxContent>
      )}
    </Box>
  );
};

export default InformationBox;
