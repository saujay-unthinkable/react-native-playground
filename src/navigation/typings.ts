import { SVGIconProps } from "@/ui/icon-svg/typings";
import { IconType } from "@/ui/icon/typings";
import { FC } from "react";

export interface TabProps {
  name: string;
  icon: string;
  active: boolean;
  label: string;
  iconType?: IconType;
  size?: number;
  svgIconColor?: string;
  svgProps?: SVGIconProps;
  solid?: boolean;
}

export interface TabsInfo {
  name: string;
  iconName: string;
  iconType?: IconType;
  component: FC;
  label: string;
  size?: number;
  svgIconColor?: {
    active: string;
    inactive: string;
  };
  svgProps?: SVGProps;
  solidIcon?: boolean;
  options?: BottomTabNavigationOptions;
}
