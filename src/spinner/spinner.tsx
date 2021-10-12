import React from "react";
import LoaderIcon from "../assets/icons/LoaderIcon";
import { defaultTheme } from "../site-settings/site-theme/default";

const Spinner = ({ width, height }) => {
  return (
    <LoaderIcon
      width={width}
      height={height}
      color={defaultTheme.secondary.color}
    />
  );
};

export default Spinner;
