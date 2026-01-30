import { SVGIconProps } from "@/ui/icon-svg/typings";
import { IconType } from "@/ui/icon/typings";

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
