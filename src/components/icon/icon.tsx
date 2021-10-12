import React from "react";
import iconsMap from "components/icon/icons.map";

export type IconProps = {
  name: string;
  width?: number;
  height?: number;
  color?: string;
};

const Icon: React.FC<IconProps> = ({
  name,
  width,
  height,
  color,
}: IconProps) => {
  const IconElement = iconsMap[name];

  return (
    !!IconElement && <IconElement width={width} height={height} color={color} />
  );
};

export default Icon;
