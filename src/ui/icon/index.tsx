import { Icon as BaseIcon } from "@rneui/base";
import React, { useMemo } from "react";
import { TouchableOpacity, TouchableOpacityProps } from "react-native";

import { useTheme } from "styled-components/native";
import SVGIcon from "../icon-svg";
import { RotatingIcon } from "./rotating-icon";
import { StyledFAIconContainer } from "./styles";
import { IconProps } from "./typings";

const ControlledTouchableOpacity: React.FC<TouchableOpacityProps> = ({
  onPress,
  children,
  ...props
}) => {
  if (!onPress) {
    return <>{children}</>;
  }

  return (
    <TouchableOpacity onPress={onPress} {...props}>
      {children}
    </TouchableOpacity>
  );
};

const Icon: React.FC<IconProps> = ({
  name,
  color = "color-neutral-1100",
  type = "font-awesome-5",
  solid = false,
  size = 20,
  onPress,
  isGeneric = false,
  height = 20,
  width = 20,
  disabled = false,
  enableRotatingAnimation = false,
  spacingLeft = "none",
  spacingRight = "none",
  ...props
}) => {
  const theme = useTheme();

  const imageSource = useMemo(
    () => (isGeneric ? "generic-icons" : "brand-icons"),
    [isGeneric],
  );

  if (enableRotatingAnimation) {
    return (
      <RotatingIcon
        name={name}
        color={color}
        type={type}
        width={width}
        height={height}
      />
    );
  }

  switch (type) {
    case "svg":
      return (
        <ControlledTouchableOpacity onPress={onPress} disabled={disabled}>
          <SVGIcon name={name} color={color} width={width} height={height} />
        </ControlledTouchableOpacity>
      );

    default:
      return (
        <ControlledTouchableOpacity onPress={onPress} disabled={disabled}>
          <StyledFAIconContainer size={size}>
            {React.createElement(BaseIcon as any, {
              name: name as any,
              type: type as any,
              color: theme.colors[color],
              solid,
              size: Math.max(4, size - 4),
            })}
          </StyledFAIconContainer>
        </ControlledTouchableOpacity>
      );
  }
};

export default Icon;
